// refreshgraphql.js

import client from "../../graphql/partner/apollo";
import { Refresh_Token_Mutation } from "../../graphql/mutation/mutation";
import { graphRefreshToken } from "./AuthSlice";
import store from "../../app/store";

const RefreshGraphToken = async () => {
  try {
    const refreshtoken = graphRefreshToken(store.getState());
    console.log("i am here", refreshToken);
    const { data } = await client.mutate({
      mutation: Refresh_Token_Mutation,
      variables: { refreshtoken },
    });
    console.log("new tokens", data);
  } catch (error) {
    console.log("Error refreshing GraphQL token:", error);
  }
};

export default RefreshGraphToken;
