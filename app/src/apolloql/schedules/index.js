/*****************************************************************************************
 * Imports & Constants
 *****************************************************************************************/
import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import { gql, useQuery, useMutation, useApolloClient } from "@apollo/client";
import { format } from "date-fns";

import { listShifts, getShifts, getFacility } from "../../graphql/queries";
import {
  createShifts,
  updateShifts,
  deleteShifts,
} from "../../graphql/mutations";
import {
  onCreateShifts,
  onUpdateShifts,
  onDeleteShifts,
} from "../../graphql/subscriptions";

import {
  convertAWSDateToLocalDate,
  convertDateTimeToAWSDateTime,
  convertDateToAWSDate,
  convertTimeToAWSTime,
  displayDate,
} from "../../services/micro";

import {
  userTimezone,
  convertAWSDateTimeToLocal,
  convertAWSTimeToLocalTime,
  convertToLocalizedDateTime,
} from "../timezone";

/*****************************************************************************************
 * Reusable Subscription Helpers
 *****************************************************************************************/
const SHIFT_SUBSCRIPTIONS = {
  onCreate: gql(onCreateShifts),
  onUpdate: gql(onUpdateShifts),
  onDelete: gql(onDeleteShifts),
};

/**
 * Attach GraphQL subscriptions for real-time updates.
 * NOTE: updateQuery merges subscription data into the Apollo Cache.
 */
const useShiftSubscriptions = (subscribeToMore) => {
  useEffect(() => {
    if (!subscribeToMore) return;

    // 1. On Create
    const unsubCreate = subscribeToMore({
      document: SHIFT_SUBSCRIPTIONS.onCreate,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newItem = subscriptionData.data.onCreateShifts;
        if (prev.listShifts.items.find((shift) => shift.id === newItem.id)) {
          // Already in the list
          return prev;
        }

        return {
          ...prev,
          listShifts: {
            ...prev.listShifts,
            items: [newItem, ...prev.listShifts.items],
          },
        };
      },
    });

    // 2. On Update
    const unsubUpdate = subscribeToMore({
      document: SHIFT_SUBSCRIPTIONS.onUpdate,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const updatedItem = subscriptionData.data.onUpdateShifts;

        const updatedItems = prev.listShifts.items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        );

        return {
          ...prev,
          listShifts: {
            ...prev.listShifts,
            items: updatedItems,
          },
        };
      },
    });

    // 3. On Delete
    const unsubDelete = subscribeToMore({
      document: SHIFT_SUBSCRIPTIONS.onDelete,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const deletedItem = subscriptionData.data.onDeleteShifts;

        const filteredItems = prev.listShifts.items.filter(
          (item) => item.id !== deletedItem.id
        );

        return {
          ...prev,
          listShifts: {
            ...prev.listShifts,
            items: filteredItems,
          },
        };
      },
    });

    // Cleanup on unmount
    return () => {
      unsubCreate();
      unsubUpdate();
      unsubDelete();
    };
  }, [subscribeToMore]);
};

/*****************************************************************************************
 * Custom List Query: listShiftsCustom
 *****************************************************************************************/
const listShiftsCustom = /* GraphQL */ `
  query ListShifts(
    $filter: ModelShiftsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShifts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        numOfPositions
        shiftStart
        shiftEnd
        shiftStartDT
        shiftEndDT
        date
        roleRequired
        rate
        cancellationGuarantee
        isAssigned
        isIncentive
        isGuarantee
        isArchive
        isHoliday
        facilityID
        hide
        incentives {
          incentiveBy
          incentiveAmount
          incentiveType
        }
      }
      nextToken
      startedAt
      __typename
    }
  }
`;

/*****************************************************************************************
 * 1) useSubtractPosition Hook
 *****************************************************************************************/
export const useSubtractPosition = () => {
  const [subtractPosition] = useMutation(updateShifts);
  const {
    loading: queryLoading,
    error: queryError,
    data,
  } = useQuery(getShifts, {
    skip: true,
  });

  const subtractPositionFunc = async (shiftId, ErrorToast, SuccessToast) => {
    if (!queryLoading && !queryError && data?.getShifts) {
      const currentNumOfPositions = Number(data.getShifts.numOfPositions);
      const newNumOfPositions = String(currentNumOfPositions - 1);

      try {
        const { data: updatedData } = await subtractPosition({
          variables: {
            input: {
              id: shiftId,
              numOfPositions: newNumOfPositions,
              _version: data.getShifts._version,
            },
          },
        });

        SuccessToast("Updated Shift (new positions): " + newNumOfPositions);
      } catch (error) {
        ErrorToast("Error updating shift: " + error.message);
        console.error("Error updating shift:", error.message);
      }
    } else if (queryError) {
      console.error("Error fetching shift:", queryError);
    }
  };

  return {
    subtractPosition: subtractPositionFunc,
    loading: queryLoading,
    error: queryError,
  };
};

