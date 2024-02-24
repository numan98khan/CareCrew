import moment from "moment";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { userTimezone } from "../../apolloql/timezone";

export const listTimecards = /* GraphQL */ `
  query ListTimecards(
    $filter: ModelTimecardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTimecards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        shiftsID
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;

export const getTimecardsForShift = async (shiftid) => {
  // This function fetches all timecards for a user in a specific week.

  const timecardFilters = {
    shiftsID: {
      eq: shiftid,
    },
    _deleted: {
      ne: true,
    },
  };

  const timecardsData = await API.graphql(
    graphqlOperation(listTimecards, {
      filter: timecardFilters,
    })
  );

  const timecards = timecardsData.data.listTimecards.items;
  return timecards?.length; // Returns the modified timecards with the desiredClockInTime set
};
