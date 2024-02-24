import React, { useState, useCallback, useRef } from "react";
import IconButton from "../../components/Button/IconButton";
import theme from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";

import PageNav from "../../components/PageNav";
import Table from "../../components/Table";

import { useNavigate } from "react-router-dom";

import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";

import Modal from "react-modal";
import TimecardDetailsModal from "../../components/Drawers/TimecardDetailsModal";
import { useTimecards } from "./useTimecards";

import ReactToPrint from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TimeCardFilterModal from "../../components/Drawers/TimeCardFilterModal";

import * as XLSX from "xlsx";
import {
  ErrorToast,
  SuccessToast,
  displayDate,
  displayDatetime,
  displayTime,
} from "../../services/micro";
import { deleteManualTimecard } from "../../graphql/mutations";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useDeleteManualTimecard } from "../../apolloql/manualtimecards";
import { useAuth } from "../../context";
import { SUPER_ADMIN } from "../../constants/permissions";
import ConfirmationModal from "../../components/ConfirmationModal";
import TimecardReportModal from "../../components/Drawers/TimeCardFilterModal/TimecardReportModal";

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const Timecards = () => {
  const navigate = useNavigate();

  const [isConfirmActionTimecard, setIsConfirmActionTimecard] = useState(false);

  const { user, permissions } = useAuth();
  const isSuperAdmin = SUPER_ADMIN === user?.attributes?.email;
  const canCreateTimecard = isSuperAdmin
    ? true
    : permissions.permissions?.find((obj) => obj?.name === "Create Timecard")
        ?.isSelected;

  const canProcessTimecard = isSuperAdmin
    ? true
    : permissions.permissions?.find((obj) => obj?.name === "Process Timecard")
        ?.isSelected;
  // console.log(
  //   "🚀 ~ file: index.js:49 ~ Timecards ~ canProcessTimecard:",
  //   canProcessTimecard
  // );

  const {
    manualTimecards,
    processAndRefetch,
    unprocessAndRefetch,
    type,
    navigateToAddTimeCard,
    TABLE_HEAD_MAP,
    refetch: refetchManualTimecards,
    filters,
    setFilters,
    updateFilter,
    resetFilter,
  } = useTimecards();
  console.log("🚀 ~ file: index.js:75 ~ Timecards ~ filters:", filters);
  console.log(
    "🚀 ~ file: index.js:70 ~ Timecards ~ manualTimecards:",
    manualTimecards?.map((obj) => obj?.incentiveType)
  );

  const [selectedTimecard, setSelectedTimecard] = useState(null);

  const [selectedTimecards, setSelectedTimecards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

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

  const [open, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [openFilter, setOpenFilter] = useState(false);
  const onOpenFilter = () => {
    setOpenFilter(true);
  };

  const onCloseFilter = () => {
    setOpenFilter(false);
  };

  const modalContentRef = useRef(null);
  const downloadPDF = async (timecard) => {
    setSelectedTimecard(timecard);
    onOpen();

    setTimeout(async () => {
      const pdf = new jsPDF("portrait", "pt", "a4");
      const canvas = await html2canvas(modalContentRef.current);
      const img = canvas.toDataURL("image/png");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate the scaling factor to fit the image within the PDF page
      const scale = Math.min(
        pdfWidth / canvas.width,
        pdfHeight / canvas.height
      );

      const imgWidth = canvas.width * scale;
      const imgHeight = canvas.height * scale;

      const topMargin = (pdfHeight - imgHeight) / 2; // Center the image vertically
      const leftMargin = (pdfWidth - imgWidth) / 2; // Center the image horizontally

      pdf.addImage(img, "PNG", leftMargin, topMargin, imgWidth, imgHeight);
      pdf.save("timecard-details.pdf");

      onClose();
      setSelectedTimecard(null);
    }, 500);
  };

  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // insert a space before all caps
      .replace(/^./, (str) => str.toUpperCase()) // uppercase the first character
      .trim();
  };

  const timecardExcelParser = (timecard) => {
    const parsed = {};

    parsed.id = timecard?.id;
    parsed.employee =
      timecard?.people?.firstName + " " + timecard?.people?.lastName;
    parsed.date = displayDate(timecard?.startDate);

    parsed.personId = timecard?.people?.surrogateID;
    parsed.payrollCycle = timecard?.payrollCycle;
    parsed.hours = timecard?.hours;
    parsed.minutes = timecard?.minutes;
    parsed.clockInTime = displayTime(timecard?.clockInTime);
    parsed.clockOutTime = displayTime(timecard?.clockOutTime);

    parsed.rate = timecard?.rate;
    parsed.isOvertime = timecard?.isOvertime;
    parsed.facility = timecard?.facility?.facilityName;

    parsed.role = timecard?.role;
    parsed.incentiveBy = timecard?.incentiveBy;
    parsed.incentiveAmount = timecard?.incentiveAmount;

    parsed.status = timecard.status === "process" ? "Processed" : "Unprocessed";

    console.log(
      "🚀 ~ file: index.js:172 ~ timecardExcelParser ~ parsed:",
      parsed
    );

    return {
      ...parsed,
      originalKeys: Object.keys(parsed),
    };

    // return parsed;
  };

  const downloadSelectedTimecardsAsExcel = () => {
    if (!selectedTimecards.length) {
      ErrorToast("No timecards selected");
      return;
    }

    const parsed = selectedTimecards.map((obj) => timecardExcelParser(obj));
    const headers = parsed[0].originalKeys.reduce((acc, key) => {
      acc[key] = formatKey(key);
      return acc;
    }, {});

    const formattedData = parsed.map((obj) => {
      const newObj = { ...obj };
      delete newObj.originalKeys; // Remove the originalKeys from the data
      return newObj;
    });

    const ws = XLSX.utils.json_to_sheet(formattedData, {
      header: Object.keys(headers),
    });
    XLSX.utils.sheet_add_aoa(ws, [Object.values(headers)], { origin: "A1" });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Selected Timecards");
    XLSX.writeFile(wb, "selected_timecards.xlsx");

    setSelectedTimecards([]);
  };

  // const downloadSelectedTimecardsAsExcel = () => {
  //   if (!selectedTimecards.length) {
  //     ErrorToast("No timecards selected");
  //     return;
  //   }

  //   const parsed = selectedTimecards.map((obj) => {
  //     // console.log("🚀 ~ file: index.js:153 ~ parsed ~ obj:", obj);
  //     return timecardExcelParser(obj);
  //   });
  //   // console.log("🚀 ~ file: index.js:161 ~ parsed ~ parsed:", parsed);

  //   // return;
  //   const ws = XLSX.utils.json_to_sheet(parsed); // Convert selectedTimecards array of objects to worksheet
  //   const wb = XLSX.utils.book_new(); // Create a new workbook
  //   XLSX.utils.book_append_sheet(wb, ws, "Selected Timecards"); // Append the worksheet to the workbook
  //   XLSX.writeFile(wb, "selected_timecards.xlsx"); // Write the workbook to an Excel file

  //   setSelectedTimecards([]);
  // };

  const downloadTimecardsAsExcel = (timecard) => {
    const parsed = timecardExcelParser(timecard);

    const ws = XLSX.utils.json_to_sheet([parsed]); // Convert selectedTimecards array of objects to worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Selected Timecards"); // Append the worksheet to the workbook
    XLSX.writeFile(wb, "selected_timecards.xlsx"); // Write the workbook to an Excel file
  };

  const { deleteManualTimecardQuery } = useDeleteManualTimecard();
  const deleteTimecard = async (timecard) => {
    // console.log(
    //   "🚀 ~ file: index.js:172 ~ deleteTimecard ~ timecard:",
    //   timecard
    // );

    try {
      const deletedTimecard = await deleteManualTimecardQuery({
        id: timecard?.id,
        _version: timecard?._version,
      });
      SuccessToast("Timecard deleted successfully");
    } catch (error) {
      // console.log("🚀 ~ file: index.js:448 ~ handleDelete ~ error:", error);
      ErrorToast("Error deleting timecard:", error);
    }
  };

  const deleteBulkTimecards = () => {
    // selectedTimecards
    // navigate("/addTimeCard", { state: timecard });
  };

  const editTimecard = (timecard) => {
    navigate("/addTimeCard", { state: timecard });
  };

  // console.log("🚀 ~ file: index.js:27 ~ selectedTimecard:", selectedTimecard);
  const [selectedTimecardNotes, setSelectedTimecardNotes] = useState(null);

  const [reportModalOpen, setReportModalOpen] = useState(false);

  // // Function to select all timecards
  // const handleSelectAllTimecards = useCallback(() => {

  // }, [manualTimecards]);

  const handleSelectAllTimecards = () => {
    // selectedTimecards
    // navigate("/addTimeCard", { state: timecard });
    if (selectedTimecards.length === 0 && manualTimecards) {
      setSelectedTimecards(manualTimecards);
    } else {
      setSelectedTimecards([]);
    }
  };

  const processAllSelectedTimecards = useCallback(async () => {
    // Create an array of promises, one for each timecard in the selectedTimecards array
    const promises = selectedTimecards.map((timecard) =>
      processAndRefetch(timecard, "")
    );

    // Wait for all promises to complete using Promise.all
    await Promise.all(promises);

    // Optionally, clear the selectedTimecards array after processing
    setSelectedTimecards([]);
  }, [processAndRefetch, selectedTimecards, setSelectedTimecards]);

  return (
    <>
      <div>
        {/* Printable Component */}
        <TimeCardFilterModal
          open={openFilter}
          onClose={onCloseFilter}
          filters={filters}
          updateFilter={updateFilter}
          resetFilter={resetFilter}
        />
        <TimecardDetailsModal
          modalContentRef={modalContentRef}
          open={open}
          onClose={onClose}
          selectedTimecard={selectedTimecard}
          processAndRefetch={() => setIsConfirmActionTimecard(true)}
          unprocessAndRefetch={() => setIsConfirmActionTimecard(true)}
          // processAndRefetch={processAndRefetch}
          // unprocessAndRefetch={unprocessAndRefetch}
          selectedTimecardNotes={selectedTimecardNotes}
          setSelectedTimecardNotes={setSelectedTimecardNotes}
          downloadPDF={downloadPDF}
          canProcessTimecard={canProcessTimecard}
        />
      </div>
      <div className="flex flex-col min-h-full px-3 pb-3">
        <div className="flex flex-col mx-2">
          <div className="flex py-1 justify-start">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex items-center">
                <PageHeader text={"Timecards"} />
              </div>
              {canCreateTimecard ? (
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
          // Filter modal
          setFilterModalOpen={setOpenFilter}
          //Common
          data={manualTimecards}
          config={
            type === ADMIN
              ? "timecards"
              : type === FACILITY
              ? "timecards_facility"
              : "timecards_employee"
          }
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          createPageNumbers={createPageNumbers}
          TABLE_HEAD={TABLE_HEAD_MAP[type]}
          disableDownloadAll={type === EMPLOYEE}
          setSelectedTimecard={setSelectedTimecard} // TODO: make this a more generic function as this is a select table row function
          setTimecardDetailsModal={onOpen}
          disableActions={type === FACILITY}
          //
          downloadAction={downloadPDF}
          downloadAllAction={downloadSelectedTimecardsAsExcel}
          // deleteAllAction={type === ADMIN ? deleteBulkTimecards : null}
          deleteAction={type === ADMIN ? deleteTimecard : null}
          //
          selectedItems={selectedTimecards}
          setSelectedItems={setSelectedTimecards}
          editAction={editTimecard}
          //
          openReportAnIssue={() => setReportModalOpen(true)}
          //
          selectedTimecards={selectedTimecards}
          selectAllTimecards={handleSelectAllTimecards}
          processAllTimecards={processAllSelectedTimecards}
        />

        <ConfirmationModal
          modalIsOpen={isConfirmActionTimecard}
          closeModal={() => setIsConfirmActionTimecard(false)}
          message={`Are you sure you want to ${
            selectedTimecard?.status === "Process" ? "process" : "unprocess"
          } this timecard?`}
          onConfirm={() => {
            if (selectedTimecard?.status === "Process") {
              processAndRefetch(selectedTimecard, selectedTimecardNotes);
            } else {
              unprocessAndRefetch(selectedTimecard);
            }
            setIsConfirmActionTimecard(false);
          }}
          onCancel={() => {
            setIsConfirmActionTimecard(false);
          }}
        />

        <TimecardReportModal
          open={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          timecardDetails={selectedTimecard}
        />
      </div>
    </>
  );
};

export default Timecards;
