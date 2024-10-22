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

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const removeTrailingZ = (timeStr) => {
    if (!timeStr) return null;
    return timeStr.endsWith("Z") ? timeStr.slice(0, -1) : timeStr;
  };

  const checkIfPastShift = () => {
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

      setShiftKey("rate")(selectedRate);
      setNestedShiftKey("incentives", "incentiveBy")("Facility");
    }
  }, [myFacility, shift?.roleRequired]);

  return (
    <div className="flex flex-col p-4 space-y-4 h-full justify-between">
      <div className="space-y-2">
        {isPastShift && (
          <div className="text-red-500">
            Warning: This shift is scheduled in the past.
          </div>
        )}
        {/* Responsive grid with 1 column on small screens and 4 columns on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-start font-bold">{"Date"}</label>
            <div className="my-1" />
            <DatePickerCustom
              date={shift?.date}
              onChange={setShiftKey("date")}
            />
          </div>
          {myFacility === null && (
            <div className="flex flex-col">
              <label className="text-xs text-start font-bold">
                {"Facility"}
              </label>
              <div className="my-1" />
              <DropDown
                placeholder={"Select Facility"}
                value={shift?.facilityID}
                setValue={(facilityID) => setShiftKey("facilityID")(facilityID)}
                options={facilities.map((obj) => obj.id)}
                labels={facilities.map((obj) => obj.facilityName)}
              />
            </div>
          )}

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <label className="flex items-center justify-start space-x-2">
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
                      onChange={(date) => setShiftKey("shiftStart")(date)}
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
                Rate (per hour)
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
                    onChange={() => setShiftKey("cancellationGuarantee")(true)}
                  />
                  <RadioButton
                    children="No"
                    checked={!shift?.cancellationGuarantee}
                    onChange={() => setShiftKey("cancellationGuarantee")(false)}
                  />
                </div>
              </div>
            )}
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

            {shift?.isIncentive && (
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
                  <Input
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
            </div>
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="flex flex-col mt-auto justify-between w-full md:w-2/4">
        <div>
          {isEdit && !canEditShit && (
            <label className="text-xs text-red-500">
              *Unable to edit a shift that has active assignments
            </label>
          )}
        </div>
        <div className="flex flex-row">
          <Button
            children={isEdit ? "SAVE" : "POST"}
            onClick={() => setShowConfirmModal(true)}
            disabled={isPublishDisabled || (isEdit && !canEditShit)}
          />
          <div className="mx-1" />
          <Button
            children={"CANCEL"}
            onClick={closeModal}
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
          setIsPublishDisabled(true);
          try {
            await publishAction();
          } catch (error) {
            console.error("Error during publishAction:", error);
          }
          setIsPublishDisabled(false);
          setShowConfirmModal(false);
        }}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
}

export default SingleShift;
