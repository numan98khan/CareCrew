import React, { useState } from "react";
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
  displayDatetime,
  displayTime,
  formatDateToAWS,
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
import { useAuth } from "../../context";
import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";
import {
  externalNotificationToInstacare,
  externalNotificationToPeople,
  inAppNotificationsToFacilityPeople,
  inAppNotificationsToPeople,
  inApplNotificationToInstacare,
  sendNotificationsToFacilityPeople,
} from "../../services/timecards/reporting";
import { API, graphqlOperation } from "aws-amplify";
import { getTimecardsForShift } from "../../services/timecards/check";
import { convertToLocalizedDateTime } from "../../apolloql/timezone";
import moment from "moment";
import { useCreateNotification } from "../../apolloql/notifications";
import {
  EMPLOYEE_LATE,
  FACILITY_CANCELLATION,
  NO_CALL_NO_SHOW,
  SHIFT_DELETED,
} from "../../constants/notificationTypes";
import ConfirmationModal from "../../components/ConfirmationModal";
// import { getShifts } from "../../graphql/queries";

export const getShifts = /* GraphQL */ `
  query GetShifts($id: ID!) {
    getShifts(id: $id) {
      id
      numOfPositions
      _version
      _deleted
    }
  }
`;

const getFacility = /* GraphQL */ `
  query GetFacility($id: ID!) {
    getFacility(id: $id) {
      id
      facilityName
      contacts {
        name
        firstName
        lastName
        phone
        email
        position
        __typename
      }
      email
      _deleted
    }
  }
`;

