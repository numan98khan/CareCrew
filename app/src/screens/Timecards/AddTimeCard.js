import React, { useState, useMemo, useEffect } from "react";
import Check from "../../components/Check";
import RadioButton from "../../components/Button/RadioButton";
import IconButton from "../../components/Button/IconButton";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import { Roles } from "../../constants/roles";
import DatePickerCustom from "../../components/DatePicker";
import Button from "../../components/Button/index";
import themeStyles from "../../styles/theme.styles";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/Headers/PageHeader";

import moment from "moment"; // Install moment for easier date and time manipulations

import { API, graphqlOperation, Auth } from "aws-amplify";
import { createManualTimecard } from "../../graphql/mutations";
import { useListPeople } from "../../apolloql/people";
import { useListFacilities } from "../../apolloql/facilities";
import {
  useListTimecards,
  useListUpcomingTimecards,
} from "../../apolloql/timecards";

import {
  ErrorToast,
  SuccessToast,
  convertAWSDateTimeToLocal,
  convertAWSDateToLocalDate,
  displayDate,
  displayTime,
  formatDate,
  formatTime,
} from "../../services/micro";

import { EMPLOYEE } from "../../constants/userTypes";
import {
  useCreateManualTimecard,
  useUpdateManualTimecard,
} from "../../apolloql/manualtimecards";
import TimePickerCustom from "../../components/TimePicker";
import { getShifts } from "../../graphql/queries";
import { userTimezone } from "../../apolloql/timezone";

const acceptedShifts = [
  "7:00AM - 3:00PM",
  "3:00PM - 11:00PM",
  "11:00PM - 7:00AM",
];

