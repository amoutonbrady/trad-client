import { GraphQLClient } from 'graphql-request';
import { createEffect, createState, useContext } from 'solid-js';
import { ServiceContext } from './index';
import { loginMutation } from '../graphql';
import { useLocalStorage } from '../utils/useLocalStorage';

export const createAuthService = (client: GraphQLClient) => {
  const [get, set] = useLocalStorage('auth', {
    token: '',
    error: '',
    user: null,
  });
  const [state, setState] = createState(get());
  createEffect(() => {
    set(state);

    if (state.token) {
      client.setHeader('Authorization', `Bearer ${state.token}`);
    }
  });

  return [
    state,
    {
      async login(data: { email: string; password: string }) {
        try {
          const { login } = await client.request(loginMutation, data);
          setState({ token: login.token, error: '', user: login.user });
        } catch ({ response }) {
          setState({
            token: '',
            error: response.errors[0].message,
            user: null,
          });
        }
      },
      logout() {
        setState('token', '');
      },
      isLoggedIn() {
        return Boolean(state.token);
      },
    },
  ] as const;
};

export function useAuth() {
  const ctx = useContext(ServiceContext);
  return ctx.auth;
}
