import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin, useAuth } from "../../context";
import { useListTimecards } from "../../apolloql/timecards";
import { useCreateTimecard } from "../../apolloql/timecards";
import { useListFacilities } from "../../apolloql/facilities";
import { useListPeople } from "../../apolloql/people";
import { useUpdateShift } from "../../apolloql/schedules";
import { useListShifts } from "../../apolloql/schedules";
import useFilters from "./useFilters";
import useModal from "./useModal";
import { FACILITY } from "../../constants/userTypes";

export const useSchedules = () => {
  const navigate = useNavigate();
  const buttonRef = useRef();
  const { user, type, myFacility } = useAuth();

  // Hooks for filters and states
  const {
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

  const {
    shifts: fetchedShifts,
    refetch: refetchShifts,
    loading,
  } = useListShifts(type === FACILITY ? myFacility?.id : null);
  const { updateShiftQuery } = useUpdateShift();
  const { timecards, refetch: refetchTimecards } = useListTimecards();
  const { createTimecardQuery } = useCreateTimecard();
  const { people } = useListPeople();
  const { facilities } = useListFacilities();

  // useState hooks
  const [shift, setShift] = useState();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mode, setMode] = useState("shiftDetails");
  const [shiftStatus, setShiftStatus] = useState(null);
  const [selectedShift, setSelectedShift] = useState([]);
  const [selectedTimecard, setSelectedTimecard] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [selectedFacilityDetails, setSelectedFacilityDetails] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [assignedTo, setAssignedTo] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("Open Shifts");
  const [open, setOpen] = useState(false);
  const [iconSize, setIconSize] = useState(7);

  // useMemo hooks
  const shifts = useMemo(() => {
    return fetchedShifts
      ?.filter((shift) => {
        return !shift?._deleted;
      })
      .concat(timecards);
  }, [fetchedShifts, timecards]);

  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      return person.type === "EMPLOYEE";
    });
  }, [people]);

  return {
    navigate,
    buttonRef,
    user,
    type,
    myFacility,
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
    shifts,
    fetchedShifts,
    refetchShifts,
    loading,
    updateShiftQuery,
    timecards,
    refetchTimecards,
    createTimecardQuery,
    people,
    facilities,
    shift,
    setShift,
    editModalIsOpen,
    setEditModalIsOpen,
    position,
    setPosition,
    currentPage,
    setCurrentPage,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    weekOffset,
    setWeekOffset,
    modalIsOpen,
    setModalIsOpen,
    mode,
    setMode,
    shiftStatus,
    setShiftStatus,
    selectedShift,
    setSelectedShift,
    selectedTimecard,
    setSelectedTimecard,
    selectedFacility,
    setSelectedFacility,
    selectedPerson,
    setSelectedPerson,
    selectedFacilityDetails,
    setSelectedFacilityDetails,
    selectedPeople,
    setSelectedPeople,
    assignedTo,
    setAssignedTo,
    isOpen,
    setIsOpen,
    currentTab,
    setCurrentTab,
    open,
    setOpen,
    iconSize,
    setIconSize,
    filteredPeople,
  };
};
