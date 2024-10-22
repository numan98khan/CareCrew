import React, { useState, useMemo } from "react";
import themeStyles from "../../../styles/theme.styles";
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

  // Breakpoint
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

    const nameParts = employeeName.split(" ").map((part) => part.toLowerCase());

    const matchesFirstName = nameParts.some((part) =>
      peopleObj?.firstName.toLowerCase().includes(part)
    );
    const matchesLastName = nameParts.some((part) =>
      peopleObj?.lastName.toLowerCase().includes(part)
    );

    if (nameParts.length === 1) {
      return matchesFirstName || matchesLastName;
    }

    return matchesFirstName && matchesLastName;
  };

  function transformToISO(dateStr) {
    if (!dateStr) return "1970-01-01";
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
      shiftData = shifts.find((shift_) => shift_.id === shift.shiftsID);
    }

    const currentDate = new Date(date).toLocaleDateString();
    const tempShiftStartDate = new Date(
      shiftData?.shiftStartDT
    ).toLocaleDateString();

    const areDatesEqual = tempShiftStartDate === currentDate;

    if (!areDatesEqual) {
      return false;
    }

    if (shiftStatus === "Late" && !shift?.isLate) {
      return false;
    }

    if (shiftStatus === "Call-Off" && !shift?.isCallOff) {
      return false;
    }

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

    if (shift.isArchive) {
      return false;
    }

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

      return startA - startB;
    });

    const sortedGroups = sortedKeys.reduce((acc, key) => {
      acc[key] = unsortedGroups[key];
      return acc;
    }, {});

    return sortedGroups;
  };

  const groupedShifts = useMemo(() => {
    const groups = groupShiftsByTimings(shifts);
    return groups;
  }, [shifts]);

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
      className="h-full bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between relative"
    >
      {/* Date Navigation */}
      <div className="flex flex-col items-center md:flex-row justify-between mb-2 space-y-2 md:space-y-0">
        <div
          onClick={() => {
            setWeekOffset(weekOffset - 1);
          }}
          className="flex justify-center md:justify-start"
        >
          <PrevPageIcon />
        </div>
        <label className="text-center w-full md:w-auto">
          {dates[0]} - {dates[6]}
        </label>
        <div
          onClick={() => {
            setWeekOffset(weekOffset + 1);
          }}
          className="flex justify-center md:justify-end"
        >
          <NextPageIcon />
        </div>
      </div>

      {/* Week View */}
      {chunkedDates.map((weekDates, index) => (
        <div key={index}>
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

      {/* Sticky Shift Indicators */}
      <div className="sticky bottom-0 bg-white p-2 z-10 border-t border-gray-200">
        <ShiftIndicators />
      </div>
    </div>
  );
};

export default ShiftsContainer;