/*****************************************************************************************
 * 2) useCreateShift Hook
 *****************************************************************************************/
export const useCreateShift = () => {
  const [createShiftMutation, { data, loading, error }] = useMutation(
    gql(createShifts)
  );

  const validateShiftInput = (input) => {
    const errors = [];
    if (!input?.facilityID) errors.push("Facility not selected.");
    if (!input?.roleRequired) errors.push("Role not selected.");

    if (
      !Number.isInteger(Number(input.numOfPositions)) ||
      Number(input.numOfPositions) <= 0 ||
      /^0/.test(String(input.numOfPositions))
    ) {
      errors.push("Select number of positions.");
    }
    if (!moment(input.shiftStart, "HH:mm:ss.SSS[Z]", true).isValid()) {
      errors.push("Shift start time is not valid.");
    }
    if (!moment(input.shiftEnd, "HH:mm:ss.SSS[Z]", true).isValid()) {
      errors.push("Shift end time is not valid.");
    }
    if (!moment(input.date, "YYYY-MM-DD", true).isValid()) {
      errors.push("Date is not valid.");
    }
    if (!moment(input.shiftStartDT).isValid()) {
      errors.push("Shift start datetime is not valid.");
    }
    if (!moment(input.shiftEndDT).isValid()) {
      errors.push("Shift end datetime is not valid.");
    }

    if (input?.isIncentive) {
      if (!input?.incentives?.incentiveBy) {
        errors.push("Incentive by can't be empty.");
      }
      if (!input?.incentives?.incentiveType) {
        errors.push("Please select an incentive type.");
      }
      if (!input?.incentives?.incentiveAmount) {
        errors.push("Incentive amount can't be empty.");
      }
    }

    return errors;
  };

  const createShiftQuery = async (input, disablePastShiftValidation) => {
    try {
      const validationErrors = validateShiftInput(input);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join("\n"));
      }

      // Check if endTime is before startTime (indicates overnight shift)
      const isNextDay = input.shiftEnd < input.shiftStart;
      const endDate = isNextDay
        ? moment(input.date).add(1, "days").format("YYYY-MM-DD")
        : input.date;

      // Build UTC versions of start and end times
      const utcStartDatetimeObj = moment
        .tz(
          `${input.date}T${
            input.shiftStart.endsWith("Z")
              ? input.shiftStart.slice(0, -1)
              : input.shiftStart
          }`,
          userTimezone
        )
        .utc();

      if (!disablePastShiftValidation) {
        const nowUTC = moment.utc();
        if (utcStartDatetimeObj.isBefore(nowUTC)) {
          throw new Error("You cannot create a shift that starts in the past.");
        }
      }

      const utcStartDatetime = utcStartDatetimeObj.format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
      );

      const utcEndDatetime = moment
        .tz(
          `${endDate}T${
            input.shiftEnd.endsWith("Z")
              ? input.shiftEnd.slice(0, -1)
              : input.shiftEnd
          }`,
          userTimezone
        )
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

      const convertedInput = {
        ...input,
        shiftStart: convertTimeToAWSTime(input.shiftStart, userTimezone),
        shiftEnd: convertTimeToAWSTime(input.shiftEnd, userTimezone),
        date: convertDateTimeToAWSDateTime(
          `${input.date}T${input.shiftStart}`,
          userTimezone
        ).split("T")[0],
        shiftStartDT: utcStartDatetime,
        shiftEndDT: utcEndDatetime,
      };

      // Use Amplify API for creation to match original behavior
      const data = await API.graphql(
        graphqlOperation(createShifts, { input: convertedInput })
      );

      return convertedInput; // or return data if you want the response
    } catch (error) {
      throw error;
    }
  };

  return { createShiftQuery, data, loading, error };
};

/*****************************************************************************************
 * 3) useDeleteShift Hook
 *****************************************************************************************/
