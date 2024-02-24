import React, { useEffect, useState } from "react";
import themeStyles from "../../styles/theme.styles";

import Button from "../../components/Button";

import {
  reverseFormatDate,
  reverseFormatDateTime,
  displayDate,
  SuccessToast,
  ErrorToast,
  convertDateTimeToAWSDateTime,
  convertTimeToAWSTime,
  convertDateToAWSDate,
  displayTime,
} from "../../services/micro";

import OpenIndicator from "../../assets/icons/indicators/open";
import IncentiveIndicator from "../../assets/icons/indicators/incentive";
import GuaranteeIndicator from "../../assets/icons/indicators/guarantee";
import UserXIndicator from "../../assets/icons/userx";
import WatchIndicator from "../../assets/icons/watch";
import LocationIcon from "../../assets/icons/location";

import Modal from "react-modal";

import KebabMenuWhite from "../../assets/icons/kebabMenuWhite";

import {
  useCreateShift,
  useDeleteShift,
  useUpdateShift,
} from "../../apolloql/schedules";

import EditShiftModal from "../../components/Modals/EditShiftModal";
import Avatar from "../../components/Avatar";

import RadioButton from "../../components/Button/RadioButton";
import {
  useCreateTimecard,
  useDeleteTimecard,
  useUpdateTimecard,
} from "../../apolloql/timecards";
import DatePickerCustom from "../../components/DatePicker";
import TimePickerCustom from "../../components/TimePicker";
import SingleShift from "../AddShift/SingleShift";
import moment from "moment";
import { getTimecardsForShift } from "../../services/timecards/check";
import { useAuth } from "../../context";
import {
  externalNotificationToInstacare,
  externalNotificationToPeople,
  inAppNotificationsToFacilityPeople,
  inAppNotificationsToPeople,
  inApplNotificationToInstacare,
  sendNotificationsToFacilityPeople,
} from "../../services/timecards/reporting";
import { useCreateNotification } from "../../apolloql/notifications";
import {
  SHIFT_ASSIGNMENT,
  SHIFT_EDIT,
} from "../../constants/notificationTypes";

