import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { graphAuthToken } from "../../features/Auth/AuthSlice";
import store from "../../app/store";
import BaseEndUrl from "../../../config/config";
import RefreshGraphToken from "../../features/Auth/refreshgraphql";

// Flag to track if token refresh is in progress
let isRefreshing = false;

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

  const errorLink = onError(
    async ({ graphQLErrors, operation, forward, response }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          if (err.message === "Signature has expired") {
            // Check if refresh is already in progress
            if (isRefreshing) {
              return;
            }

            // Set flag to indicate refresh is in progress
            isRefreshing = true;

            try {
              await RefreshGraphToken();
              const newAuthToken = graphAuthToken(store.getState());
              console.log("New Token:", newAuthToken);

              const oldHeaders = operation.getContext().headers;

              operation.setContext({
                headers: {
                  ...oldHeaders,
                  Authorization: newAuthToken ? `JWT ${newAuthToken}` : "",
                },
              });

              // Reset the flag after successful refresh
              isRefreshing = false;

              return forward(operation);
            } catch (refreshError) {
              console.error("Error refreshing token:", refreshError);

              // Reset the flag in case of an error during refresh
              isRefreshing = false;

              // Handle the error as needed, e.g., log out the user
              // or redirect to the login page
              throw refreshError;
            }
          }
        }

        // If the error doesn't match the expected "Signature has expired" case,
        // throw it to be handled by other error handling logic
        console.error("GraphQL errors:", graphQLErrors);
        console.error("Operation:", operation);
        console.error("Response:", response);
        throw graphQLErrors;
      }
    }
  );

  return new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache(),
  });
};

const client = createApolloClient(`${BaseEndUrl}products/`);
export default client;
