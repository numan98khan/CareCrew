import { API, graphqlOperation } from "aws-amplify";
import { getShifts } from "../graphql/queries"; // path to your queries file
import { updateShifts } from "../graphql/mutations"; // path to your queries file
import { gql } from "@apollo/client";
import { ErrorToast, SuccessToast } from "../services/micro";

export async function subtractPosition(shiftId, errorMessage, success) {
  try {
    // Get the shift
    const getShiftsResponse = await API.graphql(
      graphqlOperation(getShifts, { id: shiftId })
    );
    const shift = getShiftsResponse.data.getShifts;
    const currentNumOfPositions = Number(shift.numOfPositions);

    // Subtract 1 from numOfPositions
    const newNumOfPositions = String(currentNumOfPositions - 1);

    // Update the shift
    const updateShiftsInput = {
      id: shiftId,
      numOfPositions: newNumOfPositions,
    };
    const updateShiftsResponse = await API.graphql(
      graphqlOperation(updateShifts, { input: updateShiftsInput })
    );
    SuccessToast("Updated Shift (new positions):" + newNumOfPositions);
    // console.log("Updated Shift:", updateShiftsResponse);
  } catch (error) {
    ErrorToast("Error updating shift:" + error);
    // console.error("Error updating shift:", error);
  }
}

export const updateFacilityMutation = /* GraphQL */ `
  mutation UpdateFacility(
    $input: UpdateFacilityInput!
    $condition: ModelFacilityConditionInput
  ) {
    updateFacility(input: $input, condition: $condition) {
      id
      imgSrc
      facilityName
      aboutFacility
      streetAddress
      country
      city
      state
      zip
      contacts {
        name
        phone
        email
        position
        __typename
      }
      email
      permissions
      _version
      __typename
    }
  }
`;

export const createTemplates = /* GraphQL */ gql`
  mutation CreateTemplates(
    $input: CreateTemplatesInput!
    $condition: ModelTemplatesConditionInput
  ) {
    createTemplates(input: $input, condition: $condition) {
      id
      subject
      status
      body
      peopleID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateTemplates = /* GraphQL */ gql`
  mutation UpdateTemplates(
    $input: UpdateTemplatesInput!
    $condition: ModelTemplatesConditionInput
  ) {
    updateTemplates(input: $input, condition: $condition) {
      id
      subject
      status
      body
      peopleID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
