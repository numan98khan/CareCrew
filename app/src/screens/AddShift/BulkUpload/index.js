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
  // Optional: Define a state for the warning message if dynamic messages are needed
  const [warningMessage, setWarningMessage] = useState("");

  const handleFileChange = (e) => {
    setFileRef(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  // const handleUpload = async () => {
  //   if (!fileRef) {
  //     console.log("No file selected!");
  //     return;
  //   }

  //   // const fileType = fileRef.name.endsWith(".json") ? "json" : "csv";
  //   // const apiResponse = await handleBulkShiftUpload(fileRef, fileType);
  //   // console.log("API response:", apiResponse);
  // };

  const uploadBulkShift = async (payload) => {
    const apiResponse = await createBulkShifts(payload);
    console.log(
      "🚀 ~ file: index.js:163 ~ handleUpload ~ apiResponse:",
      apiResponse
    );

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

    // const file = e.target.files[0];
    readExcel(fileRef);
  };

  function convertExcelTime(excelTime) {
    // Extract the fractional part
    const timeFraction = excelTime % 1;

    // Convert to milliseconds (timeFraction * milliseconds in a day)
    const milliseconds = timeFraction * 24 * 60 * 60 * 1000;

    // Create a date object at January 1, 1970 (Unix Epoch)
    const date = new Date(0);

    // Set the time of the date object to the extracted milliseconds
    date.setTime(milliseconds);

    // Format the time (HH:mm:ss format)
    let hours = date.getUTCHours().toString().padStart(2, "0");
    let minutes = date.getUTCMinutes().toString().padStart(2, "0");
    let seconds = date.getUTCSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  function convertToAWSDate_OLD(dateString) {
    // Split the date string into parts
    const parts = dateString.split("/");

    // Reformat the date to YYYY-MM-DD
    const awsDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return awsDate;
  }

  function convertToAWSDate(dateInput) {
    // Function to convert Excel serial date to standard date
    function excelSerialDateToDate(serial) {
      const baseDate = new Date(1899, 11, 30);
      return new Date(baseDate.setDate(baseDate.getDate() + serial));
    }

    // Check if the input is in Excel serial date format (a number)
    if (!isNaN(dateInput)) {
      const serialDate = parseInt(dateInput, 10);
      const date = excelSerialDateToDate(serialDate);
      return date.toISOString().split("T")[0];
    }
    // Otherwise, assume it's in "DD/MM/YYYY" format
    else {
      const parts = dateInput.split("/");
      const date = new Date(parts[2], parts[1] - 1, parts[0]); // Adjust for zero-based index of months
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
          console.log("🚀 ~ file: index.js:106 ~ ).map ~ shift:", shift);

          if (type === FACILITY) {
            shift.facilityID = myFacility?.id;
          }

          const bobj = facilities.find(
            (obj) => obj.id === shift?.facilityID
          )?.Billing;
          // console.log("🚀 ~ file: index.js:85 ~ useMemo ~ bobj:", bobj);

          const selectedRate =
            shift?.roleRequired === "CNA"
              ? bobj?.hourlyRateCNA
              : shift?.roleRequired === "RN"
              ? bobj?.hourlyRateRN
              : bobj?.hourlyRateLPN;

          shift.rate = selectedRate;

          // if (shift?.isHoliday) {
          //   setShiftKey("rate")(selectedRate * 1.5);
          // } else {
          //   setShiftKey("rate")(selectedRate);
          // }

          // Extract values for clarity
          let startDate = convertToAWSDate(shift?.date);
          let endDate = startDate;
          let shiftStart = convertExcelTime(shift?.shiftStart);
          let shiftEnd = convertExcelTime(shift?.shiftEnd);

          // If the ending time is earlier than the starting time, adjust the end date to the next day
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
            // ...shift,
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

        console.log(
          "🚀 ~ file: index.js:127 ~ handleUpload ~ payload:",
          payload
        );

        // uploadBulkShift(payload);

        setItems(XL_row_object);
      });
    };
    reader.readAsBinaryString(file);
  };

  const handleUpload_OLD = async () => {
    setIsPublishDisabled(true);
    console.log("UPLOAD");

    // if (!fileRef) {
    //   console.log("No file selected!");
    //   setIsPublishDisabled(false);
    //   return;
    // }

    // if (!fileRef.name.endsWith(".csv")) {
    //   console.log("Only CSV files are supported!");
    //   setIsPublishDisabled(false);
    //   return;
    // }
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
    // const currentDate = new Date();
    // const userTimezone = userTimezone;

    setIsPublishDisabled(false);

    Papa.parse(fileRef, {
      complete: (result) => {
        console.log(
          "🚀 ~ file: index.js:96 ~ handleUpload ~ result:",
          result?.data?.map((obj) => obj)
        );
        // for (shift of result?.data)
        const parsedShifts = result?.data
          ?.filter(
            (s) =>
              s?.numOfPositions !== "" &&
              s?.numOfPositions &&
              s?.shiftStart &&
              s?.shiftEnd &&
              s?.date &&
              s?.facilityID
          )
          .map((shift) => {
            // Extract values for clarity
            let startDate = shift?.date;
            let endDate = startDate;
            let shiftStart = shift?.shiftStart;
            let shiftEnd = shift?.shiftEnd;

            // If the ending time is earlier than the starting time, adjust the end date to the next day
            if (
              moment(shiftEnd, "HH:mm").isBefore(moment(shiftStart, "HH:mm"))
            ) {
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
              // ...shift,
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
        // console.log(
        //   "🚀 ~ file: index.js:123 ~ handleUpload ~ parsedShifts:",
        //   parsedShifts
        // );

        const payload = {
          fileType: "json",
          jsonContent: JSON.stringify(parsedShifts),
        };
        console.log(
          "🚀 ~ file: index.js:127 ~ handleUpload ~ payload:",
          payload
        );
        // uploadBulkShift(payload);
      },
      header: true,
    });
  };

  return (
    <div className="flex flex-col p-4 space-y-4 ">
      <div className="flex flex-col ">
        <label className="mb-2 ml-5 text-base text-start font-bold">
          Please upload the excel sheet
        </label>
        {/* <input type="file" onChange={handleFileChange} hidden id="fileInput" /> */}
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
        <div className="flex flex-col items-center ">
          <FileIcon /> <p>{filename || "Upload Excel File"}</p>
        </div>
      </label>

      <div className="h-2"></div>

      <div className="flex justify-start">
        <Button
          children={"UPLOAD"}
          onClick={() => {
            // handleUpload;
            setShowConfirmModal(true);
          }}
          disabled={isPublishDisabled || !fileRef}
        />
      </div>

      {/* Add the ConfirmationModal component */}
      <ConfirmationModal
        modalIsOpen={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        message={"Are you sure you want to publish these shifts?"}
        warning={warningMessage}
        onConfirm={async () => {
          // deletedBulkShift();
          handleUpload();
          setShowConfirmModal(false);
        }}
        onCancel={() => {
          // Optionally clear selected shifts or other relevant state
          // console.log("Cancellation action");
          setShowConfirmModal(false);
        }}
      />
    </div>
  );
}

export default BulkUpload;
