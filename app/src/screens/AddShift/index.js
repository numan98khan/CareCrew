import React, { useState } from "react";
import PageHeader from "../../components/Headers/PageHeader";
import NavTab from "../../components/NavTab";

import SingleShift from "./SingleShift";
import RecurringShifts from "./RecurringShifts";
import BulkShifts from "./BulkShifts";
import BulkUpload from "./BulkUpload";

import { useAdmin, useAuth } from "../../context";
import { useListFacilities } from "../../apolloql/facilities";
import {
  ErrorToast,
  SuccessToast,
  displayDate,
  displayTime,
} from "../../services/micro";
import { useCreateShift } from "../../apolloql/schedules";
import { shiftTemplate } from "./form";
import { ADMIN, FACILITY } from "../../constants/userTypes";
import { useNavigate } from "react-router-dom";
import { ADD_SHIFT } from "../../constants/notificationTypes";
import { useCreateNotification } from "../../apolloql/notifications";

const navTabs = [
  { title: "Single Shift", isActive: true, tag: "isAssigned" },
  { title: "Recurring Shifts", isActive: false },
  { title: "Bulk Upload", isActive: false },
  { title: "Bulk Shifts", isActive: false },
];

const AddShift = () => {
  const { myFacility, type } = useAuth();
  const { facilities } = useListFacilities();
  const { createShiftQuery } = useCreateShift();
  const [isPublishDisabled, setIsPublishDisabled] = useState(false);
  const { createNotificationQuery } = useCreateNotification();
  const [currentTab, setCurrentTab] = useState("Single Shift");
  const [shift, setShift] = useState(shiftTemplate);

  const handleTabChange = (newTab) => setCurrentTab(newTab);
  const setShiftKey = (key) => (newValue) =>
    setShift((prev) => ({ ...prev, [key]: newValue }));
  const setNestedShiftKey = (key, subKey) => (newValue) =>
    setShift((prev) => ({
      ...prev,
      [key]: { ...prev[key], [subKey]: newValue },
    }));

  async function uploadShift() {
    try {
      const shiftData = await createShiftQuery(shift, type === ADMIN);
      SuccessToast("Shift Uploaded Successfully");
      setShift(shiftTemplate);
    } catch (e) {
      ErrorToast("Error uploading shift " + e);
    }
    setIsPublishDisabled(false);
  }

  return (
    <div className="flex flex-col h-full px-3 pb-3">
      <div className="flex flex-col">
        <div className="flex py-1 justify-between">
          <PageHeader text={"Add Shifts"} />
        </div>

        {/* Make this section horizontally scrollable on small screens */}
        <div className="w-full h-10 bg-white flex overflow-x-auto whitespace-nowrap">
          {navTabs.map((tab, index) => (
            <NavTab
              key={index}
              title={tab.title}
              amount={tab.amount}
              isActive={currentTab === tab.title}
              onClick={() => handleTabChange(tab.title)}
            />
          ))}
        </div>
      </div>

      <div className="flex-grow mt-2 p-3 rounded-lg bg-white">
        {currentTab === "Single Shift" && (
          <SingleShift
            myFacility={type === FACILITY ? myFacility : null}
            facilities={facilities || []}
            shift={shift}
            setShiftKey={setShiftKey}
            setNestedShiftKey={setNestedShiftKey}
            publishAction={uploadShift}
            isPublishDisabled={isPublishDisabled}
            setIsPublishDisabled={setIsPublishDisabled}
          />
        )}
        {currentTab === "Recurring Shifts" && (
          <RecurringShifts
            myFacility={type === FACILITY ? myFacility : null}
            facilities={facilities || []}
            shift={shift}
            setShiftKey={setShiftKey}
            setNestedShiftKey={setNestedShiftKey}
            publishAction={uploadShift}
            isPublishDisabled={isPublishDisabled}
            setIsPublishDisabled={setIsPublishDisabled}
          />
        )}
        {currentTab === "Bulk Upload" && (
          <BulkUpload
            isPublishDisabled={isPublishDisabled}
            setIsPublishDisabled={setIsPublishDisabled}
            facilities={facilities || []}
          />
        )}
        {currentTab === "Bulk Shifts" && (
          <BulkShifts
            facilities={facilities || []}
            myFacility={type === FACILITY ? myFacility : null}
            isPublishDisabled={isPublishDisabled}
            setIsPublishDisabled={setIsPublishDisabled}
          />
        )}
      </div>
    </div>
  );
};

export default AddShift;
