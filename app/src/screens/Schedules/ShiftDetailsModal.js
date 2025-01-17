import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Modal from "react-modal";
import moment from "moment";

import themeStyles from "../../styles/theme.styles";

import Button from "../../components/Button";
import EditShiftModal from "../../components/Modals/EditShiftModal";
import Avatar from "../../components/Avatar";
import RadioButton from "../../components/Button/RadioButton";
import DatePickerCustom from "../../components/DatePicker";
import TimePickerCustom from "../../components/TimePicker";
import ConfirmationModal from "../../components/ConfirmationModal";

import KebabMenuWhite from "../../assets/icons/kebabMenuWhite";
import OpenIndicator from "../../assets/icons/indicators/open";
import IncentiveIndicator from "../../assets/icons/indicators/incentive";
import GuaranteeIndicator from "../../assets/icons/indicators/guarantee";
import UserXIndicator from "../../assets/icons/userx";
import WatchIndicator from "../../assets/icons/watch";
import LocationIcon from "../../assets/icons/location";

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

import { NotificationHub } from "../../services/notifications/hub";
import {
  useCreateShift,
  useDeleteShift,
  useUpdateShift,
} from "../../apolloql/schedules";
import {
  useCreateTimecard,
  useDeleteTimecard,
  useUpdateTimecard,
} from "../../apolloql/timecards";
import { useCreateNotification } from "../../apolloql/notifications";
import { useAuth } from "../../context";

import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";

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

/* -------------------------------------------------------------------------- */
/*                           UnassignModal Component                          */
/* -------------------------------------------------------------------------- */
const UnassignModal = ({
  isUnAssignModalOpen,
  setIsUnAssignModalOpen,
  updateTimecardQuery,
  selectedTimecard,
  selectedShift,
}) => {
  const { type, user } = useAuth();
  const { updateShiftQuery } = useUpdateShift();
  const { createNotificationQuery } = useCreateNotification();

  const [selectedOption, setSelectedOption] = useState(
    type !== ADMIN ? "Facility Cancellation" : ""
  );

  const removeTrailingZ = (timeStr) => {
    if (!timeStr) return null;
    return timeStr.endsWith("Z") ? timeStr.slice(0, -1) : timeStr;
  };

  const handleUpdate = async () => {
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

        await NotificationHub.sendShiftCancellationNotifications({
          selectedOption,
          selectedShift,
          facilityObj,
          peopleObj,
          user,
          createNotificationQuery,
        });

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
          width: "90%",
          maxWidth: "400px",
          padding: "0px",
          margin: "auto",
        },
      }}
    >
      <div className="flex flex-col items-center justify-center p-4 space-y-3">
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
                value="CareCrew Cancellation"
                onChange={(e) => setSelectedOption(e.target.value)}
                checked={selectedOption === "CareCrew Cancellation"}
              >
                CareCrew Cancellation
              </RadioButton>
            </>
          ) : (
            <label className="text-gray-500 text-xs">
              Are you sure you wanna un-assign this shift?
            </label>
          )}
        </div>

        <Button
          children="Confirm"
          onClick={() => {
            handleUpdate();
            setIsUnAssignModalOpen(false);
          }}
        />
      </div>
    </Modal>
  );
};

/* -------------------------------------------------------------------------- */
/*                          LateArrivalModal Component                        */
/* -------------------------------------------------------------------------- */
const LateArrivalModal = ({
  isModalOpen,
  setModalOpen,
  updateTimecardQuery,
  selectedTimecard,
  selectedShift,
}) => {
  const [lateTime, setLateTime] = useState(null);
  const { createNotificationQuery } = useCreateNotification();

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
          width: "90%",
          maxWidth: "400px",
          padding: "0px",
          margin: "auto",
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
          children="Confirm"
          onClick={() => {
            handleArriveLate();
            setModalOpen(false);
          }}
        />
      </div>
    </Modal>
  );
};

