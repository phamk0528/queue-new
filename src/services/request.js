import { GraphQLClient } from "graphql-request";

export const myFetcher = async (query) => {
  // const baseUrl = process.env.REACT_APP_API_END_POINT;
  // const baseUrl = "https://staging.api.foodtohave.com/graphql";
  const baseUrlProduction = "https://api.bistrobytes.com.sg/graphql";
  const graphQLClient = new GraphQLClient(baseUrlProduction);
  try {
    const data = await graphQLClient.request(query);
    return data;
  } catch (e) {
    console.log(e);
  }
};
