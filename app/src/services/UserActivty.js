import { Auth, API, graphqlOperation } from "aws-amplify";

import { updatePeople } from "../graphql/mutations";
import { ErrorToast, SuccessToast } from "./micro";

const getPeople = /* GraphQL */ `
  query GetPeople($id: ID!) {
    getPeople(id: $id) {
      id
      surrogateID
      firstName
      lastName
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const updateLastActivity = async (userid) => {
  try {
    const userData = (
      await API.graphql(graphqlOperation(getPeople, { id: userid }))
    )?.data?.getPeople;

    const currentTime = new Date().toISOString(); // Get current timestamp in ISO format
    const input = {
      id: userData.id,
      lastActivity: currentTime,
      _version: userData?._version,
    };
    await API.graphql(graphqlOperation(updatePeople, { input }));
    console.log("Last activity updated");
    // SuccessToast("Updated user activity");
  } catch (error) {
    console.error("Error updating last activity:", error);

    // ErrorToast("Error updating user activity");
  }
};
