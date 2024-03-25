import { useState } from "react";

import moment from "moment";
import { userTimezone } from "../apolloql/timezone";
import { displayTime } from "./micro";

// import { formatDate } from "./micro";

const SHIFT_IN_PROCESS = "Shift in progress";

// function formatDate(dateString) {
//   const date = new Date(dateString);
//   return date.toISOString().split("T")[0];
// }

export function squashShiftsAndTimecards(shifts, timecards) {}

// export function enrichWhosOn(timecardsData, currentTab, currentViewDate) {
//   // const timecardsData = data?.filter((element) => element._deleted !== true);

//   const enrichedTimecardsData = timecardsData?.map((timecard) => {
//     const shift = timecard?.shift;
//     // const person = people?.people;
//     // const shiftStartDateTime = moment(`${shift?.date}T${shift?.shiftStart}`);
//     const shiftStartDateTime = moment(shift?.shiftStartDT);
//     const now = moment(); // Local time

//     const totalMinutesBeforeShiftStarts = shiftStartDateTime.diff(
//       now,
//       "minutes"
//     );

//     const absTotalMinutes = Math.abs(totalMinutesBeforeShiftStarts);
//     const hoursBeforeShiftStarts = Math.floor(absTotalMinutes / 60);
//     const minutesBeforeShiftStarts = absTotalMinutes % 60;

//     // Later in your code, when constructing the "Late by..." or "Starting in..." string:
//     const activity = timecard?.clockInTime
//       ? `${SHIFT_IN_PROCESS}${timecard?.isLate ? " - Late" : ""}`
//       : totalMinutesBeforeShiftStarts >= 0
//       ? "Starting in " +
//         (hoursBeforeShiftStarts !== 0
//           ? hoursBeforeShiftStarts + " hours and "
//           : "") +
//         minutesBeforeShiftStarts +
//         " mins"
//       : "Late by " +
//         (hoursBeforeShiftStarts !== 0
//           ? hoursBeforeShiftStarts + " hours and "
//           : "") +
//         minutesBeforeShiftStarts +
//         " mins";

//     const highlightColor =
//       hoursBeforeShiftStarts >= 0 && minutesBeforeShiftStarts >= 0
//         ? null
//         : "bg-lightRed";

//     const shiftDate = shift?.date;

//     // shift
//     console.log(
//       "🚀 ~ file: whosOnService.js:64 ~ enrichedTimecardsData ~ shift:",
//       shift
//     );

//     return {
//       ...timecard,
//       shift,
//       activity,
//       highlightColor,
//       shiftDate,
//     };
//   });

//   // setTimecards(enrichedTimecardsData);

//   if (currentTab === "Scheduled") {
//     return enrichedTimecardsData?.filter(
//       (timecard) =>
//         // timecard.activity !== SHIFT_IN_PROCESS &&
//         !timecard?.clockInTime &&
//         timecard.shiftDate === formatDate(currentViewDate) // console.log(shift, shiftDate, formatDate(currentViewDate));
//     );
//   } else if (currentTab === "Clocked In") {
//     return enrichedTimecardsData?.filter(
//       (timecard) =>
//         // timecard.activity === SHIFT_IN_PROCESS &&
//         timecard?.clockInTime &&
//         !timecard?.clockOutTime &&
//         timecard.shiftDate === formatDate(currentViewDate)
//     );
//   } else if (currentTab === "All") {
//     return enrichedTimecardsData?.filter((timecard) => true);
//   }
// }

const formatDate = (date) => {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months are zero-based
  let dd = date.getDate();

  mm = mm < 10 ? "0" + mm : mm;
  dd = dd < 10 ? "0" + dd : dd;

  return `${yyyy}-${mm}-${dd}`;
};

export function enrichWhosOn(timecardsData, currentTab, currentViewDate) {
  const SHIFT_IN_PROCESS = "Shift in progress"; // Assuming it's defined somewhere

  const formatActivity = (clockInTime, totalMinutesBeforeShiftStarts) => {
    if (clockInTime) {
      const formattedClockInTime = displayTime(clockInTime); //new Date(clockInTime).toLocaleTimeString();
      // displayTime(
      //   new Date(moment.tz(clockInTime, userTimezone)).toISOString()
      // ); //displayTime(clockInTime); //moment(clockInTime).format("h:mm A"); // Format the clock-in time as needed
      return `${SHIFT_IN_PROCESS} - ${"Clocked in at " + formattedClockInTime}${
        totalMinutesBeforeShiftStarts < 0 ? " - Late" : ""
      }`;
    }

    const absTotalMinutes = Math.abs(totalMinutesBeforeShiftStarts);
    const hours = Math.floor(absTotalMinutes / 60);
    const minutes = absTotalMinutes % 60;

    // console.log(
    //   "🚀 ~ file: whosOnService.js:120 ~ formatActivity ~ hours:",
    //   hours,
    //   minutes
    // );

    const duration =
      (hours !== 0 ? hours + " hours and " : "") + minutes + " mins";
    return totalMinutesBeforeShiftStarts >= 0
      ? "Starting in " + duration
      : "Late by " + duration;
  };

  const getHighlightColor = (totalMinutesBeforeShiftStarts) => {
    return totalMinutesBeforeShiftStarts < 0 ? "bg-lightRed" : null;
  };

  // Iterate through timecards and enrich them
  const enrichedTimecards = timecardsData?.map((timecard) => {
    const shiftStartDateTime = new Date(timecard?.shift?.shiftStartDT);
    const now = new Date(); //moment.tz(userTimezone); // Local time

    // Calculate the total minutes difference between shiftStartDateTime and now
    const totalMinutesBeforeShiftStarts = Math.round(
      (shiftStartDateTime -
        (timecard?.clockInTime ? new Date(timecard?.clockInTime) : now)) /
        (1000 * 60)
    );

    // console.log(
    //   "🚀 ~ file: whosOnService.js:142 ~ enrichedTimecards ~ shiftStartDateTime:",
    //   shiftStartDateTime.toLocaleString(),
    //   now.toLocaleString(),
    //   totalMinutesBeforeShiftStarts
    // );

    const sanitizedTimecard = {
      ...timecard,
      shift: timecard?.shift,
      activity: formatActivity(
        timecard?.clockInTime,
        totalMinutesBeforeShiftStarts
      ),
      highlightColor: getHighlightColor(totalMinutesBeforeShiftStarts),
      shiftDate: formatDate(new Date(timecard?.shift?.shiftStartDT)),
    };

    // console.log(
    //   "🚀 ~ file: whosOnService.js:131 ~ enrichedTimecards ~ sanitizedTimecard:",
    //   sanitizedTimecard
    // );

    return sanitizedTimecard;
  });

  // Filter enriched timecards based on the current tab and view date
  const isDateMatching = (timecard) =>
    timecard.shiftDate === formatDate(currentViewDate);
  switch (currentTab) {
    case "Scheduled":
      return enrichedTimecards;
    // ?.filter(
    //   (timecard) => !timecard?.clockInTime && isDateMatching(timecard)
    // );
    case "Clocked In":
      return enrichedTimecards?.filter(
        (timecard) =>
          timecard?.clockInTime &&
          !timecard?.clockOutTime &&
          isDateMatching(timecard)
      );
    case "All":
    default:
      return enrichedTimecards;
  }
}
