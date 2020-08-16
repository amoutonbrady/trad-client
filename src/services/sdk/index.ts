import { GraphQLClient } from "graphql-request";
import { useContext } from "solid-js";
import { ServiceContext } from "..";
import { createLanguagesEndpoint } from "./languages";

export function createSDK(client: GraphQLClient) {
  const entities = {
    languages: createLanguagesEndpoint(client),
  };

  return entities;
}

export function useSDK() {
  const ctx = useContext(ServiceContext);
  return ctx.sdk;
}
