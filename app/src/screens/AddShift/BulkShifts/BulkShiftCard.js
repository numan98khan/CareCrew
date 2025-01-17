import React, { useEffect, useState } from "react";
import { Roles } from "../../../constants/roles";
import DropDown from "./DropDown";

import SettingsIcon from "../../../assets/icons/menuIcons/settings";
import EditIcon from "../../../assets/icons/edit";
import DeleteIcon from "../../../assets/icons/delete";
import CancellationGuaranteeIcon from "../../../assets/icons/indicators/guarantee";
import IncentiveIcon from "../../../assets/icons/indicators/incentive";
import themeStyles from "../../../styles/theme.styles";
import ShiftSettings from "./ShiftSettings"; // or wherever you save the file

import RadioButton from "../../../components/Button/RadioButton";
import Input from "../../../components/Input";

import { displayTime } from "../../../services/micro";
import _ from "lodash"; // Ensure lodash is imported

import Modal from "react-modal";
import Button from "../../../components/Button";

import { useAdmin, useAuth } from "../../../context";

import moment from "moment";

Modal.setAppElement("#root");

const shiftTimings = [
  {
    label: "Morning 7:00 AM-3:00 PM",
    value: "07:00:00.000Z-15:00:00.000Z",
  },
  {
    label: "Afternoon 3:00 AM-11:00 PM",
    value: "15:00:00.000Z-23:00:00.000Z",
  },
  {
    label: "Night 11:00 PM-7:00 AM",
    value: "23:00:00.000Z-07:00:00.000Z",
  },
];

