import http from 'redaxios';
import { createEffect, createState, useContext } from 'solid-js';
import { ServiceContext } from './index';
import { useLocalStorage } from '../utils/useLocalStorage';

export const createAuthService = (client: typeof http) => {
  const [get, set] = useLocalStorage('auth', {
    token: '',
    error: '',
    user: null,
  });

  const [state, setState] = createState(get());

  createEffect(() => {
    set(state);

    if (state.token) {
      client.defaults.headers = { Authorization: `Bearer ${state.token}` };
    }
  });

  return [
    state,
    {
      async login(form: { email: string; password: string }) {
        try {
          const { data } = await client.post('auth/login', form);
          setState({ token: data.token, error: '', user: data.user });
        } catch (e) {
          setState({
            token: '',
            error: 'An error occured',
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
