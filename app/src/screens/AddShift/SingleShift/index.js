import React, { useState, useMemo, useEffect } from "react";
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

import { useAdmin, useAuth } from "../../../context";
import { ADMIN, FACILITY } from "../../../constants/userTypes";
import ConfirmationModal from "../../../components/ConfirmationModal";

function SingleShift({
  myFacility,
  facilities,
  shift,
  setShiftKey,
  setNestedShiftKey,
  publishAction,
  isEdit = false,
  isPublishDisabled,
  setIsPublishDisabled,
  canEditShit,
  closeModal,
}) {
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

  const [isPastShift, setIsPastShift] = useState(false);

  const { type } = useAuth();

  // Step 2: Define state for modal visibility
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // Optional: Define a state for the warning message if dynamic messages are needed
  const [warningMessage, setWarningMessage] = useState("");

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

  const checkIfPastShift = () => {
    // if (!shift?.shiftStart) {
    //   setIsPastShift(true);
    //   return;
    // }

    if (isEdit && isPastShift) {
      return;
    }

    const selectedDateTime = new Date(
      `${shift?.date}T${removeTrailingZ(shift?.shiftStart)}`
    );
    const currentDateTime = new Date();
    setIsPastShift(selectedDateTime < currentDateTime);
  };

  useEffect(() => {
    checkIfPastShift();
  }, [shift?.date, shift?.shiftStart]);

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
      console.log("🚀 ~ file: index.js:64 ~ useMemo ~ myFacility:", myFacility);
      setShiftKey("facilityID")(myFacility.id);
      const bobj = myFacility?.Billing;

      const selectedRate =
        shift?.roleRequired === "CNA"
          ? bobj?.hourlyRateCNA
          : shift?.roleRequired === "RN"
          ? bobj?.hourlyRateRN
          : bobj?.hourlyRateLPN;

      setShiftKey("rate")(selectedRate);
      setNestedShiftKey("incentives", "incentiveBy")("Facility");
    }
  }, [myFacility, shift?.roleRequired]);

  useMemo(() => {
    console.log(
      "MEMO TRIGERRED",
      !myFacility && shift?.roleRequired !== null && shift?.facilityID !== null
    );
    if (
      !myFacility &&
      shift?.roleRequired !== null &&
      shift?.facilityID !== null
    ) {
      const bobj = facilities.find(
        (obj) => obj.id === shift?.facilityID
      )?.Billing;
      // console.log("🚀 ~ file: index.js:85 ~ useMemo ~ bobj:", bobj);

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
    }
  }, [shift?.roleRequired, shift?.facilityID, shift?.isHoliday]);

  return (
    <div className="flex flex-col p-4 space-y-4 h-full justify-between">
      {/* First Row */}
      <div className="space-y-2">
        {isPastShift && (
          <div className="text-red-500">
            Warning: This shift is scheduled in the past.
          </div>
        )}
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-start font-bold">{"Date"}</label>
            <div className="my-1" />

            <DatePickerCustom
              date={shift?.date}
              onChange={setShiftKey("date")}
              // onChange={(date) => setStartDate(date)}
            />
          </div>
          {myFacility === null ? (
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
          ) : null}

          {!isEdit && (
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
          )}
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

            <label className="flex items-center justify-center space-x-2">
              <Check
                value={isCustom}
                onChange={() => {
                  setSelectedShiftTimes([]);
                  setIsCustom(!isCustom);
                }}
              />
              <span className="text-xs">Custom</span>

              <div className="flex flex-row space-x-4 w-full">
                <div className="flex-grow">
                  <label className="text-xs w-full text-left font-bold">
                    Start Time
                  </label>
                  <div className="flex justify-around">
                    <TimePickerCustom
                      time={shift?.shiftStart}
                      onChange={(date) => {
                        // console.log("🚀 ~ file: index.js:208 ~ date:", date);
                        return setShiftKey("shiftStart")(date);
                      }}
                      disabled={!isCustom}
                    />
                  </div>
                </div>

                <div className="flex-grow">
                  <label className="text-xs text-start font-bold">
                    End Time
                  </label>
                  <div className="flex justify-around w-full">
                    <TimePickerCustom
                      time={shift?.shiftEnd}
                      onChange={(date) => setShiftKey("shiftEnd")(date)}
                      disabled={!isCustom}
                    />
                  </div>
                </div>
              </div>
            </label>

            <div className="flex flex-col space-y-1">
              <label className="text-xs text-start font-bold">
                Rate (per hour){" "}
              </label>
              <Input
                placeholder="Rate"
                value={shift?.rate}
                setValue={setShiftKey("rate")}
                disabled={true}
              />
            </div>

            {(!isEdit ? true : type !== FACILITY) && (
              <div className="flex flex-col space-y-2">
                <label className="text-xs text-start font-bold">
                  Cancellation Guarantee
                </label>
                <div className="flex space-x-4 ml-2.5 items-center">
                  <RadioButton
                    children="Yes"
                    checked={shift?.cancellationGuarantee}
                    onChange={() => {
                      console.log("cancellationGuarantee being TRUED");
                      setShiftKey("cancellationGuarantee")(true);
                    }}
                  />
                  <RadioButton
                    children="No"
                    checked={!shift?.cancellationGuarantee}
                    onChange={() => setShiftKey("cancellationGuarantee")(false)}
                  />
                </div>
              </div>
            )}

            {/* {!isEdit && (
              <div className="flex flex-col space-y-2">
                <label className="text-xs text-start font-bold">
                  Is Holiday?
                </label>
                <div className="flex space-x-4 ml-2.5 items-center">
                  <RadioButton
                    children="Yes"
                    checked={shift?.isHoliday}
                    onChange={() => {
                      // console.log("cancellationGuarantee being TRUED");
                      setShiftKey("isHoliday")(true);
                    }}
                  />
                  <RadioButton
                    children="No"
                    checked={!shift?.isHoliday}
                    onChange={() => setShiftKey("isHoliday")(false)}
                  />
                </div>
              </div>
            )} */}
          </div>

          {/* Second Column */}
          <div className="flex flex-col space-y-4">
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
                    checked={shift?.isIncentive}
                    onChange={() => setShiftKey("isIncentive")(true)}
                  />
                  <RadioButton
                    children="No"
                    checked={!shift?.isIncentive}
                    onChange={() => setShiftKey("isIncentive")(false)}
                  />
                </div>

                {myFacility
                  ? null
                  : shift?.isIncentive && (
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

            {shift?.isIncentive ? (
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
            ) : null}
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
      <div className="flex flex-col mt-auto justify-between w-2/4">
        {" "}
        <div>
          {isEdit && !canEditShit && (
            <label className="text-xs text-red-500">
              *Unable to edit a shift that has active assignments
            </label>
          )}
        </div>
        <div className="flex flex-row ">
          <Button
            children={isEdit ? "SAVE" : "POST"}
            onClick={async () => {
              // console.log(shift);
              setShowConfirmModal(true);
              // setIsPublishDisabled(true);
              // try {
              //   await publishAction();
              // } catch (error) {
              //   console.error("Error during publishAction:", error);
              //   // Handle the error or notify the user as needed
              // }
              // setIsPublishDisabled(false);
            }}
            disabled={isPublishDisabled || (isEdit && !canEditShit)}
          />
          <div className="mx-1" />
          <Button
            children={"CANCEL"}
            onClick={() => {
              // console.log(shift);
              closeModal();
            }}
            color={themeStyles.GRAY}
          />
        </div>
      </div>

      {/* Add the ConfirmationModal component */}
      <ConfirmationModal
        modalIsOpen={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        message={"Are you sure you want to publish this shift?"}
        warning={warningMessage}
        onConfirm={async () => {
          // deletedBulkShift();
          setIsPublishDisabled(true);
          try {
            await publishAction();
          } catch (error) {
            console.error("Error during publishAction:", error);
            // Handle the error or notify the user as needed
          }
          setIsPublishDisabled(false);
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

export default SingleShift;
