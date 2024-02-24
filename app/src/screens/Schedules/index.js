import React, { useState, useEffect, useMemo, useRef } from "react";
import themeStyles from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";

import DeleteIcon from "../../assets/icons/delete";
import FilterIcon from "../../assets/icons/filter";

import { Card, Typography } from "@material-tailwind/react";

import PageNav from "../../components/PageNav";

import DateDropDown from "../../components/DateDropDown";
import IconButton from "../../components/Button/IconButton";

import { useAdmin, useAuth } from "../../context";
import { useNavigate } from "react-router-dom";

import DualDatePicker from "../../components/DatePicker/DualDatePicker";
import OptionTab from "../../components/NavTab/OptionTab";

import Modal from "react-modal";
import PeopleSelect from "../../components/PeopleSelect";

import ScheduleFilterModal from "../../components/Drawers/ScheduleFilterModal";

import { userTimezone } from "../../apolloql/timezone";

import {
  useDeleteTimecard,
  useListTimecards,
  useUpdateTimecard,
} from "../../apolloql/timecards";
import { useCreateTimecard } from "../../apolloql/timecards";
import { useListFacilities } from "../../apolloql/facilities";
import { useListPeople } from "../../apolloql/people";
import { useDeleteShift, useUpdateShift } from "../../apolloql/schedules";

import { Auth, API, graphqlOperation } from "aws-amplify";

import {
  ErrorToast,
  SuccessToast,
  displayDate,
  displayTime,
  hasPermission,
} from "../../services/micro";

import { EMPLOYEE, FACILITY } from "../../constants/userTypes";
import { useListShifts } from "../../apolloql/schedules";

import { FACILITY_PERMISSIONS, SUPER_ADMIN } from "../../constants/permissions";

import useFilters from "./useFilters";
import ShiftsContainer from "./components/ShiftsContainer";
import ShiftDetailsModal from "./ShiftDetailsModal";
import { gql, useSubscription } from "@apollo/client";
import {
  onCreateShifts,
  onCreateTimecard,
  onDeleteShifts,
  onUpdateShifts,
} from "../../graphql/subscriptions";
import ShiftEditModal from "./ShiftEditModal";
import { getPeople, getShifts } from "../../graphql/queries";
import { sendBulkMessages } from "../../services/messaging";
import { assignTimecards } from "../../services/timecards/services";
import ConfirmationModal from "../../components/ConfirmationModal";
import moment from "moment";
import { getTimecardsForShift } from "../../services/timecards/check";
import { useCreateNotification } from "../../apolloql/notifications";
import {
  externalNotificationToInstacare,
  inAppNotificationsToFacilityPeople,
  inApplNotificationToInstacare,
  sendNotificationsToFacilityPeople,
} from "../../services/timecards/reporting";
import { SHIFT_DELETED } from "../../constants/notificationTypes";

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const MODES = {
  SHIFT_DETAILS: "shiftDetails",
  ADD_MEMBERS: "addMembers",
  SHIFT_EDIT: "shiftEdit",
};

