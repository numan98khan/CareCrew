import { useState, useEffect, useCallback } from "react";
import {
  gql,
  useQuery,
  useMutation,
  useApolloClient,
  useSubscription,
} from "@apollo/client";
import {
  listTimecards,
  getShifts,
  getFacility,
  getPeople,
  getTimecard,
} from "../../graphql/queries";
import {
  createTimecard,
  deleteTimecard,
  updateTimecard,
} from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

import { useCreateNotification } from "../notifications";
import { SHIFT_ASSIGNMENT } from "../../constants/notificationTypes";
import {
  convertAWSDateTimeToLocal,
  convertAWSTimeToLocalTime,
  convertDateTimeToAWSDateTime,
  convertDateToAWSDate,
} from "../../services/micro";

import moment from "moment";
import { userTimezone } from "../timezone";
import {
  onCreateTimecard,
  onDeleteTimecard,
  onUpdateTimecard,
} from "../../graphql/subscriptions";

const getExistingTimecard = `query GetTimecards($peopleID: String!, $shiftDetails: String!) {
  timecards(peopleID: $peopleID, shiftDetails: $shiftDetails) {
    id
    peopleID
    shiftDetails
    // Add other fields you need
  }
}`;

// // createTimecard mutation hook

// export const useCreateTimecard = () => {
//   const [createTimecardMutation, { data, loading, error }] = useMutation(
//     gql(createTimecard)
//   );

//   // Use the useCreateNotification hook
//   const { createNotificationQuery } = useCreateNotification();

//   const createTimecardQuery = async (input, peopleID, facilityName) => {
//     try {
//       const { data } = await createTimecardMutation({
//         variables: { input: input },
//       });

//       const notificationInput = {
//         // TODO: investigate if there is a difference
//         // peopleID: people.find((person) => person.id === employeeId)?.id,
//         peopleID: peopleID,
//         type: SHIFT_ASSIGNMENT, // Replace with the appropriate type
//         subject: "Shift Assignment",
//         body: `Shift assignment for ${facilityName} has been created`,
//         // Add other required fields for the notification here
//       };
//       const receiverPeople = [data.createTimecard.peopleID];
//       await createNotificationQuery(notificationInput, receiverPeople);

//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   return { createTimecardQuery, data, loading, error };
// };

// import { useApolloClient, useMutation, gql } from '@apollo/client';
// import { useCreateNotification } from './useCreateNotification'; // import your custom hook

