import moment from "moment";
import {
  getAccountLimitsLookup,
  getBilling,
  listAccountLimitsLookups,
  listTimecards,
} from "../../graphql/queries";
import {
  ErrorToast,
  SuccessToast,
  displayDate,
  displayTime,
  hasPermission,
} from "../micro";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { userTimezone } from "../../apolloql/timezone";
import {
  externalNotificationToInstacare,
  externalNotificationToPeople,
  inAppNotificationsToFacilityPeople,
  inAppNotificationsToPeople,
  inApplNotificationToInstacare,
  sendNotificationsToFacilityPeople,
} from "./reporting";
import {
  FACILITY_CANCELLATION,
  SHIFT_ASSIGNMENT,
  SHIFT_PICKUP,
} from "../../constants/notificationTypes";
import {
  createAccountLimitsLookup,
  updateAccountLimitsLookup,
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

const getShifts = /* GraphQL */ `
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
      isHoliday
      facilityID
      incentives {
        incentiveBy
        incentiveType
        incentiveAmount
        notes
        __typename
      }
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

export const getFacility = /* GraphQL */ `
  query GetFacility($id: ID!) {
    getFacility(id: $id) {
      id
      facilityName
      lat
      lng
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

const listAssignedTimecards = `
query ListTimecardsForUserInDateRange($userId: ID!, $startDate: String!, $endDate: String!) {
  listTimecards(filter: { 
    userId: { eq: $userId },
    date: { between: [$startDate, $endDate] }
  }) {
    items {
      id
      date
      clockInTime
      clockOutTime
    }
  }
}`;

// const getWeekDateRange = (date) => {
//   const targetDate = new Date(date);
//   const dayOfWeek = targetDate.getDay();
//   const firstDayOfWeek = new Date(
//     targetDate.setDate(targetDate.getDate() - dayOfWeek + 1)
//   ); // Monday
//   const lastDayOfWeek = new Date(targetDate.setDate(targetDate.getDate() + 6)); // Sunday

//   return {
//     startDate: firstDayOfWeek.toISOString().split("T")[0],
//     endDate: lastDayOfWeek.toISOString().split("T")[0],
//   };
// };

const getWeekDateRange = (date) => {
  const targetDate = new Date(date);
  const dayOfWeek = targetDate.getDay();
  const firstDayOfWeek = new Date(
    targetDate.setDate(targetDate.getDate() - dayOfWeek + 1)
  ); // Monday - 2 days

  let dateList = [];
  for (let i = 0; i < 7; i++) {
    // 7 days in a week + 2 additional days
    const currentDate = new Date(firstDayOfWeek);
    currentDate.setDate(firstDayOfWeek.getDate() + i);
    dateList.push(currentDate.toISOString().split("T")[0]);
  }

  return dateList;
};

// const getWeekDateRangeExpanded = (date) => {
//   const targetDate = new Date(date);
//   const dayOfWeek = targetDate.getDay();

//   // Since JavaScript's `getDay()` returns 0 for Sunday and 1 for Monday,
//   // Adjust for Sunday, making Sunday the end of the week instead of the beginning
//   const offset = dayOfWeek === 0 ? -6 : 1; // If it's Sunday, offset by -6, else offset by 1

//   const firstDayOfWeek = new Date(
//     targetDate.setDate(targetDate.getDate() - dayOfWeek + offset)
//   ); // Monday
//   // Clone the date to prevent cumulative date adjustments
//   const lastDayOfWeek = new Date(
//     new Date(targetDate).setDate(targetDate.getDate() + 6)
//   ); // Sunday

//   return {
//     startDateExpanded: firstDayOfWeek.toISOString().split("T")[0],
//     endDateExpanded: lastDayOfWeek.toISOString().split("T")[0],
//   };
// };
// const getWeekDateRangeExpanded = (dateString) => {
//   // Parse the date string to a Date object in UTC
//   const targetDate = new Date(dateString);

//   // Get the day of the week in local time (0 for Sunday, 1 for Monday, etc.)
//   const dayOfWeek = targetDate.getDay();

//   // Calculate the offset to adjust the date to the past Monday in local time
//   const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

//   // Adjust the target date to the previous Monday in local time
//   targetDate.setDate(targetDate.getDate() + offset);

//   // The start date is now set to Monday in local time
//   const startDate = new Date(targetDate);

//   // To find the end date (Sunday), we add 6 days to the start date in local time
//   const endDate = new Date(startDate);
//   endDate.setDate(startDate.getDate() + 6);
//   return {
//     startDateExpanded: startDate.toISOString(), //.split("T")[0], // Format to YYYY-MM-DD
//     endDateExpanded: endDate.toISOString(), //.split("T")[0], // Format to YYYY-MM-DD
//   };
// };

const getWeekDateRangeExpanded = (dateString) => {
  // Parse the date string to a Date object
  const targetDate = new Date(dateString);

  // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
  const dayOfWeek = targetDate.getDay();

  // Calculate the offset to adjust the date to the previous Monday
  const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  // Adjust the target date to the previous Monday
  targetDate.setDate(targetDate.getDate() + offset);

  // Create the start date at the beginning of Monday
  const startDate = new Date(targetDate.setHours(0, 0, 0, 0));

  // Create the end date at the end of Sunday by adding 6 days to the start date
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  return {
    startDateExpanded: startDate.toISOString(),
    endDateExpanded: endDate.toISOString(),
  };
};

const getLastSevenDaysRange = (date) => {
  const targetDate = new Date(date);
  const startDate = new Date(targetDate.setDate(targetDate.getDate() - 6)); // 6 days before the given date
  const endDate = new Date(date); // the given date

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
};

const getHoursWorked = async (shiftData, userid) => {
  const { startDate: startDateExpanded, endDate: endDateExpanded } =
    getLastSevenDaysRange(shiftData.shiftStartDT);

  const timecardFilters = {
    date: {
      between: [startDateExpanded, endDateExpanded],
    },
    peopleID: {
      eq: userid,
    },
    clockInTime: {
      ne: null,
    },
    clockOutTime: {
      ne: null,
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

  const timecards = timecardsData.data.listTimecards.items?.filter(
    (obj) => !obj?.isCallOff
  );

  // Initialize totalHours to 0
  let totalHours = 0;

  // Iterate through each timecard to calculate the total hours worked
  timecards?.forEach((obj) => {
    const clockInTime = new Date(obj.clockInTime);
    const clockOutTime = new Date(obj.clockOutTime);
    const hoursWorked = (clockOutTime - clockInTime) / (1000 * 60 * 60); // Convert milliseconds to hours
    totalHours += hoursWorked;
  });

  console.log("Total hours worked:", totalHours.toFixed(2)); // Log the total hours worked with 2 decimal places

  return totalHours; // Return the total hours worked
};

export const getTimecardsForWeek = async (
  userid,
  weekStartDate,
  weekEndDate
) => {
  // This function fetches all timecards for a user in a specific week.

  const timecardFilters = {
    // date: {
    //   between: [weekStartDate, weekEndDate],
    // },
    desiredClockInTime: {
      between: [weekStartDate, weekEndDate],
    },
    isCallOff: { ne: true },
    peopleID: {
      eq: userid,
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

  // 2. Extract shiftsID values
  const shiftIds = timecards.map((timecard) => timecard.shiftsID);

  const getShiftsClockInTimeOnly = /* GraphQL */ `
    query GetShifts($id: ID!) {
      getShifts(id: $id) {
        id
        shiftStartDT
      }
    }
  `;

  // 3. Fetch associated shifts using shiftsID values
  const shiftPromises = shiftIds.map((shiftId) =>
    API.graphql(graphqlOperation(getShiftsClockInTimeOnly, { id: shiftId }))
  );
  const shiftsResults = await Promise.all(shiftPromises);

  // Extract only the shift data from the results
  const shifts = shiftsResults.map((result) => result.data.getShifts);
  // console.log(
  //   "🚀 ~ file: services.js:286 ~ getTimecardsForWeek ~ shifts:",
  //   shifts
  // );

  // 4. Map the desiredClockInTime of timecards to the shiftStartDT of the corresponding shift
  for (let timecard of timecards) {
    const matchingShift = shifts.find(
      (shift) => shift.id === timecard.shiftsID
    );
    if (matchingShift) {
      timecard.desiredClockInTime = matchingShift.shiftStartDT;
    }
  }

  console.log(
    "🚀 ~ file: services.js:313 ~ getTimecardsForWeek ~ timecards:",
    timecards
  );

  return timecards; // Returns the modified timecards with the desiredClockInTime set
};

const notifyPeople = async (
  userData,
  facilityData,
  shiftData,
  sendBulkMessages,
  createNotificationQuery,
  user,
  isMarketPlaceAssignment
) => {
  const formedMessage_OLD = `Shift was assigned to ${
    userData?.firstName + " " + userData?.lastName
  } at ${facilityData?.facilityName} on ${displayDate(new Date())} for ${
    facilityData?.facilityName
  } ${displayDate(shiftData?.shiftStartDT)}@${displayTime(
    shiftData?.shiftStartDT
  )}-${displayTime(shiftData?.shiftEndDT)}`;

  let formedMessage = isMarketPlaceAssignment
    ? `Subject: Shift Pick-Up\n\nThe following shft has been confirmed by an InstaCarer:\n\nInstaCarer: ${
        userData?.firstName + " " + userData?.lastName
      }\nShift Date: ${displayDate(shiftData?.shiftStartDT)}\nShift Time: ${
        displayTime(shiftData?.shiftStartDT) +
        " - " +
        displayTime(shiftData?.shiftEndDT)
      }\nFacility: ${facilityData?.facilityName}\n\nTimestamp: ${
        displayDate(new Date()?.toISOString()) +
        " " +
        displayTime(new Date()?.toISOString())
      }`
    : `Subject: Shift Assignment\n\nThe following shft has been Assigned:\n\nInstaCarer: ${
        userData?.firstName + " " + userData?.lastName
      }\nShift Date: ${displayDate(shiftData?.shiftStartDT)}\nShift Time: ${
        displayTime(shiftData?.shiftStartDT) +
        " " +
        displayTime(shiftData?.shiftEndDT)
      }\nFacility: ${facilityData?.facilityName}\nInstacare Rate: ${
        shiftData?.rate
      }\n\nTimestamp: ${
        displayDate(new Date()?.toISOString()) +
        " - " +
        displayTime(new Date()?.toISOString())
      }\nBy User: ${user?.attributes?.email}`;

  // START: Send notification on all platforms to instacare
  // INTERNAL
  inAppNotificationsToPeople(
    userData?.id,
    isMarketPlaceAssignment ? SHIFT_PICKUP : SHIFT_ASSIGNMENT,
    isMarketPlaceAssignment ? "Shift was picked up" : "Shift was assigned",
    formedMessage,
    createNotificationQuery
  );
  inApplNotificationToInstacare(
    isMarketPlaceAssignment ? SHIFT_PICKUP : SHIFT_ASSIGNMENT,
    isMarketPlaceAssignment ? "Shift was picked up" : "Shift was assigned",
    formedMessage,
    createNotificationQuery
  );
  inAppNotificationsToFacilityPeople(
    shiftData?.facilityID,
    isMarketPlaceAssignment ? SHIFT_PICKUP : SHIFT_ASSIGNMENT,
    isMarketPlaceAssignment ? "Shift was picked up" : "Shift was assigned",
    formedMessage,
    createNotificationQuery
  );
  // EXTERNAL
  externalNotificationToInstacare(formedMessage, true, false); // Instacare
  sendNotificationsToFacilityPeople(
    facilityData?.id,
    formedMessage,
    true,
    true
  ); // Facility
  externalNotificationToPeople(userData?.id, formedMessage, true, true); // Employee
  // END.

  // const localizedStartDT = moment
  //   .tz(shiftData?.shiftStartDT, "UTC")
  //   .tz(userTimezone)
  //   .format("YYYY-MM-DDTHH:mm:ss.SSS");
  // const localizedEndDT = moment
  //   .tz(shiftData?.shiftEndDT, "UTC")
  //   .tz(userTimezone)
  //   .format("YYYY-MM-DDTHH:mm:ss.SSS");
  // const payload = {
  //   email: {
  //     message: "",
  //     emails: [],
  //   },
  //   text: {
  //     message: `Shift picked up by you at ${
  //       facilityData?.facilityName
  //     } on ${displayDate(localizedStartDT)} from ${displayTime(
  //       localizedStartDT
  //     )} to ${displayTime(localizedEndDT)}`,
  //     phoneNumbers: hasPermission(userData, "Text Message")
  //       ? [userData?.phoneNumber]
  //       : [],
  //   },
  //   app: {
  //     message: "",
  //     userIds: [],
  //   },
  // };
  // // console.log("🚀 ~ file: services.js:277 ~ notifyPeople ~ payload:", payload);
  // sendBulkMessages(payload);
};

// const checkBillingLimits_OLD = async (
//   facilityID,
//   timecardDetails,
//   facilityData,
//   shiftData
// ) => {
//   // console.log("🚀 ~ file: services.js:390 ~ timecardDetails:", shiftData);
//   // return;
//   const date = timecardDetails?.date;
//   const month = date ? date.split("-")[1] : null;
//   const variables = {
//     filter: {
//       facilityID: {
//         eq: facilityID,
//       },
//       month: {
//         eq: month,
//       },
//     },
//   };
//   try {
//     let accLimitData = null;
//     try {
//       accLimitData = (
//         await API.graphql({
//           query: listAccountLimitsLookups,
//           variables: variables,
//         })
//       )?.data?.listAccountLimitsLookups?.items;

//       // console.log(
//       //   "🚀 ~ file: services.js:387 ~ checkBillingLimits ~ accLimitData:",
//       //   accLimitData.length
//       // );
//     } catch (error) {
//       console.log("Error getting getAccountLimitsLookup", error);
//     }

//     if (!accLimitData.length) {
//       for (const attribute of [
//         "remainingBillingMonthly",
//         "remainingMonthlyIncentive",
//       ]) {
//         accLimitData = (
//           await API.graphql(
//             graphqlOperation(createAccountLimitsLookup, {
//               input: {
//                 facilityID: facilityID,
//                 attribute: attribute,
//                 amount: 0,
//                 month: month,
//               },
//             })
//           )
//         )?.data?.getAccountLimitsLookup;

//         accLimitData = (
//           await API.graphql({
//             query: listAccountLimitsLookups,
//             variables: variables,
//           })
//         )?.data?.listAccountLimitsLookups?.items;
//         // console.log(
//         //   "🚀 ~ file: services.js:396 ~ checkBillingLimits ~ accLimitData:",
//         //   accLimitData
//         // );
//       }
//     }

//     const billingData = (
//       await API.graphql(
//         graphqlOperation(getBilling, { id: facilityData?.Billing?.id })
//       )
//     )?.data?.getBilling;
//     // console.log("🚀 ~ file: services.js:450 ~ billingData:", billingData);

//     for (const limitObj of accLimitData) {
//       // console.log("🚀 ~ file: services.js:453 ~ limitObj:", limitObj);

//       if (limitObj?.attribute === "remainingBillingMonthly") {
//         if (
//           limitObj?.amount + shiftData?.rate >
//           billingData?.maxBillingMonthly
//         ) {
//           throw Error(`Limit exceeded for ${limitObj?.attribute}`);
//         }
//       } else if (limitObj?.attribute === "remainingMonthlyIncentive") {
//         if (
//           limitObj?.amount + shiftData?.incentives?.incentiveAmount >
//             billingData?.maxMonthlyIncentive &&
//           shiftData?.incentives?.incentiveBy === "Facility"
//         ) {
//           throw Error(`Limit exceeded for ${limitObj?.attribute}`);
//         }
//       }
//     }

//     if (
//       shiftData?.incentives?.incentiveAmount > billingData?.maxFixedIncentive &&
//       shiftData?.incentives?.incentiveBy === "Facility"
//     ) {
//       throw Error(`Limit exceeded for fixed incentive`);
//     }

//     // return true;
//     return accLimitData;
//   } catch (err) {
//     console.log("🚀 ~ file: services.js:386 ~ checkBillingLimits ~ err:", err);
//     ErrorToast("Error with account limits" + err);
//     // ErrorToast(err);
//     return false;
//   }

//   return true;
// };

const checkBillingLimits = async (
  facilityID,
  timecardDetails,
  facilityData,
  shiftData
) => {
  // console.log("🚀 ~ file: services.js:577 ~ timecardDetails:", timecardDetails);

  const hours_worked =
    (new Date(timecardDetails?.desiredClockOutTime) -
      new Date(timecardDetails?.desiredClockInTime)) /
    (1000 * 60 * 60);

  const date = timecardDetails?.date;
  const month = date ? date.split("-")[1] : null;
  let accLimitData = null;
  try {
    try {
      const variables = {
        filter: {
          facilityID: {
            eq: facilityID,
          },
          month: {
            eq: month,
          },
        },
      };

      accLimitData = (
        await API.graphql({
          query: listAccountLimitsLookups,
          variables: variables,
        })
      )?.data?.listAccountLimitsLookups?.items;
    } catch (error) {
      console.log("Error getting getAccountLimitsLookup", error);
    }

    if (accLimitData.length === 0) {
      for (const attribute of [
        "remainingBillingMonthly",
        "remainingMonthlyIncentive",
      ]) {
        const accLimitData_temp = (
          await API.graphql(
            graphqlOperation(createAccountLimitsLookup, {
              input: {
                facilityID: facilityID,
                attribute: attribute,
                amount: 0,
                month: month,
              },
            })
          )
        )?.data?.createAccountLimitsLookup;

        accLimitData.push(accLimitData_temp);
      }
    }

    const billingData = (
      await API.graphql(
        graphqlOperation(getBilling, { id: facilityData?.Billing?.id })
      )
    )?.data?.getBilling;
    // console.log('🚀 ~ file: services.js:450 ~ billingData:', billingData);

    for (const limitObj of accLimitData) {
      // console.log("🚀 ~ file: services.js:453 ~ limitObj:", limitObj);

      const rateTotal = shiftData?.rate * hours_worked;
      const incentiveTotal =
        shiftData?.incentives?.incentiveType === "fixed"
          ? shiftData?.incentives?.incentiveAmount
          : shiftData?.incentives?.incentiveAmount * hours_worked;

      if (limitObj?.attribute === "remainingBillingMonthly") {
        if (
          limitObj?.amount + shiftData?.rate * hours_worked >
          billingData?.maxBillingMonthly
        ) {
          throw Error(`Limit exceeded for ${limitObj?.attribute}`);
        }
      } else if (limitObj?.attribute === "remainingMonthlyIncentive") {
        if (
          limitObj?.amount + incentiveTotal >
            billingData?.maxMonthlyIncentive &&
          shiftData?.incentives?.incentiveBy === "Facility"
        ) {
          throw Error(`Limit exceeded for ${limitObj?.attribute}`);
        }
      }
    }

    if (
      shiftData?.incentives?.incentiveAmount > billingData?.maxFixedIncentive &&
      shiftData?.incentives?.incentiveBy === "Facility"
    ) {
      throw Error(`Limit exceeded for fixed incentive`);
    }

    // return true;
    return accLimitData;
  } catch (err) {
    console.error(
      "🚀 ~ file: services.js:386 ~ checkBillingLimits ~ err:",
      err
    );
    ErrorToast("Error with account check limits" + err);
    // ErrorToast(err);
    return false;
  }

  return true;
};

const updateBillingLimits = async (
  facilityID,
  timecardDetails,
  facilityData,
  shiftData
) => {
  // console.log("🚀 ~ file: services.js:390 ~ timecardDetails:", shiftData);

  const hours_worked =
    (new Date(timecardDetails?.desiredClockOutTime) -
      new Date(timecardDetails?.desiredClockInTime)) /
    (1000 * 60 * 60);
  // return;
  const date = timecardDetails?.date;
  const month = date ? date.split("-")[1] : null;
  try {
    let accLimitData = null;
    try {
      const variables = {
        filter: {
          facilityID: {
            eq: facilityID,
          },
          month: {
            eq: month,
          },
        },
      };

      accLimitData = (
        await API.graphql({
          query: listAccountLimitsLookups,
          variables: variables,
        })
      )?.data?.listAccountLimitsLookups?.items;
    } catch (error) {
      console.log("Error getting getAccountLimitsLookup", error);
    }

    const billingData = (
      await API.graphql(
        graphqlOperation(getBilling, { id: facilityData?.Billing?.id })
      )
    )?.data?.getBilling;
    console.log("🚀 ~ file: services.js:450 ~ billingData:", billingData);

    for (const limitObj of accLimitData) {
      // console.log("🚀 ~ file: services.js:453 ~ limitObj:", limitObj);

      // const res = (
      //   await API.graphql(
      //     graphqlOperation(updateAccountLimitsLookup, {
      //       input: {
      //         id: limitObj?.id,
      //         facilityID: facilityID,
      //         attribute: limitObj?.attribute,
      //         amount: limitObj?.amount + shiftData?.rate,
      //         month: month,
      //         _version: limitObj?._version,
      //       },
      //     })
      //   )
      // )?.data?.getAccountLimitsLookup;

      if (limitObj?.attribute === "remainingBillingMonthly") {
        // if (
        //   limitObj?.amount + shiftData?.rate >
        //   billingData?.maxBillingMonthly
        // ) {
        //   throw Error(`Limit exceeded for ${limitObj?.attribute}`);
        // }
        const res = (
          await API.graphql(
            graphqlOperation(updateAccountLimitsLookup, {
              input: {
                id: limitObj?.id,
                facilityID: facilityID,
                attribute: limitObj?.attribute,
                amount: limitObj?.amount + shiftData?.rate * hours_worked,
                month: month,
                _version: limitObj?._version,
              },
            })
          )
        )?.data?.getAccountLimitsLookup;
      } else if (limitObj?.attribute === "remainingMonthlyIncentive") {
        // if (
        //   limitObj?.amount + shiftData?.incentives?.incentiveAmount >
        //     billingData?.maxMonthlyIncentive &&
        //   shiftData?.incentives?.incentiveBy === "Facility"
        // ) {
        //   throw Error(`Limit exceeded for ${limitObj?.attribute}`);
        // }

        const res = (
          await API.graphql(
            graphqlOperation(updateAccountLimitsLookup, {
              input: {
                id: limitObj?.id,
                facilityID: facilityID,
                attribute: limitObj?.attribute,
                amount:
                  limitObj?.amount +
                  (shiftData?.incentives?.incentiveType === "fixed"
                    ? shiftData?.incentives?.incentiveAmount
                    : shiftData?.incentives?.incentiveAmount * hours_worked),
                month: month,
                _version: limitObj?._version,
              },
            })
          )
        )?.data?.getAccountLimitsLookup;
      }
    }

    // if (
    //   shiftData?.incentives?.incentiveAmount > billingData?.maxFixedIncentive &&
    //   shiftData?.incentives?.incentiveBy === "Facility"
    // ) {
    //   throw Error(`Limit exceeded for fixed incentive`);
    // }

    return accLimitData;
  } catch (err) {
    console.log("🚀 ~ file: services.js:386 ~ checkBillingLimits ~ err:", err);
    ErrorToast("Error with account limits" + err);
    // ErrorToast(err);
    return false;
  }

  return true;
};
export const assignTimecards = async (
  shift,
  createTimecardQuery,
  updateShiftQuery,
  userid,
  sendBulkMessages,
  createNotificationQuery,
  activityUser,
  isMarketPlaceAssignment
) => {
  let timecardCreated = false;
  let shiftUpdated = false;

  const timecardDetails = {
    clockInTime: null,
    clockOutTime: null,
    // isCallOff: false,
    peopleID: userid,
    shiftsID: shift?.id,
  };

  try {
    const userData = (
      await API.graphql(
        graphqlOperation(getPeopleAssignTimecard, { id: userid })
      )
    )?.data?.getPeople;
    if (!userData) throw new Error("Failed to get user data.");

    const shiftData = (
      await API.graphql(graphqlOperation(getShifts, { id: shift?.id }))
    )?.data?.getShifts;
    if (!shiftData) throw new Error("Failed to get shift data.");

    const { startDateExpanded: weekStartDate, endDateExpanded: weekEndDate } =
      getWeekDateRangeExpanded(shiftData.shiftStartDT);

    console.log(
      "🚀 ~ file: services.js:697 ~ shiftData.shiftStartDT:",
      shiftData.shiftStartDT,
      new Date(shiftData.shiftStartDT)
    );

    console.log(
      "🚀 ~ file: services.js:740 ~ weekStartDate:",
      weekStartDate,
      weekEndDate
    );
    // return;

    // /// TEMP
    // const { startDateExpanded, endDateExpanded } = getWeekDateRangeExpanded(

    //   shiftData.shiftStartDT
    // );
    // console.log(
    //   "🚀 ~ file: services.js:353 ~ tartDateExpanded, endDateExpanded:",
    //   startDateExpanded,
    //   endDateExpanded
    // );
    // return;
    // /// TEMP

    // console.log(
    //   "🚀 ~ file: services.js:155 ~ userData?.permissions:",
    //   userData?.permissions,
    //   userData
    // );

    const facilityData = (
      await API.graphql(
        graphqlOperation(getFacility, { id: shift?.facilityID })
      )
    )?.data?.getFacility;
    if (!facilityData) throw new Error("Failed to get facility data.");

    // Feed to timedetails
    timecardDetails.desiredClockInTime = shiftData.shiftStartDT;
    timecardDetails.desiredClockOutTime = shiftData.shiftEndDT;

    timecardDetails.date = shift?.date;

    console.log("STARTING PROESS XX");

    let accLimits = null;

    accLimits = await checkBillingLimits(
      shift?.facilityID,
      timecardDetails,
      facilityData,
      shiftData
    );

    if (!accLimits) {
      return;
    }

    // console

    const user_permissions = JSON.parse(userData?.permissions);
    // return;

    if (userData?.role !== shift?.roleRequired) {
      ErrorToast(
        `${userData?.role} cannot book a ${shift?.roleRequired} shift`
      );
      return null;
    }

    // const { startDate: weekStartDate, endDate: weekEndDate } =
    //   getLastSevenDaysRange(shiftData.shiftStartDT);

    const timecardsOfWeek = await getTimecardsForWeek(
      userid,
      weekStartDate,
      weekEndDate
    );

    // console.log(
    //   "🚀 ~ file: services.js:324 ~ timecardsOfWeek:",
    //   timecardsOfWeek?.map((obj) => [obj.desiredClockInTime, obj.date]),
    //   shiftData?.date,
    //   "Check",
    //   weekStartDate,
    //   weekEndDate
    // );

    const shiftsCount = timecardsOfWeek.length;
    console.log(
      "🚀 ~ file: services.js:753 ~ timecardsOfWeek:",
      timecardsOfWeek
    );
    // const shiftsCount = 5;

    // LOGIC START: Accept a shift only if the shifts aren't overlapping any times
    const hasOverlappingTimecard = timecardsOfWeek.some((timecard) => {
      const existingStart = new Date(timecard.desiredClockInTime);
      const existingEnd = new Date(timecard.desiredClockOutTime);
      const newStart = new Date(timecardDetails.desiredClockInTime);
      const newEnd = new Date(timecardDetails.desiredClockOutTime);

      // Check for overlapping time ranges
      return (
        (newStart < existingEnd && newStart >= existingStart) || // New shift starts within an existing shift
        (newEnd > existingStart && newEnd <= existingEnd) || // New shift ends within an existing shift
        (existingStart >= newStart && existingEnd <= newEnd) || // New shift completely covers an existing shift
        (existingStart < newStart && existingEnd > newEnd) // Existing shift completely covers the new shift
      );
    });

    if (hasOverlappingTimecard) {
      ErrorToast(
        "This person already has a shift that overlaps with the desired time range."
      );
      return null;
    }

    // LOGIC END

    const timecardForShiftExists = timecardsOfWeek.some((timecard) => {
      console.log(
        "🚀 ~ file: services.js:806 ~ timecardForShiftExists ~ timecard:",
        timecard,
        shift
      );
      return timecard?.shiftsID === shift?.shiftsID;
    });

    // console.log(
    //   "🚀 ~ file: services.js:806 ~ timecardForShiftExists ~ timecardForShiftExists:",
    //   timecardForShiftExists
    // );

    if (timecardForShiftExists) {
      ErrorToast("Shift already assigned to this person.");
      return null;
    }

    // return;

    let isTimecardOvertime = false;

    if (facilityData?.Billing?.allowOvertime && shiftsCount >= 5) {
      // if (true) {
      const maxClockInTimeOfWeek = new Date(
        Math.max(
          ...timecardsOfWeek.map(
            (timecard) => new Date(timecard.desiredClockInTime)
          )
        )
      ).toISOString();

      if (
        new Date(maxClockInTimeOfWeek) >
        new Date(timecardDetails.desiredClockInTime)
      ) {
        // Your error message here
        // throw new Error("The desired clock-in time is not the latest in this week.");
        ErrorToast(
          "When overtime is applied, the assignment can only be last shift of the week."
        );
        return null;
      }
    }

    if (shiftsCount >= 5 && !facilityData?.Billing?.allowOvertime) {
      console.log("Is overtime.");
      ErrorToast("Overtime is not allowed for this facility");
      return null;
    } else if (shiftsCount >= 5 && facilityData?.Billing?.allowOvertime) {
      isTimecardOvertime = true;
    }

    timecardDetails.isOvertime = isTimecardOvertime;

    // await notifyPeople(userData, facilityData, shiftData);

    // return;

    const newTimecard = await createTimecardQuery(
      timecardDetails,
      userid,
      facilityData?.facilityName
    );
    if (
      !newTimecard ||
      newTimecard === "Timecard for this shift already exists."
    ) {
      throw new Error("Timecard creation failed or already exists.");
    }

    await updateBillingLimits(
      shift?.facilityID,
      timecardDetails,
      facilityData,
      shiftData
    );

    timecardCreated = true;

    const decrementPosition = 1;
    const updatedShift = {
      id: shiftData.id,
      numOfPositions: shiftData.numOfPositions - decrementPosition,
      _version: shiftData._version,
    };

    const updatedShiftResponse = await updateShiftQuery(updatedShift);
    if (!updatedShiftResponse) throw new Error("Failed to update shift.");

    shiftUpdated = true;

    await notifyPeople(
      userData,
      facilityData,
      shiftData,
      sendBulkMessages,
      createNotificationQuery,
      activityUser,
      isMarketPlaceAssignment
    );

    SuccessToast("Shift Confirmed");
    // return newTimecard;
  } catch (error) {
    console.error("Error while assigning timecards:", error);
    ErrorToast(error.message);

    // Manual Rollback
    if (timecardCreated) {
      // Delete the created timecard or take other rollback actions.
    }

    if (shiftUpdated) {
      // Restore the shift details or take other rollback actions.
    }
  }
};

export const assignTimecards_V1 = async (
  shift,
  createTimecardQuery,
  updateShiftQuery,
  userid,
  sendBulkMessages
) => {
  let timecardCreated = false;
  let shiftUpdated = false;

  const timecardDetails = {
    clockInTime: null,
    clockOutTime: null,
    // isCallOff: false,
    peopleID: userid,
    shiftsID: shift?.id,
  };

  try {
    const userData = (
      await API.graphql(
        graphqlOperation(getPeopleAssignTimecard, { id: userid })
      )
    )?.data?.getPeople;
    if (!userData) throw new Error("Failed to get user data.");

    const shiftData = (
      await API.graphql(graphqlOperation(getShifts, { id: shift?.id }))
    )?.data?.getShifts;
    if (!shiftData) throw new Error("Failed to get shift data.");

    const facilityData = (
      await API.graphql(
        graphqlOperation(getFacility, { id: shift?.facilityID })
      )
    )?.data?.getFacility;
    if (!facilityData) throw new Error("Failed to get facility data.");

    // console.log(
    //   "🚀 ~ file: services.js:155 ~ userData?.permissions:",
    //   userData?.permissions,
    //   userData
    // );

    timecardDetails.date = shift?.date;
    const user_permissions = JSON.parse(userData?.permissions);
    // return;

    if (userData?.role !== shift?.roleRequired) {
      ErrorToast(
        `${userData?.role} cannot book a ${shift?.roleRequired} shift`
      );
      return null;
    }

    const hoursWorked = await getHoursWorked(shiftData, userid);
    console.log("🚀 ~ file: services.js:276 ~ hoursWorked:", hoursWorked);

    // return;

    let isTimecardOvertime = false;
    if (hoursWorked >= 40.0 && !facilityData?.Billing?.allowOvertime) {
      console.log("Is overtime.");
      ErrorToast("Overtime is not allowed for this facility");
      return null;
    } else {
      isTimecardOvertime = true;
    }

    timecardDetails.isOvertime = isTimecardOvertime;

    const newTimecard = await createTimecardQuery(
      timecardDetails,
      userid,
      facilityData?.facilityName
    );
    if (
      !newTimecard ||
      newTimecard === "Timecard for this shift already exists."
    ) {
      throw new Error("Timecard creation failed or already exists.");
    }

    timecardCreated = true;

    const decrementPosition = 1;
    const updatedShift = {
      id: shiftData.id,
      numOfPositions: shiftData.numOfPositions - decrementPosition,
      _version: shiftData._version,
    };

    const updatedShiftResponse = await updateShiftQuery(updatedShift);
    if (!updatedShiftResponse) throw new Error("Failed to update shift.");

    const localizedStartDT = moment
      .tz(shiftData?.shiftStartDT, "UTC")
      .tz(userTimezone)
      .format("YYYY-MM-DDTHH:mm:ss.SSS");

    const localizedEndDT = moment
      .tz(shiftData?.shiftEndDT, "UTC")
      .tz(userTimezone)
      .format("YYYY-MM-DDTHH:mm:ss.SSS");

    shiftUpdated = true;
    const payload = {
      email: {
        message: "",
        emails: [],
      },
      text: {
        message: `Shift picked up by you at ${
          facilityData?.facilityName
        } on ${displayDate(localizedStartDT)} from ${displayTime(
          localizedStartDT
        )} to ${displayTime(localizedEndDT)}`,
        phoneNumbers: [
          hasPermission(userData, "Text Message")
            ? userData?.phoneNumber
            : null,
        ],
      },
      app: {
        message: "",
        userIds: [],
      },
    };

    await sendBulkMessages(payload);

    SuccessToast("Timecard Created");
    // return newTimecard;
  } catch (error) {
    console.error("Error while assigning timecards:", error);
    ErrorToast(error.message);

    // Manual Rollback
    if (timecardCreated) {
      // Delete the created timecard or take other rollback actions.
    }

    if (shiftUpdated) {
      // Restore the shift details or take other rollback actions.
    }
  }
};
