import React, { useState, useEffect, useMemo } from "react";
import BulkShiftCard from "./BulkShiftCard";
import NextPageIcon from "../../../assets/icons/nextpage";
import PrevPageIcon from "../../../assets/icons/prevpage";
import IconButton from "../../../components/Button/IconButton";
import themeStyles from "../../../styles/theme.styles";
import DropDown from "../../../components/DropDown";
import { createBulkShifts } from "../../../services/bulkUserCreation";
import {
  ErrorToast,
  SuccessToast,
  convertDateTimeToAWSDateTime,
  convertTimeToAWSTime,
  displayDate,
  displayTime,
  formatDateToAWS,
} from "../../../services/micro";

import moment from "moment";
import Button from "../../../components/Button";
import { userTimezone } from "../../../apolloql/timezone";
import { ADD_SHIFT } from "../../../constants/notificationTypes";
import {
  externalNotificationToInstacare,
  inAppNotificationsToFacilityPeople,
  inAppNotificationsToPeople,
  inApplNotificationToInstacare,
  sendNotificationsToFacilityPeople,
} from "../../../services/timecards/reporting";
import { useCreateNotification } from "../../../apolloql/notifications";
import { useAuth } from "../../../context";
import ConfirmationModal from "../../../components/ConfirmationModal";

const createDefaultShift = (date, facilityID) => ({
  numOfPositions: null,
  facilityID: facilityID,
  shiftStart: null,
  shiftEnd: null,
  date: date,
  roleRequired: null,
  rate: null,
  floorNumber: null,
  supervisor: null,
  incentives: {
    incentiveBy: null,
    incentiveType: null,
    incentiveAmount: null,
    notes: null,
  },
  cancellationGuarantee: false,
  isAssigned: false,
  isIncentive: false,
  isGuarantee: false,
  isLate: false,
  isCallOff: false,
  isSelected: false,
  recurringSchedule: null,
});

