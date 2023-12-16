import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { graphAuthToken } from "../../features/Auth/AuthSlice";
import BaseEndUrl from "../../../config/config";
import RefreshGraphToken from "../../features/Auth/refreshgraphql";
import store from "../../app/store";

const httpLink = createHttpLink({ uri: `${BaseEndUrl}products/` });

const authLink = setContext((_, { headers }) => {
  const graphqlAuthToken = graphAuthToken(store.getState());
  return {
    headers: {
      ...headers,
      Authorization: graphqlAuthToken ? `JWT ${graphqlAuthToken}` : "",
    },
  };
});

let isRefreshing = false;

const errorLink = onError(({ operation, forward, graphQLErrors }) => {
  console.log(graphQLErrors[0]?.message);
  if (graphQLErrors && graphQLErrors[0]?.message === "Signature has expired") {
    // Check if the operation has already been retried
    if (!isRefreshing) {
      isRefreshing = true;
      console.log("Token expired. Attempting to refresh...");

      return RefreshGraphToken()
        .then(() => {
          const newToken = graphAuthToken(store.getState());
          console.log("Token refresh successful. New token:", newToken);

          // Retry the original operation with the new token
          const newHeaders = {
            ...(operation.getContext()?.headers || {}), // Ensure getContext() is available
            Authorization: newToken ? `JWT ${newToken}` : "",
          };

          const newOperation = {
            ...operation,
            setContext: (newContext) => ({
              ...newContext,
              headers: newHeaders,
            }),
          };
          return forward(newOperation);
        })
        .catch((error) => {
          console.error("Error refreshing token:", error);
          // Handle the error, e.g., log the user out
          throw error;
        })
        .finally(() => {
          isRefreshing = false;
        });
    }
  }
});


const client = new ApolloClient({
  link: authLink.concat(errorLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
