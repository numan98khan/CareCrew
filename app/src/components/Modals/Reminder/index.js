import React, { useState, useEffect, useMemo } from "react";
import Modal from "react-modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DatePickerCustom from "../../../components/DatePicker";
import TimePickerCustom from "../../TimePicker";

import { useListPeople } from "../../../apolloql/people";
import { useCreateReminder } from "../../../apolloql/reminders";
import { useCreateNotification } from "../../../apolloql/notifications";

import { ErrorToast, SuccessToast } from "../../../services/micro";

import {
  ADMIN,
  EMPLOYEE,
  FACILITY,
  peopleTypes,
} from "../../../constants/userTypes";
import { REMINDER } from "../../../constants/reminderTypes";

import DropDown from "../../DropDown";
import { useListFacilities } from "../../../apolloql/facilities";
import { createRemindersPeople } from "../../../graphql/mutations";
import { useAuth } from "../../../context";
// import { createNotifications } from "../../../graphql/mutations";

function CreateReminderModal({ open, onClose, afterOpenModal }) {
  const { myFacility, type } = useAuth();

  const currentDate = new Date(); // Get the current date
  currentDate.setHours(0, 0, 0, 0); // Set the time to 12 AM

  // const [date, setDate] = useState();
  // const [time, setTime] = useState();

  const [date, setDate] = useState(currentDate); // Set the default date to the current date
  // const [time, setTime] = useState(currentDate); // Set the default time to 12 AM
  const [time, setTime] = useState(null); // Set the default time to 12 AM

  const [staffType, setStaffType] = useState(undefined);
  const [employeeName, setEmployeeName] = useState();
  const [employeeId, setEmployeeId] = useState();

  const [notes, setNotes] = useState();
  const [peopleDropDownOption, setPeopleDropDownOption] = useState([]);
  const [shouldUpdatePeopleDropdown, setShouldUpdatePeopleDropdown] =
    useState(false);

  const { people, loading: peopleLoading } = useListPeople({
    type: staffType === "ALL" ? undefined : staffType,
  });
  // const { facilities } = useListFacilities();
  const { createNotificationQuery } = useCreateNotification();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      // marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      border: "1px solid white",
      backgroundColor: "white",
      width: "30vw",
      // paddingLeft: "30px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  useEffect(() => {
    // staffType
    // console.log("🚀 ~ file: RELOADING FOR staffType:", staffType, people);
    // if (people?.length > 0 && shouldUpdatePeopleDropdown) {
    if (people?.length > 0 && shouldUpdatePeopleDropdown) {
      const peopleDropdown = people.map((people) => ({
        value: people.id,
        label: people?.firstName + " " + people.lastName,
        // label:
        //   people?.type === FACILITY
        //     ? people?.email
        //     : people?.firstName + " " + people.lastName,
      }));
      // console.log("PEOPLE DROP DOWN: ", peopleDropdown);

      setPeopleDropDownOption(peopleDropdown);
      setShouldUpdatePeopleDropdown(false); // Reset the flag
    }
  }, [people, shouldUpdatePeopleDropdown, staffType, peopleLoading]);

  const staffTypeDropdown = useMemo(() => {
    return peopleTypes.map((type, index) => {
      let val = undefined;
      if (type === "ALL") {
        // val = undefined;
        val = "ALL";
      } else if (type === "FACILITIES") {
        val = FACILITY;
      } else if (type === "STAFF") {
        val = ADMIN;
      } else if (type === "EMPLOYEES") {
        val = EMPLOYEE;
      }
      return {
        value: val,
        label: type,
      };
    });
  }, [peopleTypes]);

  // console.log("PEOPLE DROP DOWN: ", peopleDropDownOption);

  const handleStaffTypeChange = (value) => {
    setPeopleDropDownOption([]);
    setStaffType(value);
    setShouldUpdatePeopleDropdown(true);
  };

  const handleDropdownUpdate = () => {
    setShouldUpdatePeopleDropdown(true);
  };

  useEffect(() => {
    handleDropdownUpdate();
  }, []);

  const { createReminderQuery, loading, error } = useCreateReminder(); // Use the hook

  const handleCreateReminder = async () => {
    if (!date || !time) {
      ErrorToast("Both date and time are required.");
      return; // Exit the function early if date or time is null
    }

    try {
      const input = {
        date: date,
        time: time,
        receiverType: staffType.toUpperCase(), // Assuming it's an object with a value property
        note: notes,
        // People: people.find((person) => person.id === employeeId)?.id, // Assuming 'people' is an array of selected people objects
        // If you want to add 'read' or 'message', do so here
      };

      // console.log("Reminder Input:", input, employeeId);

      const employeeReceivers = employeeId ? [employeeId] : [];
      const response = await createReminderQuery(input, employeeReceivers);

      // console.log("Reminder created:", response);

      // Create the input object for the notification
      const notificationInput = {
        // TODO: investigate if there is a difference
        // peopleID: people.find((person) => person.id === employeeId)?.id,
        peopleID: employeeId ? employeeId : "-1",
        type: REMINDER, // Replace with the appropriate type
        subject: staffType,
        body: notes,
        // orr

        // Add other required fields for the notification here
      };

      // Form clean-up
      setDate(null);
      setTime(null);
      setStaffType(null);
      setEmployeeName(null);
      setEmployeeId(null);
      setNotes(null);

      // Close the modal
      onClose();
      SuccessToast("Reminder created");

      // FIXME: Need to create a system where we can differentiate between specifc people notfications and broader audience notifications
      const notificationResponse = await createNotificationQuery(
        notificationInput,
        employeeReceivers
      );

      // console.log("Notification created:", notificationResponse);
    } catch (error) {
      console.error("Failed to create reminder:", error);
      ErrorToast("Failed to create reminder");
    }
  };

  return (
    // <div>
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div
        // className="w-full h-full flex flex-col gap-6 items-center justify-center"
        className="w-full h-full flex flex-col items-center justify-center"
      >
        <p
          style={{ fontSize: "24px" }}
          className="text-xl font-bold w-full text-left"
        >
          Create Reminder
        </p>
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
          <div className="w-full">
            <DatePickerCustom
              date={date}
              onChange={(date_) => {
                setDate(date_);
                if (!date) {
                  setTime("12:00:00.000Z");
                }
              }}
              // onChange={(date) => setStartDate(date)}
            />
          </div>

          <div className="w-full">
            <TimePickerCustom
              time={time}
              onChange={(date) => setTime(date)}
              // onChange={(date) => setStartDate(date)}
            />
          </div>

          <DropDown
            placeholder={"Select Staff Type"}
            value={staffType}
            setValue={handleStaffTypeChange}
            options={staffTypeDropdown.map((item) => item.value)}
            labels={staffTypeDropdown.map((item) => item.label)}
          />

          <DropDown
            placeholder={"Reminder For"}
            value={employeeId}
            setValue={setEmployeeId}
            // setIdValue={setEmployeeId}
            options={peopleDropDownOption.map((item) => item.value)}
            labels={peopleDropDownOption.map((item) => item.label)}
          />

          <Input
            placeholder={"Message"}
            value={notes}
            setValue={setNotes}
            maxLength={100}
            multiline
          />

          <Button
            children={"CREATE"}
            onClick={() => {
              // console.log(time)
              // console.log(
              //   "🚀 ~ file: index.js:208 ~ CreateReminderModal ~ time:",
              //   time
              // );
              handleCreateReminder();
            }}
          />
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
        </div>
      </div>
    </Modal>
    // </div>
  );
}

export default CreateReminderModal;