export const useDeleteTimecard = () => {
  const [deleteTimecardMutation, { data, loading, error }] = useMutation(
    gql(deleteTimecard)
  );

  const client = useApolloClient();

  const deleteTimecardQuery = async (input) => {
    try {
      const { data } = await deleteTimecardMutation({
        variables: { input: input },
      });
      // Optionally send a notification or do something else here
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { deleteTimecardQuery, data, loading, error };
};

export const useCreateTimecard = () => {
  const [createTimecardMutation, { data, loading, error }] = useMutation(
    gql(createTimecard) // your createTimecard mutation
  );
  const { createNotificationQuery } = useCreateNotification();
  const client = useApolloClient();

  const createTimecardQuery = async (input, peopleID, facilityName) => {
    const filters = {
      _deleted: { ne: true },
      // date: { eq: input.date },
    };

    if (input?.date) {
      filters.date = { eq: input?.date };
    }

    if (peopleID) {
      filters.peopleID = { eq: peopleID };
    }

    try {
      const { data: newTimecardData } = await createTimecardMutation({
        variables: { input: input },
      });

      // const notificationInput = {
      //   peopleID: newTimecardData.createTimecard.peopleID, //peopleID,
      //   type: "SHIFT_ASSIGNMENT", // Replace with the appropriate type
      //   subject: "Shift Assignment",
      //   body: `Shift assignment for ${facilityName} has been created`,
      // };

      // // const receiverPeople = [newTimecardData.createTimecard.peopleID];
      // const receiverPeople = [];
      // await createNotificationQuery(notificationInput, receiverPeople);

      return newTimecardData;
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:182 ~ createTimecardQuery ~ error:",
        error
      );

      throw error;
    }
  };

  return { createTimecardQuery, data, loading, error };
};

export const useCreateTimecard_V1 = () => {
  const [createTimecardMutation, { data, loading, error }] = useMutation(
    gql(createTimecard) // your createTimecard mutation
  );
  const { createNotificationQuery } = useCreateNotification();
  const client = useApolloClient();

  const createTimecardQuery = async (input, peopleID, facilityName) => {
    const filters = {
      _deleted: { ne: true },
      // date: { eq: input.date },
    };

    if (input?.date) {
      filters.date = { eq: input?.date };
    }

    if (peopleID) {
      filters.peopleID = { eq: peopleID };
    }

    const exitingFilters = {
      _deleted: { ne: true },
      peopleID: { eq: peopleID },
    };
    console.log(
      "🚀 ~ file: index.js:73 ~ createTimecardQuery ~ input FILTERS:",
      filters,
      input
    );
    try {
      // Query existing timecards using Apollo client
      const { data: existingTimecardsData } = await client.query({
        query: gql(listTimecards),
        variables: {
          filter: exitingFilters,
        },
        fetchPolicy: "network-only",
      });
      // console.log(
      //   "🚀 ~ file: index.js:82 ~ createTimecardQuery ~ existingTimecardsData:",
      //   existingTimecardsData
      // );

      // // return 0;
      // console.log(
      //   "Existing timecards",
      //   peopleID,
      //   existingTimecardsData?.listTimecards?.items?.filter(
      //     (obj) => obj.shiftsID === input.shiftsID && !obj.isCallOff
      //   )?.length
      // );

      if (
        existingTimecardsData?.listTimecards?.items?.filter(
          (obj) => obj.shiftsID === input.shiftsID && !obj.isCallOff
        )?.length > 0
      ) {
        // Timecard already exists, don't create a new one
        // throw new Error("Timecard for this shift already exists.");
        return "Timecard for this shift already exists.";
      } else {
        // Create a new timecard
        const { data: newTimecardData } = await createTimecardMutation({
          variables: { input: input },
        });

        const notificationInput = {
          peopleID: newTimecardData.createTimecard.peopleID, //peopleID,
          type: "SHIFT_ASSIGNMENT", // Replace with the appropriate type
          subject: "Shift Assignment",
          body: `Shift assignment for ${facilityName} has been created`,
        };

        // const receiverPeople = [newTimecardData.createTimecard.peopleID];
        const receiverPeople = [];
        await createNotificationQuery(notificationInput, receiverPeople);

        return newTimecardData;
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js:182 ~ createTimecardQuery ~ error:",
        error
      );

      throw error;
    }
  };

  return { createTimecardQuery, data, loading, error };
};

// LIST_TIMECARDS query hook
export const useListTimecards = (peopleID) => {
  let filterObject = {};
  filterObject.filter = {};

  filterObject.filter._deleted = { ne: true };
  // filterObject.filter.clockOutTime = { eq: null };

  if (peopleID) {
    filterObject.filter.peopleID = { eq: peopleID };
  }

  // console.log(
  //   "🚀 ~ file: index.js:177 ~ useListTimecards ~ filterObject:",
  //   filterObject
  // );

  // const { data, loading, error, refetch } = useQuery(gql(listTimecards));
  const { data, loading, error, refetch } = useQuery(gql(listTimecards), {
    variables: filterObject,
    pollInterval: 5000,
  });

  if (loading) {
    console.log("Loading...");
    return { loading, error, timecards: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, timecards: [] };
  }

  // console.log("listTimecards Data received!", data);

  // const timecards = data
  //   ? data.listTimecards.items.filter((element) => element._deleted !== true)
  //   : [];

  // const userTimezone = userTimezone;

  const timecards = data
    ? data.listTimecards.items.map((timecard, index) => {
        return {
          ...timecard,
          date: timecard.clockInTime
            ? convertAWSDateTimeToLocal(
                timecard.clockInTime,
                userTimezone
              ).split("T")[0]
            : timecard?.date,

          clockInTime: timecard.clockInTime
            ? convertAWSDateTimeToLocal(timecard.clockInTime, userTimezone)
            : null,
          clockOutTime: timecard.clockOutTime
            ? convertAWSDateTimeToLocal(timecard.clockOutTime, userTimezone)
            : null,
        };
      })
    : [];

  return { timecards, loading, error, refetch };
};

// import { getShifts, getFacility } from 'path-to-graphql-queries';  // replace with actual path
// import { gql } from '@apollo/client';

// import { useEffect, useState } from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { API, graphqlOperation } from 'aws-amplify';
// import { listTimecards } from './graphql/queries'; // replace with actual path
// import { getShifts, getFacility } from 'path-to-graphql-queries'; // replace with actual path

const extractDateRange = (inputDate) => {
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months are zero-based
    let dd = date.getDate();

    mm = mm < 10 ? "0" + mm : mm;
    dd = dd < 10 ? "0" + dd : dd;

    return `${yyyy}-${mm}-${dd}`;
  };

  const today = inputDate;
  const previousDay = new Date(today);
  previousDay.setDate(today.getDate() - 1);

  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  return {
    previous: formatDate(previousDay),
    current: formatDate(today),
    next: formatDate(nextDay),
  };
};