/* -------------------------------------------------------------------------- */
/*                         ShiftDetailsModal Component                        */
/* -------------------------------------------------------------------------- */
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
  canPerformActions = true,
}) => {
  const { type, myFacility, user } = useAuth();
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const closeEditModal = () => setEditModalIsOpen(false);

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

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [warningMessage] = useState(null);

  /* ------------------------------ Delete Logic ----------------------------- */
  const handleDelete = async () => {
    if (selectedTimecard) {
      if (selectedTimecard?.clockOutTime) {
        ErrorToast("Cannot delete completed timecard.");
        return;
      }
      try {
        await deleteTimecardQuery({
          id: selectedTimecard?.id,
          _version: selectedTimecard?._version,
        });
        SuccessToast("Timecard deleted successfully");

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
        let latestShift;
        try {
          latestShift = (
            await API.graphql(
              graphqlOperation(getShifts, { id: selectedShift?.id })
            )
          )?.data?.getShifts;

          if (!latestShift) {
            ErrorToast("Failed to fetch the latest shift details.");
            return;
          }
        } catch (error) {
          console.error("Error fetching the latest shift:", error);
          ErrorToast("Failed to fetch the latest shift. Please try again.");
          return;
        }

        await updateShiftQuery({
          id: selectedShift?.id,
          isArchive: true,
          _version: latestShift?._version,
        });

        await NotificationHub.sendShiftDeletionNotifications({
          latestShift,
          selectedFacility,
          myFacility,
          createNotificationQuery,
        });

        SuccessToast("Shift deleted successfully");
        await refetchShifts();
      } catch (error) {
        console.error(error);
        ErrorToast("Error deleting shift:" + error);
      }
    }
  };

  /* ---------------------------- NoCallNoShow Logic ------------------------- */
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

        await NotificationHub.sendNoCallNoShowNotifications({
          peopleObj,
          selectedShift,
          selectedFacility,
          selectedTimecard,
          user,
          createNotificationQuery,
        });

        SuccessToast("Shift unassigned successfully");
      } catch (error) {
        ErrorToast("Error unassigning shift:", error);
      }
      SuccessToast('Shift "NO CALL NO SHOW" successfully');
    } catch (error) {
      ErrorToast('Error "NO CALL NO SHOW" shift:', error);
    }
  };

  /* ---------------------------- ArriveLate Logic --------------------------- */
  const handleArriveLate = async () => {
    try {
      await updateTimecardQuery({
        id: selectedTimecard?.id,
        lateReason: `Marked late by ${
          type === FACILITY ? "facility" : "CareCrew"
        }`,
        _version: selectedTimecard?._version,
      });

      const peopleObj = (
        await API.graphql(
          graphqlOperation(getPeople, { id: selectedTimecard?.peopleID })
        )
      )?.data?.getPeople;

      await NotificationHub.sendEmployeeDelayNotifications({
        selectedShift,
        selectedFacility,
        peopleObj,
        user,
        createNotificationQuery,
      });
      SuccessToast('Shift "Arrived Late" successfully');
    } catch (error) {
      ErrorToast('Error "Arrived Late" shift:', error);
    }
  };

  /* --------------------------- Time/Date Handling -------------------------- */
  const iconSize = 7;
  const shiftStartDateTime = new Date(`${selectedShift?.shiftStartDT}`);
  const shiftEndDateTime = new Date(`${selectedShift?.shiftEndDT}`);
  const clockInTime = new Date(selectedTimecard?.clockInTime);
  const isLogicalLate = shiftStartDateTime < clockInTime;
  const isInProgress =
    selectedTimecard?.clockInTime && !selectedTimecard?.clockOutTime;
  const isCompleted =
    selectedTimecard?.clockInTime && selectedTimecard?.clockOutTime;

  const shiftTimingHeadline =
    !isInProgress && !isCompleted
      ? `${reverseFormatDate(selectedShift?.shiftStart)} - ${reverseFormatDate(
          selectedShift?.shiftEnd
        )}`
      : `${reverseFormatDate(
          selectedTimecard?.clockInTime
        )} - ${reverseFormatDate(selectedTimecard?.clockOutTime)}`;

  const currentTime = new Date();
  const isShiftInPast = shiftStartDateTime < currentTime;
  const now = new Date(moment.utc());
  const canNoCallNoShow =
    type === ADMIN
      ? true
      : new Date(selectedShift?.shiftStartDT) <= now &&
        now <= new Date(selectedShift?.shiftEndDT);

  return (
    <>
      {type !== EMPLOYEE && !(type === FACILITY && isShiftInPast) && (
        <EditShiftModal
          position={position}
          open={editModalIsOpen}
          onClose={closeEditModal}
          onCloseParentModal={closeModal}
          handleDelete={() => setShowConfirmModal(true)}
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
        message="Are you sure you want to delete these cards?"
        onConfirm={() => {
          handleDelete();
          setShowConfirmModal(false);
        }}
        onCancel={() => setShowConfirmModal(false)}
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
            borderRadius: 20,
            width: "80%",
            // height: "auto",
            maxWidth: "400px",
            padding: "0px",
            margin: "auto",

            height: "fit-content", // Use fit-content for dynamic height

            maxHeight: "50vh", // Optional: Limit the height to avoid overflow
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
          <div
            style={{ backgroundColor: themeStyles?.PRIMARY_COLOR }}
            className="flex flex-col relative w-full justify-center items-center py-2"
          >
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
            <label
              style={{ color: themeStyles?.PRIMARY_LIGHT_COLOR }}
              className="text-xxs"
            >
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
            </label>
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
            {selectedShift?.peopleID
              ? null
              : !selectedTimecard && (
                  <div className="text-xs font-semibold">
                    {selectedShift.numOfPositions} Positions
                  </div>
                )}
            <div className="flex py-1">
              <OpenIndicator
                isOpen={selectedTimecard ? true : false}
                size={iconSize}
                className="mr-2"
              />
              {selectedShift.isIncentive && (
                <IncentiveIndicator size={iconSize} className="mr-2" />
              )}
              {selectedShift.isGuarantee && (
                <GuaranteeIndicator size={iconSize} className="mr-2" />
              )}
              {(selectedTimecard?.isLate
                ? selectedTimecard?.isLate
                : false) && <WatchIndicator size={iconSize} className="mr-2" />}
              {(selectedTimecard?.isCallOff
                ? selectedTimecard?.isCallOff
                : false) && <UserXIndicator size={iconSize} className="mr-2" />}
            </div>
          </div>

          {selectedTimecard && (
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
              className="h-14 w-full border flex flex-row items-center justify-between"
            >
              <div className="h-full flex flex-row items-center justify-between pl-3 gap-3 w-full">
                <div className="h-full flex flex-row items-center gap-3">
                  <Avatar
                    imgSrc={assignedTo?.profilePicture}
                    isSquared={false}
                    alt={assignedTo?.firstName + assignedTo?.lastName}
                  />
                  <div className="flex flex-col justify-between">
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
          )}

          {type !== EMPLOYEE &&
            selectedTimecard &&
            !selectedTimecard.isCallOff &&
            !isCompleted && (
              <div className="flex flex-col gap-1 p-2 w-full">
                <div className="flex flex-col md:flex-row h-full gap-1 w-full">
                  {!(
                    type === FACILITY && selectedShift.cancellationGuarantee
                  ) &&
                    !(type === FACILITY && 0) && (
                      // !(type === FACILITY && isShiftInPast) && (
                      <Button
                        children={
                          type === FACILITY ? "CANCEL SHIFT" : "UN-ASSIGN"
                        }
                        onClick={() => setIsUnAssignModalOpen(true)}
                      />
                    )}
                  <Button children="ARRIVE-LATE" onClick={handleArriveLate} />
                </div>
                {canNoCallNoShow && (
                  <div className="flex flex-row h-full w-full p-0">
                    <Button
                      children="NO CALL NO SHOW"
                      onClick={() => {
                        handleNoCallNoShow();
                        closeModal();
                      }}
                    />
                  </div>
                )}
              </div>
            )}

          {!selectedTimecard && type !== EMPLOYEE && (
            <div className="flex flex-row h-full p-2">
              <Button
                disabled={
                  parseInt(selectedShift.numOfPositions) === 0 ||
                  (type === FACILITY && isShiftInPast)
                }
                children="ASSIGN"
                onClick={() => setMode(MODES.ADD_MEMBERS)}
              />
              <div className="mx-1 my-1 md:my-0" />
              <Button
                children="CLOSE"
                color={themeStyles.GRAY}
                onClick={() => {
                  closeModal();
                  setMode(MODES.SHIFT_DETAILS);
                  setSelectedPeople([]);
                }}
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ShiftDetailsModal;
