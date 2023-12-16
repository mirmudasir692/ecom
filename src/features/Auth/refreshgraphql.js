// refreshgraphql.js

import client from "../../graphql/partner/apollo";
import { Refresh_Token_Mutation } from "../../graphql/mutation/mutation";
import { RotateGraphqlTokens, graphRefreshToken } from "./AuthSlice";
import store from "../../app/store";

const RefreshGraphToken = async () => {
  try {
    const refreshtoken = graphRefreshToken(store.getState());
    console.log("i am here", refreshtoken);
    const { data,errors } = await client.mutate({
      mutation: Refresh_Token_Mutation,
      variables: { refreshtoken },
    });
    store.dispatch(RotateGraphqlTokens)
    console.log("new tokens", data);
    console.log("errors", errors)
  } catch (error) {
    console.log("Error refreshing GraphQL token:", error);
  }
};

export default RefreshGraphToken;