function AddTimeCard() {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(
  //   "🚀 ~ file: AddTimeCard.js:43 ~ AddTimeCard ~ location:",
  //   location
  // );

  const [card, setCard] = useState(
    location?.state || {
      clockInTime: null,
      clockOutTime: null,
      // role: "RN",
      role: null,
      notes: null,

      isBreak: false,

      timeType: null,
      hours: null,
      minutes: null,
      status: "Process",
      address: null,

      // acceptedShifts: "7:00AM - 3:00PM",
      peopleID: null,
      // peopleID: "9478b4c8-80d1-7022-0419-7b8c9880b60c",
      facilityID: null,
    }
  );

  useEffect(() => {
    if (
      card.startDate &&
      card.endDate &&
      card.clockInTime &&
      card.clockOutTime
    ) {
      const startDateTime = moment(`${card.startDate} ${card.clockInTime}`);
      const endDateTime = moment(`${card.endDate} ${card.clockOutTime}`);
      if (endDateTime.isBefore(startDateTime)) {
        console.log(
          "🚀 ~ file: AddTimeCard.js:92 ~ useEffect ~ startDateTime:",
          startDateTime.toISOString(),
          endDateTime.toISOString()
        );

        // Resetting the end date and time to null as an example:
        // setCard((prevCard) => ({
        //   ...prevCard,
        //   endDate: null,
        //   clockOutTime: null,
        // }));
        // Or, show an error message
        // alert("End datetime cannot be earlier than start datetime");
      }
    }
  }, [card]);

  const { createManualTimecardQuery } = useCreateManualTimecard();
  const { updateManualTimecardQuery } = useUpdateManualTimecard();

  const { people } = useListPeople();
  // const { timecards } = useListTimecards(card?.peopleID);

  const { timecards } = useListUpcomingTimecards(card?.peopleID || -1, true);

  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      // Replace this condition with your actual filter condition
      return person.type === EMPLOYEE;
    });
  }, [people]);

  const { facilities } = useListFacilities();
  const filteredFacilities = useMemo(() => {
    return facilities?.filter((facility) => {
      // Replace this condition with your actual filter condition
      return true;
    });
  }, [facilities]);

  const acceptedShifts = useMemo(() => {
    // TODO: add the facilityID check in here didn't do it before because had to jump from shiftID
    if (!card?.peopleID) return [];
    // console.log(
    //   "🚀 ~ file: AddTimeCard.js:86 ~ returntimecards.filter ~ timecards:",
    //   timecards
    // );
    console.log(
      "🚀 ~ file: AddTimeCard.js:178 ~ acceptedShifts ~ timecards:",
      timecards
    );

    return timecards
      .filter((timecard) => {
        // Replace this condition with your actual filter condition
        return (
          timecard?.facility?.id === card.facilityID && timecard?.clockInTime
        );
      })
      .map((obj) => {
        // clockInTime: timecard.clockInTime
        //         ? convertDateTimeToLocal(timecard.clockInTime, userTimezone)
        //         : null,
        // clockOutTime: timecard.clockOutTime
        //   ? convertDateTimeToLocal(timecard.clockOutTime, userTimezone)
        //   : null,

        const temp = {
          ...obj,
          clockInTime: obj.clockInTime
            ? convertAWSDateTimeToLocal(obj.clockInTime, userTimezone)
            : null,
          clockOutTime: obj.clockOutTime
            ? convertAWSDateTimeToLocal(obj.clockOutTime, userTimezone)
            : null,
          startDate: obj?.shift?.shiftStartDT
            ? convertAWSDateToLocalDate(obj?.shift?.shiftStartDT, userTimezone)
            : null,
          endDate: obj?.shift?.shiftEndDT
            ? convertAWSDateToLocalDate(obj?.shift?.shiftEndDT, userTimezone)
            : null,
        };

        // console.log("🚀 ~ file: AddTimeCard.js:159 ~ .map ~ temp:", temp);

        return temp;

        // return { ...obj };
      });
  }, [card?.peopleID, card?.facilityID, timecards]);

  // Update a single key in the people object
  const setCardKey = (key) => (newValue) =>
    setCard((prevShift) => ({ ...prevShift, [key]: newValue }));

  useMemo(() => {
    if (location?.state) {
      const originalShift = location?.state;

      setCardKey("acceptedShifts")(originalShift?.timecardID);
      const removeTrailingZAndDate = (timeStr) => {
        if (!timeStr) return null;

        const cleanedTimeStr = timeStr;

        // Split by 'T' to separate date and time, then take only the time part
        const [, timeOnly] = cleanedTimeStr.split("T");
        return timeOnly;
      };

      console.log(
        "🚀 ~ file: AddTimeCard.js:117 ~ useMemo ~ originalShift:",
        originalShift
      );

      setCardKey("clockInTime")(
        removeTrailingZAndDate(originalShift?.clockInTime)
      );
      setCardKey("clockOutTime")(
        removeTrailingZAndDate(originalShift?.clockOutTime)
      );

      setCardKey("role")(originalShift?.shift?.roleRequired);
    }
  }, [location?.state]);

  useMemo(() => {
    if (!location?.state) {
      const originalShift = acceptedShifts?.find(
        (obj) => obj?.id === card.acceptedShifts
      );
      console.log(
        "🚀 ~ file: AddTimeCard.js:215 ~ useMemo ~ originalShift:",
        originalShift
      );

      const removeTrailingZAndDate = (timeStr) => {
        if (!timeStr) return null;

        const cleanedTimeStr = timeStr;

        // Split by 'T' to separate date and time, then take only the time part
        const [, timeOnly] = cleanedTimeStr.split("T");
        return timeOnly;
      };

      // setCardKey("facilityID")(originalShift?.facilityID);

      setCardKey("clockInTime")(
        removeTrailingZAndDate(originalShift?.clockInTime)
      );

      if (!card?.clockOutTime) {
        setCardKey("clockOutTime")(
          removeTrailingZAndDate(originalShift?.clockOutTime)
        );
      }

      setCardKey("startDate")(
        convertAWSDateToLocalDate(
          originalShift?.shift?.shiftStartDT,
          userTimezone
        )
      );

      if (!card?.clockOutTime) {
        setCardKey("endDate")(
          convertAWSDateToLocalDate(
            originalShift?.shift?.shiftEndDT,
            userTimezone
          )
        );
      }

      setCardKey("role")(originalShift?.shift?.roleRequired);
    }
  }, [card?.acceptedShifts]);

  useEffect(() => {
    if (!location?.state) {
      const originalShift = acceptedShifts?.find(
        (obj) => obj?.id === card.acceptedShifts
      );
      // console.log("🚀 CARD", card);
    }
  }, [card]);
  const adjustDuration = (hours, mins) => {
    let totalMins = hours * 60 + mins;

    let tempBreak = false;

    if (totalMins >= 6 * 60) {
      // if more than or equal to 6 hours
      totalMins -= 30; // deduct 30 mins
      tempBreak = true;
    }

    const adjustedHours = Math.floor(totalMins / 60);
    const adjustedMins = totalMins % 60;

    return { adjustedHours, adjustedMins, tempBreak };
  };

  useMemo(() => {
    const startDate = card?.startDate; // Replace with the actual value
    const endDate = card?.endDate; // Replace with the actual value
    const clockInTime = card?.clockInTime; // Replace with the actual value
    const clockOutTime = card?.clockOutTime; // Replace with the actual value

    const format = "YYYY-MM-DDTHH:mm:ss"; // The format for combining date and time

    const combinedClockIn = moment(`${startDate}T${clockInTime}`, format);
    const combinedClockOut = moment(`${endDate}T${clockOutTime}`, format);

    const durationInMilliseconds = combinedClockOut.diff(combinedClockIn);
    const durationInMinutes = Math.floor(
      moment.duration(durationInMilliseconds).asMinutes()
    );

    // Convert total minutes to hours and minutes
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    const {
      adjustedHours,
      adjustedMins,
      tempBreak: isBreak,
    } = adjustDuration(hours, minutes);

    setCardKey("hours")(adjustedHours);
    setCardKey("minutes")(adjustedMins);
    setCardKey("isBreak")(isBreak);

    // console.log(`Duration is ${hours} hours and ${minutes} minutes`);
  }, [card?.startDate, card?.endDate, card?.clockInTime, card?.clockOutTime]);

  const timecardFormValidation = (timecardDetails) => {
    // Logic for checking if timecard exists already

    // Convert these strings to Date objects
    const startDate = new Date(timecardDetails?.startDate);
    const endDate = new Date(timecardDetails?.endDate);

    // Check if startDateTime is not greater than endDateTime
    if (startDate > endDate) {
      // startDateTime is greater than or equal to endDateTime, show an error
      ErrorToast("Start date cannot be greater than or equal to end date");
      return null;
    }
    const startDateTime = new Date(
      startDate?.toISOString().split("T")[0] +
        "T" +
        timecardDetails?.clockInTime
    );

    const endDateTime = new Date(
      endDate?.toISOString().split("T")[0] + "T" + timecardDetails?.clockOutTime
    );
    // console.log(
    //   "🚀 ~ file: AddTimeCard.js:339 ~ timecardFormValidation ~ timecardDetails:",
    //   timecardDetails,
    //   startDateTime,
    //   endDateTime
    // );
    // Check if startDateTime is not greater than endDateTime
    if (startDateTime > endDateTime) {
      // startDateTime is greater than or equal to endDateTime, show an error
      ErrorToast("Start time cannot be greater than or equal to end time");
      return null;
    }

    if (!timecardDetails?.facilityID) {
      ErrorToast("Please select a facility.");
      return null;
    }
    if (!timecardDetails?.peopleID) {
      ErrorToast("Please select an employee.");
      return null;
    }

    // if (!timecardDetails?.id) {
    //   ErrorToast("Please select an accepted shift.");
    //   return null;
    // }
    // if (!timecardDetails?.timeType) {
    //   ErrorToast("Please select a time type.");
    //   return null;
    // }
    if (!timecardDetails?.startDate) {
      ErrorToast("Please select a start date.");
      return null;
    }
    if (!timecardDetails?.endDate) {
      ErrorToast("Please select an end date.");
      return null;
    }

    if (!timecardDetails?.clockInTime) {
      ErrorToast("Please select a start time.");
      return null;
    }
    if (!timecardDetails?.clockOutTime) {
      ErrorToast("Please select an end time.");
      return null;
    }

    // if (timecardDetails?.hours === null) {
    //   ErrorToast("Please select the number of hours worked.");
    //   return null;
    // }
    // if (timecardDetails?.minutes === null) {
    //   ErrorToast("Please select the number of minutes worked.");
    //   return null;
    // }

    return true;
  };

  const publishTimecards = async () => {
    const { acceptedShifts: as_, address, ...timecardDetails } = card;
    // const { acceptedShifts, address, ...timecardDetails } = card;

    if (!timecardFormValidation(timecardDetails)) {
      return null;
    }

    const listManualTimecards = /* GraphQL */ `
      query ListManualTimecards(
        $filter: ModelManualTimecardFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listManualTimecards(
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            id
            timecardID
            _deleted
          }
          nextToken
          startedAt
          __typename
        }
      }
    `;
    const existingTimecard = await API.graphql(
      graphqlOperation(listManualTimecards, {
        filter: {
          timecardID: {
            eq: as_,
          },
          _deleted: {
            ne: true,
          },
        },
      })
    );

    // console.log(
    //   "🚀 ~ file: AddTimeCard.js:257 ~ publishTimecards ~ existingTimecard:",
    //   existingTimecard
    // );

    if (existingTimecard?.data?.listManualTimecards?.items.length) {
      ErrorToast("You are trying to create a duplicate timecard.");
      return null;
    }

    if (!as_) {
      ErrorToast("Please select an accepted shift.");
      return null;
    }

    const removeTrailingZ = (timeStr) => {
      if (!timeStr) return null;
      // Remove 'Z' if it's at the end
      const cleanedTimeStr = timeStr.endsWith("Z")
        ? timeStr.slice(0, -1)
        : timeStr;

      return cleanedTimeStr;
      // const cleanedTimeStr = timeStr;

      // Split by 'T' to separate date and time, then take only the time part
      // const [, timeOnly] = cleanedTimeStr.split("T");
      // return timeOnly;
    };

    const originalShift = acceptedShifts?.find((obj) => obj?.id === as_);
    // console.log(
    //   "🚀 ~ file: AddTimeCard.js:399 ~ publishTimecards ~ originalShift:",
    //   originalShift
    // );
    const shiftData = (
      await API.graphql(
        graphqlOperation(getShifts, { id: originalShift?.shiftsID })
      )
    )?.data?.getShifts;
    const personData = filteredPeople?.find(
      (obj) => obj?.id === timecardDetails?.peopleID
    );

    Object.assign(timecardDetails, {
      // id: as_,
      invoiceProcessedFacility: false,
      invoiceProcessedEmployee: false,
      // isBreak: isBreak,
      timecardID: as_,
      clockInTime: removeTrailingZ(
        timecardDetails?.startDate + "T" + timecardDetails?.clockInTime
      ),
      clockOutTime: timecardDetails?.clockOutTime
        ? removeTrailingZ(
            timecardDetails?.startDate + "T" + timecardDetails?.clockOutTime
          )
        : null,

      rate: shiftData?.rate,
      isOvertime: originalShift?.isOvertime,
      peopleSurrogateID: personData?.surrogateID,
      payrollCycle: personData?.payrollCycle,
      incentiveAmount: originalShift?.incentives?.incentiveAmount,
      incentiveBy: originalShift?.incentives?.incentiveBy,
      incentiveType: originalShift?.incentives?.incentiveType,
    });

    console.log(
      "🚀 ~ file: AddTimeCard.js:465 ~ publishTimecards ~ timecardDetails:",
      timecardDetails
    );

    if (!timecardFormValidation(timecardDetails)) {
      return null;
    }

    // return;
    try {
      // await subtractPosition(timecardDetails?.shiftsID, errorMessage, success);
      const newTimecard = await createManualTimecardQuery(
        timecardDetails,
        timecardDetails?.peopleID,
        originalShift?.facility?.facilityName
      );
      // console.log("New timecard created", newTimecard);
      SuccessToast("Manual Timecard Created");

      navigate("/timecard");
      return newTimecard;
    } catch (error) {
      // console.error("Error creating timecard", error);
      // ErrorToast("Error creating manual timecard " + error);

      console.error("Error creating timecard", error);
      if (error.message.includes("The conditional request failed")) {
        // Check error message or other property to determine if it's a duplicate ID error
        ErrorToast("Duplicate detected. Cannot create timecard.");
      } else {
        ErrorToast("Error creating manual timecard: " + error.message);
      }
      return;
    }
  };

  const updateTimecard = async () => {
    const {
      acceptedShifts: as_,
      address,
      Timecard,
      facility,
      people,
      updatedAt,
      createdAt,
      __typename,
      _deleted,
      _lastChangedAt,
      manualTimecardTimecardId,

      ...timecardDetails
    } = card;

    if (!timecardFormValidation(timecardDetails)) {
      return null;
    }

    // const { acceptedShifts, address, ...timecardDetails } = card;

    const removeTrailingZ = (timeStr) => {
      if (!timeStr) return null;
      // Remove 'Z' if it's at the end
      const cleanedTimeStr = timeStr.endsWith("Z")
        ? timeStr.slice(0, -1)
        : timeStr;

      return cleanedTimeStr;
      // const cleanedTimeStr = timeStr;

      // Split by 'T' to separate date and time, then take only the time part
      // const [, timeOnly] = cleanedTimeStr.split("T");
      // return timeOnly;
    };

    Object.assign(timecardDetails, {
      id: timecardDetails?.id,
      timecardID: as_,
      _version: timecardDetails?._version,
      clockInTime: removeTrailingZ(
        timecardDetails?.startDate + "T" + timecardDetails?.clockInTime
      ),
      clockOutTime: timecardDetails?.clockOutTime
        ? removeTrailingZ(
            timecardDetails?.startDate + "T" + timecardDetails?.clockOutTime
          )
        : null,
    });

    if (!timecardFormValidation(timecardDetails)) {
      return null;
    }

    const originalShift = acceptedShifts?.find((obj) => obj?.id === as_);

    console.log(
      "🚀 ~ file: AddTimeCard.js:136 ~ publishTimecards ~ timecardDetails:",
      timecardDetails
    );

    // return;
    try {
      // await subtractPosition(timecardDetails?.shiftsID, errorMessage, success);
      const newTimecard = await updateManualTimecardQuery(
        timecardDetails,
        timecardDetails?.peopleID,
        originalShift?.facility?.facilityName
      );
      // console.log("New timecard created", newTimecard);
      SuccessToast("Manual Timecard Created");

      navigate("/timecard");
      return newTimecard;
    } catch (error) {
      // console.error("Error creating timecard", error);
      // ErrorToast("Error creating manual timecard " + error);

      console.error("Error creating timecard", error);
      if (error.message.includes("The conditional request failed")) {
        // Check error message or other property to determine if it's a duplicate ID error
        ErrorToast("Duplicate detected. Cannot create timecard.");
      } else {
        ErrorToast("Error creating manual timecard: " + error.message);
      }
      return;
    }
  };

  return (
    <div className="flex flex-col h-full px-3 pb-3">
      {/* </> */}
      <div className="flex flex-col">
        <div className="flex py-1 justify-between">
          <div className="flex items-center">
            <PageHeader text={"Add Timecard"} />
          </div>
        </div>
        <div className="h-full bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between">
          <div className="flex flex-col p-4 space-y-4 h-full justify-between">
            {/* First Row */}

            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">
                  {"Employee"}
                </label>
                <div className="my-1" />
                <DropDown
                  value={card.peopleID}
                  setValue={setCardKey("peopleID")}
                  labels={filteredPeople.map(
                    (obj) => obj.firstName + " " + obj.lastName
                  )}
                  options={filteredPeople.map((obj) => obj.id)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">
                  {"Facility "}
                </label>
                <div className="my-1" />
                <DropDown
                  placeholder={"Select Facility"}
                  value={card.facilityID}
                  setValue={setCardKey("facilityID")}
                  options={filteredFacilities?.map((obj) => obj.id)}
                  labels={filteredFacilities?.map((obj) => obj.facilityName)}
                  // label={}
                />
              </div>
              {/* 
              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">
                  {"Address"}
                </label>
                <div className="my-1" />
                <DropDown
                  placeholder={"Select Address"}
                  value={
                    filteredFacilities?.find(
                      (obj) => obj.id === card.facilityID
                    )?.streetAddress
                  }
                  setValue={setCardKey("address")}
                />
              </div> */}

              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">
                  {"Accepted Shifts"}
                </label>
                <div className="my-1" />
                <DropDown
                  value={card.acceptedShifts}
                  setValue={(value) => {
                    setCardKey("acceptedShifts")(value);
                  }}
                  options={acceptedShifts?.map((obj) => obj.id)}
                  labels={acceptedShifts?.map(
                    (obj) =>
                      displayDate(obj?.clockInTime) +
                      " " +
                      displayTime(obj?.clockInTime) +
                      " - " +
                      (obj?.clockOutTime ? displayTime(obj?.clockInTime) : "")
                  )}
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">
                  {"Start Date"}
                </label>
                <div className="my-1" />

                <DatePickerCustom
                  // date={card.clockInTime}
                  // onChange={setCardKey("clockInTime")}

                  date={card?.startDate || null}
                  onChange={setCardKey("startDate")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">
                  {"End Date"}
                </label>
                <div className="my-1" />

                <DatePickerCustom
                  // date={card.clockOutTime}
                  // onChange={setCardKey("clockOutTime")}

                  date={card?.endDate || null}
                  onChange={setCardKey("endDate")}
                />
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col w-1/2">
                  <label className="text-xs text-start font-bold">
                    {"Start Time"}
                  </label>
                  <div className="my-1" />
                  <TimePickerCustom
                    time={card?.clockInTime}
                    onChange={(time) => setCardKey("clockInTime")(time)}
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-xs text-start font-bold">
                    {"End Time"}
                  </label>
                  <div className="my-1" />
                  <TimePickerCustom
                    time={card?.clockOutTime}
                    onChange={(time) => setCardKey("clockOutTime")(time)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">
                  {"Duration"}
                </label>
                <div className="my-1" />
                <div className="bg-[#7ED1E6B1] p-2 rounded-3xl">
                  <label className="text-xs text-PRIMARY_COLOR font-semibold">
                    {`${card?.hours || 0} hours and ${
                      card?.minutes || 0
                    } minutes. `}
                  </label>
                </div>
              </div>
            </div>

            {/* Fourth Row */}
            <div className="grid gap-4">
              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">Notes</label>

                <div className="my-1" />
                <Input
                  multiline
                  placeholder={"Notes"}
                  value={card.notes}
                  setValue={setCardKey("notes")}
                />
                {/* <textarea className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2"></textarea> */}
              </div>
            </div>
            {/* Fifth Row */}
            <div className="flex mt-auto justify-between w-1/4">
              {" "}
              <Button
                children={location?.state ? "UPDATE" : "POST"}
                onClick={() => {
                  if (location?.state) {
                    updateTimecard();
                  } else {
                    publishTimecards();
                  }
                  // console.log(card);
                }}
              />
              <div className="mx-1" />
              <Button
                children={"CANCEL"}
                onClick={() => {
                  //   console.log(shift);
                  navigate("/timecard");
                }}
                color={themeStyles.GRAY}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTimeCard;