const ShiftEditModal = ({
  modalIsOpen,
  closeModal,
  shift_,
  facilities,
  isSuperAdmin,

  isPublishDisabled,
  setIsPublishDisabled,
}) => {
  // console.log(
  //   "🚀 ~ file: ShiftEditModal.js:50 ~ ShiftEditModal ~ shift_:",
  //   shift_
  // );

  const { user, myFacility } = useAuth();
  const iconSize = 7;

  const [shift, setShift] = useState(shift_);

  // const [canEditShit, setCanEditShit] = useState(false);

  // useEffect(() => {
  //   const timecardCount = await getTimecardsForShift(shift?.id);
  // }, [shift]);

  const [canEditShit, setCanEditShit] = useState(false);

  useEffect(() => {
    // Define an asynchronous function within the useEffect
    const checkTimecards = async () => {
      const timecardCount = await getTimecardsForShift(shift_?.id);
      // Enable editing if timecardCount is zero
      setCanEditShit(timecardCount === 0);
    };

    // Call the asynchronous function
    checkTimecards();
  }, [shift_]); // Re-run the effect when 'shift' changes

  // Update a single key in the people object
  const setShiftKey = (key) => (newValue) =>
    setShift((prevShift) => {
      return { ...prevShift, [key]: newValue };
    });

  // Update a key in a nested object within people
  const setNestedShiftKey = (key, subKey) => (newValue) =>
    setShift((prevShift) => ({
      ...prevShift,
      [key]: {
        ...prevShift[key],
        [subKey]: newValue,
      },
    }));

  const { updateShiftQuery } = useUpdateShift();

  const validateShiftInput = (input) => {
    const errors = [];

    if (!input?.facilityID) {
      errors.push("Facility not selected.");
      return errors;
    }
    if (!input?.roleRequired) {
      errors.push("Role not selected.");
      return errors;
    }
    // if (
    //   !Number.isInteger(Number(input.numOfPositions)) ||
    //   Number(input.numOfPositions) <= 0
    // ) {
    //   errors.push("Select numer of positions.");
    //   return errors;
    // }

    if (
      !Number.isInteger(Number(input.numOfPositions)) ||
      Number(input.numOfPositions) <= 0 ||
      /^0/.test(String(input.numOfPositions))
    ) {
      errors.push("Select number of positions.");
      return errors;
    }

    if (!input.shiftStart) {
      errors.push("Shift start time is not valid.");
      return errors;
    }

    if (!input.shiftEnd) {
      errors.push("Shift end time is not valid.");
      return errors;
    }

    if (!moment(input.date, "YYYY-MM-DD", true).isValid()) {
      errors.push("Date is not valid.");
      return errors;
    }

    if (!moment(input.shiftStartDT).isValid()) {
      errors.push("Shift start datetime is not valid.");
      return errors;
    }

    if (!moment(input.shiftEndDT).isValid()) {
      errors.push("Shift end datetime is not valid.");
      return errors;
    }

    if (input?.isIncentive) {
      if (!input?.incentives?.incentiveBy) {
        errors.push("Incentive by can't be empty.");
        return errors;
      }

      if (!input?.incentives?.incentiveType) {
        errors.push("Please select an incentive type.");
        return errors;
      }
      if (!input?.incentives?.incentiveAmount) {
        errors.push("Incentive amount can't be empty.");
        return errors;
      }
    }

    // ... Add more checks for other fields ...

    return errors;
  };

  const { createNotificationQuery } = useCreateNotification();

  const generateUpdatedFieldsString = (updatedFields) => {
    let updatesString = "";
    for (const [key, value] of Object.entries(updatedFields)) {
      updatesString += `${key}: ${value}\n`;
    }
    return updatesString;
  };
  // Function to detect changes in the shift object and update the shift
  const updateShift = async () => {
    // shift_

    const validationErrors = validateShiftInput(shift);

    if (validationErrors.length > 0) {
      ErrorToast(validationErrors.join("\n"));
      return;
    }

    const updatedFields = {};
    // Compare each field in the original and modified shift object
    for (const [key, value] of Object.entries(shift)) {
      if (shift_[key] !== value) {
        updatedFields[key] = value;
      }
    }

    // Generate a string from the updatedFields
    const updatedFieldsString = generateUpdatedFieldsString(updatedFields);

    updatedFields.id = shift?.id;
    updatedFields._version = shift?._version;
    updatedFields.shiftStart = shift?.shiftStart;
    updatedFields.shiftEnd = shift?.shiftEnd;
    updatedFields.date = shift?.date;

    if (Object.keys(updatedFields).length === 0) {
      // No changes detected
      console.log("No changes detected in shift.");
      SuccessToast("No changes detected in shift.");
      return;
    }

    try {
      // Assume updateShiftQuery takes an object with updated fields
      await updateShiftQuery(updatedFields, isSuperAdmin ? true : false);
      // await updateShiftQuery(updatedShiftObj);

      console.log(
        "🚀 ~ file: ShiftEditModal.js:196 ~ updateShift ~ updatedFields:",
        shift
      );
      const facilityData = facilities?.find(
        (obj) => obj?.id === shift?.facilityID
      );

      let formedMessage = `Subject: Open Shift Edited\n\nThe following shft has been edited by ${
        myFacility ? "Facility" : "Instacare"
      }\n\nFacility: ${facilityData?.facilityName}\nShift Date: ${displayDate(
        shift?.shiftStartDT
      )}\nShift Time: ${
        displayTime(shift?.shiftStartDT) +
        " - " +
        displayTime(shift?.shiftEndDT)
      }\nPosition: ${shift?.roleRequired}\nRate: ${
        shift?.rate
      }\n\nUpdated Fields: ${updatedFieldsString}\n\nTimestamp: ${
        displayDate(new Date()?.toISOString()) +
        " " +
        displayTime(new Date()?.toISOString())
      }\nBy User: ${user?.attributes?.email}`;
      console.log(
        "🚀 ~ file: ShiftEditModal.js:242 ~ updateShift ~ formedMessage:",
        formedMessage
      );

      // START: Send notification on all platforms to instacare
      // INTERNAL

      inApplNotificationToInstacare(
        SHIFT_EDIT,
        "Shift was edited",
        formedMessage,
        createNotificationQuery
      );
      inAppNotificationsToFacilityPeople(
        shift?.facilityID,
        SHIFT_EDIT,
        "Shift was edited",
        formedMessage,
        createNotificationQuery
      );
      // EXTERNAL
      externalNotificationToInstacare(formedMessage, true, false); // Instacare
      sendNotificationsToFacilityPeople(
        facilityData?.id,
        formedMessage,
        true,
        false
      ); // Facility
      // END.

      // Show success message
      SuccessToast("Shift updated successfully");

      closeModal();
    } catch (error) {
      // Show error message
      console.error("Error updating shift:", error);
      ErrorToast("Failed to update shift: " + error);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="People Add Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            // position: "relative",
            borderRadius: 20,
            // boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
            // width: "300px",
            padding: "10px", // This line will remove the padding
          },
        }}
      >
        <SingleShift
          // myFacility={type === FACILITY ? myFacility : null}
          facilities={facilities || []}
          shift={shift}
          setShiftKey={setShiftKey}
          setNestedShiftKey={setNestedShiftKey}
          isEdit={true}
          publishAction={updateShift}
          isPublishDisabled={isPublishDisabled}
          setIsPublishDisabled={setIsPublishDisabled}
          canEditShit={canEditShit}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};

export default ShiftEditModal;
