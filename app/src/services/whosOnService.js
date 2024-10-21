import { useState } from "react";
import moment from "moment";
import { userTimezone } from "../apolloql/timezone";
import { displayTime } from "./micro";

// Constants
const SHIFT_IN_PROCESS = "Shift in progress";

// Utility function to format the date (YYYY-MM-DD)
const formatDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Zero-based months
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// Utility function to calculate time difference in minutes
const calculateTimeDifference = (startTime, endTime = new Date()) => {
  return Math.round((new Date(startTime) - endTime) / (1000 * 60)); // in minutes
};

// Utility function to format the activity string
const formatActivity = (clockInTime, totalMinutesBeforeShiftStarts) => {
  if (clockInTime) {
    const formattedClockInTime = displayTime(clockInTime);
    return `${SHIFT_IN_PROCESS} - Clocked in at ${formattedClockInTime}${
      totalMinutesBeforeShiftStarts < 0 ? " - Late" : ""
    }`;
  }

  const absMinutes = Math.abs(totalMinutesBeforeShiftStarts);
  const hours = Math.floor(absMinutes / 60);
  const minutes = absMinutes % 60;

  const duration = `${hours ? hours + " hours and " : ""}${minutes} mins`;

  return totalMinutesBeforeShiftStarts >= 0
    ? `Starting in ${duration}`
    : `Late by ${duration}`;
};

// Utility function to get highlight color based on time
const getHighlightColor = (totalMinutesBeforeShiftStarts) => {
  return totalMinutesBeforeShiftStarts < 0 ? "bg-lightRed" : null;
};

// Main enrichment function for timecards
export function enrichWhosOn(timecardsData, currentTab, currentViewDate) {
  const currentViewFormattedDate = formatDate(currentViewDate);

  // Enrich each timecard with activity and highlight color
  const enrichedTimecards = timecardsData?.map((timecard) => {
    const shiftStartDateTime = timecard?.shift?.shiftStartDT;
    const totalMinutesBeforeShiftStarts = calculateTimeDifference(
      shiftStartDateTime,
      timecard?.clockInTime
    );

    return {
      ...timecard,
      activity: formatActivity(
        timecard?.clockInTime,
        totalMinutesBeforeShiftStarts
      ),
      highlightColor: getHighlightColor(totalMinutesBeforeShiftStarts),
      shiftDate: formatDate(new Date(shiftStartDateTime)),
    };
  });

  // Filter enriched timecards based on the current tab and view date
  const filterByTab = (timecard) => {
    const isDateMatch = timecard.shiftDate === currentViewFormattedDate;

    // switch (currentTab) {
    //   case "Scheduled":
    //     return !timecard?.clockInTime && isDateMatch;
    //   case "Clocked In":
    //     return timecard?.clockInTime && !timecard?.clockOutTime && isDateMatch;
    //   case "All":
    //   default:
    //     return true;
    // }

    return true;
  };

  return enrichedTimecards?.filter(filterByTab);
}
