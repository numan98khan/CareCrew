import React, { useState } from "react";
import PageHeader from "../../components/Headers/PageHeader";
import NavTab from "../../components/NavTab";

import SingleShift from "./SingleShift";
import RecurringShifts from "./RecurringShifts";
import BulkShifts from "./BulkShifts";
import BulkUpload from "./BulkUpload";

import { API, graphqlOperation, Auth } from "aws-amplify";

import { createShifts } from "../../graphql/mutations";

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
import {
  externalNotificationToInstacare,
  inAppNotificationsToFacilityPeople,
  inAppNotificationsToPeople,
  inApplNotificationToInstacare,
  sendNotificationsToFacilityPeople,
} from "../../services/timecards/reporting";

const navTabs = [
  { title: "Single Shift", isActive: true, tag: "isAssigned" },
  { title: "Recurring Shifts", isActive: false },
  { title: "Bulk Upload", isActive: false },
  { title: "Bulk Shifts", isActive: false },
];

const AddShift = () => {
  const { shifts } = useAdmin();
  const { myFacility, type, user } = useAuth();

  const navigate = useNavigate();

  const { facilities } = useListFacilities();
  const { createShiftQuery } = useCreateShift();

  const [isPublishDisabled, setIsPublishDisabled] = useState(false);
  const { createNotificationQuery } = useCreateNotification();

  const [currentTab, setCurrentTab] = useState("Single Shift");
  // const [currentTab, setCurrentTab] = useState("Bulk Shifts");
  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
  };

  const [shift, setShift] = useState(shiftTemplate);

  // Update a single key in the people object
  const setShiftKey = (key) => (newValue) =>
    setShift((prevShift) => {
      return { ...prevShift, [key]: newValue };
    });

  // Update a key in a nested object within people
  const setNestedShiftKey = (key, subKey) => (newValue) =>
    setShift((prevShift) => ({
      ...prevShift,
      [key]: {
        ...prevShift[key],
        [subKey]: newValue,
      },
    }));

  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}:00.000Z`;
  };

  async function uploadShift() {
    // if (shift?.)

    let formattedShift = { ...shift };
    // console.log(
    //   "🚀 ~ file: index.js:83 ~ uploadShift ~ formattedShift:",
    //   formattedShift
    // );

    // return;

    // Check and convert shift start time to 24 hours format if necessary
    if (/\d{1,2}:\d{2} (AM|PM)/.test(formattedShift.shiftStart)) {
      formattedShift.shiftStart = convertTo24HourFormat(
        formattedShift.shiftStart
      );
    }

    // Check and convert shift end time to 24 hours format if necessary
    if (/\d{1,2}:\d{2} (AM|PM)/.test(formattedShift.shiftEnd)) {
      formattedShift.shiftEnd = convertTo24HourFormat(formattedShift.shiftEnd);
    }

    try {
      const shiftData = await createShiftQuery(formattedShift, type === ADMIN);

      const tempFetchedFacility = facilities?.find(
        (obj) => obj?.id === formattedShift?.facilityID
      );

      let formedMessage = `Subject: New Shift Available\n\nThe following shft has been posted:\n\nShift Date: ${displayDate(
        shiftData?.shiftStartDT
      )}\nShift Time: ${
        displayTime(shiftData?.shiftStartDT) +
        " - " +
        displayTime(shiftData?.shiftEndDT)
      }\nFacility: ${tempFetchedFacility?.facilityName}\nRate: ${
        formattedShift?.rate
      }\n\nTimestamp: ${
        displayDate(new Date()?.toISOString()) +
        " " +
        displayTime(new Date()?.toISOString())
      }`;

      const userInfo = `\nBy User: ${user?.attributes?.email}`;
      console.log(
        "🚀 ~ file: index.js:139 ~ uploadShift ~ formedMessage:",
        formedMessage
      );

      // // INTERNAL
      inAppNotificationsToPeople(
        "-1",
        ADD_SHIFT,
        "New shift was added on Instacare",
        formedMessage,
        createNotificationQuery
      );
      inApplNotificationToInstacare(
        ADD_SHIFT,
        "New shift was added on Instacare",
        formedMessage + userInfo,
        createNotificationQuery
      );
      inAppNotificationsToFacilityPeople(
        formattedShift?.facilityID,
        ADD_SHIFT,
        "New shift was added on Instacare",
        formedMessage + userInfo,
        createNotificationQuery
      );

      // // // EXTERNAL
      externalNotificationToInstacare(formedMessage + userInfo, true, false); // Instacare
      sendNotificationsToFacilityPeople(
        formattedShift?.facilityID,
        formedMessage + userInfo,
        true,
        false // test disabled
      ); // Facility

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
          <div className="flex items-center">
            <PageHeader text={"Add Shifts"} />
          </div>
        </div>

        <div className="w-full h-10 bg-white flex">
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
      {/* Info Board */}
      <div className="h-full bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between">
        {/* <form onSubmit={formik.handleSubmit}> */}
        {currentTab === "Single Shift" ? (
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
        ) : currentTab === "Recurring Shifts" ? (
          <RecurringShifts
            myFacility={type === FACILITY ? myFacility : null}
            facilities={facilities || []}
            shift={shift}
            setShiftKey={setShiftKey}
            setNestedShiftKey={setNestedShiftKey}
            publishAction={uploadShift}
            isPublishDisabled={isPublishDisabled}
            setIsPublishDisabled={setIsPublishDisabled}
            // facilities={facilities || []}
          />
        ) : currentTab === "Bulk Upload" ? (
          <BulkUpload
            isPublishDisabled={isPublishDisabled}
            setIsPublishDisabled={setIsPublishDisabled}
            facilities={facilities || []}
          />
        ) : currentTab === "Bulk Shifts" ? (
          <BulkShifts
            facilities={facilities || []}
            myFacility={type === FACILITY ? myFacility : null}
            isPublishDisabled={isPublishDisabled}
            setIsPublishDisabled={setIsPublishDisabled}
          />
        ) : null}
        {/* </form> */}
      </div>
    </div>
  );
};

export default AddShift;