const getPeople = /* GraphQL */ `
  query GetPeople($id: ID!) {
    getPeople(id: $id) {
      id
      surrogateID
      firstName
      lastName
      phoneNumber

      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

const MODES = {
  SHIFT_DETAILS: "shiftDetails",
  ADD_MEMBERS: "addMembers",
};

const UnassignModal = ({
  isUnAssignModalOpen,
  setIsUnAssignModalOpen,
  updateTimecardQuery,
  selectedTimecard,
  selectedShift,
}) => {
  const { type, user } = useAuth();
  const { updateShiftQuery } = useUpdateShift();

  const [selectedOption, setSelectedOption] = useState(
    type !== ADMIN ? "Facility Cancellation" : ""
  );

  const removeTrailingZ = (timeStr) => {
    if (!timeStr) return null;
    // Remove 'Z' if it's at the end
    const cleanedTimeStr = timeStr.endsWith("Z")
      ? timeStr.slice(0, -1)
      : timeStr;

    return cleanedTimeStr;
  };

  const { createNotificationQuery } = useCreateNotification();

  // SERVICE: UNASSIGN (Temporarily Disabled)
  const handleUpdate = async () => {
    // // selectedOption
    const now = new Date();
    if (!selectedOption) {
      ErrorToast("Please select an option");
      return;
    }

    try {
      await updateTimecardQuery({
        id: selectedTimecard?.id,
        isCallOff: true,
        lateReason:
          selectedOption === "Facility Cancellation"
            ? `Facility Cancellation at ${now?.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })} ${now?.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}`
            : selectedOption,
        _version: selectedTimecard?._version,
      });
      SuccessToast("Shift UNASSIGNED successfully");

      try {
        // console.log(selectedOption);
        console.log(
          "🚀 ~ file: ShiftDetailsModal.js:165 ~ handleUpdate ~ selectedOption:",
          selectedOption
        );

        if (selectedOption !== "Facility Cancellation") {
          const shiftData = (
            await API.graphql(
              graphqlOperation(getShifts, { id: selectedShift?.id })
            )
          )?.data?.getShifts;
          if (!shiftData) throw new Error("Failed to get shift data.");

          await updateShiftQuery({
            id: shiftData?.id,
            numOfPositions: (
              parseInt(shiftData?.numOfPositions) + 1
            ).toString(),
            _version: shiftData?._version,
          });
        }

        const facilityObj = (
          await API.graphql(
            graphqlOperation(getFacility, {
              id: selectedShift?.facilityID,
            })
          )
        )?.data?.getFacility;

        const peopleObj = (
          await API.graphql(
            graphqlOperation(getPeople, {
              id: selectedTimecard?.peopleID,
            })
          )
        )?.data?.getPeople;

        let formedMessage = `Subject: Shift Cancellation\n\nThe following shift has been cancelled by ${
          selectedOption === "Facility Cancellation" ? "facility" : "CareCrew"
        }\n\nFacility: ${facilityObj?.facilityName}\nShift Date: ${displayDate(
          selectedShift?.shiftStartDT
        )}\nShift Time: ${
          displayTime(selectedShift?.shiftStartDT) +
          " - " +
          displayTime(selectedShift?.shiftEndDT)
        }\nEmployee: ${
          peopleObj?.firstName + " " + peopleObj?.lastName
        }\n\nTimestamp: ${
          displayDate(new Date()?.toISOString()) +
          " " +
          displayTime(new Date()?.toISOString())
        }`; //\n\nBy User: ${user?.attributes?.email}`;

        console.log(
          "🚀 ~ file: ShiftDetailsModal.js:88 ~ handleUpdate ~ formedMessage:",
          formedMessage
        );

        // START: Send notification on all platforms to CareCrew

        const userInfo = `\nBy User: ${user?.attributes?.email}`;

        // // INTERNAL
        inAppNotificationsToPeople(
          peopleObj?.id,
          FACILITY_CANCELLATION,
          "Shift was cancelled",
          formedMessage,
          createNotificationQuery
        );
        inApplNotificationToInstacare(
          FACILITY_CANCELLATION,
          "Shift was cancelled",
          formedMessage + userInfo,
          createNotificationQuery
        );
        inAppNotificationsToFacilityPeople(
          selectedShift?.facilityID,
          FACILITY_CANCELLATION,
          "Shift was cancelled",
          formedMessage + userInfo,
          createNotificationQuery
        );

        // EXTERNAL
        externalNotificationToInstacare(formedMessage + userInfo, true, true); // CareCrew
        sendNotificationsToFacilityPeople(
          facilityObj?.id,
          formedMessage + userInfo,
          true,
          selectedOption === "Facility Cancellation" ? false : true
        ); // Facility
        externalNotificationToPeople(peopleObj?.id, formedMessage, true, true); // Employee

        // END.

        SuccessToast("Shift UNASSIGNED successfully");
      } catch (error) {
        console.error("Error UNASSIGNED shift:", error);
        ErrorToast("Error UNASSIGNED shift:", error);
      }
    } catch (error) {
      console.error("Error UNASSIGNED shift:", error);
      ErrorToast("Error UNASSIGNED shift:", error);
    }
  };

  return (
    <Modal
      isOpen={isUnAssignModalOpen}
      onRequestClose={() => setIsUnAssignModalOpen(false)}
      contentLabel="Un-Assign Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "relative",
          borderRadius: 20,
          width: "300px",
          padding: "0px",
        },
      }}
    >
      <div className="flex flex-col items-center justify-center p-4 space-y-3">
        {/* Add your modal contents here */}
        {/* <h2>Are you sure you want to un-assign?</h2> */}

        <div className="w-full flex-start space-y-1">
          {type === ADMIN ? (
            <>
              <RadioButton
                value="Facility Cancellation"
                onChange={(e) => setSelectedOption(e.target.value)}
                checked={selectedOption === "Facility Cancellation"}
              >
                Facility Cancellation
              </RadioButton>
              <RadioButton
                value="Employee Call-Off"
                onChange={(e) => setSelectedOption(e.target.value)}
                checked={selectedOption === "Employee Call-Off"}
              >
                Employee Call-Off
              </RadioButton>

              <RadioButton
                value={"CareCrew Cancellation"}
                onChange={(e) => setSelectedOption(e.target.value)}
                checked={selectedOption === "CareCrew Cancellation"}
              >
                {"CareCrew Cancellation".replace("CareCrew", "CareCrew")}
              </RadioButton>
            </>
          ) : (
            <label className="text-gray-500 text-xs">
              Are you sure you wanna un-assign this shift?
            </label>
          )}
        </div>

        <Button
          children={"Confirm"}
          onClick={() => {
            // Here you can perform the mutation or any other action.
            handleUpdate();
            setIsUnAssignModalOpen(false);
          }}
        />
      </div>
    </Modal>
  );
};