function BulkShifts({
  facilities,
  myFacility,
  isPublishDisabled,
  setIsPublishDisabled,
}) {
  const today = new Date();

  const { user } = useAuth();

  // Step 2: Define state for modal visibility
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // Optional: Define a state for the warning message if dynamic messages are needed
  const [warningMessage, setWarningMessage] = useState("");

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [days, setDays] = useState([]);
  const [datesOfMonth, setDatesOfMonth] = useState([]);
  const [shiftsArray, setShiftsArray] = useState([]);
  const [facilityID, setFacilityID] = useState(null);

  const { createNotificationQuery } = useCreateNotification();

  const updateShiftObject = (index, updatedShift) => {
    setShiftsArray((prevShiftsArray) => {
      const dayShifts = [...prevShiftsArray[index.day]];
      dayShifts[index.shift] = updatedShift;
      return prevShiftsArray?.map((shifts, i) =>
        i === index.day ? dayShifts : shifts
      );
    });
  };

  useEffect(() => {
    // Initialize shiftsArray with default values
    const initialShifts = datesOfMonth.map(() => undefined);
    setShiftsArray(initialShifts);
  }, [datesOfMonth]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDatesOfMonth = (year, month) => {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
      dates.push(new Date(year, month, i));
      console.log("🚀 ~ file: index.js:111 ~ getDatesOfMonth ~ year:", year);
    }
    return dates;
  };

  const updateDaysArray = () => {
    const firstDayOfMonth = new Date(today.getFullYear(), currentMonth, 1);
    const firstDayIndex = firstDayOfMonth.getDay();
    const updatedDays = [
      ...shortDayNames.slice(firstDayIndex),
      ...shortDayNames.slice(0, firstDayIndex),
    ];
    setDays(updatedDays);
  };

  useEffect(() => {
    // Re-compute the days based on currentMonth and currentYear
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    console.log(
      "🚀 ~ file: index.js:114 ~ useEffect ~ currentYear:",
      currentYear
    );
    const firstDayIndex = firstDayOfMonth.getDay();
    const updatedDays = [
      ...shortDayNames.slice(firstDayIndex),
      ...shortDayNames.slice(0, firstDayIndex),
    ];
    setDays(updatedDays);

    // Re-compute the datesOfMonth based on currentMonth and currentYear
    setDatesOfMonth(getDatesOfMonth(currentYear, currentMonth));

    // Re-initialize the shiftsArray
    const initialShifts = datesOfMonth.map((date) => [
      createDefaultShift(date, facilityID),
    ]);
    setShiftsArray(initialShifts);
  }, [currentMonth, currentYear, facilityID]);

  function addShiftToDate(index) {
    if (index >= 0 && index < shiftsArray.length) {
      // Clone the existing array to ensure immutability
      const updatedShiftsArray = [...shiftsArray];

      // Add a new default shift for the specific date
      const dateForShift = datesOfMonth[index];
      updatedShiftsArray[index].push(
        createDefaultShift(dateForShift, facilityID)
      );

      setShiftsArray(updatedShiftsArray);
    } else {
      console.error("Invalid index provided for addShiftAtIndex.");
    }
  }

  function removeShiftByIndex(dateIndex, shiftIndex) {
    if (dateIndex >= 0 && dateIndex < shiftsArray.length) {
      // Clone the existing array to ensure immutability
      const updatedShiftsArray = [...shiftsArray];

      // Check if the shift index is valid for the specified date
      if (
        shiftIndex >= 0 &&
        shiftIndex < updatedShiftsArray[dateIndex].length
      ) {
        // Remove the specific shift
        updatedShiftsArray[dateIndex].splice(shiftIndex, 1);
        setShiftsArray(updatedShiftsArray);
      } else {
        console.error("Invalid shift index provided for the given date.");
      }
    } else {
      console.error("Invalid date index provided for removeShiftByIndex.");
    }
  }

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    ); // adjust the year if necessary
  };

  const nextMonth = () => {
    // prevYear;
    console.log("🚀 ~ file: index.js:196 ~ nextMonth ~ prevYear:", currentYear);

    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    ); // adjust the year if necessary
  };

  useEffect(() => {
    // const year = today.getFullYear();
    setDatesOfMonth(getDatesOfMonth(currentYear, currentMonth));
    updateDaysArray();
  }, [currentMonth, currentYear]);

  useEffect(() => {
    // Initialize shiftsArray with default values
    const initialShifts = datesOfMonth.map((date) => [
      createDefaultShift(date, facilityID),
    ]);
    setShiftsArray(initialShifts);
  }, [datesOfMonth]);

  function flattenArray(arr) {
    const result = [];
    for (let item of arr) {
      if (Array.isArray(item)) {
        result.push(...flattenArray(item));
      } else {
        result.push(item);
      }
    }
    return result;
  }

  const handleUpload = async () => {
    setIsPublishDisabled(true);
    if (!facilityID) {
      ErrorToast("No facility selected");
      setIsPublishDisabled(false);
      return;
    }

    // const currentDate = new Date();
    // const userTimezone = userTimezone;

    const flattenedShifts = flattenArray(shiftsArray)
      .filter(
        (obj) =>
          obj?.numOfPositions !== null &&
          obj?.shiftStart !== null &&
          obj?.shiftEnd !== null &&
          obj?.roleRequired !== null
      )
      .map((shift) => {
        const awsDate = formatDateToAWS(shift?.date);
        const isNextDay = shift.shiftEnd < shift.shiftStart;

        // If it's the next day, add one day to the date
        const endDate = isNextDay
          ? moment(awsDate).add(1, "days").format("YYYY-MM-DD")
          : awsDate;

        // Generate the moment object without converting to string
        const utcStartDatetimeObj = moment
          .tz(
            `${awsDate}T${
              shift.shiftStart.endsWith("Z")
                ? shift.shiftStart.slice(0, -1)
                : shift.shiftStart
            }`,
            userTimezone
          )
          .utc();

        const currentDate = moment.utc(); // Current UTC datetime

        // Now, convert utcStartDatetimeObj to string format if needed
        const utcStartDatetime = utcStartDatetimeObj.format(
          "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
        );

        const utcEndDatetime = moment
          .tz(
            `${endDate}T${
              shift.shiftEnd.endsWith("Z")
                ? shift.shiftEnd.slice(0, -1)
                : shift.shiftEnd
            }`,
            userTimezone
          )
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

        const bobj = facilities.find(
          (obj) => obj.id === shift?.facilityID
        )?.Billing;
        const selectedRate =
          shift?.roleRequired === "CNA"
            ? bobj?.hourlyRateCNA
            : shift?.roleRequired === "RN"
            ? bobj?.hourlyRateRN
            : bobj?.hourlyRateLPN;
        return {
          ...shift,
          facilityID: facilityID,
          // shiftStart: shiftStart,
          // shiftEnd: shiftEnd,
          // date: startDate,
          shiftStart: convertTimeToAWSTime(shift.shiftStart, userTimezone),
          shiftEnd: convertTimeToAWSTime(shift.shiftEnd, userTimezone),
          date: convertDateTimeToAWSDateTime(
            awsDate + "T" + shift.shiftStart,
            userTimezone
          ).split("T")[0],

          shiftStartDT: utcStartDatetime,
          shiftEndDT: utcEndDatetime,

          rate: shift?.isHoliday ? selectedRate * 1.5 : selectedRate,
        };
        //   rate: facilities.find((obj) => obj?.id === facilityID)?.Billing
        //     ?.hourlyRate,
        // };
        //////
        // Extract values for clarity
        let startDate = shift?.date;
        // let endDate = startDate;
        let shiftStart = shift?.shiftStart;
        let shiftEnd = shift?.shiftEnd;

        // If the ending time is earlier than the starting time, adjust the end date to the next day
        if (moment(shiftEnd, "HH:mm").isBefore(moment(shiftStart, "HH:mm"))) {
          endDate = moment
            .tz(startDate, userTimezone)
            .add(1, "day")
            .format("YYYY-MM-DD");
        } else {
          endDate = moment(endDate).format("YYYY-MM-DD");
        }
        startDate = moment(startDate).format("YYYY-MM-DD");

        shiftStart = convertTimeToAWSTime(shiftStart, userTimezone);
        shiftEnd = convertTimeToAWSTime(shiftEnd, userTimezone);

        return {
          ...shift,
          facilityID: facilityID,
          shiftStart: shiftStart,
          shiftEnd: shiftEnd,
          date: startDate,
          shiftStartDT: moment
            .tz(`${startDate}T${shiftStart}`, userTimezone)
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          shiftEndDT: moment
            .tz(`${endDate}T${shiftEnd}`, userTimezone)
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          rate: facilities.find((obj) => obj?.id === facilityID)?.Billing
            ?.hourlyRate,
        };
      });
    const payload = {
      fileType: "json",
      jsonContent: JSON.stringify(flattenedShifts),
    };

    if (flattenedShifts?.length === 0) {
      ErrorToast("No shifts to upload");
      setIsPublishDisabled(false);
      return;
    }

    setFacilityID(null);

    // console.log(
    //   "🚀 ~ file: index.js:158 ~ handleUpload ~ flattenedShifts:",
    //   flattenedShifts
    // );

    // return;

    // console.log("To Publish Shifts", payload, flattenedShifts, facilityID);

    const apiResponse = await createBulkShifts(payload);
    console.log(
      "🚀 ~ file: index.js:163 ~ handleUpload ~ apiResponse:",
      apiResponse
    );

    // alert(apiResponse?.result?.body);

    if (apiResponse?.result?.statusCode === 200) {
      SuccessToast(
        `Successfully uploaded ${
          JSON.parse(apiResponse?.result?.body).length
        } shifts`
      );
    }

    // Notification processing
    const shift = flattenArray[0];
    const tempFetchedFacility = facilities?.find(
      (obj) => obj?.id === shift?.facilityID
    );

    const formedMessage_OLD = `${
      JSON.parse(apiResponse?.result?.body).length
    } New shift(s) created by ${
      myFacility?.facilityName ? tempFetchedFacility?.facilityName : "Instacare"
    } at ${tempFetchedFacility?.facilityName} on ${new Date()} `;

    // utcStartDatetime

    let formedMessage = `Subject: ${
      JSON.parse(apiResponse?.result?.body).length
    } New Shift Available\nThe following shft has been posted:\n\nFacility: ${
      tempFetchedFacility?.facilityName
    }\n\nTimestamp: ${
      displayDate(new Date()?.toISOString()) +
      " " +
      displayTime(new Date()?.toISOString())
    }`;

    const userInfo = `\nBy User: ${user?.attributes?.email}`;
    // // INTERNAL
    inAppNotificationsToPeople(
      "-1",
      ADD_SHIFT,
      "New shift was added on Instacare",
      formedMessage,
      createNotificationQuery
    );
    inApplNotificationToInstacare(
      ADD_SHIFT,
      "New shift was added on Instacare",
      formedMessage + userInfo,
      createNotificationQuery
    );
    inAppNotificationsToFacilityPeople(
      shift?.facilityID,
      ADD_SHIFT,
      "New shift was added on Instacare",
      formedMessage + userInfo,
      createNotificationQuery
    );

    // // // EXTERNAL
    externalNotificationToInstacare(formedMessage + userInfo, true, false); // Instacare
    sendNotificationsToFacilityPeople(
      shift?.facilityID,
      formedMessage + userInfo,
      true,
      false // test disabled
    ); // Facility

    setIsPublishDisabled(false);
  };

  function handleInputChange(index, pathOrUpdates, value, dayIndex) {
    console.log(
      `Setting [${pathOrUpdates}] of item at index [${index}] to [${value}]`
    );

    setShiftsArray((prevShiftsArray) => {
      const currentShift = prevShiftsArray[dayIndex][index];
      // console.log(
      //   "🚀 ~ file: index.js:269 ~ setShiftsArray ~ currentShift:",
      //   currentShift
      // );
      let updatedShift;

      if (typeof pathOrUpdates === "object") {
        // Handling update objects
        updatedShift = { ...currentShift, ...pathOrUpdates };
      } else {
        // Original logic for string paths
        const path = pathOrUpdates;

        if (path.includes(".")) {
          const [parent, child] = path.split(".");
          updatedShift = {
            ...currentShift,
            [parent]: {
              ...currentShift[parent],
              [child]: value,
            },
          };
        } else {
          updatedShift = {
            ...currentShift,
            [path]: value,
          };
        }
      }

      const updatedDayShifts = [...prevShiftsArray[dayIndex]];
      updatedDayShifts[index] = updatedShift;
      const updatedShiftsArray = [...prevShiftsArray];
      updatedShiftsArray[dayIndex] = updatedDayShifts;

      return updatedShiftsArray;
    });
  }

  useMemo(() => {
    if (myFacility) {
      setFacilityID(myFacility.id);
    }
  }, [myFacility]);

  const isDateInPast = (dateToCheck) => {
    if (dateToCheck) {
      // console.log(
      //   "🚀 ~ file: index.js:264 ~ isDateInPast ~ dateToCheck:",
      //   dateToCheck
      // );

      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      return (
        dateToCheck.getFullYear() < currentYear ||
        (dateToCheck.getFullYear() === currentYear &&
          dateToCheck.getMonth() < currentMonth) ||
        (dateToCheck.getFullYear() === currentYear &&
          dateToCheck.getMonth() === currentMonth &&
          dateToCheck.getDate() < currentDay)
      );
    }
    return false;
  };

  return (
    <div className="flex flex-col h-full w-full ">
      <div
        style={{ minHeight: "60px" }}
        className="w-full bg-white items-center flex flex-row justify-between relative"
      >
        <div style={{ width: "200px" }}>
          {myFacility ? null : (
            <DropDown
              placeholder={"Select Facility"}
              value={facilityID}
              setValue={(id) => {
                setFacilityID(id);
              }}
              options={facilities?.map((obj) => obj.id)}
              labels={facilities?.map((obj) => obj.facilityName)}
            />
          )}
        </div>

        <div className="h-full items-center flex flex-row gap-4 mr-20">
          <div onClick={prevMonth}>
            <PrevPageIcon />
          </div>
          <p style={{ fontSize: "18px", minWidth: "170px" }}>
            {monthNames[currentMonth]}, {currentYear}
          </p>
          <div onClick={nextMonth}>
            <NextPageIcon />
          </div>
        </div>

        <div>
          <Button
            children={"POST"}
            // onClick={handleUpload}
            onClick={() => {
              if (!facilityID) {
                ErrorToast("No facility selected");
                setIsPublishDisabled(false);
                return;
              } else {
                setShowConfirmModal(true);
              }
            }}
            disabled={isPublishDisabled}
          />
        </div>
      </div>
      <div
        style={{
          minHeight: "40px",
          backgroundColor: themeStyles?.PRIMARY_COLOR,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
          placeItems: "center",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        {days?.map((day, i) => (
          <p style={{ color: "white", fontSize: "13px" }} className="w-full">
            {day}
          </p>
        ))}
      </div>

      <div
        style={{
          overflowY: "scroll",
          maxHeight: "75%",
          opacity: facilityID ? 1 : 0.5,
          pointerEvents: !facilityID ? "none" : "", // Disable pointer events if it's in the past.
        }}
        className="w-full mt-1"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            placeItems: "center",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            flexWrap: "wrap",
            gap: "3px",
            height: "100%",
          }}
        >
          {shiftsArray?.map((shiftDailyList, dayIndex) => {
            return (
              <BulkShiftCard
                facilities={facilities}
                index={{ day: dayIndex }}
                shiftData={shiftDailyList}
                handleInputChange={handleInputChange}
                onUpdateShift={updateShiftObject}
                currentMonth={currentMonth}
                monthNames={monthNames}
                date={datesOfMonth[dayIndex]}
                disabled={isDateInPast(datesOfMonth[dayIndex])}
                createDefaultShift={createDefaultShift}
                facilityID={facilityID}
                key={dayIndex}
                addShiftToDate={addShiftToDate}
                removeShiftByIndex={removeShiftByIndex}
              />
            );
          })}
        </div>
      </div>

      {/* Add the ConfirmationModal component */}
      <ConfirmationModal
        modalIsOpen={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        message={"Are you sure you want to publish these shifts?"}
        warning={warningMessage}
        onConfirm={async () => {
          // deletedBulkShift();
          handleUpload();
          setShowConfirmModal(false);
        }}
        onCancel={() => {
          // Optionally clear selected shifts or other relevant state
          // console.log("Cancellation action");
          setShowConfirmModal(false);
        }}
      />
    </div>
  );
}

export default BulkShifts;