function BulkShiftCard({
  index,
  date,
  currentMonth,
  monthNames,
  disabled,
  onUpdateShift,
  shiftData = [],
  createDefaultShift,
  facilities,
  facilityID,
  handleInputChange,
  addShiftToDate,
  removeShiftByIndex,
}) {
  const { type } = useAuth();
  // facilityID
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track hover menu
  const [isIncentiveModalOpen, setIsIncentiveModalOpen] = useState(false);
  const [isGuaranteeModalOpen, setIsGuaranteeModalOpen] = useState(false);

  // setOpenedIndex
  const [openedIndex, setOpenedIndex] = useState(null);

  const [openedMenu, setOpenedMenu] = useState({});

  const [isEditNotesModalOpen, setIsEditNotesModalOpen] = useState(false);
  const [editingShiftIndex, setEditingShiftIndex] = useState(null);

  const openEditNotesModal = (inputIndex) => {
    setEditingShiftIndex(inputIndex);
    setIsEditNotesModalOpen(true);
  };

  const handleEditIncentiveNotesModal = (value) => {
    const updatedInputs = [...shiftData];
    updatedInputs[editingShiftIndex].incentives = {
      ...updatedInputs[editingShiftIndex].incentives,
      notes: value,
    };
    // setInputs(updatedInputs);
  };

  const confirmEditNotes = () => {
    setIsEditNotesModalOpen(false);
    setEditingShiftIndex(null);
    // Optionally: send data to backend or any other operations
  };

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

  const currentTime = moment();
  const isTimeInPast = (time) => {
    const todayShiftTime = moment(
      `${moment.utc().format("YYYY-MM-DD")}T${removeTrailingZ(time)}`
    );

    return todayShiftTime.isBefore(currentTime);
  };

  const filteredShiftTimings = shiftTimings.filter((timing) => {
    const [start, end] = timing.value.split("-");
    // If today's date is the same as the card date, filter based on time.
    // Otherwise, if the card date is in the future, show all timings.
    return date?.getDate() === currentTime.date() ? !isTimeInPast(start) : true;
  });

  return (
    <div
      style={{
        // height: "125px",
        border: "1px solid #EDEDED",
        opacity: disabled ? 0.3 : 1,
        pointerEvents: disabled ? "none" : "", // Disable pointer events if it's in the past.
      }}
      className="w-full h-full p-1"
    >
      <div
        // style={{ height: "37px" }}
        className="w-full grid items-center"
      >
        <div className="h-full w-full flex flex-row gap-2 items-end justify-center mb-5">
          <p style={{ fontSize: "13px", marginBottom: "4px" }}>
            {monthNames[currentMonth].slice(0, 3)}
          </p>
          <p style={{ fontSize: "22px", fontWeight: "normal" }}>
            {date?.getDate()}
          </p>
        </div>

        {shiftData.map((input, inputIndex) => (
          <div className="flex flex-row ">
            {/* <div className="w-1"> */}
            <input
              className="w-6"
              style={{
                border: "1px solid #EDEDED",
                fontSize: "12px",
              }}
              value={input.numOfPositions || ""} // Convert null to an empty string
              onChange={(e) => {
                handleInputChange(
                  inputIndex,
                  "numOfPositions",
                  e.target.value,
                  index?.day
                );
              }}
            />
            {/* </div> */}
            <div className="flex flex-row w-full">
              <div className="w-1/3">
                <DropDown
                  placeholder={"Role"}
                  // options={rolesDropDownOption?.map((obj) => obj.value)}
                  options={Roles}
                  value={input.roleRequired}
                  setValue={(value) => {
                    handleInputChange(
                      inputIndex,
                      "roleRequired",
                      value,
                      index?.day
                    );
                  }}
                />
              </div>
              <div className="w-2/3">
                <DropDown
                  placeholder={"Shift Time"}
                  options={filteredShiftTimings?.map((obj) => obj.value)}
                  // labels={filteredShiftTimings?.map((obj) => obj.value)}
                  labels={filteredShiftTimings?.map((obj) => {
                    return (
                      displayTime(
                        "1970-01-01T" + removeTrailingZ(obj.value.split("-")[0])
                      ) +
                      " - " +
                      displayTime(
                        "1970-01-01T" + removeTrailingZ(obj.value.split("-")[1])
                      )
                    );
                  })}
                  value={
                    input.shiftStart
                      ? displayTime(
                          "1970-01-01T" + removeTrailingZ(input.shiftStart)
                        ) +
                        " - " +
                        displayTime(
                          "1970-01-01T" + removeTrailingZ(input.shiftEnd)
                        )
                      : "Select Timing"
                  }
                  setValue={(value) => {
                    const [shiftStart, shiftEnd] = value.split("-");

                    // handleInputChange(inputIndex, "shiftStart", shiftStart);
                    // handleInputChange(inputIndex, "shiftEnd", shiftEnd);

                    handleInputChange(
                      inputIndex,
                      { shiftStart, shiftEnd },
                      null,
                      index?.day
                    );
                    // setTempTiming(value);
                  }}
                />
              </div>
            </div>

            {/* TODO: menu opens for all the rows in column, need to fix this  */}
            <div
              // onMouseEnter={() => setIsMenuOpen(true)} // Open the menu when mouse enters
              // onMouseLeave={() => setIsMenuOpen(false)} // Close the menu when mouse leaves
              onMouseEnter={() => {
                setOpenedIndex(inputIndex);
                setOpenedMenu((prev) => ({ ...prev, [inputIndex]: true }));
              }}
              onMouseLeave={() => {
                setOpenedMenu((prev) => ({ ...prev, [inputIndex]: false }));
              }}
              className="flex flex-row justify-center items-center flex-1 z-10 "
            >
              <SettingsIcon size={4} color={themeStyles.PRIMARY_COLOR} />

              {openedMenu[inputIndex] && (
                <div className="absolute bg-transparent flex flex-row space-x-1">
                  <div
                    onClick={() => setIsIncentiveModalOpen(true)}
                    style={{ backgroundColor: themeStyles?.PRIMARY_COLOR }}
                    className="rounded-full p-1"
                  >
                    <IncentiveIcon color={"#FFF"} size={7} />
                  </div>

                  <div
                    onClick={() => setIsGuaranteeModalOpen(true)}
                    style={{ backgroundColor: themeStyles?.PRIMARY_COLOR }}
                    className="rounded-full p-1"
                  >
                    <CancellationGuaranteeIcon color={"#FFF"} size={7} />
                  </div>
                  <div
                    onClick={() => openEditNotesModal(inputIndex)}
                    style={{ backgroundColor: themeStyles?.PRIMARY_COLOR }}
                    className="rounded-full p-1"
                  >
                    <EditIcon color={"#FFF"} size={4} />
                  </div>
                  <div
                    onClick={() => removeShiftByIndex(index?.day, inputIndex)}
                    // onClick={() => handleDeleteShift(inputIndex)}
                    className="rounded-full bg-red-500 p-1"
                  >
                    <DeleteIcon color={"#FFF"} size={7} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        <p
          onClick={() => addShiftToDate(index?.day)}
          className="mt-3"
          style={{
            fontSize: "11px",
            color: themeStyles?.PRIMARY_COLOR,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          + Add More
        </p>
      </div>
      {isIncentiveModalOpen && (
        <Modal
          isOpen={isIncentiveModalOpen}
          onRequestClose={() => setIsIncentiveModalOpen(false)}
          contentLabel="Incentive Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            },
            content: {
              position: "relative",
              borderRadius: 20,
              width: "300px",
              padding: "20px",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <h2>Incentive Details</h2>
          <div>
            <label className="text-xs text-start font-bold">Incentives</label>
            <div className="flex space-x-4 items-center">
              <div className="flex space-x-4 ml-2.5 items-center">
                <RadioButton
                  children="Yes"
                  checked={shiftData[openedIndex]?.isIncentive}
                  onChange={() =>
                    handleInputChange(
                      openedIndex,
                      "isIncentive",
                      true,
                      index?.day
                    )
                  }
                />
                <RadioButton
                  children="No"
                  checked={!shiftData[openedIndex]?.isIncentive}
                  onChange={() =>
                    handleInputChange(
                      openedIndex,
                      "isIncentive",
                      false,
                      index?.day
                    )
                  }
                />
              </div>

              {shiftData[openedIndex]?.isIncentive && (
                <DropDown
                  placeholder={"Select Provider"}
                  value={shiftData[openedIndex]?.incentives?.incentiveBy}
                  setValue={(value) =>
                    handleInputChange(
                      openedIndex,
                      "incentives.incentiveBy",
                      value,
                      index?.day
                    )
                  }
                  options={["CareCrew", "Facility"]}
                />
              )}
            </div>
          </div>
          {shiftData[openedIndex]?.isIncentive && (
            <div>
              <label className="text-xs text-start font-bold">
                Incentive Type
              </label>
              <div className="flex space-x-4 items-center">
                <RadioButton
                  children="$/hr"
                  checked={
                    shiftData[openedIndex]?.incentives?.incentiveType === "$/hr"
                  }
                  onChange={() => {
                    handleInputChange(
                      openedIndex,
                      "incentives.incentiveType",
                      "$/hr",
                      index?.day
                    );
                  }}
                />
                <RadioButton
                  children="Fixed"
                  checked={
                    shiftData[openedIndex]?.incentives?.incentiveType ===
                    "fixed"
                  }
                  onChange={() =>
                    handleInputChange(
                      openedIndex,
                      "incentives.incentiveType",
                      "fixed",
                      index?.day
                    )
                  }
                />
                <Input
                  placeholder={"Incentive Amount"}
                  value={shiftData[openedIndex]?.incentives?.incentiveAmount}
                  setValue={(value) =>
                    handleInputChange(
                      openedIndex,
                      "incentives.incentiveAmount",
                      value,
                      index?.day
                    )
                  }
                />
              </div>
            </div>
          )}
          {/* Your incentive content here */}
          <div className="mt-2">
            <Button onClick={() => setIsIncentiveModalOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
      )}

      {isGuaranteeModalOpen && (
        <Modal
          isOpen={isGuaranteeModalOpen}
          onRequestClose={() => setIsGuaranteeModalOpen(false)}
          contentLabel="Guarantee Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            },
            content: {
              position: "relative",
              borderRadius: 20,
              width: "300px",
              padding: "20px",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <h2>Guarantee Details</h2>
          <div className="flex flex-col">
            {/* <label className="text-xs text-start font-bold">
              Cancellation Guarantee
            </label> */}
            <div className="flex space-x-4 ml-2.5 items-center">
              <RadioButton
                children="Yes"
                checked={shiftData[openedIndex]?.cancellationGuarantee}
                onChange={() => {
                  handleInputChange(
                    openedIndex,
                    "cancellationGuarantee",
                    true,
                    index?.day
                  );
                  // setShiftKey("cancellationGuarantee")(true);
                }}
              />
              <RadioButton
                children="No"
                checked={!shiftData[openedIndex]?.cancellationGuarantee}
                onChange={() => {
                  // setShiftKey("cancellationGuarantee")(false);
                  handleInputChange(
                    openedIndex,
                    "cancellationGuarantee",
                    false,
                    index?.day
                  );
                }}
              />
            </div>
          </div>
          {/* Your guarantee content here */}
          <div className="mt-2">
            <Button onClick={() => setIsGuaranteeModalOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
      )}

      {isEditNotesModalOpen && (
        // {true && (
        <Modal
          // isOpen={true}
          isOpen={isEditNotesModalOpen}
          onRequestClose={() => setIsEditNotesModalOpen(false)}
          contentLabel="Edit Incentive Notes Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            },
            content: {
              position: "relative",
              borderRadius: 20,
              width: "300px",
              padding: "20px",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <h2>Edit Incentive Notes</h2>
          <textarea
            rows="4"
            value={
              editingShiftIndex !== null
                ? shiftData[editingShiftIndex].incentives.notes
                : ""
            }
            style={{ width: "100%" }}
            onChange={
              (e) => {
                handleInputChange(
                  openedIndex,
                  "incentives.notes",
                  e.target.value,
                  index?.day
                );
              }
              // handleEditIncentiveNotesModal(e.target.value)
            }
          />
          <div className="flex flex-row space-x-2">
            <Button onClick={() => confirmEditNotes()}>Save</Button>
            <Button onClick={() => setIsEditNotesModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default BulkShiftCard;
