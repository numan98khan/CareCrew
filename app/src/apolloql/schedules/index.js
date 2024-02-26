// import { gql, useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { listShifts, getShifts, getFacility } from "../../graphql/queries";
import {
  createShifts,
  updateShifts,
  deleteShifts,
} from "../../graphql/mutations";

import { gql, useQuery, useMutation, useApolloClient } from "@apollo/client";
import { format } from "date-fns";
import moment from "moment";
import {
  // convertAWSDateTimeToLocal,
  convertAWSDateToLocalDate,
  // convertAWSTimeToLocalTime,
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
import { API, graphqlOperation } from "aws-amplify";

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
        floorNumber
        supervisor
        cancellationGuarantee
        isAssigned
        isIncentive
        isGuarantee
        isLate
        isCallOff
        isSelected
        isArchive
        isHoliday
        recurringSchedule
        facilityID
        hide
        incentives {
          incentiveBy
          incentiveAmount
          incentiveType
        }
        createdAt
        updatedAt
      }
      nextToken
      __typename
    }
  }
`;

export const useSubtractPosition = () => {
  const [subtractPosition] = useMutation(updateShifts);
  const {
    loading: queryLoading,
    error: queryError,
    data,
  } = useQuery(getShifts, { skip: true });

  const subtractPositionFunc = async (shiftId, ErrorToast, SuccessToast) => {
    if (!queryLoading && !queryError) {
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
        console.log("Updated Shift:", updatedData.updateShifts);
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

export const useCreateShift = () => {
  const [createShiftMutation, { data, loading, error }] = useMutation(
    gql(createShifts)
  );

  // const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const validateShiftInput = (input) => {
    const errors = [];

    if (!input?.facilityID) {
      errors.push("Facility not selected.");
      return errors;
    }
    if (!input?.roleRequired) {
      errors.push("Role not selected.");
      return errors;
    }
    // if (
    //   !Number.isInteger(Number(input.numOfPositions)) ||
    //   Number(input.numOfPositions) <= 0
    // ) {
    //   errors.push("Select numer of positions.");
    //   return errors;
    // }

    if (
      !Number.isInteger(Number(input.numOfPositions)) ||
      Number(input.numOfPositions) <= 0 ||
      /^0/.test(String(input.numOfPositions))
    ) {
      errors.push("Select number of positions.");
      return errors;
    }

    if (!moment(input.shiftStart, "HH:mm:ss.SSS[Z]", true).isValid()) {
      errors.push("Shift start time is not valid.");
      return errors;
    }

    if (!moment(input.shiftEnd, "HH:mm:ss.SSS[Z]", true).isValid()) {
      errors.push("Shift end time is not valid.");
      return errors;
    }

    if (!moment(input.date, "YYYY-MM-DD", true).isValid()) {
      errors.push("Date is not valid.");
      return errors;
    }

    if (!moment(input.shiftStartDT).isValid()) {
      errors.push("Shift start datetime is not valid.");
      return errors;
    }

    if (!moment(input.shiftEndDT).isValid()) {
      errors.push("Shift end datetime is not valid.");
      return errors;
    }

    if (input?.isIncentive) {
      if (!input?.incentives?.incentiveBy) {
        errors.push("Incentive by can't be empty.");
        return errors;
      }

      if (!input?.incentives?.incentiveType) {
        errors.push("Please select an incentive type.");
        return errors;
      }
      if (!input?.incentives?.incentiveAmount) {
        errors.push("Incentive amount can't be empty.");
        return errors;
      }
    }

    // ... Add more checks for other fields ...

    return errors;
  };
  const createShiftQuery = async (input, disablePastShiftValidation) => {
    try {
      const validationErrors = validateShiftInput(input);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join("\n"));
      }

      // Check if endTime is before startTime
      const isNextDay = input.shiftEnd < input.shiftStart;

      // If it's the next day, add one day to the date
      const endDate = isNextDay
        ? moment(input.date).add(1, "days").format("YYYY-MM-DD")
        : input.date;

      // Generate the moment object without converting to string
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

      const currentDate = moment.utc(); // Current UTC datetime

      if (!disablePastShiftValidation) {
        if (utcStartDatetimeObj.isBefore(currentDate)) {
          throw new Error("You cannot create a shift that starts in the past.");
        }
      }

      // Now, convert utcStartDatetimeObj to string format if needed
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

      // const {data} = await createShiftMutation({
      //   variables: {input: input},
      // });
      const convertedInput = {
        ...input,
        shiftStart: convertTimeToAWSTime(input.shiftStart, userTimezone),
        shiftEnd: convertTimeToAWSTime(input.shiftEnd, userTimezone),
        date: convertDateTimeToAWSDateTime(
          input.date + "T" + input.shiftStart,
          userTimezone
        ).split("T")[0],

        shiftStartDT: utcStartDatetime,
        shiftEndDT: utcEndDatetime,
      };

      // console.log(
      //   "🚀 ~ file: index.js:88 ~ convertedInput:",
      //   // convertedInput,
      //   input.shiftStart,
      //   input.shiftEnd,
      //   // input.date,
      //   utcStartDatetime,
      //   utcEndDatetime
      // );

      const data = await API.graphql(
        graphqlOperation(createShifts, {
          input: convertedInput,
        })
      );

      // console.log("🚀 ~ file: index.js:32 ~ createShiftQuery ~ data:", data);
      // return data;
      return convertedInput;
    } catch (error) {
      throw error;
    }
  };

  return { createShiftQuery, data, loading, error };
};

// DELETE_SHIFT mutation hook
export const useDeleteShift = () => {
  const [deleteShiftMutation, { data, loading, error }] = useMutation(
    gql(deleteShifts)
  );

  const deleteShiftQuery = async (input) => {
    try {
      const { data } = await deleteShiftMutation({
        variables: { input: input },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { deleteShiftQuery, data, loading, error };
};

// updateShift mutation hook
export const useUpdateShift = () => {
  const [updateShiftMutation, { data, loading, error }] = useMutation(
    gql(updateShifts)
  );

  const updateShiftQuery = async (
    input,
    disablePastShiftValidation = false
  ) => {
    console.log("🚀 ~ file: index.js:237 ~ useUpdateShift ~ input:", input);
    try {
      let convertedInput = null;
      if (input.shiftStart && input.shiftEnd && input.date) {
        // Generate the moment object without converting to string
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

        const currentDate = moment.utc(); // Current UTC datetime

        if (!disablePastShiftValidation) {
          if (utcStartDatetimeObj.isBefore(currentDate)) {
            throw new Error(
              "You cannot create a shift that starts in the past."
            );
          }
        }

        // Now, convert utcStartDatetimeObj to string format if needed
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

        // const {data} = await createShiftMutation({
        //   variables: {input: input},
        // });
        convertedInput = {
          ...input,
          shiftStart: convertTimeToAWSTime(input.shiftStart, userTimezone),
          shiftEnd: convertTimeToAWSTime(input.shiftEnd, userTimezone),
          date: convertDateTimeToAWSDateTime(
            input.date + "T" + input.shiftStart,
            userTimezone
          ).split("T")[0],

          shiftStartDT: utcStartDatetime,
          shiftEndDT: utcEndDatetime,
        };
      } else {
        convertedInput = {
          ...input,
        };
      }

      const sanitizedInput = JSON.parse(JSON.stringify(convertedInput)); // Deep copy

      if (sanitizedInput?.incentives) {
        delete sanitizedInput.incentives.__typename;
      }

      // convertedInput
      console.log(
        "🚀 ~ file: index.js:292 ~ useUpdateShift ~ convertedInput:",
        sanitizedInput
      );

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

const convertToAWSDate = (dateStr) => {
  const awsDateFormat = "YYYY-MM-DD";
  return moment(dateStr, "dddd, M/D/YYYY").format(awsDateFormat);
};

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
  const filter = {
    // _deleted: { ne: true },
    // isArchive: { ne: true },
    ...(facilityID && { facilityID: { eq: facilityID } }),
    ...(role && { roleRequired: { eq: role } }),
    // ...(date && { date: { eq: date } }),
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

  // const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // console.log("🚀 ~ file: index.js:208 ~ filter:", filter);
  const { data, loading, error, refetch } = useQuery(gql(listShiftsCustom), {
    variables: {
      filter: filter,
    },
    pollInterval: 5000,
  });

  if (loading) {
    console.log("Loading...");
    return { loading, error, shifts: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, shifts: [] };
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    // getMonth returns month index starting from 0 (January) to 11 (December)
    // so we add 1 to get the correct month number
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // console.log("listShifts Data received!", data);

  // const shifts = data ? data?.listShifts?.items : [];
  const shifts = data
    ? data?.listShifts?.items
        .map((shift) => {
          // console.log("== > BEFORE", shift, userTimezone);

          const temp = {
            ...shift,
          };

          const localizedStartDT = moment
            .tz(temp?.shiftStartDT, "UTC")
            .tz(userTimezone)
            .format("YYYY-MM-DDTHH:mm:ss.SSS");

          const localizedEndDT = moment
            .tz(temp?.shiftEndDT, "UTC")
            .tz(userTimezone)
            .format("YYYY-MM-DDTHH:mm:ss.SSS");

          // // // FIXME: Investigate why removing this fixes my issues
          temp.date = localizedStartDT.split("T")[0];
          // console.log("🚀 ~ file: index.js:438 temp.date:", temp.date, date);

          temp.shiftStart = localizedStartDT?.split("T")[1];
          temp.shiftEnd = localizedEndDT?.split("T")[1];

          // console.log("== > AFTER", temp?.date, temp?.shiftStart, temp?.shiftEnd);
          // console.log("== > AFTERHOURS", localizedStartDT, localizedEndDT);

          return temp;
        })
        .filter((obj) => (date ? obj.date === formatDate(date) : true))
    : [];

  return { shifts, loading, error, refetch };
};

// import { gql, useApolloClient, useQuery } from "@apollo/client";

export const useListMarketplace = (facilityID, role, date) => {
  // Calculate the cutoff date (2 days before the current date)
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 2);
  const cutoffDate = currentDate.toISOString().split("T")[0];

  const filter = {
    _deleted: { ne: true },
    // date: date ? { eq: date } : { gte: cutoffDate },
    ...(date && { date: { eq: date } }),
    numOfPositions: { ne: "0" },
    ...(facilityID && { facilityID: { eq: facilityID } }),
    ...(role && { roleRequired: { eq: role } }),
  };

  const { data, loading, error, refetch } = useQuery(gql(listShiftsCustom), {
    variables: {
      filter,
    },
    pollInterval: 5000,
  });

  const client = useApolloClient();

  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShiftsAndFacilities = async () => {
      if (data) {
        const shiftsData = data.listShifts.items.filter(
          (element) => element._deleted !== true
        );

        const fetchFacilitiesPromises = shiftsData.map((shift) =>
          client.query({
            query: gql(getFacility),
            variables: { id: shift.facilityID },
            // fetchPolicy: "cache-first",
          })
        );

        const facilitiesData = await Promise.all(fetchFacilitiesPromises);

        const enrichedShifts = shiftsData.map((shift, index) => ({
          ...shift,
          facility: facilitiesData[index]?.data?.getFacility,
        }));

        const shifts = enrichedShifts
          ? enrichedShifts?.map((shift) => {
              // console.log('== > BEFORE', shift, userTimezone);
              const localizedStartDT = moment
                .tz(shift?.shiftStartDT, "UTC")
                .tz(userTimezone)
                .format("YYYY-MM-DDTHH:mm:ss.SSS");

              const localizedEndDT = moment
                .tz(shift?.shiftEndDT, "UTC")
                .tz(userTimezone)
                .format("YYYY-MM-DDTHH:mm:ss.SSS");

              // Convert AWS times and dates to local
              const temp = { ...shift };

              temp.date = localizedStartDT.split("T")[0];

              temp.shiftStart = localizedStartDT?.split("T")[1];
              temp.shiftEnd = localizedEndDT?.split("T")[1];

              temp.shiftStartDT = localizedStartDT;
              temp.shiftEndDT = localizedEndDT;

              return temp;
            })
          : [];

        setShifts(shifts);
        // setShifts(enrichedShifts);
      }
    };

    fetchShiftsAndFacilities();
  }, [data]);

  if (loading) {
    console.log("Loading...");
    return { loading, error, shifts: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, shifts: [] };
  }

  return { shifts, loading, error, refetch };
};

export const useListMarketplaceCount = () => {
  const { data, loading, error, refetch } = useQuery(gql(listShifts), {
    variables: {
      filter: {
        _deleted: { ne: true },
      },
      // sortDirection: "DESC",
      // sort: "createdAt",
    },
  });

  const [shifts, setShifts] = useState([]);
  const [shiftsCount, setShiftsCount] = useState(0); // Add this line to keep track of the count

  const fetchShiftsAndFacilities = async (triggerRefetch) => {
    if (data) {
      const shiftsData = data.listShifts.items.filter(
        (element) => element._deleted !== true
      );
      setShifts(shiftsData);
      setShiftsCount(shiftsData.length); // Update the count here
    }
  };

  useEffect(() => {
    fetchShiftsAndFacilities();
  }, [data]);

  if (loading) {
    // console.log('Loading...');
    return { loading, error, shifts: [], shiftsCount: 0 }; // Include shiftsCount here
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, shifts: [], shiftsCount: 0 }; // Include shiftsCount here
  }

  return {
    shifts,
    shiftsCount,
    loading,
    error,
    refetch,
    fetchShiftsAndFacilities,
  }; // Include shiftsCount here
};
