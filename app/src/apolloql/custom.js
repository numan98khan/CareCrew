import { API, graphqlOperation, Auth } from "aws-amplify";
import { ErrorToast, SuccessToast } from "../services/micro";
import { createFCMLookup, updateFCMLookup } from "../graphql/mutations";
import { getFCMLookup } from "../graphql/queries"; // Import the query to fetch the existing token

// Call this function when you have the user ID and FCM token
// saveTokenToDB("user123", "token_here");

// TIMECARD QUERIES
const updateManualTimecard = `mutation UpdateManualTimecard($input: UpdateManualTimecardInput!) {
  updateManualTimecard(input: $input) {
    id
    status
    notes
    _version
  }
}`;

export const processTimecard = async (timecard, notes) => {
  const input = {
    id: timecard.id,
    status: "Processed",
    notes: notes,
    _version: timecard._version,
  };

  try {
    const result = await API.graphql(
      graphqlOperation(updateManualTimecard, { input })
    );

    SuccessToast(
      `Successfully changed status to: ${result?.data?.updateManualTimecard?.status} `
    );
  } catch (error) {
    ErrorToast("Error updating timecard status: " + error);
    // console.error();
  }
};
export const unprocessTimecard = async (timecard) => {
  const input = {
    id: timecard.id,
    status: "Process",
    notes: timecard.notes,
    _version: timecard._version,
  };

  try {
    const result = await API.graphql(
      graphqlOperation(updateManualTimecard, { input })
    );

    // SuccessToast("Successfully updated timecard status: " + result);

    SuccessToast(
      `Successfully changed status to: ${result?.data?.updateManualTimecard?.status} `
    );
  } catch (error) {
    ErrorToast("Error updating timecard status: " + error);
    // console.error();
  }
};
export const reportTimecard = async () => {};
