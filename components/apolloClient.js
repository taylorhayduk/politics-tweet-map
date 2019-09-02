import fetch from 'node-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

// Instantiate required constructor fields
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  fetch
});

export const client = new ApolloClient({
  // Provide required constructor fields
  cache,
  link
});