const LateArrivalModal = ({
  isModalOpen,
  setModalOpen,
  updateTimecardQuery,
  selectedTimecard,
  selectedShift,
}) => {
  console.log(
    "🚀 ~ file: ShiftDetailsModal.js:334 ~ selectedShift:",
    selectedShift,
    selectedTimecard
  );

  const [lateTime, setLateTime] = useState(null);
  const { createNotificationQuery } = useCreateNotification();

  // SERVICE: ARRIVE LATE
  const handleArriveLate = async () => {
    const formattedLate =
      convertDateToAWSDate(new Date()) + "T" + convertTimeToAWSTime(lateTime);

    try {
      await updateTimecardQuery({
        id: selectedTimecard?.id,
        isLate: true,
        lateReason: "Arrived Late",
        clockInTime: formattedLate,
        _version: selectedTimecard?._version,
      });

      // const formedMessage = `${selectedOption} at ${
      //   facilityObj?.facilityName
      // } on ${displayDate(new Date())} for ${peopleObj?.firstName} ${
      //   peopleObj?.lastName
      // } ${displayDate(selectedShift?.shiftStartDT)}@${displayTime(
      //   selectedShift?.shiftStartDT
      // )}-${displayTime(selectedShift?.shiftEndDT)}`;

      // console.log(
      //   "🚀 ~ file: ShiftDetailsModal.js:343 ~ handleArriveLate ~ formedMessage:",
      //   selectedTimecard
      // );

      // START: Send notification on all platforms to CareCrew

      // // INTERNAL
      // inAppNotificationsToPeople(
      //   peopleObj?.id,
      //   FACILITY_CANCELLATION,
      //   "Shift was cancelled",
      //   formedMessage,
      //   createNotificationQuery
      // );
      // inApplNotificationToInstacare(
      //   FACILITY_CANCELLATION,
      //   "Shift was cancelled",
      //   formedMessage,
      //   createNotificationQuery
      // );
      // inAppNotificationsToFacilityPeople(
      //   selectedShift?.facilityID,
      //   FACILITY_CANCELLATION,
      //   "Shift was cancelled",
      //   formedMessage,
      //   createNotificationQuery
      // );

      // // EXTERNAL
      // externalNotificationToInstacare(formedMessage, true, true); // Instacare
      // sendNotificationsToFacilityPeople(
      //   facilityObj?.id,
      //   formedMessage,
      //   true,
      //   selectedOption === "Facility Cancellation" ? false : true
      // ); // Facility
      // externalNotificationToPeople(peopleObj?.id, formedMessage, true, true); // Employee

      // END.

      // START: Send notification on all platforms to instacare

      // INTERNAL
      // inAppNotificationsToFacilityPeople(
      //   selectedShift?.facilityID,
      //   FACILITY_CANCELLATION,
      //   "Shift was cancelled",
      //   formedMessage,
      //   createNotificationQuery
      // );

      // EXTERNAL
      // externalNotificationToInstacare(formedMessage, true, true); // Instacare
      // sendNotificationsToFacilityPeople(
      //   facilityObj?.id,
      //   formedMessage,
      //   true,
      //   selectedOption === "Facility Cancellation" ? false : true
      // ); // Facility
      // externalNotificationToPeople(peopleObj?.id, formedMessage, true, true); // Employee

      // END.

      SuccessToast('Shift "Arrived Late" successfully');
    } catch (error) {
      ErrorToast('Error "Arrived Late" shift:', error);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setModalOpen(false)}
      contentLabel="Un-Assign Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "relative",
          borderRadius: 20,
          width: "300px",
          padding: "0px",
        },
      }}
    >
      <div className="flex flex-col items-center justify-center p-4 space-y-3">
        <div className="w-full flex-start space-y-1">
          <p className="text-PRIMARY_COLOR text-sm font-semibold">
            Late Arrival Time:
          </p>
          <TimePickerCustom time={lateTime} onChange={setLateTime} />
        </div>

        <Button
          children={"Confirm"}
          onClick={() => {
            // Here you can perform the mutation or any other action.
            // handleUpdate();
            handleArriveLate();
            setModalOpen(false);
          }}
        />
      </div>
    </Modal>
  );
};

