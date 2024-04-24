// lib/client.js
import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const noteClient = () => {
  return new ApolloClient({
    uri: "http://localhost:4002/graphql",
    cache: new InMemoryCache(),
  });
};

export const loginClient = () => {
  return new ApolloClient({
    uri: "http://localhost:4001/graphql",
    cache: new InMemoryCache(),
  });
};

export const classeClient = () => {
  return new ApolloClient({
    uri: "http://localhost:4003/graphql",
    cache: new InMemoryCache(),
  });
};
