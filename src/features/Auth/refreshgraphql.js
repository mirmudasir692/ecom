// refreshgraphql.js

import client from "../../graphql/partner/apollo";
import { Refresh_Token_Mutation } from "../../graphql/mutation/mutation";
import {
  RotateGraphqlTokens,
  graphAuthToken,
  graphRefreshToken,
} from "./AuthSlice";
import store from "../../app/store";

const RefreshGraphToken = async () => {
  try {
    const refreshtoken = graphRefreshToken(store.getState());
    const currentToken = graphAuthToken(store.getState());
    console.log("current token", currentToken);
    console.log("i am here", refreshtoken);
    const { data, errors } = await client.mutate({
      mutation: Refresh_Token_Mutation,
      variables: {
        refreshToken: refreshtoken,
      },
    });
    console.log(data);
    store.dispatch(RotateGraphqlTokens(data));
    console.log("new tokens", data);
    console.log("errors", errors);
  } catch (error) {
    console.log("Error refreshing GraphQL token:", error);
  }
};

export default RefreshGraphToken;
