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
import { useAdmin } from "../../context";

function Reports() {
  const [report, setReports] = useState({
    facilityID: "",
  });

  // Update a single key in the people object
  const setReportsKey = (key) => (newValue) =>
    setReports((prevSupport) => ({ ...prevSupport, [key]: newValue }));

  const [isOpen, setIsOpen] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { facilities } = useAdmin();

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
              <OptionTab options={["Week", "Month", "Year"]} />
            </div>

            <div className="flex items-center">
              <button
                // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                className="flex rounded-full py-1 px-1 items-center mr-1"
                // type={type}
                // onClick={onClick}
                style={{
                  backgroundColor: themeStyles.RED_LIGHT,
                  // color: "#fff",
                }}
              >
                <DeleteIcon size={8} />
              </button>
              <IconButton
                color={themeStyles.PRIMARY_LIGHT_COLOR}
                text={"Filter"}
                icon={<FilterIcon size={8} />}
                onClick={() => setIsOpen(true)}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="h-full bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between">
        <div className="flex flex-col p-4 space-y-4 h-full justify-between">
          <OptionTab
            options={[
              { title: "Total Bill to Facility" },
              { title: "Total Bill to CareCrew" },
              { title: "Timecards" },
              { title: "PBJ Reports" },
              { title: "Advance Report" },
              { title: "Total Call Offs" },
              { title: "Total Cancellations" },
              { title: "Total Confirmed Shifts" },
              { title: "Total Unassigned Shifts" },
            ]}
          />
          {/* First Row */}
          <div className="grid grid-cols-4 gap-2">
            <div className="flex flex-col">
              <div className="my-1" />
              <DropDown
                placeholder={"Facility"}
                value={report.facilityID}
                setValue={setReportsKey("facilityID")}
                options={facilities.map((obj) => obj.id)}
                labels={facilities.map(
                  (obj) => obj.facilityName + ": " + obj.id
                )}
                // label={}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