export const useListUpcomingTimecards = (
  peopleId,
  isGetPeople = false,
  date,
  cuttoffDatetime
) => {
  let filterObject = {};
  filterObject.filter = {};

  filterObject.filter._deleted = { ne: true };

  if (peopleId) {
    filterObject.filter.peopleID = { eq: peopleId };
  }

  if (date) {
    const dateRange = extractDateRange(date);
    filterObject.filter.date = {
      between: [dateRange?.previous, dateRange?.next],
    };
  }

  // console.log("🚀 ~ file: index.js:368 ~ filterObject:", filterObject);

  const client = useApolloClient(); // Use Apollo client

  const { data, loading, error, refetch } = useQuery(gql(listTimecards), {
    variables: {
      filter: filterObject.filter,
      sortDirection: "DESC",
      sort: "date",
    },
    pollInterval: 5000,
  });

  const [timecards, setTimecards] = useState([]);
  const [existingData, setExistingData] = useState(null);

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { data: createdData } = useSubscription(gql(onCreateTimecard));
  const { data: deletedData } = useSubscription(gql(onDeleteTimecard));
  const { data: updatedData } = useSubscription(gql(onUpdateTimecard));

  const fetchPrecursorData = async (timecardsData) => {
    const getShiftsMinimal = /* GraphQL */ `
      query GetShifts($id: ID!) {
        getShifts(id: $id) {
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
          incentives {
            incentiveBy
            incentiveType
            incentiveAmount
            notes
            __typename
          }
          cancellationGuarantee
          isAssigned
          isIncentive
          isGuarantee
          isLate
          isCallOff
          isSelected
          isHoliday
          recurringSchedule
          facilityID
          hide
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
      }
    `;

    const getPeopleMinimal = /* GraphQL */ `
      query GetPeople($id: ID!) {
        getPeople(id: $id) {
          id
          surrogateID
          firstName
          lastName
          phoneNumber
          documents {
            name
            key
            __typename
          }
          country
          streetAddress
          city
          state
          zip
          timezone
          profilePicture
          role
          status
          payrollCycle
          email
          points
          rating
          position
          isTerminated
          permissions
          type
          availability
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
      }
    `;

    const getFacilityMinimal = /* GraphQL */ `
      query GetFacility($id: ID!) {
        getFacility(id: $id) {
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
            firstName
            lastName
            phone
            email
            position
            __typename
          }
          email
          permissions
          lat
          lng
          floors {
            floorNumber
            __typename
          }
          documents {
            name
            key
            __typename
          }
          Billing {
            id
            allowOvertime
            maxBillingMonthly
            hourlyRate
            hourlyRateCNA
            hourlyRateLPN
            hourlyRateRN
            weekendHourlyRate
            holidayHourlyRate
            maxMonthlyIncentive
            maxHourlyIncentive
            maxFixedIncentive
            billingEmail
            invoiceDelivery
            invoiceFrequency
            topUpPercentage
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          facilityBillingId
          __typename
        }
      }
    `;
    const fetchShiftsPromises = timecardsData.map((timecard) =>
      client.query({
        // Use Apollo client query
        query: gql(getShiftsMinimal),
        variables: { id: timecard.shiftsID },
        fetchPolicy: "network-only", // adjust according to your needs
      })
    );

    let peopleData = [];
    if (isGetPeople) {
      const fetchPeoplePromises = timecardsData.map((timecard) =>
        client.query({
          // Use Apollo client query
          query: gql(getPeopleMinimal),
          variables: { id: timecard.peopleID },
          fetchPolicy: "cache-first", // adjust according to your needs
        })
      );

      peopleData = await Promise.all(fetchPeoplePromises);
    }

    const shiftsData = await Promise.all(fetchShiftsPromises);
    const fetchFacilitiesPromises = shiftsData.map((shiftResponse) => {
      const shift = shiftResponse.data.getShifts;
      return client.query({
        // Use Apollo client query
        query: gql(getFacilityMinimal),
        variables: { id: shift?.facilityID || "-1" },
        fetchPolicy: "cache-first", // adjust according to your needs
      });
    });

    const facilitiesData = await Promise.all(fetchFacilitiesPromises);
    const shiftsDataParsed = shiftsData.map((obj) => obj?.data?.getShifts);

    return { peopleData, facilitiesData, shiftsDataParsed };
  };

  const findShift = (timecard, shiftsDataParsed) => {
    return shiftsDataParsed?.find((obj) => obj?.id === timecard?.shiftsID);
  };

  const isShiftAfterCurrentDate = (shift) => {
    // // Get the current date and time in the local timezone
    // const currentLocalDateTime = moment.tz(userTimezone);

    // Get the current date and time in the local timezone
    const currentLocalDateTime = moment.tz(userTimezone).subtract(1, "days");

    // Convert the shift start date and time to the local timezone
    const shiftStartLocalDateTime = moment.tz(
      // shift?.shiftStartDT,
      shift?.shiftEndDT,
      userTimezone
    );

    // Compare the exact datetime timestamps
    return shiftStartLocalDateTime.isAfter(currentLocalDateTime);
    // return true;
  };

  const isShiftAfterCurrentDate_V1 = (shift) => {
    // Get the current date and time in the local timezone
    const currentLocalDateTime = moment.tz(userTimezone);

    // Calculate a week after the current date and time in the local timezone
    const oneWeekLater = moment.tz(userTimezone).add(1, "week");

    // Convert the shift start date and time to the local timezone
    const shiftStartLocalDateTime = moment.tz(
      shift?.shiftStartDT,
      userTimezone
    );
    // Convert the shift start date and time to the local timezone
    const shiftEndLocalDateTime = moment.tz(shift?.shiftEndDT, userTimezone);

    // Check if the shift start date is after the current date and before the date a week later
    // return (
    //   shiftStartLocalDateTime.isAfter(currentLocalDateTime) &&
    //   currentLocalDateTime.isBefore(oneWeekLater)
    // );
    return true;
  };

  const convertDateTimeToLocal = (dateTime, userTimezone) => {
    return convertAWSDateTimeToLocal(dateTime, userTimezone).split("T")[0];
  };

  const convertTimeToLocal = (time, userTimezone) => {
    return convertAWSTimeToLocalTime(time, userTimezone);
  };

  const formatShiftDateTime = (dateTime, userTimezone) => {
    return moment
      .tz(dateTime, "UTC")
      .tz(userTimezone)
      .format("YYYY-MM-DDTHH:mm:ss.SSS");
  };

  const fetchShiftsAndFacilities = useCallback(async () => {
    if (loading) {
      setExistingData(null);
    }
    if (
      data?.listTimecards?.items &&
      !loading &&
      JSON.stringify(data?.listTimecards?.items) !==
        JSON.stringify(existingData)
    ) {
      console.log(
        "🚀 ~ file: index.js:641 ~ fetchShiftsAndFacilities ~ data?.listTimecards?.items:",
        data?.listTimecards?.items?.map((obj) => obj?.id)
      );
      setExistingData(data?.listTimecards?.items);
      const timecardsData = data.listTimecards.items;
      const { peopleData, facilitiesData, shiftsDataParsed } =
        await fetchPrecursorData(timecardsData);

      // ... rest of your code to process and set timecards
      const enrichedTimecards = timecardsData
        .map((timecard, index) => {
          const shift = findShift(timecard, shiftsDataParsed);
          // console.log(
          //   '🚀 ~ file: index.js:668 ~ .map ~ shift:',
          //   shift?.id,
          //   shift?.shiftStartDT,
          //   isShiftAfterCurrentDate(shift),
          // );

          if (
            shift &&
            isShiftAfterCurrentDate(shift) &&
            facilitiesData[index]?.data?.getFacility?._deleted !== true
          ) {
            return {
              ...timecard,
              date: timecard.clockInTime
                ? convertDateTimeToLocal(timecard.clockInTime, userTimezone)
                : timecard?.date,
              // clockInTime: timecard.clockInTime
              //   ? convertDateTimeToLocal(timecard.clockInTime, userTimezone)
              //   : null,
              // clockOutTime: timecard.clockOutTime
              //   ? convertDateTimeToLocal(timecard.clockOutTime, userTimezone)
              //   : null,
              shift: {
                ...shift,
                date: convertDateTimeToLocal(
                  shift.date + "T" + shift.shiftStart,
                  userTimezone
                ),
                shiftStart: convertTimeToLocal(shift.shiftStart, userTimezone),
                shiftEnd: convertTimeToLocal(shift.shiftEnd, userTimezone),
                shiftStartDT: formatShiftDateTime(
                  shift?.shiftStartDT,
                  userTimezone
                ),
                shiftEndDT: formatShiftDateTime(
                  shift?.shiftEndDT,
                  userTimezone
                ),
              },
              person: isGetPeople ? peopleData[index]?.data?.getPeople : null,
              facility: facilitiesData[index]?.data?.getFacility,
            };
          } else {
            return null;
          }
        })
        .filter((obj) => obj !== null);

      setTimecards(enrichedTimecards);
    }
  }, [data, loading, fetchPrecursorData]);

  const refetchUpcomingTimecards = async () => {
    await refetch();
    setExistingData(null);
  };

  useEffect(() => {
    fetchShiftsAndFacilities();
  }, [data, refetch, date, fetchShiftsAndFacilities]);

  useEffect(() => {
    if (createdData) {
      console.log("TIMECARD CREATED");
      refetch();
    }

    if (deletedData) {
      console.log("TIMECARD DELETED");
      refetch();
    }

    if (updatedData) {
      console.log("TIMECARD UPDATED");
      refetch();
    }
  }, [data, createdData, deletedData, updatedData]);

  if (loading) {
    console.log("Loading...");
    return { loading, error, timecards: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, timecards: [] };
  }

  return { timecards, loading, error, refetch, refetchUpcomingTimecards };
};

