// apollo.js

import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { graphAuthToken } from "../../features/Auth/AuthSlice";
import store from "../../app/store";

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

const client = createApolloClient("https://mudasir12345.pythonanywhere.com/products/");
export default client
