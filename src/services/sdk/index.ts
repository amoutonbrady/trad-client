import http from 'redaxios';
import { useContext } from 'solid-js';
import { ServiceContext } from '..';
import { createLanguagesEndpoint } from './languages';
import { createProjectsEndpoint } from './projects';
import { createTranslationsEndpoint } from './translations';
import { createUsersEndpoint } from './users';
import { createViewsEndpoint } from './views';

export function createSDK(client: typeof http) {
  // TODO: Make those lazy loaded
  const entities = {
    languages: createLanguagesEndpoint(client),
    users: createUsersEndpoint(client),
    projects: createProjectsEndpoint(client),
    views: createViewsEndpoint(client),
    translations: createTranslationsEndpoint(client),
  };

  return entities;
}

export function useSDK() {
  const ctx = useContext(ServiceContext);
  return ctx.sdk;
}