const Schedules = () => {
  const navigate = useNavigate();
  const buttonRef = useRef();
  const { user, type, myFacility, permissions } = useAuth();
  const isSuperAdmin = SUPER_ADMIN === user?.attributes?.email;
  const canCreateShift = isSuperAdmin
    ? true
    : permissions.permissions?.find((obj) => obj?.name === "Create Schedule")
        ?.isSelected;
  const canDeleteShift =
    type === EMPLOYEE
      ? false
      : isSuperAdmin
      ? true
      : permissions.permissions?.find((obj) => obj?.name === "Delete Schedule")
          ?.isSelected;

  const [viewMode, setViewMode] = useState("weekly");
  const [startDate, setStartDate] = useState(""); // Make sure to initialize these values if needed.
  const [endDate, setEndDate] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);

  let date = new Date();
  date.setDate(date.getDate() - 1); //
  // const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (viewMode === "weekly") {
    date.setDate(date.getDate() - date.getDay() + 1 + weekOffset * 7);
  } else if (viewMode === "monthly") {
    date = new Date(date.getFullYear(), date.getMonth() + weekOffset, 1);
  }

  if (startDate && new Date(startDate) > date) {
    date = new Date(startDate); // If our starting date is before the startDate, adjust it.
  }

  let numDaysInView = 7;
  // if (viewMode === "weekly") {
  //   numDaysInView = 7;
  // } else if (viewMode === "monthly") {
  //   const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  //   const lastDayOfCurrentMonth = new Date(
  //     nextMonth.setDate(nextMonth.getDate() - 1)
  //   );
  //   numDaysInView = lastDayOfCurrentMonth.getDate();
  // }

  const dates = [];
  for (let i = 0; i < numDaysInView; i++) {
    const d = new Date(date);
    d.setDate(d.getDate() + i);

    dates.push(
      d.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        timeZone: userTimezone,
      })
    );
  }

  //... (rest of your code)

  // Hooks for filters and states
  const {
    shiftStatus,
    setShiftStatus,
    filters,
    setFilters,
    selectedFacilityId,
    setSelectedFacilityId,
    employeeName,
    setEmployeeName,
    selectedRole,
    setSelectedRole,
    selectedDate,
    setSelectedDate,
    selectedShiftTimings,
    setSelectedShiftTimings,
  } = useFilters();

  // console.log(
  //   "🚀 ~ file: index.js:195 ~ Schedules ~ dates[0]:",
  //   dates[0],
  //   dates[6]
  // );

  const {
    shifts: fetchedShifts,
    refetch: refetchShifts,
    loading,
  } = useListShifts(
    type === FACILITY ? myFacility?.id : null,
    selectedRole,
    selectedDate,
    selectedShiftTimings,
    dates[0],
    dates[6],
    startDate,
    endDate,
    shiftStatus === "Guarantee",
    shiftStatus === "Incentive"
  );
  const { updateShiftQuery } = useUpdateShift();
  const { timecards, refetch: refetchTimecards } = useListTimecards(
    type === EMPLOYEE ? user?.attributes?.sub : employeeName
  );
  const { createTimecardQuery } = useCreateTimecard();

  /* WATCHERS START */
  useEffect(() => {
    const subscriptions = [];

    // Subscriptions for Shifts
    const onCreateShiftSubscription = API.graphql(
      graphqlOperation(onCreateShifts)
    ).subscribe({
      next: ({
        value: {
          data: { onCreateShifts },
        },
      }) => {
        if (refetchShifts) {
          refetchShifts();
        }
      },
      error: (error) => {
        console.error("Error with onCreateShift subscription: ", error);
      },
    });
    subscriptions.push(onCreateShiftSubscription);

    const onUpdateShiftSubscription = API.graphql(
      graphqlOperation(onUpdateShifts)
    ).subscribe({
      next: ({
        value: {
          data: { onUpdateShifts },
        },
      }) => {
        if (refetchShifts) {
          refetchShifts();
        }
      },
      error: (error) => {
        console.error("Error with onUpdateShift subscription: ", error);
      },
    });
    subscriptions.push(onUpdateShiftSubscription);

    const onDeleteShiftSubscription = API.graphql(
      graphqlOperation(onDeleteShifts)
    ).subscribe({
      next: ({
        value: {
          data: { onDeleteShifts },
        },
      }) => {
        if (refetchShifts) {
          refetchShifts();
        }
      },
      error: (error) => {
        console.error("Error with onDeleteShift subscription: ", error);
      },
    });
    subscriptions.push(onDeleteShiftSubscription);

    // Subscriptions for Timecards - repeat similar pattern
    const onCreateTimecardSubscription = API.graphql(
      graphqlOperation(onCreateTimecard)
    ).subscribe({
      next: ({
        value: {
          data: { onCreateTimecard },
        },
      }) => {
        if (refetchTimecards) {
          refetchTimecards();
        }
      },
      error: (error) => {
        console.error("Error with onCreateTimecard subscription: ", error);
      },
    });
    subscriptions.push(onCreateTimecardSubscription);

    // ... You'll do the same for `onUpdateTimecard` and `onDeleteTimecard`

    // Cleanup Subscriptions on Component Unmount
    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, [refetchShifts]);
  /* WATCHERS END */

  const [selectedPeopleRole, setSelectedPeopleRole] = useState(undefined);
  const [peopleSearchTerm, setPeopleSearchTerm] = useState("");
  const { people } = useListPeople({
    type: EMPLOYEE,
    undefined, //role: selectedPeopleRole,
  });
  const { facilities } = useListFacilities();

  // Subscription

  // useState hooks
  const [shift, setShift] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mode, setMode] = useState(MODES.SHIFT_DETAILS);

  const [selectedShift, setSelectedShift] = useState([]);
  const [selectedTimecard, setSelectedTimecard] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [selectedFacilityDetails, setSelectedFacilityDetails] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [assignedTo, setAssignedTo] = useState();
  const [open, setOpen] = useState(false);

  // useMemo hooks
  const shifts = useMemo(() => {
    // timecards
    // console.log("🚀 ~ file: index.js:319 ~ shifts ~ timecards:", timecards.map(obj => obj?.));
    return fetchedShifts
      ?.filter((shift) => {
        //// EXACT MATCH

        // Either match
        if (selectedShiftTimings) {
          const searchTimingStart = new Date(
            `1970-01-01T${selectedShiftTimings?.split("-")[0]}`
          );
          const searchTimingEnd = new Date(
            `1970-01-01T${selectedShiftTimings?.split("-")[1]}`
          );

          // Adjust for search timing end times that are on the next day
          if (searchTimingEnd < searchTimingStart) {
            searchTimingEnd.setDate(searchTimingEnd.getDate() + 1);
          }

          let startTime, endTime;

          // If it's a Shift, we use shiftStart and shiftEnd
          if (shift.__typename === "Shifts") {
            startTime = new Date(`1970-01-01T${shift.shiftStart + "Z"}`);
            endTime = new Date(`1970-01-01T${shift.shiftEnd + "Z"}`);
          }
          // If it's a Timecard, we use clockInTime and clockOutTime
          else if (shift.__typename === "Timecard") {
            startTime = new Date(shift.clockInTime);
            endTime = shift.clockOutTime
              ? new Date(shift.clockOutTime)
              : new Date();
          }

          // Adjust for end times that are on the next day
          if (endTime < startTime) {
            endTime.setDate(endTime.getDate() + 1);
          }

          const overlapsWithSearchTiming =
            startTime >= searchTimingStart && endTime <= searchTimingEnd;

          // If it doesn't overlap, we want to filter it out
          if (!overlapsWithSearchTiming) {
            return false;
          }
        }
        return true;
      })
      .concat(timecards);
  }, [fetchedShifts, timecards, selectedShiftTimings]);

  // console.log("🚀 ~ file: index.js:180 ~ shifts ~ shifts:", shifts);

  const filteredPeople = useMemo(() => {
    // return people.filter((person) => {
    //   // Replace this condition with your actual filter condition
    //   return true;
    // });
    return people.filter(
      (person) =>
        person.firstName
          .toLowerCase()
          .includes(peopleSearchTerm.toLowerCase()) ||
        person.lastName
          .toLowerCase()
          .includes(peopleSearchTerm.toLowerCase()) ||
        (person.firstName + " " + person.lastName)
          .toLowerCase()
          .includes(peopleSearchTerm.toLowerCase())
    );
  }, [people]);

  const itemsPerPage = 21; // adjust this as needed
  const totalPages = Math.ceil(shifts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const createPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PageNav
          text={i.toString()}
          isSelected={i === currentPage}
          onClick={() => handlePageChange(i)}
        />
      );
    }
    return pages;
  };

  const handleDateChange = (startOrEnd, value) => {
    if (startOrEnd === "start") {
      setStartDate(value);
    } else if (startOrEnd === "end") {
      setEndDate(value);
    }
  };

  useEffect(() => {
    if (selectedTimecard) {
      const person = people?.map((singlePerson, index) => {
        if (singlePerson?.id === selectedTimecard?.peopleID) {
          setAssignedTo(singlePerson);
        }
      });
    }
  }, [selectedShift]);

  // const { facilities } = useListFacilities();

  const openModal = (shift, timecard) => {
    // console.log(
    //   "🚀 ~ file: index.js:235 ~ openModal ~ shift:",
    //   shift,
    //   timecard
    // );

    setSelectedShift(shift);
    setSelectedTimecard(timecard);
    setSelectedFacilityDetails(
      facilities?.find((facility) => facility.id === shift.facilityID)
    );
    setModalIsOpen(true);
  };

  const openShiftEditModal = (shift) => {
    // console.log("🚀 ~ file: index.js:235 ~ openModal ~ shift:", shift);

    setMode(MODES.SHIFT_EDIT);
    setSelectedShift(shift);
    // setSelectedTimecard(timecard);
    setSelectedFacilityDetails(
      facilities?.find((facility) => facility.id === shift.facilityID)
    );
    setModalIsOpen(true);
  };

  const closeModal = () => {
    if (MODES.SHIFT_DETAILS) {
      setSelectedPeople([]);
    }

    if (MODES.ADD_MEMBERS) {
      setMode(MODES.SHIFT_DETAILS);
    }
    // console.log(selectedPeople);
    setModalIsOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleApplyFilter = () => {
    let updatedFilters = {};

    let employeeId;

    if (selectedFacilityId) {
      updatedFilters = {
        ...updatedFilters,
        facility: selectedFacilityId,
      };
    }
    if (selectedRole) {
      updatedFilters = {
        ...updatedFilters,
        role: selectedRole,
      };
    }
    if (selectedDate) {
      updatedFilters = {
        ...updatedFilters,
        date: selectedDate,
      };
    }
    if (setSelectedShiftTimings && setSelectedShiftTimings !== undefined) {
      updatedFilters = {
        ...updatedFilters,
        shiftTimings: selectedShiftTimings,
      };
    }

    setFilters(updatedFilters);

    onClose();
  };

  const handleResetFilter = () => {
    setFilters();
    setEndDate();
    setStartDate();
    setSelectedDate();
    setSelectedShiftTimings();
    setEmployeeName();
    setSelectedFacilityId();
    setSelectedRole();
    setShift();
    setShiftStatus();
    onClose();
  };

  const [selectedShifts, setSelectedShifts] = useState([]);
  const handleShiftSelection = (shiftId, isSelected) => {
    if (isSelected) {
      setSelectedShifts((prevSelected) => [...prevSelected, shiftId]);
    } else {
      setSelectedShifts((prevSelected) =>
        prevSelected.filter((id) => id !== shiftId)
      );
    }
  };

  const { deleteShiftQuery } = useDeleteShift();
  const { updateTimecardQuery } = useUpdateTimecard();
  const { deleteTimecardQuery } = useDeleteTimecard();
  const { createNotificationQuery } = useCreateNotification();

  const handleDelete = async (selectedShift, selectedTimecard) => {
    if (selectedTimecard) {
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
              // shiftStart: selectedShift?.shiftStart,
              // shiftEnd: selectedShift?.shiftEnd,
              // date: selectedShift?.date,
              _version: selectedShift?._version,
            });
            SuccessToast("Shift positions updated successfully");
          } catch (error) {
            console.log(
              "🚀 ~ file: index.js:448 ~ handleDelete ~ error:",
              error
            );
            ErrorToast("Error updating shift positions:", error);
          }
        }
      } catch (error) {
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

        const tempFetchedFacility = facilities?.find(
          (obj) => obj?.id === selectedShift?.facilityID
        );

        const formedMessage_OLD = `Shift deleted by ${
          myFacility?.facilityName
            ? tempFetchedFacility?.facilityName
            : "Instacare"
        } at ${
          tempFetchedFacility?.facilityName
        } on ${new Date()} for ${displayDate(
          selectedShift?.shiftStartDT
        )}@${displayTime(selectedShift?.shiftStartDT)}-${displayTime(
          selectedShift?.shiftEndDT
        )}`;

        let formedMessage = `Subject: Open Shift Deletion\nThe following shft has been cancelled by ${
          myFacility?.facilityName ? "Facility" : "Instacare"
        }:\nFacility: ${
          tempFetchedFacility?.facilityName
        }\nShift Date: ${displayDate(
          selectedShift?.shiftStartDT
        )}\nShift Time: ${
          displayTime(selectedShift?.shiftStartDT) +
          " - " +
          displayTime(selectedShift?.shiftEndDT)
        }\nTimestamp: ${
          displayDate(new Date()?.toISOString()) +
          " " +
          displayTime(new Date()?.toISOString())
        }`;

        // console.log(
        //   "🚀 ~ file: index.js:616 ~ handleDelete ~ selectedShift:",
        //   selectedShift
        // );

        // START: Send notification on all platforms to instacare

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

        // // // EXTERNAL
        externalNotificationToInstacare(formedMessage, true, false); // Instacare
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
        // console.log("🚀 ~ file: index.js:466 ~ handleDelete ~ error:", error);

        ErrorToast("Error deleting shift:", error);
      }
    }
  };

  const deleteShiftsValidation = () => {
    // Check if all selected items have the same __typename
    const uniqueTypes = new Set(
      selectedShifts.map((shiftId) => {
        const fetchedCard = shifts?.find((item) => item?.id === shiftId);
        return fetchedCard?.__typename;
      })
    );

    if (selectedShifts.length === 0) {
      ErrorToast("Nothing selected to delete.");
      setSelectedShifts([]);
      return;
    }
    if (uniqueTypes.size !== 1) {
      ErrorToast(
        "Can't delete assignments and shifts in bulk at the same time."
      );
      setSelectedShifts([]);
      return;
    }

    return true;
  };

  const setPastShiftDeletionWarning = async () => {
    console.log("Dleete");
    const getShiftsMinimal = /* GraphQL */ `
      query GetShifts($id: ID!) {
        getShifts(id: $id) {
          id
          shiftStartDT
          shiftEndDT
        }
      }
    `;

    const currentDate = new Date();
    for (const shiftId of selectedShifts) {
      const fetchedCard = shifts?.find((item) => item?.id === shiftId);
      let shiftDate;
      if (fetchedCard?.__typename === "Shifts") {
        shiftDate = new Date(fetchedCard.shiftStartDT); // Assuming `date` is a property on Shifts
        if (shiftDate < currentDate) {
          // ErrorToast("Warning: Attempting to delete past shifts.");

          setWarningMessage(
            "Warning: Selected items contain shifts in the past"
          );
          return;
        }
      } else if (fetchedCard?.__typename === "Timecard") {
        const fetchedShift = (
          await API.graphql(
            graphqlOperation(getShiftsMinimal, {
              id: fetchedCard?.shiftsID,
            })
          )
        )?.data?.getShifts;

        shiftDate = new Date(fetchedShift.shiftStartDT).toISOString(); // Assuming `date` is a property on Timecard
        const currentDatetimeUTC = new Date().toISOString();

        // console.log(
        //   "🚀 ~ file: index.js:700 ~ setPastShiftDeletionWarning ~ shiftDate:",
        //   shiftDate,
        //   currentDatetimeUTC
        // );

        if (shiftDate < currentDatetimeUTC) {
          // ErrorToast("Warning: Attempting to delete past timecards.");
          setWarningMessage(
            "Warning: Selected items contain assignments in the past"
          );
          return;
        }
      }
    }
  };

  const deletedBulkShift = async () => {
    setAssignInProgress(true);
    for (const shiftId of selectedShifts) {
      const fetchedCard = shifts?.find((item) => item?.id === shiftId);
      if (fetchedCard?.__typename === "Shifts") {
        await handleDelete(fetchedCard, null);
      } else if (fetchedCard?.__typename === "Timecard") {
        if (fetchedCard?.clockOutTime) {
          ErrorToast("Cannot delete completed timecard.");
          setWarningMessage(null);
          return;
        }

        const fetchedShift = (
          await API.graphql(
            graphqlOperation(getShifts, {
              id: fetchedCard?.shiftsID,
            })
          )
        )?.data?.getShifts;

        await handleDelete(fetchedShift, fetchedCard);
      }
    }
    setAssignInProgress(false);

    setSelectedShifts([]);
    setWarningMessage(null);
  };

  // console.log("selectedShift: ", selectedShift);

  const [isPublishDisabled, setIsPublishDisabled] = useState(false);
  const [assignInProgress, setAssignInProgress] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);

  return (
    <div className="flex flex-col min-h-max px-3 pb-3">
      <ScheduleFilterModal
        shiftStatus={shiftStatus}
        setShiftStatus={setShiftStatus}
        selectedFacilityId={selectedFacilityId}
        setSelectedFacilityId={setSelectedFacilityId}
        setEmployeeName={setEmployeeName}
        employeeName={employeeName}
        open={open}
        onClose={onClose}
        handleApplyFilter={handleApplyFilter}
        handleResetFilter={handleResetFilter}
        setSelectedRole={setSelectedRole}
        setSelectedDate={setSelectedDate}
        setSelectedShiftTimings={setSelectedShiftTimings}
        selectedShiftTimings={selectedShiftTimings}
        selectedRole={selectedRole}
        selectedDate={selectedDate}
        setShift={setShift}
        shift={shift}
        people={filteredPeople}
      />

      <div className="flex flex-col">
        <div className="flex py-1 justify-between">
          <div className="flex items-center">
            <PageHeader text={"Schedule"} />
            <div className="mx-1" />
            <div className="">
              <DateDropDown text={"18 March 2023"} />
            </div>
          </div>

          {canCreateShift && (
            <div className="flex items-center">
              <IconButton
                onClick={() => {
                  navigate("/addshift");
                }}
                color={themeStyles.SECONDARY_COLOR}
                text={"+ADD SHIFT"}
              />
            </div>
          )}
        </div>
      </div>

      <Card className="w-full p-3 flex flex-col justify-between ">
        <div className="flex justify-between items-center">
          <div className="flex  items-center">
            <div className="flex text-xxs">Date Range:</div>
            <div className="mx-1" />
            <DualDatePicker
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
            />
            {/* <OptionTab options={["Week", "Month", "Year"]} /> */}
          </div>

          <div className="flex items-center">
            {canDeleteShift && (
              <button
                // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                className="flex rounded-full py-1 px-1 items-center mr-1"
                // type={type}
                onClick={() => {
                  if (deleteShiftsValidation()) {
                    setPastShiftDeletionWarning();
                    setShowConfirmModal(true);
                  }
                }}
                style={{
                  backgroundColor: themeStyles.RED_LIGHT,
                  // color: "#fff",
                }}
              >
                <DeleteIcon size={8} />
              </button>
            )}
            <IconButton
              color={themeStyles.PRIMARY_LIGHT_COLOR}
              text={"Filter"}
              icon={<FilterIcon size={8} />}
              onClick={onOpen}
            />
          </div>
        </div>
      </Card>
      {/* Info Board */}
      <ShiftsContainer
        loading={loading}
        startDate={startDate}
        endDate={endDate}
        weekOffset={weekOffset}
        setWeekOffset={setWeekOffset}
        employeeName={employeeName}
        // Break
        shiftStatus={shiftStatus}
        dates={dates}
        shifts={shifts}
        filters={filters}
        facilities={facilities}
        filteredPeople={filteredPeople}
        openModal={openModal}
        setSelectedFacility={setSelectedFacility}
        setSelectedPerson={setSelectedPerson}
        //
        handleShiftSelection={handleShiftSelection}
        selectedShifts={selectedShifts}
      />

      <ConfirmationModal
        modalIsOpen={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        message={"Are you sure you want to delete these cards?"}
        warning={warningMessage}
        onConfirm={() => {
          deletedBulkShift();
          setShowConfirmModal(false);
        }}
        onCancel={() => {
          setSelectedShifts([]);
          setShowConfirmModal(false);
        }}
      />

      {/* Modal Logic */}
      {mode === MODES.SHIFT_DETAILS ? (
        <>
          <ShiftDetailsModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            selectedShift={selectedShift}
            selectedTimecard={selectedTimecard}
            selectedFacility={selectedFacility}
            setSelectedPeople={setSelectedPeople} // replace with your function or state setter
            assignedTo={assignedTo} // replace with your data or state
            setMode={setMode} // replace with your function or state setter
            buttonRef={buttonRef} // replace with your ref
            refetchShifts={refetchShifts}
            openShiftEditModal={openShiftEditModal}
            //
            canDeleteShift={canDeleteShift}
            // handleDelete={handleDelete}
          />
        </>
      ) : mode === MODES.SHIFT_EDIT ? (
        <>
          <ShiftEditModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            shift_={selectedShift}
            facilities={facilities}
            isSuperAdmin={isSuperAdmin}
            isPublishDisabled={isPublishDisabled}
            setIsPublishDisabled={setIsPublishDisabled}
          />
        </>
      ) : (
        <PeopleSelect
          shift={selectedShift}
          people={filteredPeople}
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
          setSelectedPeopleRole={setSelectedPeopleRole}
          selectedPeopleRole={selectedPeopleRole}
          peopleSearchTerm={peopleSearchTerm}
          setPeopleSearchTerm={setPeopleSearchTerm}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          assignInProgress={assignInProgress}
          onAddButton={async () => {
            setMode(MODES.SHIFT_DETAILS);
            closeModal();

            // Sequentially create timecards for each selected person
            const createTimecardsSequentially = async () => {
              setAssignInProgress(true);
              for (const item of selectedPeople) {
                await assignTimecards(
                  selectedShift,
                  createTimecardQuery,
                  updateShiftQuery,
                  item,
                  sendBulkMessages,
                  createNotificationQuery,
                  user,
                  false
                );
              }
              setAssignInProgress(false);
            };

            await createTimecardsSequentially();
          }}
          onCancelButtton={() => {
            setMode(MODES.SHIFT_DETAILS);
          }}
        />
      )}
    </div>
  );
};

export default Schedules;
