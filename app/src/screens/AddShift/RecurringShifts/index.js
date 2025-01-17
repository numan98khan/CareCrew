import React, { useState, useMemo } from "react";
import Check from "../../../components/Check";
import RadioButton from "../../../components/Button/RadioButton";
import IconButton from "../../../components/Button/IconButton";
import DropDown from "../../../components/DropDown";
import Input from "../../../components/Input";

import { Roles } from "../../../constants/roles";
import DatePickerCustom from "../../../components/DatePicker";
import Button from "../../../components/Button/index";
import themeStyles from "../../../styles/theme.styles";
import TimePickerCustom from "../../../components/TimePicker";
import { createBulkShifts } from "../../../services/bulkUserCreation";
import {
  convertDateTimeToAWSDateTime,
  convertTimeToAWSTime,
  displayDate,
  displayTime,
  ErrorToast,
  SuccessToast,
} from "../../../services/micro";

import moment from "moment";
import { useAuth } from "../../../context";
import { ADMIN } from "../../../constants/userTypes";
import { userTimezone } from "../../../apolloql/timezone";

import { useCreateNotification } from "../../../apolloql/notifications";
import { ADD_SHIFT } from "../../../constants/notificationTypes";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { NotificationHub } from "../../../services/notifications/hub";

function RecurringShift({
  myFacility,
  facilities,
  shift,
  setShiftKey,
  setNestedShiftKey,
  publishAction,
  isPublishDisabled,
  setIsPublishDisabled,
}) {
  const { type, user } = useAuth();
  const { createNotificationQuery } = useCreateNotification();

  // Step 2: Define state for modal visibility
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // Optional: Define a state for the warning message if dynamic messages are needed
  const [warningMessage, setWarningMessage] = useState("");

  // Second Row
  const shiftTimes = [
    {
      name: "Morning Shift:  7:00AM - 3:00PM",
      startDate: "07:00:00.000Z",
      endDate: "15:00:00.000Z",
    },
    {
      name: "Noon Shift:  3:00PM - 11:00PM",
      startDate: "15:00:00.000Z",
      endDate: "23:00:00.000Z",
    },
    {
      name: "Night Shift:  11:00PM - 7:00AM",
      startDate: "23:00:00.000Z",
      endDate: "07:00:00.000Z",
    },
  ];

  // State for recurrence duration
  const [duration, setDuration] = useState(1);
  const durationOptions = [1, 2, 3, 4, 5, 6, 7, 8]; // weeks

  // const [recurrenceDuration, setRecurrenceDuration] = useState(1); // default to 1 week
  // const recurrenceOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // State for days of the week
  const [days, setDays] = useState([
    { day: "Sunday", checked: false },
    { day: "Monday", checked: false },
    { day: "Tuesday", checked: false },
    { day: "Wednesday", checked: false },
    { day: "Thursday", checked: false },
    { day: "Friday", checked: false },
    { day: "Saturday", checked: false },
  ]);

  const toggleDay = (index) => {
    const newDays = [...days];
    newDays[index].checked = !newDays[index].checked;
    setDays(newDays);
  };

  // State to hold the selected shift times
  const [selectedShiftTimes, setSelectedShiftTimes] = useState([]);

  const handleShiftTimeClick = (shiftTime) => {
    setSelectedShiftTimes([shiftTime]);
  };

  const floorOptions = useMemo(() => {
    return facilities
      .find((facility) => facility.id === shift?.facilityID)
      ?.floors?.map((floor) => floor.floorNumber);
  }, [shift?.facilityID]);

  const supervisorOptions = useMemo(() => {
    return facilities
      .find((facility) => facility.id === shift?.facilityID)
      ?.contacts?.map((contact) => contact.name);
  }, [shift?.facilityID]);

  const [isCustom, setIsCustom] = useState(false);

  useMemo(() => {
    if (myFacility) {
      setShiftKey("facilityID")(myFacility.id);

      const bobj = myFacility?.Billing;

      const selectedRate =
        shift?.roleRequired === "CNA"
          ? bobj?.hourlyRateCNA
          : shift?.roleRequired === "RN"
          ? bobj?.hourlyRateRN
          : bobj?.hourlyRateLPN;

      if (shift?.isHoliday) {
        setShiftKey("rate")(selectedRate * 1.5);
      } else {
        setShiftKey("rate")(selectedRate);
      }

      setNestedShiftKey("incentives", "incentiveBy")("Facility");
    } else {
      const bobj = facilities.find(
        (obj) => obj.id === shift?.facilityID
      )?.Billing;

      const selectedRate =
        shift?.roleRequired === "CNA"
          ? bobj?.hourlyRateCNA
          : shift?.roleRequired === "RN"
          ? bobj?.hourlyRateRN
          : bobj?.hourlyRateLPN;

      console.log(
        "🚀 ~ file: index.js:85 ~ useMemo ~ bobj:",
        bobj,
        selectedRate
      );

      if (shift?.isHoliday) {
        setShiftKey("rate")(selectedRate * 1.5);
      } else {
        setShiftKey("rate")(selectedRate);
      }
    }
  }, [myFacility, shift?.facilityID, shift?.roleRequired]);

  // const handleUpload = async () => {
  //   const flattenArray = []

  // };

  const formatDateToAWS = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-11 for JavaScript dates
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const validateShiftInput = (input) => {
    const errors = [];

    if (!input?.facilityID) {
      errors.push("Facility not selected.");
    }
    if (!input?.roleRequired) {
      errors.push("Role not selected.");
    }
    if (/^0/.test(String(input.numOfPositions))) {
      errors.push("Number of positions can't start from 0.");
      return errors;
    }
    if (
      !Number.isInteger(Number(input.numOfPositions)) ||
      Number(input.numOfPositions) <= 0
    ) {
      errors.push("Select numer of positions.");
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

    // ... Add more checks for other fields ...

    return errors;
  };

  const isValidShift = (input, userTimezone) => {
    const validationErrors = validateShiftInput(input);

    if (validationErrors.length > 0) {
      return { isValid: false, error: validationErrors.join("\n") };
    }

    const utcStartDatetimeObj = moment
      .tz(`${input?.shiftStartDT}`, userTimezone)
      .utc();

    const currentDate = moment.utc();

    if (type !== ADMIN) {
      if (utcStartDatetimeObj.isBefore(currentDate)) {
        return { isValid: false, error: "Shift starts in the past." };
      }
    }

    return { isValid: true };
  };

  const handleUpload = async () => {
    setIsPublishDisabled(true);
    console.log(shift);
    const flattenedArray = [];
    const validationErrors = [];

    // const errors = validateShiftInput(shift);

    // if (errors.length > 0) {
    //   ErrorToast(errors.join("\n"));
    //   setIsPublishDisabled(false);
    //   return;
    // }

    // Generate dates for the specified duration
    const generateDates = (startDate, durationWeeks) => {
      const dates = [];
      for (let i = 0; i < durationWeeks * 7; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + i);
        dates.push(newDate);
      }
      return dates;
    };

    // const currentDate = new Date();
    // const userTimezone = userTimezone;

    const shiftStart = convertTimeToAWSTime(shift.shiftStart, userTimezone);
    const shiftEnd = convertTimeToAWSTime(shift.shiftEnd, userTimezone);

    const currentDate = new Date(shift?.date);
    const allDates = generateDates(currentDate, duration);

    // for (let date of allDates) {
    //   const dayName = new Intl.DateTimeFormat("en-US", {
    //     weekday: "long",
    //   }).format(date);
    //   const dayObject = days.find((d) => d.day === dayName);

    //   if (dayObject && dayObject.checked) {
    //     const awsDate = formatDateToAWS(date);
    //     const newdate = convertDateTimeToAWSDateTime(
    //       awsDate + "T" + shift.shiftStart,
    //       userTimezone
    //     ).split("T")[0];

    //     const shiftForDate = {
    //       ...shift,
    //       date: newdate,
    //       shiftStart: shiftStart,
    //       shiftEnd: shiftEnd,
    //       shiftStartDT: moment
    //         .tz(`${newdate}T${shiftStart}`, userTimezone)
    //         .utc()
    //         .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    //       shiftEndDT: moment
    //         .tz(`${newdate}T${shiftEnd}`, userTimezone)
    //         .utc()
    //         .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    //     };

    //     const validation = isValidShift(shiftForDate, userTimezone);

    //     if (validation.isValid) {
    //       flattenedArray.push(shiftForDate);
    //     } else {
    //       validationErrors.push(`${awsDate}: ${validation.error}`);
    //     }
    //   }
    // }

    for (let date of allDates) {
      const dayName = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(date);
      const dayObject = days.find((d) => d.day === dayName);

      if (dayObject && dayObject.checked) {
        const awsDate = formatDateToAWS(date);
        // console.log(
        //   "🚀 ~ file: index.js:302 ~ handleUpload ~ awsDate:",
        //   awsDate
        // );
        // Check if endTime is before startTime
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
        // console.log(
        //   "🚀 ~ file: index.js:339 ~ handleUpload ~ utcEndDatetime:",
        //   utcEndDatetime,
        //   `${awsDate}T${
        //     shift.shiftStart.endsWith("Z")
        //       ? shift.shiftStart.slice(0, -1)
        //       : shift.shiftStart
        //   }`
        // );

        // const {data} = await createShiftMutation({
        //   variables: {input: input},
        // });
        const shiftForDate = {
          ...shift,
          shiftStart: convertTimeToAWSTime(shift.shiftStart, userTimezone),
          shiftEnd: convertTimeToAWSTime(shift.shiftEnd, userTimezone),
          date: convertDateTimeToAWSDateTime(
            awsDate + "T" + shift.shiftStart,
            userTimezone
          ).split("T")[0],

          shiftStartDT: utcStartDatetime,
          shiftEndDT: utcEndDatetime,
        };

        // console.log(
        //   "🚀 ~ file: index.js:344 ~ handleUpload ~ shiftForDate:",
        //   shiftForDate
        // );

        const validation = isValidShift(shiftForDate, userTimezone);

        // const awsDate = formatDateToAWS(date);
        if (validation.isValid) {
          flattenedArray.push(shiftForDate);
        } else {
          validationErrors.push(`${awsDate}: ${validation.error}`);
        }
      }

      if (dayObject && dayObject.checked && false) {
        const awsDate = formatDateToAWS(date);
        const newdate = convertDateTimeToAWSDateTime(
          awsDate + "T" + shift.shiftStart,
          userTimezone
        ).split("T")[0];

        let shiftEndDateTime = moment.tz(
          `${newdate}T${shiftEnd}`,
          userTimezone
        );

        // Check if shiftEnd is before shiftStart, and if so, add 1 day to shiftEnd
        if (shiftEnd < shift.shiftStart) {
          shiftEndDateTime.add(1, "days");
        }

        const shiftForDate = {
          ...shift,
          date: newdate,
          shiftStart: shiftStart,
          shiftEnd: shiftEnd,
          shiftStartDT: moment
            .tz(`${newdate}T${shiftStart}`, userTimezone)
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          shiftEndDT: shiftEndDateTime
            .utc()
            .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        };

        const validation = isValidShift(shiftForDate, userTimezone);

        if (validation.isValid) {
          flattenedArray.push(shiftForDate);
        } else {
          validationErrors.push(`${awsDate}: ${validation.error}`);
        }
      }
    }

    // console.log(
    //   "🚀 ~ file: index.js:302 ~ handleUpload ~ flattenedArray:",
    //   flattenedArray
    // );

    if (validationErrors.length > 0) {
      ErrorToast(validationErrors.join("\n"));
      setIsPublishDisabled(false);
      return;
    }

    const payload = {
      fileType: "json",
      jsonContent: JSON.stringify(flattenedArray),
    };

    const apiResponse = await createBulkShifts(payload);
    if (apiResponse?.result?.statusCode === 200) {
      SuccessToast(
        `Successfully uploaded ${
          JSON.parse(apiResponse?.result?.body).length
        } shifts`
      );
    }

    // Notification processing

    await NotificationHub.sendRecurringShiftAddNotifications({
      apiResponse,
      shift,
      facilities,
      myFacility,
      user,
      createNotificationQuery,
    });

    setIsPublishDisabled(false);
  };

  const isDayInPast = (dayName) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for 'today'

    const shiftStartDate = new Date(shift?.date);
    shiftStartDate.setHours(0, 0, 0, 0); // Set time to midnight for 'shiftStartDate'

    // If the shift's start date is before today, all days are in the past.
    if (shiftStartDate < today) return true;

    // If the shift's start date is after today, no day is in the past.
    if (shiftStartDate > today) return false;

    // If we reach here, the shift's start date is today.
    // We now check if the dayName is before today's day of the week.
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const todayIndex = today.getDay();
    const dayIndex = daysOfWeek.indexOf(dayName);

    return dayIndex < todayIndex;
  };

  const getDateForDay = (dayName, startDate) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const startDayIndex = daysOfWeek.indexOf(
      new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(startDate)
    );
    const targetDayIndex = daysOfWeek.indexOf(dayName);

    const difference = targetDayIndex - startDayIndex;
    const targetDate = new Date(startDate);

    if (difference >= 0) {
      targetDate.setDate(targetDate.getDate() + difference);
    } else {
      targetDate.setDate(targetDate.getDate() + 7 + difference); // move to next week
    }

    return targetDate;
  };

  return (
    <div className="flex flex-col p-4 space-y-4 h-full justify-between">
      {/* First Row */}
      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-4">
          {
            myFacility === null ? (
              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">
                  {"Facility"}
                </label>
                <div className="my-1" />

                <DropDown
                  placeholder={"Select Facility"}
                  value={shift?.facilityID}
                  setValue={(facilityID) => {
                    setShiftKey("facilityID")(facilityID);
                    // setShiftKey("rate")(
                    //   facilities.find((obj) => obj.id === facilityID)?.Billing
                    //     ?.hourlyRate
                    // );
                  }}
                  options={facilities.map((obj) => obj.id)}
                  labels={facilities.map((obj) => obj.facilityName)}
                />
              </div>
            ) : null
            // <div className="flex flex-col"><label className="">{myFacility?.facilityName}</label></div>
          }

          <div className="flex flex-col">
            <label className="text-xs text-start font-bold">{"Role"}</label>
            <div className="my-1" />
            <DropDown
              placeholder={"Select Role"}
              value={shift?.roleRequired}
              setValue={setShiftKey("roleRequired")}
              options={Roles}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-start font-bold">{"Quantity"}</label>
            <div className="my-1" />

            <Input
              type="number"
              placeholder="Select Number of Positions"
              value={shift?.numOfPositions}
              setValue={setShiftKey("numOfPositions")}
            />
          </div>

          <div className="flex flex-row space-x-1">
            <div className="flex flex-col">
              <label className="text-xs text-start font-bold">{"Date"}</label>
              <div className="my-1" />

              <DatePickerCustom
                date={shift.date}
                onChange={setShiftKey("date")}
                // onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-start font-bold">
                Recur Duration (weeks)
              </label>
              <div className="my-1" />
              <DropDown
                placeholder={"Select Duration"}
                value={duration}
                setValue={setDuration}
                options={durationOptions}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col p-2">
          <label className="text-xs text-start font-bold">
            Recurring Dates of the week
          </label>
          <div className="flex flex-row py-4">
            {days.map((dayObj, i) => {
              const dayDate = getDateForDay(dayObj.day, new Date(shift?.date));
              console.log(
                "🚀 ~ file: index.js:507 ~ {days.map ~ dayDate:",
                dayDate
              );
              const formattedDate = `${dayDate.getFullYear()}-${String(
                dayDate.getMonth() + 1
              ).padStart(2, "0")}-${String(dayDate.getDate()).padStart(
                2,
                "0"
              )}`; // e.g., Monday 2023-09-18

              const dayInPast =
                type === ADMIN ? false : isDayInPast(dayObj.day);

              return (
                <div
                  className={`flex flex-col mr-8 ${
                    dayInPast ? "opacity-50" : ""
                  }`}
                >
                  <Check
                    onChange={() => !dayInPast && toggleDay(i)}
                    value={dayObj.checked}
                    disabled={dayInPast}
                  />

                  <div className="items-center">
                    <span className="text-RADIO_LABEL_COLOR text-xs flex">
                      {dayObj.day}
                    </span>
                    {shift?.date && (
                      <span className="text-RADIO_LABEL_COLOR text-xs flex">
                        {formattedDate}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-3 gap-20">
          {/* First Column */}
          <div className="flex flex-col space-y-4">
            <div
              className="flex flex-col space-y-4"
              style={
                isCustom ? { pointerEvents: "none", opacity: "0.4" } : null
              }
            >
              <label className="text-xs text-start font-bold">Shift Time</label>

              {shiftTimes.map((item, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => {
                    handleShiftTimeClick(item.name);
                    setShiftKey("shiftStart")(item.startDate);
                    setShiftKey("shiftEnd")(item.endDate);
                  }}
                >
                  <Check
                    onChange={() => null}
                    value={selectedShiftTimes.includes(item.name)}
                  />
                  <span className="text-xs text-start">{item.name}</span>
                </label>
              ))}
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-xs text-start font-bold">
                Rate (per hour){" "}
              </label>
              <Input
                placeholder="Rate"
                value={shift.rate}
                setValue={setShiftKey("rate")}
                disabled={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-start font-bold">
                Cancellation Guarantee
              </label>
              <div className="flex space-x-4 ml-2.5 items-center">
                <RadioButton
                  children="Yes"
                  checked={shift.cancellationGuarantee}
                  onChange={() => {
                    setShiftKey("cancellationGuarantee")(true);
                  }}
                />
                <RadioButton
                  children="No"
                  checked={!shift.cancellationGuarantee}
                  onChange={() => setShiftKey("cancellationGuarantee")(false)}
                />
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col space-y-4">
            <label className="flex items-center space-x-2">
              <Check
                value={isCustom}
                onChange={() => {
                  setSelectedShiftTimes([]);
                  setIsCustom(!isCustom);
                }}
              />
              <span>Custom</span>
            </label>
            <div className="flex flex-row space-x-4 w-full">
              <div className="flex-grow">
                <label className="text-xs w-full text-left font-bold">
                  Start Time
                </label>
                <div className="flex justify-around">
                  <TimePickerCustom
                    time={shift.shiftStart}
                    onChange={(date) => {
                      return setShiftKey("shiftStart")(date);
                    }}
                    disabled={!isCustom}
                  />
                </div>
              </div>

              <div className="flex-grow">
                <label className="text-xs text-start font-bold">End Time</label>
                <div className="flex justify-around w-full">
                  <TimePickerCustom
                    time={shift.shiftEnd}
                    onChange={(date) => setShiftKey("shiftEnd")(date)}
                    disabled={!isCustom}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-start font-bold">
                {"Floor Number"}
              </label>
              <div className="my-1" />
              <DropDown
                placeholder={"Floor No."}
                value={shift?.floorNumber}
                setValue={setShiftKey("floorNumber")}
                options={floorOptions}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-start font-bold">
                {"Supervisor"}
              </label>
              <div className="my-1" />
              <DropDown
                placeholder={"Supervisor Name"}
                value={shift?.supervisor}
                setValue={setShiftKey("supervisor")}
                options={supervisorOptions}
              />
            </div>
          </div>

          {/* Third Column */}
          <div className="flex flex-col space-y-4">
            <div>
              <label className="text-xs text-start font-bold">Incentives</label>
              <div className="flex space-x-4 items-center">
                <div className="flex space-x-4 ml-2.5 items-center">
                  <RadioButton
                    children="Yes"
                    checked={shift.isIncentive}
                    onChange={() => setShiftKey("isIncentive")(true)}
                  />
                  <RadioButton
                    children="No"
                    checked={!shift.isIncentive}
                    onChange={() => setShiftKey("isIncentive")(false)}
                  />
                </div>

                {myFacility
                  ? null
                  : shift.isIncentive && (
                      <DropDown
                        placeholder={"Select Provider"}
                        value={shift?.incentives?.incentiveBy}
                        setValue={setNestedShiftKey(
                          "incentives",
                          "incentiveBy"
                        )}
                        options={["CareCrew", "Facility"]}
                      />
                    )}
              </div>
            </div>

            {shift.isIncentive && (
              <div>
                <label className="text-xs text-start font-bold">
                  Incentive Type
                </label>
                <div className="flex space-x-4 items-center">
                  <RadioButton
                    children="$/hr"
                    checked={shift?.incentives?.incentiveType === "$/hr"}
                    onChange={() =>
                      setNestedShiftKey("incentives", "incentiveType")("$/hr")
                    }
                  />
                  <RadioButton
                    children="Fixed"
                    checked={shift?.incentives?.incentiveType === "fixed"}
                    onChange={() =>
                      setNestedShiftKey("incentives", "incentiveType")("fixed")
                    }
                  />
                  {/* <RadioButton children="$/hr" />
              <RadioButton children="Fixed" /> */}
                  {/* <input
                className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2 w-full"
                value={10}
              /> */}
                  <Input
                    // multiline
                    placeholder={"Incentive Amount"}
                    value={shift?.incentives?.incentiveAmount}
                    setValue={setNestedShiftKey(
                      "incentives",
                      "incentiveAmount"
                    )}
                    type={"number"}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <label className="text-xs text-start font-bold">Notes</label>

              <Input
                multiline
                placeholder={"Notes"}
                value={shift?.incentives?.notes}
                setValue={setNestedShiftKey("incentives", "notes")}
              />
              {/* <textarea className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2"></textarea> */}
            </div>
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="flex mt-auto justify-between w-1/4">
        {" "}
        <Button
          children={"POST"}
          onClick={() => {
            const errors = validateShiftInput(shift);

            if (errors.length > 0) {
              ErrorToast(errors.join("\n"));
              setIsPublishDisabled(false);
              return;
            } else {
              setShowConfirmModal(true);
            }
            // handleUpload();
          }}
          disabled={isPublishDisabled}
        />
        <div className="mx-1" />
        <Button
          children={"CANCEL"}
          onClick={() => {
            console.log(shift);
          }}
          color={themeStyles.GRAY}
        />
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

export default RecurringShift;
