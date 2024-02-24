import React, { useState, useEffect, useCallback } from "react";
import IconButton from "../../components/Button/IconButton";
import theme from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";

import PageNav from "../../components/PageNav";
import Table from "../../components/Table";

import { useNavigate } from "react-router-dom";

import { LIST_MANUAL_TIMECARDS } from "../../apolloql/queries";
import { useQuery, gql } from "@apollo/client";
import { processTimecard, unprocessTimecard } from "../../apolloql/custom";

import { useAdmin, useAuth } from "../../context";

import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";

import Modal from "react-modal";
import { useListManualTimecards } from "../../apolloql/manualtimecards";
import TimecardDetailsModal from "../../components/Drawers/TimecardDetailsModal";
import { useTimecards } from "./useTimecards";
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const TABLE_HEAD = [
  "",
  "Name",
  "Time",
  "Duration",
  "Facility",
  "Profile",
  "Status",
  "Download",
  "Activity",
];

const TABLE_HEAD_FACILITY = [
  "",
  "Name",
  "Time",
  "Duration",
  "Facility",
  "Profile",
  "Status",
  "Download",
  // "Activity",
];

const TABLE_HEAD_EMPLOYEE = [
  "",
  "Facility",
  "Date",
  "Total Working",
  "Clock In",
  "Clock Out",
  "Download",
  "",
];

const Timecards = () => {
  const navigate = useNavigate();

  const {
    manualTimecards,
    processAndRefetch,
    unprocessAndRefetch,
    type,
    navigateToAddTimeCard,
    TABLE_HEAD_MAP,
  } = useTimecards();

  const [selectedTimecard, setSelectedTimecard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  ///////

  // const { type, user, myFacility } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // adjust this as needed
  const totalPages = Math.ceil([].length / itemsPerPage);
  const [checked, setChecked] = useState(false);

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

  const { loading, error, data, refetch } = useQuery(LIST_MANUAL_TIMECARDS); // Destructure refetch from useQuery
  // const { manualTimecards } = useListManualTimecards(
  //   type === FACILITY ? myFacility?.id : null,
  //   type === EMPLOYEE ? user?.attributes?.sub : null
  // );

  const refetchTimecards = useCallback(async () => {
    // manualTimecards;

    try {
      await refetch();
    } catch (error) {
      console.error("An error occurred while refetching:", error);
    }
  }, [manualTimecards]);

  // const processAndRefetch = useCallback(
  //   async (timecard, notes) => {
  //     try {
  //       await processTimecard(timecard, notes);
  //       await refetchTimecards();
  //     } catch (error) {
  //       console.error(
  //         "An error occurred while processing and refetching:",
  //         error
  //       );
  //     }
  //   },
  //   [refetchTimecards]
  // );

  // const unprocessAndRefetch = useCallback(
  //   async (timecard) => {
  //     try {
  //       await unprocessTimecard(timecard);
  //       await refetchTimecards();
  //     } catch (error) {
  //       console.error(
  //         "An error occurred while unprocessing and refetching:",
  //         error
  //       );
  //     }
  //   },
  //   [refetchTimecards]
  // );

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setSelectedTimecard(null);
    setModalIsOpen(false);
  };

  // const [selectedTimecard, setSelectedTimecard] = useState(null);

  const [open, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TimecardDetailsModal
        open={open}
        onClose={onClose}
        selectedTimecard={selectedTimecard}
        processAndRefetch={processAndRefetch}
        unprocessAndRefetch={unprocessAndRefetch}
      />
      <div className="flex flex-col min-h-full px-3 pb-3">
        <div className="flex flex-col mx-2">
          <div className="flex py-1 justify-start">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex items-center">
                <PageHeader text={"Timecards"} />
                <input
                  type="text"
                  id="people_search"
                  className="text-sm rounded-full ps-3.5 h-8 w-80 ml-6 mt-2"
                  placeholder="Search by name"
                />
              </div>
              {type === ADMIN ? (
                <div>
                  <IconButton
                    color={theme.SECONDARY_COLOR}
                    text={"+ADD CARD"}
                    onClick={() => {
                      navigate("/addTimeCard", {});
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Info Board */}
        <Table
          data={manualTimecards}
          config={type === EMPLOYEE ? "timecards_employee" : "timecards"}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          createPageNumbers={createPageNumbers}
          TABLE_HEAD={
            type === EMPLOYEE
              ? TABLE_HEAD_EMPLOYEE
              : type === FACILITY
              ? TABLE_HEAD_FACILITY
              : TABLE_HEAD
          }
          isDownloadAll={true}
          setSelectedTimecard={setSelectedTimecard} // TODO: make this a more generic function as this is a select table row function
          setTimecardDetailsModal={onOpen}
          disableActions={type === FACILITY}
        />
      </div>
    </>
  );
};

export default Timecards;
