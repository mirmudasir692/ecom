import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  Observable,
} from "@apollo/client";
import { graphAuthToken } from "../../features/Auth/AuthSlice";
import BaseEndUrl from "../../../config/config";
import RefreshGraphToken from "../../features/Auth/refreshgraphql";
import store from "../../app/store";

const createApolloClient = (uri) => {
  const httpLink = createHttpLink({ uri });

  let refreshing = false; // Flag to track whether a refresh is in progress

  const authLink = new ApolloLink((operation, forward) => {
    const graphqlAuthToken = graphAuthToken(store.getState());

    operation.setContext({
      headers: {
        Authorization: graphqlAuthToken ? `JWT ${graphqlAuthToken}` : "",
      },
    });
    return forward(operation);
  });

  const errorLink = new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      // Forward the operation and subscribe to the response
      const subscription = forward(operation).subscribe({
        next: async (response) => {
          // Check for token expiration error
          if (
            response.errors &&
            response.errors.some(
              (error) => error && error.message === "Signature has expired"
            )
          ) {
            if (!refreshing) {
              refreshing = true; // Set the flag to true to prevent multiple refresh attempts

              console.log("Token expired. Attempting to refresh...");
              try {
                await RefreshGraphToken();
                const newToken = graphAuthToken(store.getState());
                console.log("Token refresh successful. New token:", newToken);

                // Create a new operation with the updated headers
                const newOperation = {
                  ...operation,
                  setContext: {
                    headers: {
                      Authorization: newToken ? `JWT ${newToken}` : "",
                    },
                  },
                };

                // Retry the original operation with the new token
                observer.next(await forward(newOperation));
                observer.complete();
              } catch (error) {
                console.error("Error refreshing token:", error);
                observer.error(error);
              } finally {
                refreshing = false; // Reset the flag after refresh is complete
              }
            }
          } else {
            // Return the response if the token doesn't need refreshing
            observer.next(response);
            observer.complete();
          }
        },
        error: (error) => {
          console.error("Error in errorLink:", error);
          observer.error(error);
        },
      });

      // Cleanup subscription on complete
      return () => subscription.unsubscribe();
    });
  });

  return new ApolloClient({
    link: ApolloLink.from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

const client = createApolloClient(`${BaseEndUrl}products/`);
export default client;