export const useListUpcomingTimecards_V2 = (
  peopleId,
  isGetPeople = false,
  date
) => {
  let filterObject = {};
  filterObject.filter = {};

  if (peopleId) {
    filterObject.filter.peopleID = { eq: peopleId };
  }

  filterObject.filter._deleted = { ne: true };

  if (date) {
    // console.log("🚀 ~ file: index.js:256 ~ date:", date);
    // const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const serverDate = date
    //   ? convertDateToAWSDate(date, userTimezone)
    //   : undefined;
    // filterObject.filter.date = { eq: serverDate };

    const dateRange = extractDateRange(date);
    // console.log(dateRange); // { previous: '2023-01-02', current: '2023-01-03', next: '2023-01-04' }

    filterObject.filter.date = {
      between: [dateRange?.previous, dateRange?.next],
    };
  }

  // filterObject.filter.hide = { ne: true };

  // const getFacility = /* GraphQL */ `
  //   query GetFacility($id: ID!) {
  //     getFacility(id: $id) {
  //       id
  //       FacilityPeople {
  //         items {
  //           id
  //           facilityId
  //           peopleId
  //           createdAt
  //           updatedAt
  //           _version
  //           _deleted
  //           _lastChangedAt
  //           __typename
  //         }
  //         nextToken
  //         startedAt
  //         __typename
  //       }
  //       imgSrc
  //       facilityName
  //       streetAddress
  //       country
  //       city
  //       email
  //       lat
  //       lng
  //     }
  //   }
  // `;

  const client = useApolloClient(); // Use Apollo client

  const { data, loading, error, refetch } = useQuery(gql(listTimecards), {
    variables: {
      filter: filterObject.filter,
      sortDirection: "DESC",
      sort: "createdAt",
    },
    pollInterval: 5000,
  });

  const [timecards, setTimecards] = useState([]);

  // const userTimezone = userTimezone;

  useEffect(() => {
    const fetchShiftsAndFacilities = async () => {
      if (data) {
        const timecardsData = data.listTimecards.items.filter(
          (element) => element._deleted !== true
        );
        // console.log(
        //   "🚀 ~ file: index.js:132 ~ fetchShiftsAndFacilities ~ timecardsData:",
        //   timecardsData,
        //   data
        // );

        const fetchShiftsPromises = timecardsData.map((timecard) =>
          client.query({
            // Use Apollo client query
            query: gql(getShifts),
            variables: { id: timecard.shiftsID },
            // fetchPolicy: "cache-first", // adjust according to your needs
          })
        );

        let peopleData = [];
        if (isGetPeople) {
          const fetchPeoplePromises = timecardsData.map((timecard) =>
            client.query({
              // Use Apollo client query
              query: gql(getPeople),
              variables: { id: timecard.peopleID },
              // fetchPolicy: "cache-first", // adjust according to your needs
            })
          );

          peopleData = await Promise.all(fetchPeoplePromises);
        }

        const shiftsData = await Promise.all(fetchShiftsPromises);
        const fetchFacilitiesPromises = shiftsData.map((shiftResponse) => {
          const shift = shiftResponse.data.getShifts;
          // console.log(
          //   "🚀 ~ file: index.js:261 ~ fetchFacilitiesPromises ~ shift:",
          //   shift
          // );

          return client.query({
            // Use Apollo client query
            query: gql(getFacility),
            variables: { id: shift?.facilityID || "-1" },
            // fetchPolicy: "cache-first", // adjust according to your needs
          });
        });

        const facilitiesData = await Promise.all(fetchFacilitiesPromises);

        const shiftsDataParsed = shiftsData.map((obj) => obj?.data?.getShifts);
        // console.log(
        //   "🚀 ~ file: index.js:413 ~ fetchShiftsAndFacilities ~ shiftsDataParsed:",
        //   shiftsDataParsed
        // );

        const enrichedTimecards = timecardsData
          .map((timecard, index) => {
            // const shift = shiftsData[index]?.data?.getShifts;
            const shift = shiftsDataParsed?.find(
              (obj) => obj?.id === timecard?.shiftsID
            );

            // console.log(
            //   "🚀 ~ file: index.js:406 ~ enrichedTimecards ~ shift:",
            //   shift,
            //   timecard?.shiftsID,
            //   shiftsDataParsed,
            //   shiftsDataParsed.map((obj) => obj?.id)
            // );

            // console.log(
            //   "🚀 ~ file: index.js:332 ~ enrichedTimecards ~ timecard.clockInTime:",
            //   timecard.clockInTime
            //     ? convertAWSDateTimeToLocal(timecard.clockInTime, userTimezone)
            //     : null
            // );

            if (shift) {
              return {
                ...timecard,
                date: timecard.clockInTime
                  ? convertAWSDateTimeToLocal(
                      timecard.clockInTime,
                      userTimezone
                    ).split("T")[0]
                  : timecard?.date,

                clockInTime: timecard.clockInTime
                  ? convertAWSDateTimeToLocal(
                      timecard.clockInTime,
                      userTimezone
                    )
                  : null,
                clockOutTime: timecard.clockOutTime
                  ? convertAWSDateTimeToLocal(
                      timecard.clockOutTime,
                      userTimezone
                    )
                  : null,

                // temp.shiftEnd = convertAWSTimeToLocalTime(shift.shiftEnd, userTimezone);
                shift: {
                  ...shift,
                  date: convertAWSDateTimeToLocal(
                    shift.date + "T" + shift.shiftStart,
                    userTimezone
                  ).split("T")[0],
                  shiftStart: convertAWSTimeToLocalTime(
                    shift.shiftStart,
                    userTimezone
                  ),
                  shiftEnd: convertAWSTimeToLocalTime(
                    shift.shiftEnd,
                    userTimezone
                  ),
                  shiftStartDT: moment
                    .tz(shift?.shiftStartDT, "UTC")
                    .tz(userTimezone)
                    .format("YYYY-MM-DDTHH:mm:ss.SSS"),
                  shiftEndDT: moment
                    .tz(shift?.shiftEndDT, "UTC")
                    .tz(userTimezone)
                    .format("YYYY-MM-DDTHH:mm:ss.SSS"),
                },
                person: isGetPeople ? peopleData[index]?.data?.getPeople : null,
                facility: facilitiesData[index]?.data?.getFacility,
              };
            } else {
              return null;
            }
            // return {
            //   ...timecard,
            //   shift: shiftsData[index]?.data?.getShifts,
            //   person: isGetPeople ? peopleData[index]?.data?.getPeople : null,
            //   facility: facilitiesData[index]?.data?.getFacility,
            // };
          })
          .filter((obj) => obj !== null);

        setTimecards(enrichedTimecards);
      }
    };

    fetchShiftsAndFacilities();
  }, [data]);

  if (loading) {
    console.log("Loading...");
    return { loading, error, timecards: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, timecards: [] };
  }

  return { timecards, loading, error, refetch };
};

export const useUpdateTimecard = () => {
  const [updateTimecardMutation, { data, loading, error }] = useMutation(
    gql(updateTimecard)
  );

  // const userTimezone = userTimezone;

  const updateTimecardQuery = async (input) => {
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
      if (input.date) {
        convertedInput.date = convertDateTimeToAWSDateTime(
          input.date,
          userTimezone
        );
      }
      const { data } = await updateTimecardMutation({
        variables: { input: convertedInput },
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  return { updateTimecardQuery, data, loading, error };
};

// export const useListUpcomingTimecards = (peopleId) => {
//   const { data, loading, error, refetch } = useQuery(gql(listTimecards), {
//     variables: {
//       filter: { peopleID: { eq: peopleId } }, // peopleId is used inside filter
//       limit: 10, // You may adjust the limit as needed
//     },
//   });

//   if (loading) {
//     console.log("Loading...");
//     return { loading, error, timecards: [] };
//   }

//   if (error) {
//     console.error("Error!", error);
//     return { loading, error, timecards: [] };
//   }

//   // console.log("listTimecards Data received!", data);

//   const timecards = data
//     ? data.listTimecards.items.filter((element) => element._deleted !== true)
//     : [];

//   return { timecards, loading, error, refetch };
// };
