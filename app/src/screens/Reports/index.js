import React, { useState, useEffect } from "react";

import themeStyles from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";
import DeleteIcon from "../../assets/icons/delete";
import FilterIcon from "../../assets/icons/filter";

import { Card, Typography } from "@material-tailwind/react";

import DateDropDown from "../../components/DateDropDown";
import DropDown from "../../components/DropDown";

import IconButton from "../../components/Button/IconButton";

import DualDatePicker from "../../components/DatePicker/DualDatePicker";
import OptionTab from "../../components/NavTab/OptionTab";

import toast, { Toaster } from "react-hot-toast";
import { useAdmin, useAuth } from "../../context";

import { useListFacilities } from "../../apolloql/facilities";

import { fetchApiData } from "../../services/mysql";
import Button from "../../components/Button";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ErrorToast } from "../../services/micro";
import { PuffLoader } from "react-spinners";

import * as XLSX from "xlsx";
import { ADMIN, FACILITY } from "../../constants/userTypes";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const downloadPDF = (data) => {
  try {
    const headers = Object.keys(data[0]); // dynamically fetch headers from data

    const body = [];

    // Add headers to body
    body.push(headers);

    // Add data to body
    data.forEach((item) => {
      const row = [];
      headers.forEach((header) => {
        row.push(item[header]);
      });
      body.push(row);
    });

    const docDefinition = {
      content: [
        { text: "Reports", style: "header" },
        {
          table: {
            headerRows: 1,
            body: body,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
        },
      },
    };

    pdfMake.createPdf(docDefinition).download("Reports.pdf");
  } catch (error) {
    ErrorToast("Error Downloading Report:" + error);
  }
};

const downloadExcel = (data) => {
  // Create a new worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Reports");

  // Download the workbook as an Excel file
  XLSX.writeFile(wb, "Reports.xlsx");
};

const optionTableMap = {
  "Total Confirmed Shifts": {
    name: "TOTAL_CONFIRMED_SHIFTS_V",
    isFacilityRelation: true,
  },
  "Total Call Offs": {
    name: "TOTAL_CALL_OFF_SHIFTS_V",
    isFacilityRelation: true,
  },
  "Total Cancellations": {
    name: "TOTAL_CANCELLATIONS_V",
    isFacilityRelation: true,
  },
  "Total Instacare Cancellations": {
    name: "TOTAL_INSTACARE_CANCELLATIONS_V",
    isFacilityRelation: false,
  },
  "Total Facility Cancellations": {
    name: "TOTAL_FACILITY_CANCELLATIONS_V",
    isFacilityRelation: true,
  },
  "Total Unassigned Shifts": {
    name: "TOTAL_UNASSIGNED_SHIFTS_V",
    isFacilityRelation: true,
  },
  "Attendance Report": {
    name: "TOTAL_ATTENDANCE_MISSING_V",
    isFacilityRelation: false,
  },
  // "Geofence Report": {
  //   name: "TOTAL_GEOEVENTS_V",
  //   isFacilityRelation: false,
  // },
  // PENDING
  // "Total Bill to Instacare": "TotalCallOffs",
  // "Total Bill to Facility": "TotalCallOffs",
  // "PBJ Reports": "TotalCallOffs",
  // "Facility Report": "TotalCallOffs",
  // "Employee Pay Status Report": "TotalCallOffs",
  // "Employee Points Report": "TotalCallOffs",
  // "Shift Roll Call Report": "TotalCallOffs",
  // "Employee List Report": "TotalCallOffs",
};

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

const getLastDay = (date) => {
  let result = new Date(date);
  return formatDate(result);
};

const getStartOfWeek = (date) => {
  let result = new Date(date);
  result.setDate(result.getDate() - 6);
  return formatDate(result);
};

const getStartOfMonth = (date) => {
  let result = new Date(date);
  result.setDate(1);
  return formatDate(result);
};
function Reports() {
  const [report, setReports] = useState({
    facilityID: "",
  });

  const { type, myFacility } = useAuth();

  const [tableData, setTableData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const [selectedOptionDate, setSelectedOptionDate] = useState(null);
  const handleOptionChangeDate = (option) => {
    setSelectedOptionDate(option);

    // Updating the date range based on the option selected
    if (option === "Day") {
      setStartDate(getLastDay(new Date()));
      setEndDate(getLastDay(new Date()));
    } else if (option === "Week") {
      setStartDate(getStartOfWeek(new Date()));
      setEndDate(new Date());
    } else if (option === "Month") {
      setStartDate(getStartOfMonth(new Date()));
      setEndDate(new Date());
    }
  };

  const runReport = async () => {
    if (!selectedOption) {
      ErrorToast("Please select an option first.");
      return;
    }

    setLoading(true);

    const payload = {
      table: optionTableMap[selectedOption].name,
      limit: 1000, // or any other configuration you want
      date_column: "date",
    };

    if (startDate) payload.start_date = startDate; //.toISOString().split("T")[0];
    if (endDate) payload.end_date = endDate; //.toISOString().split("T")[0];
    if (
      optionTableMap[selectedOption].isFacilityRelation &&
      (type === FACILITY ? myFacility?.id : report.facilityID)
    )
      payload.facilityID =
        type === FACILITY ? myFacility?.id : report.facilityID; //.toISOString().split("T")[0];

    console.log(
      "🚀 ~ file: index.js:154 ~ runReport ~ startDate:",
      startDate,
      endDate,
      payload,
      myFacility,
      type
    );

    const data = await fetchApiData(payload);

    console.log("🚀 ~ runReport ~ data.parsedBody:", data.parsedBody);

    setTableData(data.parsedBody);

    setLoading(false);
  };
  // Update a single key in the people object
  const setReportsKey = (key) => (newValue) =>
    setReports((prevSupport) => ({ ...prevSupport, [key]: newValue }));

  const [isOpen, setIsOpen] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // const { facilities } = useAdmin();

  const { facilities } = useListFacilities();

  const handleDateChange = (startOrEnd, value) => {
    if (startOrEnd === "start") {
      setStartDate(value);
    } else if (startOrEnd === "end") {
      setEndDate(value);
    }
  };

  return (
    <div className="flex flex-col min-h-max px-3 pb-3">
      <Toaster />
      <div className="flex flex-col">
        <div className="flex py-1 justify-between">
          <div className="flex items-center">
            <PageHeader text={"Reports"} />
            <div className="mx-1" />
            <div className="">
              <DateDropDown text={"18 March 2023"} />
            </div>
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
              <OptionTab
                options={["Day", "Week", "Month"]}
                selectedOption={selectedOptionDate}
                onOptionChange={handleOptionChangeDate}
              />
            </div>

            <div className="flex flex-row space-x-2">
              <div>
                {" "}
                <Button
                  onClick={() => {
                    downloadPDF(tableData);
                  }}
                >
                  Download as PDF
                </Button>
              </div>
              <div>
                {" "}
                <Button
                  onClick={() => {
                    downloadExcel(tableData);
                  }}
                >
                  Download as Excel
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="h-full bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between">
        <div className="flex flex-col p-4 space-y-4 h-full justify-between">
          <div className="gap-2 w-full">
            <div className="flex flex-row space-x-2 items-center">
              <div className="flex flex-row w-4/5 space-x-2">
                <div className="w-2/3">
                  <DropDown
                    placeholder={"Select Report"}
                    value={selectedOption}
                    setValue={setSelectedOption}
                    // options={Object.values(optionTableMap)}
                    // labels={Object.keys(optionTableMap)}
                    options={Object.keys(optionTableMap)}
                  />
                </div>
                {type === ADMIN && (
                  <div className="w-1/3">
                    <DropDown
                      placeholder={"Facility"}
                      value={report.facilityID || null}
                      setValue={setReportsKey("facilityID")}
                      options={facilities?.map((obj) => obj.id)}
                      labels={facilities?.map((obj) => obj.facilityName)}
                    />
                  </div>
                )}
              </div>

              <div className="w-1/5 flex-1">
                <Button
                  children={"RUN REPORT"}
                  onClick={runReport}
                  // disabled={!selectedOption}
                />
              </div>
            </div>
          </div>

          {!loading ? (
            <div id="tableToExport" className="mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-PRIMARY_LIGHT_COLOR text-white text-xs">
                    {tableData?.length > 0 &&
                      Object.keys(tableData[0]).map((key, idx) => (
                        <th key={idx}>{key}</th>
                      ))}
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {tableData?.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      {Object.values(row).map((value, cellIdx) => (
                        <td key={cellIdx}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full items-center justify-center flex">
              <PuffLoader
                color={themeStyles.PRIMARY_LIGHT_COLOR}
                loading={loading}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
