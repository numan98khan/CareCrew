// useFilters.js
import { useState } from "react";

const useFilters = () => {
  const [filters, setFilters] = useState();
  const [selectedFacilityId, setSelectedFacilityId] = useState();
  const [employeeName, setEmployeeName] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedShiftTimings, setSelectedShiftTimings] = useState();
  const [shiftStatus, setShiftStatus] = useState(null);

  return {
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
  };
};

export default useFilters;
