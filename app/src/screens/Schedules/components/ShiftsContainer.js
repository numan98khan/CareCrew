import React, { useState, useMemo } from "react";
import themeStyles from "../../../styles/theme.styles";
// import ShiftCard from "./ShiftCard"; // Assuming ShiftCard is in the same directory
import ShiftCard from "../../../components/ShiftCard";

import NextPageIcon from "../../../assets/icons/nextpage";
import PrevPageIcon from "../../../assets/icons/prevpage";

import { ShiftIndicators } from "./misc";

import PuffLoader from "react-spinners/PuffLoader";
import { displayDate, displayTime } from "../../../services/micro";
import SingleWeekView from "./SingleWeekView";
import { EMPLOYEE } from "../../../constants/userTypes";
import { useAuth } from "../../../context";

const ShiftsContainer = ({
  loading,
  startDate,
  weekOffset,
  setWeekOffset,
  employeeName,

  // Bkearpoint
  shiftStatus,
  dates,
  shifts,
  filters,
  facilities,
  filteredPeople,
  openModal,
  setSelectedFacility,
  setSelectedPerson,
  //
  handleShiftSelection,
  selectedShifts,
}) => {
  const { type } = useAuth();
  const isEmployeeNameMatched = (item) => {
    const peopleObj = filteredPeople.find(
      (people) => people.id === item.peopleID
    );

    const nameParts = employeeName.split(" ").map((part) => part.toLowerCase()); // split the entered name and convert to lowercase for case-insensitive matching

    const matchesFirstName = nameParts.some((part) =>
      peopleObj?.firstName.toLowerCase().includes(part)
    );
    const matchesLastName = nameParts.some((part) =>
      peopleObj?.lastName.toLowerCase().includes(part)
    );

    // If there's only one word in the employeeName, check if it matches either first or last name
    if (nameParts.length === 1) {
      return matchesFirstName || matchesLastName;
    }

    // If there are two words, check if one matches the first name and the other matches the last name
    return matchesFirstName && matchesLastName;
  };

  function transformToISO(dateStr) {
    // Amazing temporary fix
    if (!dateStr) return "1970-01-01";
    // console.log(
    //   "🚀 ~ file: ShiftsContainer.js:56 ~ transformToISO ~ DATE_STR:",
    //   dateStr
    // );
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [month, day, year] = parts;
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return dateStr;
  }

  const filteredShifts = (date, shift) => {
    const isEmployeeMatched = shift?.peopleID === filters?.employee;

    let shiftData = shift;

    if (shift.__typename === "Timecard") {
      // console.log(
      //   "🚀 ~ file: ShiftsContainer.js:74 ~ filteredShifts ~ shiftData:",
      //   shift
      // );

      shiftData = shifts.find((shift_) => shift_.id === shift.shiftsID);

      // return true;
      // return false;
    }

    //// Convert to localized date strings for comparison
    const currentDate = new Date(date).toLocaleDateString();
    const removeLeadingZeros = (str) => {
      return str.replace(/^0+/, "");
    };

    const tempShiftStartDate = new Date(
      shiftData?.shiftStartDT
    ).toLocaleDateString();
    const shiftDateSplit = tempShiftStartDate;
    const currentDateSplit = currentDate;

    const areDatesEqual = shiftDateSplit === currentDateSplit;

    if (!areDatesEqual) {
      return false;
    }

    // console.log(
    //   "🚀 ~ file: ShiftsContainer.js:113 ~ filteredShifts ~ shiftStatus:",
    //   shiftStatus
    // );

    if (shiftStatus === "Late" && !shift?.isLate) {
      return false;
    }

    if (shiftStatus === "Call-Off" && !shift?.isCallOff) {
      return false;
    }

    // // For others
    // if (
    //   type !== EMPLOYEE &&
    //   shiftStatus === "Assigned" &&
    //   (shift?.__typename === "Shifts" || shift?.isCallOff)
    // ) {
    //   return false;
    // }

    // // For employees
    // if (
    //   type === EMPLOYEE &&
    //   shiftStatus === "Assigned" &&
    //   (shift?.__typename === "Shifts" || shift?.isCallOff)
    // ) {
    //   return false;
    // }

    // For employees
    if (
      shiftStatus === "Assigned" &&
      (shift?.__typename === "Shifts" || shift?.isCallOff || shift?.isLate)
    ) {
      return false;
    }

    if (shiftStatus === "Open" && shift?.__typename === "Timecard") {
      return false;
    }

    if (filters?.facility && shiftData?.facilityID !== filters?.facility) {
      return false;
    }

    if (filters?.employee && !isEmployeeMatched) {
      return false;
    }

    if (
      shift.__typename === "Shifts" &&
      (type === EMPLOYEE ? true : employeeName)
    ) {
      return false;
    }

    // console.log(
    //   "🚀 ~ file: ShiftsContainer.js:145 ~ filteredShifts ~ shift:",
    //   shift
    // );

    // New delete method "ARCHIVE"
    if (shift.isArchive) {
      return false;
    }

    // Hide Facility Cancellations
    // if (
    //   shift.__typename === "Timecard" &&
    //   shift?.lateReason === "Facility Cancellation"
    // ) {
    //   return false;
    // }

    // Deprecated
    // if (filters?.shiftTimings) {
    //   const [start, end] = filters?.shiftTimings?.split("-");
    //   if (shiftData?.shiftStart !== start || shiftData?.shiftEnd !== end) {
    //     return false;
    //   }
    // }

    // If all checks are passed, return true
    return true;
  };

  const timeToMinutes = (time) => {
    let [hours, minutes, seconds] = time.split(":").map(Number);
    if (time.includes("PM") && hours !== 12) {
      hours += 12;
    } else if (time.includes("AM") && hours === 12) {
      hours = 0;
    }

    return hours * 60 + (minutes || 0);
  };

  const groupShiftsByTimings = (shifts) => {
    const unsortedGroups = shifts.reduce((acc, shift) => {
      const isTimecard = shift.__typename === "Timecard";
      const shiftFetched = isTimecard
        ? shifts.find((shift_) => shift_.id === shift.shiftsID)
        : shift;

      // const key = `${displayTime(shiftFetched?.shiftStart)} - ${displayTime(
      //   shiftFetched?.shiftEnd
      // )}`;

      const key = `${displayTime(shiftFetched?.shiftStartDT)} - ${displayTime(
        shiftFetched?.shiftEndDT
      )}`;

      if (!acc[key]) {
        acc[key] = [];
      }

      if (shift?.numOfPositions !== "0") {
        acc[key].push(shift);
      }

      return acc;
    }, {});

    const sortedKeys = Object.keys(unsortedGroups).sort((a, b) => {
      const startA = timeToMinutes(a.split(" - ")[0]);
      const startB = timeToMinutes(b.split(" - ")[0]);
      // console.log(
      //   "🚀 ~ file: ShiftsContainer.js:170 ~ sortedKeys ~ startA:",
      //   a.split(" - ")[0],
      //   startA,
      //   b.split(" - ")[0],
      //   startB
      // );

      return startA - startB;
    });

    const sortedGroups = sortedKeys.reduce((acc, key) => {
      acc[key] = unsortedGroups[key];
      return acc;
    }, {});

    return sortedGroups;
  };

  // const groupShiftsByTimings = (shifts) => {
  //   return shifts.reduce((acc, shift) => {
  //     // This is where the shift is being
  //     const isTimecard = shift.__typename === "Timecard";

  //     // const key = isTimecard
  //     //   ? `${displayTime(shift.clockInTime)} - ${displayTime(
  //     //       shift.clockOutTime
  //     //     )}`
  //     //   : `${displayTime(shift.shiftStart)} - ${displayTime(shift.shiftEnd)}`;
  //     // if (!acc[key]) {
  //     //   acc[key] = [];
  //     // }

  //     const shiftFetched = isTimecard
  //       ? shifts.find((shift_) => shift_.id === shift.shiftsID)
  //       : shift;

  //     console.log(
  //       "🚀 ~ file: ShiftsContainer.js:189 ~ returnshifts.reduce ~ shiftFetched:",
  //       shiftFetched?.date,
  //       shiftFetched?.shiftStart,
  //       shiftFetched?.shiftEnd
  //     );

  //     const key = `${displayTime(shiftFetched?.shiftStart)} - ${displayTime(
  //       shiftFetched?.shiftEnd
  //     )}`;

  //     if (!acc[key]) {
  //       acc[key] = [];
  //     }

  //     // Check the numOfPositions here and other filters
  //     if (shift?.numOfPositions !== "0") {
  //       acc[key].push(shift);
  //     }

  //     return acc;
  //   }, {});
  // };

  const groupedShifts = useMemo(() => {
    const groups = groupShiftsByTimings(shifts);
    // console.log(
    //   "🚀 ~ file: ShiftsContainer.js:190 ~ groupedShifts ~ groups:",
    //   groups
    // );
    return groups;
  }, [shifts]);

  // This will break dates into groups of 7 for weeks
  const chunkedDates = useMemo(() => {
    let chunks = [];
    for (let i = 0; i < dates.length; i += 7) {
      chunks.push(dates.slice(i, i + 7));
    }
    return chunks;
  }, [dates]);
  return (
    <div
      style={{ minHeight: "75vh" }}
      className="h-full bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between"
    >
      <div className="flex justify-between mb-2">
        <div
          // style={{ opacity: startDate ? "0.3" : "1" }}
          onClick={() => {
            // if (!startDate) {
            setWeekOffset(weekOffset - 1);
            // }
          }}
        >
          <PrevPageIcon />
        </div>
        <label>
          {dates[0]} - {dates[6]}
        </label>
        <div
          // style={{ opacity: startDate ? "0.3" : "1" }}
          // style={{ opacity: startDate ? "0.3" : "1" }}
          onClick={() => {
            // if (!startDate) {
            setWeekOffset(weekOffset + 1);
            // }
          }}
        >
          <NextPageIcon />
        </div>
      </div>

      {chunkedDates.map((weekDates, index) => (
        <div key={index}>
          {/* <h2 className="mb-2">Week {index + 1}</h2> */}
          <SingleWeekView
            dates={weekDates}
            groupedShifts={groupedShifts}
            filteredShifts={filteredShifts}
            facilities={facilities}
            filteredPeople={filteredPeople}
            shifts={shifts}
            handleShiftSelection={handleShiftSelection}
            selectedShifts={selectedShifts}
            openModal={openModal}
            setSelectedFacility={setSelectedFacility}
            setSelectedPerson={setSelectedPerson}
            loading={loading}
          />
        </div>
      ))}

      <ShiftIndicators />
    </div>
  );
};

export default ShiftsContainer;
