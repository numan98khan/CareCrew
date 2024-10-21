import React, { useState } from "react";
import IconButton from "../../../components/Button/IconButton";
import FileIcon from "../../../assets/icons/indicators/file";
import { useBulkShiftUploader } from "../hooks";
import Button from "../../../components/Button";
import { ScaleHover } from "../../../styles/animations";

import Papa from "papaparse";
import { SuccessToast, convertTimeToAWSTime } from "../../../services/micro";

import moment from "moment";
import { createBulkShifts } from "../../../services/bulkUserCreation";
import { userTimezone } from "../../../apolloql/timezone";

import * as XLSX from "xlsx";
import { useAuth } from "../../../context";
import { FACILITY } from "../../../constants/userTypes";
import ConfirmationModal from "../../../components/ConfirmationModal";

function BulkUpload({ isPublishDisabled, setIsPublishDisabled, facilities }) {
  const { uploadingStatus, handleBulkShiftUpload } = useBulkShiftUploader();
  const [fileRef, setFileRef] = useState(null);
  const [filename, setFilename] = useState(null);

  const { myFacility, type } = useAuth();

  // Step 2: Define state for modal visibility
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const handleFileChange = (e) => {
    setFileRef(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const uploadBulkShift = async (payload) => {
    const apiResponse = await createBulkShifts(payload);
    if (apiResponse?.result?.statusCode === 200) {
      SuccessToast(
        `Successfully uploaded ${
          JSON.parse(apiResponse?.result?.body).length
        } shifts`
      );
    }
    setIsPublishDisabled(false);
  };

  function convertToBoolean(obj) {
    for (const key in obj) {
      if (obj[key] === "TRUE") {
        obj[key] = true;
      } else if (obj[key] === "FALSE") {
        obj[key] = false;
      }
    }
    return obj;
  }

  const [items, setItems] = useState([]);

  const handleUpload = (e) => {
    if (!fileRef) {
      console.log("No file selected!");
      setIsPublishDisabled(false);
      return;
    }

    const fileExtension = fileRef.name.split(".").pop().toLowerCase();
    if (!["xls", "xlsx"].includes(fileExtension)) {
      console.log("Only Excel files are supported!");
      setIsPublishDisabled(false);
      return;
    }

    readExcel(fileRef);
  };

  function convertExcelTime(excelTime) {
    const timeFraction = excelTime % 1;
    const milliseconds = timeFraction * 24 * 60 * 60 * 1000;
    const date = new Date(0);
    date.setTime(milliseconds);

    let hours = date.getUTCHours().toString().padStart(2, "0");
    let minutes = date.getUTCMinutes().toString().padStart(2, "0");
    let seconds = date.getUTCSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  function convertToAWSDate(dateInput) {
    function excelSerialDateToDate(serial) {
      const baseDate = new Date(1899, 11, 30);
      return new Date(baseDate.setDate(baseDate.getDate() + serial));
    }

    if (!isNaN(dateInput)) {
      const serialDate = parseInt(dateInput, 10);
      const date = excelSerialDateToDate(serialDate);
      return date.toISOString().split("T")[0];
    } else {
      const parts = dateInput.split("/");
      const date = new Date(parts[2], parts[1] - 1, parts[0]);
      return date.toISOString().split("T")[0];
    }
  }

  const readExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      workbook.SheetNames.forEach((sheetName) => {
        const XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );

        const parsedShifts = XL_row_object?.filter(
          (s) =>
            s?.numOfPositions !== "" &&
            s?.numOfPositions &&
            s?.shiftStart &&
            s?.shiftEnd &&
            s?.date &&
            s?.facilityID
        ).map((shift) => {
          if (type === FACILITY) {
            shift.facilityID = myFacility?.id;
          }

          const bobj = facilities.find(
            (obj) => obj.id === shift?.facilityID
          )?.Billing;

          const selectedRate =
            shift?.roleRequired === "CNA"
              ? bobj?.hourlyRateCNA
              : shift?.roleRequired === "RN"
              ? bobj?.hourlyRateRN
              : bobj?.hourlyRateLPN;

          shift.rate = selectedRate;

          let startDate = convertToAWSDate(shift?.date);
          let endDate = startDate;
          let shiftStart = convertExcelTime(shift?.shiftStart);
          let shiftEnd = convertExcelTime(shift?.shiftEnd);

          if (moment(shiftEnd, "HH:mm").isBefore(moment(shiftStart, "HH:mm"))) {
            endDate = moment
              .tz(startDate, userTimezone)
              .add(1, "day")
              .format("YYYY-MM-DD");
          } else {
            endDate = moment(endDate).format("YYYY-MM-DD");
          }
          startDate = moment(startDate).format("YYYY-MM-DD");

          shiftStart = convertTimeToAWSTime(shiftStart, userTimezone);
          shiftEnd = convertTimeToAWSTime(shiftEnd, userTimezone);

          const sanitizedShift = {
            ...convertToBoolean(shift),
            incentives: {
              incentiveAmount: shift?.incentiveAmount,
              incentiveBy: shift?.incentiveBy,
              incentiveType: shift?.incentiveType,
              notes: shift?.notes,
            },
            shiftStart: shiftStart,
            shiftEnd: shiftEnd,
            date: startDate,
            shiftStartDT: moment
              .tz(`${startDate}T${shiftStart}`, userTimezone)
              .utc()
              .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            shiftEndDT: moment
              .tz(`${endDate}T${shiftEnd}`, userTimezone)
              .utc()
              .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          };

          delete sanitizedShift?.incentiveAmount;
          delete sanitizedShift?.incentiveBy;
          delete sanitizedShift?.incentiveType;
          delete sanitizedShift?.recurringSchedule;
          delete sanitizedShift?.notes;
          return sanitizedShift;
        });

        const payload = {
          fileType: "json",
          jsonContent: JSON.stringify(parsedShifts),
        };

        setItems(XL_row_object);
      });
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex flex-col">
        <label className="mb-2 ml-5 text-base font-bold">
          Please upload the excel sheet
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          hidden
          id="fileInput"
          accept=".xls,.xlsx"
        />
      </div>

      <label
        htmlFor="fileInput"
        className={`h-24 border-2 rounded-3xl bg-PRIMARY_NEUTRAL_COLOR border-PRIMARY_LIGHT_COLOR border-dotted flex justify-center items-center cursor-pointer ${ScaleHover}`}
      >
        <div className="flex flex-col items-center">
          <FileIcon /> <p>{filename || "Upload Excel File"}</p>
        </div>
      </label>

      <div className="flex justify-start">
        <Button
          children={"UPLOAD"}
          onClick={() => {
            setShowConfirmModal(true);
          }}
          disabled={isPublishDisabled || !fileRef}
        />
      </div>

      <ConfirmationModal
        modalIsOpen={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        message={"Are you sure you want to publish these shifts?"}
        warning={warningMessage}
        onConfirm={async () => {
          handleUpload();
          setShowConfirmModal(false);
        }}
        onCancel={() => {
          setShowConfirmModal(false);
        }}
      />
    </div>
  );
}

export default BulkUpload;
