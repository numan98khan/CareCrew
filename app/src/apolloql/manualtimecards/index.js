import { useState, useEffect } from "react";
import { gql, useQuery, useMutation, useApolloClient } from "@apollo/client";
import {
  listManualTimecards,
  getShifts,
  getFacility,
  getPeople,
  listTimecards,
} from "../../graphql/queries";
import {
  createManualTimecard,
  deleteManualTimecard,
  updateManualTimecard,
} from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
// import { gql, useApolloClient } from "@apollo/client";

import { useCreateNotification } from "../notifications";
import { SHIFT_ASSIGNMENT, REMINDER } from "../../constants/notificationTypes";
import {
  convertAWSDateTimeToLocal,
  convertDateTimeToAWSDateTime,
} from "../../services/micro";
import { userTimezone } from "../timezone";

export const useDeleteManualTimecard = () => {
  const [deleteManualTimecardMutation, { data, loading, error }] = useMutation(
    gql(deleteManualTimecard)
  );

  const deleteManualTimecardQuery = async (input) => {
    try {
      const { data } = await deleteManualTimecardMutation({
        variables: { input },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { deleteManualTimecardQuery, data, loading, error };
};

// createTimecard mutation hook
// useCreateManualTimecard mutation hook
export const useCreateManualTimecard = () => {
  // Assuming you have a similar mutation for creating ManualTimecard
  const [createManualTimecardMutation, { data, loading, error }] = useMutation(
    gql(createManualTimecard) // Replace with the manualTimecard mutation
  );

  // Use the useCreateNotification hook
  const { createNotificationQuery } = useCreateNotification();

  const createManualTimecardQuery = async (input, peopleID, facilityName) => {
    try {
      const convertedInput = {
        ...input,
      };
      if (input.clockInTime) {
        convertedInput.clockInTime = convertDateTimeToAWSDateTime(
          input.clockInTime,
          userTimezone
        );
      }
      if (input.clockOutTime) {
        convertedInput.clockOutTime = convertDateTimeToAWSDateTime(
          input.clockOutTime,
          userTimezone
        );
      }

      const { data } = await createManualTimecardMutation({
        variables: { input: convertedInput },
      });

      // const notificationInput = {
      //   peopleID: peopleID,
      //   type: REMINDER,
      //   subject: "Timecard Alert",
      //   body: `Timecard recorded for ${facilityName}`,
      // };
      // const receiverPeople = [data.createManualTimecard.peopleID];
      // await createNotificationQuery(notificationInput, receiverPeople);

      return data;
    } catch (error) {
      throw error;
    }
  };

  return { createManualTimecardQuery, data, loading, error };
};

export const useUpdateManualTimecard = () => {
  // Assuming you have a similar mutation for creating ManualTimecard
  const [updateManualTimecardMutation, { data, loading, error }] = useMutation(
    gql(updateManualTimecard) // Replace with the manualTimecard mutation
  );

  // // Use the useCreateNotification hook
  // const { createNotificationQuery } = useCreateNotification();

  const updateManualTimecardQuery = async (input, peopleID, facilityName) => {
    try {
      const convertedInput = {
        ...input,
      };
      if (input.clockInTime) {
        convertedInput.clockInTime = convertDateTimeToAWSDateTime(
          input.clockInTime,
          userTimezone
        );
      }
      if (input.clockOutTime) {
        convertedInput.clockOutTime = convertDateTimeToAWSDateTime(
          input.clockOutTime,
          userTimezone
        );
      }
      const { data } = await updateManualTimecardMutation({
        variables: { input: convertedInput },
      });

      // const notificationInput = {
      //   peopleID: peopleID,
      //   type: REMINDER,
      //   subject: "Timecard Alert",
      //   body: `Timecard recorded for ${facilityName}`,
      // };
      // const receiverPeople = [data.createManualTimecard.peopleID];
      // await createNotificationQuery(notificationInput, receiverPeople);

      return data;
    } catch (error) {
      throw error;
    }
  };

  return { updateManualTimecardQuery, data, loading, error };
};

export const useListManualTimecards = (
  facilityID,
  peopleID,
  role,
  status,
  date,
  payrollCycle
) => {
  let filterObject = {};
  filterObject.filter = {};

  if (facilityID) {
    filterObject.filter.facilityID = { eq: facilityID };
  }
  if (peopleID) {
    filterObject.filter.peopleID = { eq: peopleID };
  }

  if (role) {
    filterObject.filter.role = { eq: role };
  }

  if (status) {
    filterObject.filter.status = { eq: status };
  }

  if (date) {
    filterObject.filter.startDate = { eq: date };
  }

  if (payrollCycle) {
    filterObject.filter.payrollCycle = { eq: payrollCycle };
  }

  const client = useApolloClient();

  const { data, loading, error, refetch } = useQuery(gql(listManualTimecards), {
    variables: filterObject,
    pollInterval: 5000,
  });

  const [manualTimecards, setManualTimecards] = useState([]);

  useEffect(() => {
    const fetchShiftsAndFacilities = async () => {
      if (data) {
        const timecardsData = data.listManualTimecards.items.filter(
          (element) => element._deleted !== true
        );
        const fetchFacilityPromises = timecardsData.map((timecard) =>
          client.query({
            query: gql(getFacility),
            variables: { id: timecard.facilityID },
            // fetchPolicy: "cache-first", // adjust according to your needs
          })
        );
        const facilitiesData = await Promise.all(fetchFacilityPromises);

        const fetchPeoplePromises = timecardsData.map((timecard) =>
          client.query({
            query: gql(getPeople),
            variables: { id: timecard.peopleID },
            // fetchPolicy: "cache-first", // adjust according to your needs
          })
        );
        const peopleData = await Promise.all(fetchPeoplePromises);

        const enrichedTimecards = timecardsData.map((timecard, index) => ({
          ...timecard,
          people: peopleData[index]?.data?.getPeople,
          facility: facilitiesData[index]?.data?.getFacility,
        }));

        // setManualTimecards(enrichedTimecards);

        // const userTimezone = userTimezone;

        const enrichedAndConvertedTimecards = enrichedTimecards.map(
          (timecard, index) => ({
            ...timecard,
            // date: timecard.clockInTime
            //   ? convertAWSDateTimeToLocal(
            //       timecard.clockInTime,
            //       userTimezone
            //     ).split("T")[0]
            //   : timecard?.date,
            clockInTime: timecard.clockInTime
              ? convertAWSDateTimeToLocal(timecard.clockInTime, userTimezone)
              : null,
            clockOutTime: timecard.clockOutTime
              ? convertAWSDateTimeToLocal(timecard.clockOutTime, userTimezone)
              : null,
          })
        );

        setManualTimecards(enrichedAndConvertedTimecards);
      }
    };

    fetchShiftsAndFacilities();
  }, [data]);

  if (loading) {
    console.log("Loading ManualTimecards...");
    return { loading, error, manualTimecards: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, manualTimecards: [] };
  }

  return { manualTimecards, loading, error, refetch };
};
