// useWhosOn.js

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { LIST_MANUAL_TIMECARDS } from "../../apolloql/queries";
import { useListManualTimecards } from "../../apolloql/manualtimecards";

import { processTimecard, unprocessTimecard } from "../../apolloql/custom";
import { useAuth } from "../../context";
import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";

const TABLE_HEAD = [
  "",
  "Name",
  "Date",
  "ID",
  "Payroll Cycle",
  "Time",
  "Duration",
  "Rate",
  "Is Overtime?",
  "Facility",
  "Profile",
  "Incentive By",
  "Incentive Amount",
  "Status",
  "Download",
  "Activity",
];

const TABLE_HEAD_FACILITY = [
  "",
  "Name",
  "Date",
  "Time",
  "Duration",
  "Facility",
  "Profile",
  "Status",
  "Download",
  "",
];

const TABLE_HEAD_EMPLOYEE = [
  "",
  "Facility",
  "Date",
  "Total Working",
  "Clock In",
  "Clock Out",
  "Status",
  "Download",
  "",
];

export const useTimecards = () => {
  const navigate = useNavigate();
  const { type, myFacility, user } = useAuth();

  const [filters, setFilters] = useState({
    facility: undefined,
    employee: undefined,
    role: undefined,
    status: undefined,
    date: undefined,
    payrollCycle: undefined,
  });

  const updateFilter = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const resetFilter = () => {
    setFilters({
      facility: undefined,
      employee: undefined,
      role: undefined,
      status: undefined,
      date: undefined,
      payrollCycle: undefined,
    });
  };

  const TABLE_HEAD_MAP = {
    [ADMIN]: TABLE_HEAD,
    [EMPLOYEE]: TABLE_HEAD_EMPLOYEE,
    [FACILITY]: TABLE_HEAD_FACILITY,
  };

  //   const { loading, error, data, refetch } = useQuery(LIST_MANUAL_TIMECARDS);
  const { loading, error, manualTimecards, refetch } = useListManualTimecards(
    type === FACILITY ? myFacility?.id : filters?.facility,
    type === EMPLOYEE ? user?.attributes?.sub : filters?.employee,
    filters?.role,
    filters?.status,
    filters?.date,
    filters?.payrollCycle
  );

  const refetchTimecards = useCallback(async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("An error occurred while refetching:", error);
    }
  }, [refetch]);

  const processAndRefetch = useCallback(
    async (timecard, notes) => {
      try {
        await processTimecard(timecard, notes);
        await refetchTimecards();
      } catch (error) {
        console.error(
          "An error occurred while processing and refetching:",
          error
        );
      }
    },
    [refetchTimecards]
  );

  const unprocessAndRefetch = useCallback(
    async (timecard) => {
      try {
        await unprocessTimecard(timecard);
        await refetchTimecards();
      } catch (error) {
        console.error(
          "An error occurred while unprocessing and refetching:",
          error
        );
      }
    },
    [refetchTimecards]
  );

  const navigateToAddTimeCard = () => {
    navigate("/addTimeCard", {});
  };

  return {
    manualTimecards: manualTimecards, // assuming the query returns a list with this key
    processAndRefetch,
    unprocessAndRefetch,
    type,
    navigateToAddTimeCard,
    TABLE_HEAD_MAP,
    loading,
    error,
    refetch,
    filters,
    setFilters,
    updateFilter,
    resetFilter,
  };
};