const ShiftDetailsModal = ({
  modalIsOpen,
  closeModal,
  selectedFacility,
  selectedShift,
  selectedTimecard,
  setSelectedPeople,
  assignedTo,
  setMode,
  buttonRef,
  refetchShifts,
  openShiftEditModal,
  canDeleteShift,
  // handleDelete,
  canPerformActions = true,
}) => {
  const { type, myFacility, user } = useAuth();
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const openEditModal = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top + rect.height + rect.height / 12 + "px",
      right: window.innerWidth - rect.right + "px",
    });
    setEditModalIsOpen(true);
  };

  const [isUnAssignModalOpen, setIsUnAssignModalOpen] = useState(false);
  const [isLateModalOpen, setLateModalOpen] = useState(false);

  const { deleteShiftQuery } = useDeleteShift();
  const { updateShiftQuery } = useUpdateShift();
  const { updateTimecardQuery } = useUpdateTimecard();
  const { deleteTimecardQuery } = useDeleteTimecard();

  const { createNotificationQuery } = useCreateNotification();

  // SERVICE: DELETE
  const handleDelete = async () => {
    if (selectedTimecard) {
      // return;
      if (
        // selectedTimecard?.clockInTime !== undefined &&
        selectedTimecard?.clockOutTime
      ) {
        ErrorToast("Cannot delete completed timecard.");
        return;
      }
      try {
        const response = await deleteTimecardQuery({
          id: selectedTimecard?.id,
          _version: selectedTimecard?._version,
        });

        SuccessToast("Timecard deleted successfully");

        // console.log(
        //   "🚀 ~ file: ShiftDetailsModal.js:379 ~ handleDelete ~ selectedTimecard?.lateReason:",
        //   selectedTimecard?.lateReason
        // );

        if (
          !selectedTimecard?.lateReason?.includes("Facility Cancellation") &&
          !selectedTimecard?.isCallOff
        ) {
          try {
            await updateShiftQuery({
              id: selectedShift?.id,
              numOfPositions: (
                parseInt(selectedShift?.numOfPositions) + 1
              ).toString(),
              _version: selectedShift?._version,
            });
            SuccessToast("Shift positions updated successfully");
          } catch (error) {
            ErrorToast("Error updating shift positions:", error);
          }
        }
      } catch (error) {
        console.log(error);
        ErrorToast("Error deleting timecard:", error);
      }

      await refetchShifts();
    } else {
      try {
        await updateShiftQuery({
          id: selectedShift?.id,
          isArchive: true,
          _version: selectedShift?._version,
        });

        const formedMessage_OLD = `Shift deleted by ${
          myFacility?.facilityName ? selectedFacility?.facilityName : "CareCrew"
        } at ${
          selectedFacility?.facilityName
        } on ${new Date()} for ${displayDate(
          selectedShift?.shiftStartDT
        )}@${displayTime(selectedShift?.shiftStartDT)}-${displayTime(
          selectedShift?.shiftEndDT
        )}`;

        let formedMessage = `Subject: Open Shift Deletion\n\nThe following shft has been cancelled by ${
          myFacility?.facilityName ? "Facility" : "CareCrew"
        }\n\nFacility: ${
          selectedFacility?.facilityName
        }\nShift Date: ${displayDate(
          selectedShift?.shiftStartDT
        )}\nShift Time: ${
          displayTime(selectedShift?.shiftStartDT) +
          " - " +
          displayTime(selectedShift?.shiftEndDT)
        }\n\nTimestamp: ${
          displayDate(new Date()?.toISOString()) +
          " " +
          displayTime(new Date()?.toISOString())
        }`;

        // START: Send notification on all platforms to CareCrew

        // // INTERNAL
        inApplNotificationToInstacare(
          SHIFT_DELETED,
          "Shift Deleted",
          formedMessage,
          createNotificationQuery
        );
        inAppNotificationsToFacilityPeople(
          selectedShift?.facilityID,
          SHIFT_DELETED,
          "Shift Deleted",
          formedMessage,
          createNotificationQuery
        );

        // // EXTERNAL
        externalNotificationToInstacare(formedMessage, true, false); // CareCrew
        sendNotificationsToFacilityPeople(
          selectedFacility?.id,
          formedMessage,
          true,
          false // test disabled
        ); // Facility

        // END.

        SuccessToast("Shift deleted successfully");

        await refetchShifts();
      } catch (error) {
        console.error(error);
        ErrorToast("Error deleting shift:" + error);
      }
    }
  };

  // SERVICE: NOCALLNOSHOW (TEMP DISABLED)
  const handleNoCallNoShow = async () => {
    try {
      await updateTimecardQuery({
        id: selectedTimecard?.id,
        isLate: true,
        isCallOff: true,
        lateReason: "NO CALL NO SHOW",
        _version: selectedTimecard?._version,
      });
      try {
        await updateShiftQuery({
          id: selectedShift?.id,
          numOfPositions: (
            parseInt(selectedShift?.numOfPositions) + 1
          ).toString(),
          _version: selectedShift?._version,
        });

        const peopleObj = (
          await API.graphql(
            graphqlOperation(getPeople, { id: selectedTimecard?.peopleID })
          )
        )?.data?.getPeople;

        let formedMessage = `Subject: Employee No Call/No Show\n\nThe employee did not appear for the following shift:\n\nEmployee: ${
          peopleObj?.firstName
        } ${peopleObj?.lastName}\nShift Date: ${displayDate(
          selectedShift?.shiftStartDT
        )}\nShift Time: ${
          displayTime(selectedShift?.shiftStartDT) +
          " - " +
          displayTime(selectedShift?.shiftEndDT)
        }\nFacility: ${selectedFacility?.facilityName}\n\nTimestamp: ${
          displayDate(new Date()?.toISOString()) +
          " " +
          displayTime(new Date()?.toISOString())
        }`; //\n\nBy User: ${user?.attributes?.email}`;

        const userInfo = `\nBy User: ${user?.attributes?.email}`;

        // // INTERNAL
        inAppNotificationsToPeople(
          selectedTimecard?.peopleID,
          NO_CALL_NO_SHOW,
          "Employee NO CALL NO SHOW",
          formedMessage,
          createNotificationQuery
        );
        inApplNotificationToInstacare(
          NO_CALL_NO_SHOW,
          "Employee NO CALL NO SHOW",
          formedMessage + userInfo,
          createNotificationQuery
        );
        inAppNotificationsToFacilityPeople(
          selectedShift?.facilityID,
          NO_CALL_NO_SHOW,
          "Employee NO CALL NO SHOW",
          formedMessage + userInfo,
          createNotificationQuery
        );

        // // // EXTERNAL
        externalNotificationToInstacare(formedMessage + userInfo, true, true); // CareCrew
        sendNotificationsToFacilityPeople(
          selectedFacility?.id,
          formedMessage + userInfo,
          true,
          false // test disabled
        ); // Facility
        externalNotificationToPeople(peopleObj?.id, formedMessage, true, true); // Employee

        // END.

        SuccessToast("Shift unassigned successfully");
      } catch (error) {
        ErrorToast("Error unassigning shift:", error);
      }

      SuccessToast('Shift "NO CALL NO SHOW" successfully');
    } catch (error) {
      ErrorToast('Error "NO CALL NO SHOW" shift:', error);
    }
  };

  // SERVICE: ARRIVELATE (TEMP DISABLED)
  const handleArriveLate = async () => {
    try {
      await updateTimecardQuery({
        id: selectedTimecard?.id,
        // isLate: true,
        lateReason: `Marked late by ${
          type === FACILITY ? "facility" : "CareCrew"
        }`,
        _version: selectedTimecard?._version,
      });

      // console.log(
      //   "🚀 ~ file: ShiftDetailsModal.js:677 ~ handleArriveLate ~ selectedTimecard:",
      //   selectedTimecard,
      //   selectedShift,
      //   selectedFacility
      // );

      const peopleObj = (
        await API.graphql(
          graphqlOperation(getPeople, { id: selectedTimecard?.peopleID })
        )
      )?.data?.getPeople;

      let formedMessage = `Subject: Employee Delay Notice\n\nThe following employee is running late for the following shift:\n\nShift Date: ${displayDate(
        selectedShift?.shiftStartDT
      )}\nShift Time: ${
        displayTime(selectedShift?.shiftStartDT) +
        " - " +
        displayTime(selectedShift?.shiftEndDT)
      }\nFacility: ${selectedFacility?.facilityName}\nEmployee: ${
        peopleObj?.firstName + " " + peopleObj?.lastName
      }\nUpdated TOA: N/A\n\nTimestamp: ${
        displayDate(new Date()?.toISOString()) +
        " " +
        displayTime(new Date()?.toISOString())
      }\nBy User: ${user?.attributes?.email}`;

      // START: Send notification on all platforms to CareCrew

      // // INTERNAL
      inAppNotificationsToPeople(
        peopleObj?.id,
        EMPLOYEE_LATE,
        "Employee is running late",
        formedMessage,
        createNotificationQuery
      );
      inApplNotificationToInstacare(
        EMPLOYEE_LATE,
        "Employee is running late",
        formedMessage,
        createNotificationQuery
      );
      inAppNotificationsToFacilityPeople(
        selectedShift?.facilityID,
        EMPLOYEE_LATE,
        "Employee is running late",
        formedMessage,
        createNotificationQuery
      );

      // // EXTERNAL
      externalNotificationToInstacare(formedMessage, true, false); // CareCrew
      sendNotificationsToFacilityPeople(
        selectedFacility?.id,
        formedMessage,
        true,
        true
      ); // Facility
      externalNotificationToPeople(peopleObj?.id, formedMessage, true, true); // Employee

      // END.
      SuccessToast('Shift "Arrived Late" successfully');
    } catch (error) {
      ErrorToast('Error "Arrived Late" shift:', error);
    }
  };

  const iconSize = 7;

  // const shiftStartDateTime = new Date(
  //   `${selectedShift?.date}T${selectedShift?.shiftStart}`
  // );
  const shiftStartDateTime = new Date(`${selectedShift?.shiftStartDT}`);
  const shiftEndDateTime = new Date(`${selectedShift?.shiftEndDT}`);

  const clockInTime = new Date(selectedTimecard?.clockInTime);

  // 3 important variables for modal conditional rendering
  const isLogicalLate = shiftStartDateTime < clockInTime;

  const isInProgress =
    selectedTimecard?.clockInTime && !selectedTimecard?.clockOutTime;
  const isCompleted =
    selectedTimecard?.clockInTime && selectedTimecard?.clockOutTime;

  const shiftTimingHeadline =
    !isInProgress && !isCompleted
      ? reverseFormatDate(selectedShift?.shiftStart) +
        " - " +
        reverseFormatDate(selectedShift?.shiftEnd)
      : reverseFormatDate(selectedTimecard?.clockInTime) +
        " - " +
        reverseFormatDate(selectedTimecard?.clockOutTime);

  const currentTime = new Date();
  const isShiftInPast = shiftStartDateTime < currentTime;
  // console.log(
  //   "🚀 ~ file: ShiftDetailsModal.js:517 ~ isShiftInPast:",
  //   isShiftInPast
  // );

  // const now = new Date();
  const now = new Date(moment.utc());

  // console.log(
  //   "🚀 ~ file: ShiftDetailsModal.js:483 ~ shiftStartDateTime:",
  //   selectedShift?.shiftStartDT,
  //   now?.toISOString(),
  //   selectedShift?.shiftEndDT,
  //   selectedShift
  // );

  const canNoCallNoShow =
    type === ADMIN
      ? true
      : new Date(selectedShift?.shiftStartDT) <= now &&
        now <= new Date(selectedShift?.shiftEndDT);
  // const canNoCallNoShow = new Date(selectedShift?.shiftStartDT) < now; //&&
  // new Date(selectedShift?.shiftEndDT) > now;

  // const canNoCallNoShow = true;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);

  return (
    <>
      {type !== EMPLOYEE && !(type === FACILITY && isShiftInPast) && (
        <EditShiftModal
          position={position}
          open={editModalIsOpen}
          onClose={closeEditModal}
          onCloseParentModal={closeModal}
          handleDelete={() => setShowConfirmModal(true)}
          // handleDelete={handleDelete}
          // disableDelete={
          //   type === FACILITY ? selectedShift?.cancellationGuarantee : false
          // }
          disableDelete={
            type === FACILITY
              ? selectedTimecard
                ? true
                : selectedShift?.cancellationGuarantee
              : false
          }
          disableEdit={selectedTimecard ? true : false}
          openShiftEditModal={openShiftEditModal}
          shift={selectedShift}
          canDeleteShift={canDeleteShift}
        />
      )}

      <ConfirmationModal
        modalIsOpen={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        message={"Are you sure you want to delete these cards?"}
        // warning={warningMessage}
        onConfirm={() => {
          handleDelete();
          setShowConfirmModal(false);
        }}
        onCancel={() => {
          // setSelectedShifts([]);
          setShowConfirmModal(false);
        }}
      />

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
            position: "relative",
            borderRadius: 20,
            // boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
            width: "300px",
            padding: "0px", // This line will remove the padding
          },
        }}
      >
        <UnassignModal
          isUnAssignModalOpen={isUnAssignModalOpen}
          setIsUnAssignModalOpen={setIsUnAssignModalOpen}
          updateTimecardQuery={updateTimecardQuery}
          selectedTimecard={selectedTimecard}
          selectedShift={selectedShift}
        />

        <LateArrivalModal
          isModalOpen={isLateModalOpen}
          setModalOpen={setLateModalOpen}
          updateTimecardQuery={updateTimecardQuery}
          selectedTimecard={selectedTimecard}
          selectedShift={selectedShift}
        />
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col relative bg-PRIMARY_COLOR w-full justify-center items-center py-2">
            {type !== EMPLOYEE &&
              openEditModal &&
              !(type === FACILITY && isShiftInPast) &&
              (selectedTimecard ? selectedTimecard?.isCallOff : true) && (
                <div
                  onClick={openEditModal}
                  ref={buttonRef}
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  <KebabMenuWhite />
                </div>
              )}
            <label className="text-PRIMARY_LIGHT_COLOR text-xxs ">
              SHIFT DETAILS
            </label>
            <div className="my-3" />
            <label className="text-white text-lg font-bold">
              {shiftTimingHeadline}
            </label>
            <div className="my-1" />
            <label className="text-white text-xs">
              {displayDate(
                selectedTimecard?.clockInTime
                  ? selectedTimecard?.clockInTime
                  : selectedShift?.shiftStartDT
              )}
              {/* {selectedShift?.date} */}
            </label>
            {/* <label className="text-white text-xs">{selectedShift?.date}</label> */}
            <div className="my-1" />
            <label className="text-PRIMARY_LIGHT_COLOR text-xxs">
              {selectedFacility?.facilityName} - {selectedShift?.roleRequired}
            </label>
            <div className="my-1" />
            <div className="flex items-center">
              <LocationIcon size={3} />
              <div className="mx-1" />
              <label className="text-PRIMARY_LIGHT_COLOR text-xxs">
                {selectedFacility?.streetAddress}
              </label>
            </div>
          </div>

          <div className="flex w-full justify-between p-2">
            {selectedShift?.peopleID ? (
              <></>
            ) : (
              <>
                {!selectedTimecard ? (
                  <div className="text-xs font-semibold">
                    {selectedShift.numOfPositions} Positions
                  </div>
                ) : null}
              </>
            )}

            <div className="flex py-1">
              <OpenIndicator
                isOpen={selectedTimecard ? true : false}
                size={iconSize}
                className="mr-2"
              />

              {selectedShift.isIncentive ? (
                <IncentiveIndicator size={iconSize} className="mr-2" />
              ) : null}

              {selectedShift.isGuarantee ? (
                <GuaranteeIndicator size={iconSize} className="mr-2" />
              ) : null}

              {(
                selectedTimecard?.isLate
                  ? selectedTimecard?.isLate
                  : selectedTimecard?.isLate
              ) ? (
                <WatchIndicator size={iconSize} className="mr-2" />
              ) : null}

              {(
                selectedTimecard?.isCallOff
                  ? selectedTimecard?.isCallOff
                  : selectedTimecard?.isCallOff
              ) ? (
                <UserXIndicator size={iconSize} className="mr-2" />
              ) : null}
            </div>
          </div>

          {selectedTimecard ? (
            <div
              style={{
                borderTop: "1px solid #EDEDED",
                borderBottom: "1px solid white",
                borderRight: "1px solid white",
                borderLeft: "1px solid white",
                borderRadius: "0px",
                minHeight: "65px",
                width: "95%",
              }}
              className="h-14 w-full border  flex flex-row items-center justify-between"
            >
              <div
                style={{ width: "100%" }}
                className="h-full items-center justify-between flex pl-3 gap-3"
              >
                <div className="h-full flex flex-row items-center gap-3">
                  <Avatar
                    imgSrc={assignedTo?.profilePicture}
                    isSquared={false}
                    alt={assignedTo?.firstName + assignedTo?.lastName}
                  />

                  <div className="h-full/2 flex flex-col justify-between items-center">
                    <p
                      style={{
                        fontSize: "12px",
                        width: "100%",
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      {assignedTo?.firstName} {assignedTo?.lastName}
                    </p>
                    <p
                      style={{
                        color: themeStyles?.PRIMARY_COLOR,
                        fontSize: "12px",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      {assignedTo?.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* {isLogicalLate ? "Late Logically" : ""} */}

          {type !== EMPLOYEE &&
          selectedTimecard &&
          !selectedTimecard.isCallOff &&
          !isCompleted ? (
            <div className="flex flex-col gap-1 p-2 w-full">
              <div className="flex flex-row h-full gap-1 w-full">
                {!(type === FACILITY && selectedShift.cancellationGuarantee) &&
                  !(type === FACILITY && isShiftInPast) && (
                    <Button
                      children={
                        type === FACILITY ? "CANCEL SHIFT" : "UN-ASSIGN"
                      }
                      // onClick={() => {
                      //   closeModal();
                      //   // setMode(MODES.ADD_MEMBERS);
                      // }}
                      onClick={() => {
                        setIsUnAssignModalOpen(true);
                      }}
                    />
                  )}
                <Button
                  children={"ARRIVE-LATE"}
                  onClick={() => {
                    handleArriveLate();
                    // closeModal();
                  }}
                />
              </div>
              {canNoCallNoShow && (
                <div className="flex flex-row h-full w-full p-0">
                  <Button
                    children={"NO CALL NO SHOW"}
                    onClick={() => {
                      handleNoCallNoShow();
                      closeModal();
                    }}
                  />
                </div>
              )}
            </div>
          ) : !selectedTimecard &&
            type !== EMPLOYEE &&
            !(type === FACILITY && isShiftInPast) ? (
            <div className="flex flex-row h-full p-2">
              <Button
                disabled={
                  parseInt(selectedShift.numOfPositions) === 0 ? true : false
                }
                children={"ASSIGN"}
                onClick={() => {
                  // closeModal();
                  setMode(MODES.ADD_MEMBERS);
                }}
              />
              <div className="mx-1" />
              <Button
                children={"CLOSE"}
                color={themeStyles.GRAY}
                onClick={() => {
                  closeModal();

                  setMode(MODES.SHIFT_DETAILS);
                  setSelectedPeople([]);
                }}
              />
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
};

export default ShiftDetailsModal;
