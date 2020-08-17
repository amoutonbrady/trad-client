import { GraphQLClient } from "graphql-request";
import { useContext } from "solid-js";
import { ServiceContext } from "..";
import { createLanguagesEndpoint } from "./languages";
import { createProjectsEndpoint } from "./projects";
import { createUsersEndpoint } from "./users";

export function createSDK(client: GraphQLClient) {
  const entities = {
    languages: createLanguagesEndpoint(client),
    users: createUsersEndpoint(client),
    projects: createProjectsEndpoint(client),
  };

  return entities;
}

export function useSDK() {
  const ctx = useContext(ServiceContext);
  return ctx.sdk;
}
