// apollo.js

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { graphAuthToken } from "../../features/Auth/AuthSlice";
import store from "../../app/store";
import BaseEndUrl from "../../../config/config";

const createApolloClient = (uri) => {
  const httpLink = createHttpLink({ uri });

  const authLink = new ApolloLink((operation, forward) => {
    const graphqlAuthToken = graphAuthToken(store.getState());
    operation.setContext({
      headers: {
        Authorization: graphqlAuthToken ? `JWT ${graphqlAuthToken}` : "",
      },
    });
    return forward(operation);
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

const client = createApolloClient(`${BaseEndUrl}products/`);
export default client;