export const useDeleteShift = () => {
  const [deleteShiftMutation, { data, loading, error }] = useMutation(
    gql(deleteShifts)
  );

  const deleteShiftQuery = async (input) => {
    try {
      const { data } = await deleteShiftMutation({ variables: { input } });
      return data;
    } catch (err) {
      throw err;
    }
  };

  return { deleteShiftQuery, data, loading, error };
};

/*****************************************************************************************
 * 4) useUpdateShift Hook
 *****************************************************************************************/
export const useUpdateShift = () => {
  const [updateShiftMutation, { data, loading, error }] = useMutation(
    gql(updateShifts)
  );

  const updateShiftQuery = async (
    input,
    disablePastShiftValidation = false
  ) => {
    try {
      let convertedInput;

      if (input.shiftStart && input.shiftEnd && input.date) {
        const utcStartDatetimeObj = moment
          .tz(
            `${input.date}T${
              input.shiftStart.endsWith("Z")
                ? input.shiftStart.slice(0, -1)
                : input.shiftStart
            }`,
            userTimezone
          )
          .utc();

        if (!disablePastShiftValidation) {
          const nowUTC = moment.utc();
          if (utcStartDatetimeObj.isBefore(nowUTC)) {
            throw new Error(
              "You cannot create a shift that starts in the past."
            );
          }
        }

        const utcStartDatetime = utcStartDatetimeObj.format(
          "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
        );

        const utcEndDatetime = moment
          .tz(
            `${input.date}T${
              input.shiftEnd.endsWith("Z")
                ? input.shiftEnd.slice(0, -1)
                : input.shiftEnd
            }`,
            userTimezone
          )
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

        convertedInput = {
          ...input,
          shiftStart: convertTimeToAWSTime(input.shiftStart, userTimezone),
          shiftEnd: convertTimeToAWSTime(input.shiftEnd, userTimezone),
          date: convertDateTimeToAWSDateTime(
            `${input.date}T${input.shiftStart}`,
            userTimezone
          ).split("T")[0],
          shiftStartDT: utcStartDatetime,
          shiftEndDT: utcEndDatetime,
        };
      } else {
        // If user is not changing shiftStart/shiftEnd/date, just pass the original input
        convertedInput = { ...input };
      }

      // Remove any stray __typename from nested objects
      const sanitizedInput = JSON.parse(JSON.stringify(convertedInput));
      if (sanitizedInput?.incentives) {
        delete sanitizedInput.incentives.__typename;
      }

      const { data } = await updateShiftMutation({
        variables: { input: sanitizedInput },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { updateShiftQuery, data, loading, error };
};

/*****************************************************************************************
 * 5) useListShifts Hook (Real-Time)
 *****************************************************************************************/
export const useListShifts = (
  facilityID,
  role,
  date,
  timings,
  startDate,
  endDate,
  filterStartDate,
  filterEndDate,
  isGuarantee,
  isIncentive
) => {
  const convertToAWSDate = (dateStr) =>
    moment(dateStr, "dddd, M/D/YYYY").format("YYYY-MM-DD");

  // Build Filter
  const filter = {
    _deleted: { ne: true },
    ...(facilityID && { facilityID: { eq: facilityID } }),
    ...(role && { roleRequired: { eq: role } }),
    ...(!date &&
      startDate &&
      endDate && {
        date: {
          between: [
            filterStartDate ? filterStartDate : convertToAWSDate(startDate),
            filterEndDate ? filterEndDate : convertToAWSDate(endDate),
          ],
        },
      }),
    ...(isGuarantee && { cancellationGuarantee: { eq: isGuarantee } }),
    ...(isIncentive && { isIncentive: { eq: isIncentive } }),
  };

  // Run Query
  const { data, loading, error, refetch, subscribeToMore } = useQuery(
    gql(listShiftsCustom),
    {
      variables: { filter },
    }
  );

  // Attach real-time subscriptions
  useShiftSubscriptions(subscribeToMore);

  // Once data arrives, format each shift with local times
  const formatDate = (aDate) => {
    const year = aDate.getFullYear();
    const month = String(aDate.getMonth() + 1).padStart(2, "0");
    const day = String(aDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const shifts = data?.listShifts?.items
    ? data.listShifts.items
        .map((shift) => {
          const temp = { ...shift };

          // Convert to local time
          const localizedStartDT = moment
            .tz(temp.shiftStartDT, "UTC")
            .tz(userTimezone)
            .format("YYYY-MM-DDTHH:mm:ss.SSS");

          const localizedEndDT = moment
            .tz(temp.shiftEndDT, "UTC")
            .tz(userTimezone)
            .format("YYYY-MM-DDTHH:mm:ss.SSS");

          temp.date = localizedStartDT.split("T")[0];
          temp.shiftStart = localizedStartDT.split("T")[1];
          temp.shiftEnd = localizedEndDT.split("T")[1];

          return temp;
        })
        .filter((obj) => {
          if (date) return obj.date === formatDate(date);
          return true;
        })
    : [];

  return { shifts, loading, error, refetch };
};

/*****************************************************************************************
 * 6) useListMarketplace Hook (Real-Time)
 *****************************************************************************************/
export const useListMarketplace = (facilityID, role, date) => {
  const [shifts, setShifts] = useState([]);
  const client = useApolloClient();

  // The “cutoff” is 2 days ago if no specific date is given
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 2);
  const cutoffDate = currentDate.toISOString().split("T")[0];

  const filter = {
    _deleted: { ne: true },
    numOfPositions: { ne: "0" },
    ...(date && { date: { eq: date } }),
    ...(!date && { date: { gte: cutoffDate } }),
    ...(facilityID && { facilityID: { eq: facilityID } }),
    ...(role && { roleRequired: { eq: role } }),
  };

  // Query & Subscribe
  const { data, loading, error, refetch, subscribeToMore } = useQuery(
    gql(listShiftsCustom),
    { variables: { filter } }
  );
  useShiftSubscriptions(subscribeToMore);

  useEffect(() => {
    const fetchShiftsAndFacilities = async () => {
      if (!data) return;

      // Filter out any deleted
      const shiftsData = data.listShifts.items.filter(
        (element) => element._deleted !== true
      );

      // Fetch facility for each shift
      const facilitiesData = await Promise.all(
        shiftsData.map((shift) =>
          client.query({
            query: gql(getFacility),
            variables: { id: shift.facilityID },
          })
        )
      );

      // Attach facility info to each shift
      const enrichedShifts = shiftsData.map((shift, idx) => ({
        ...shift,
        facility: facilitiesData[idx]?.data?.getFacility,
      }));

      // Convert each shift to local times
      const localizedShifts = enrichedShifts.map((shift) => {
        const localizedStartDT = moment
          .tz(shift.shiftStartDT, "UTC")
          .tz(userTimezone)
          .format("YYYY-MM-DDTHH:mm:ss.SSS");

        const localizedEndDT = moment
          .tz(shift.shiftEndDT, "UTC")
          .tz(userTimezone)
          .format("YYYY-MM-DDTHH:mm:ss.SSS");

        return {
          ...shift,
          date: localizedStartDT.split("T")[0],
          shiftStart: localizedStartDT.split("T")[1],
          shiftEnd: localizedEndDT.split("T")[1],
          shiftStartDT: localizedStartDT,
          shiftEndDT: localizedEndDT,
        };
      });

      setShifts(localizedShifts);
    };

    fetchShiftsAndFacilities();
  }, [data, client]);

  if (loading) {
    return { loading, error, shifts: [] };
  }
  if (error) {
    console.error("Error in useListMarketplace!", error);
    return { loading, error, shifts: [] };
  }

  return { shifts, loading, error, refetch };
};

/*****************************************************************************************
 * 7) useListMarketplaceCount Hook (Real-Time)
 *****************************************************************************************/
export const useListMarketplaceCount = () => {
  const [shifts, setShifts] = useState([]);
  const [shiftsCount, setShiftsCount] = useState(0);

  // Query & Subscribe
  const { data, loading, error, refetch, subscribeToMore } = useQuery(
    gql(listShifts),
    {
      variables: { filter: { _deleted: { ne: true } } },
    }
  );
  useShiftSubscriptions(subscribeToMore);

  useEffect(() => {
    if (data?.listShifts?.items) {
      const shiftsData = data.listShifts.items.filter(
        (element) => element._deleted !== true
      );
      setShifts(shiftsData);
      setShiftsCount(shiftsData.length);
    }
  }, [data]);

  if (loading) {
    return { loading, error, shifts: [], shiftsCount: 0 };
  }
  if (error) {
    console.error("Error in useListMarketplaceCount!", error);
    return { loading, error, shifts: [], shiftsCount: 0 };
  }

  return {
    shifts,
    shiftsCount,
    loading,
    error,
    refetch,
  };
};
