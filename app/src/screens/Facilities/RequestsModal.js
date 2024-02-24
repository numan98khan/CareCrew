import React, { useEffect, useState, useMemo } from "react";

import Button from "../../components/Button";

import Clock from "../../assets/icons/clock";
import Modal from "react-modal";

import InputField from "../../components/Input";
import { useListPoints } from "../../apolloql/points";
import {
  displayDate,
  displayTime,
  ErrorToast,
  SuccessToast,
} from "../../services/micro";
import { useUpdatePeople } from "../../apolloql/people";
import RadioButton from "../../components/Button/RadioButton";
import { useListShifts } from "../../apolloql/schedules";
import DropDown from "../../components/DropDown";
import { useCreateNotification } from "../../apolloql/notifications";
import { SHIFT_REQUEST } from "../../constants/notificationTypes";
import { useAuth } from "../../context";
import { ADMIN } from "../../constants/userTypes";
import DatePickerCustom from "../../components/DatePicker";
import TimePickerCustom from "../../components/TimePicker";

const RequestsModal = ({ facility, focalPerson, modalIsOpen, closeModal }) => {
  const { personalData } = useAuth();

  const AVAILABILITY = "Based on my Availability";
  const SHIFT = "Specific Shift";

  const [selectedOption, setSelectedOption] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const [selectedShift, setSelectedShift] = useState(null);
  const { shifts } = useListShifts(facility.id);

  const { createNotificationQuery } = useCreateNotification();

  const filteredShifts = useMemo(() => {
    return shifts?.filter((obj) => obj.date === selectedDate);
  }, [shifts]);

  const handleAddOrUpdate = async () => {
    try {
      if (
        selectedOption === SHIFT &&
        (!selectedDate || !selectedEndTime || !selectedStartTime)
      ) {
        ErrorToast(
          selectedDate ? "Please select a time." : "Please select a date."
        );
        return; // Early return if conditions aren't met for SHIFT.
      }

      if (!selectedOption) {
        ErrorToast("Please select an option.");
        return; // Early return if conditions aren't met for SHIFT.
      }

      const selectedShiftDetails = filteredShifts?.find(
        (obj) => obj?.id === selectedShift
      );

      const body =
        selectedOption === AVAILABILITY
          ? `${personalData?.firstName} ${personalData?.lastName} requested a shift based on their availabilty`
          : `${personalData?.firstName} ${personalData?.lastName} requested a ${
              selectedShiftDetails?.roleRequired
            } shift for ${facility?.facilityName} on ${selectedDate}@${
              displayTime(selectedDate + "T" + selectedStartTime) +
              " - " +
              displayTime(selectedDate + "T" + selectedEndTime)
            }`;

      // ErrorToast(
      //   "🚀 ~ file: RequestsModal.js:71 ~ handleAddOrUpdate ~ body: " + body
      // );

      // return;
      // Create the input object for the notification
      const notificationInput = {
        peopleID: -1, // Still unsure about this value.
        receivers: ADMIN,
        type: SHIFT_REQUEST,
        subject: "Shift Request",
        body: body,
      };
      // console.log(
      //   "🚀 ~ file: RequestsModal.js:100 ~ handleAddOrUpdate ~ notificationInput:",
      //   notificationInput
      // );

      await createNotificationQuery(notificationInput, []);
      SuccessToast("Shift request updated successfully!");

      // Reset form after successful submission.
      setSelectedOption("");
      setSelectedDate(null);
      setSelectedShift(null);
    } catch (error) {
      ErrorToast("Error creating shift request.");
    }
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="User Options Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
        content: {
          top: "50%",
          left: "50%",
          // right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "70%",
          maxWidth: "30%",
          border: "10px",
          boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
          display: "flex",
          flexDirection: "column",
          borderRadius: 20,
          zIndex: 1000,
        },
      }}
    >
      <label className="text-2xl font-bold mb-2">Request Shift</label>
      <div className="flex flex-col mb-3 space-y-3 ">
        <RadioButton
          value={AVAILABILITY}
          onChange={(e) => setSelectedOption(e.target.value)}
          checked={selectedOption === AVAILABILITY}
        >
          {AVAILABILITY}
        </RadioButton>

        <RadioButton
          value={SHIFT}
          onChange={(e) => setSelectedOption(e.target.value)}
          checked={selectedOption === SHIFT}
        >
          {SHIFT}
        </RadioButton>
        <div className="flex flex-col items-center justify-between space-y-2">
          <div className="w-full">
            <DatePickerCustom
              date={selectedDate}
              onChange={setSelectedDate}
              // onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="w-full flex flex-row space-x-2">
            <TimePickerCustom
              time={selectedStartTime}
              onChange={(date) => setSelectedStartTime(date)}
              // disabled={!isCustom}
            />
            <TimePickerCustom
              time={selectedEndTime}
              onChange={(date) => setSelectedEndTime(date)}
              // disabled={!isCustom}
            />
          </div>
          {/* <DropDown
            value={selectedDate}
            setValue={setSelectedDate}
            options={shifts?.map((obj) => obj.date)}
            labels={shifts?.map((obj) => displayDate(obj.date))}
          />
          <DropDown
            value={selectedShift}
            setValue={setSelectedShift}
            options={filteredShifts?.map((obj) => obj.id)}
            labels={filteredShifts?.map(
              (obj) =>
                obj.roleRequired +
                " - " +
                displayTime(obj.shiftStart) +
                " - " +
                displayTime(obj.shiftEnd)
            )}
          /> */}
        </div>
      </div>
      <div className="flex flex-row">
        <Button children={"SUBMIT REQUEST"} onClick={handleAddOrUpdate} />
      </div>
    </Modal>
  );
};

export default RequestsModal;
