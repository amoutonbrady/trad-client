import { Component, createContext } from 'solid-js';
import http from 'redaxios';
import { createAuthService } from './auth';
import { createSDK } from './sdk';

export const ServiceContext = createContext<{
  auth: ReturnType<typeof createAuthService>;
  sdk: ReturnType<typeof createSDK>;
}>();

export const ServiceProvider: Component = (props) => {
  const client = http.create({
    baseURL: 'http://localhost:3000',
  });

  const authService = createAuthService(client);

  const store = {
    auth: authService,
    sdk: createSDK(client),
  };

  return <ServiceContext.Provider value={store}>{props.children}</ServiceContext.Provider>;
};
