import moment from "moment";

import { Auth, API, graphqlOperation } from "aws-amplify";

import {
  createAccountLimitsLookup,
  updateAccountLimitsLookup,
  updatePeople,
} from "../../graphql/mutations";

const getPeopleAssignTimecard = /* GraphQL */ `
  query GetPeople($id: ID!) {
    getPeople(id: $id) {
      id
      surrogateID
      firstName
      lastName
      phoneNumber
      role
      status
      email
      points
      rating
      permissions
      type
      availability
      immunization
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const updateLastActivityNotifications = async (userId) => {
  const lastActivityNotifications = new Date().toISOString(); // Current timestamp in ISO format

  const input = {
    id: userId,
    lastActivityNotifications: lastActivityNotifications,
  };

  try {
    await API.graphql(graphqlOperation(updatePeople, { input }));
    console.log("Last activity notifications time updated successfully");
  } catch (error) {
    console.error("Error updating last activity notifications:", error);
  }
};

export const resetLastNotificationsActivity = async (userid) => {
  const userData = (
    await API.graphql(graphqlOperation(getPeopleAssignTimecard, { id: userid }))
  )?.data?.getPeople;
  if (!userData) throw new Error("Failed to get user data.");

  const lastActivityNotifications = new Date().toISOString(); // Current timestamp in ISO format

  const input = {
    id: userData?.id,
    lastActivityNotifications: lastActivityNotifications,
    _version: userData?._version,
  };

  try {
    await API.graphql(graphqlOperation(updatePeople, { input }));
    console.log("Last activity notifications time updated successfully");
  } catch (error) {
    console.error("Error updating last activity notifications:", error);
  }
};
