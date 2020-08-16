import { Component, createContext } from 'solid-js'
import { GraphQLClient } from 'graphql-request'
import { createAuthService } from './auth'
import { createSDK } from './sdk'

export const ServiceContext = createContext<{
  auth: ReturnType<typeof createAuthService>
  sdk: ReturnType<typeof createSDK>
}>()

export const ServiceProvider: Component = (props) => {
  const client = new GraphQLClient('http://localhost:4000/graphql')

  const authService = createAuthService(client)

  const store = {
    auth: authService,
    sdk: createSDK(client),
  }

  return (
    <ServiceContext.Provider value={store}>
      {props.children}
    </ServiceContext.Provider>
  )
}
