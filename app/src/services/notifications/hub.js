import {
  externalNotificationToInstacare,
  externalNotificationToPeople,
  inAppNotificationsToFacilityPeople,
  inAppNotificationsToPeople,
  inApplNotificationToInstacare,
  sendNotificationsToFacilityPeople,
} from "../timecards/reporting";

import {
  convertDateTimeToAWSDateTime,
  convertTimeToAWSTime,
  displayDate,
  displayTime,
  ErrorToast,
  SuccessToast,
} from "../micro";
import {
  ADD_SHIFT,
  EMPLOYEE_LATE,
  NO_CALL_NO_SHOW,
  PEOPLE_UPDATED,
  SHIFT_DELETED,
} from "../../constants/notificationTypes";

export const NotificationHub = {
  sendRecurringShiftAddNotifications: async ({
    apiResponse,
    shift,
    facilities,
    myFacility,
    user,
    createNotificationQuery,
  }) => {
    const tempFetchedFacility = facilities?.find(
      (obj) => obj?.id === shift?.facilityID
    );

    const numberOfShifts = JSON.parse(apiResponse?.result?.body)?.length || 0;

    const subject = `${numberOfShifts} New Shift(s) Available`;
    const formedMessage = `Subject: ${subject}\n\nThe following shift has been posted:\n\nFacility: ${
      tempFetchedFacility?.facilityName
    }\nRate: ${shift?.rate}\n\nTimestamp: ${
      displayDate(new Date()?.toISOString()) +
      " " +
      displayTime(new Date()?.toISOString())
    }`;

    const userInfo = `\nBy User: ${user?.attributes?.email}`;

    try {
      // INTERNAL Notifications
      inAppNotificationsToPeople(
        "-1",
        ADD_SHIFT,
        "New shift was added on CareCrew",
        formedMessage,
        createNotificationQuery
      );
      inApplNotificationToInstacare(
        ADD_SHIFT,
        "New shift was added on CareCrew",
        formedMessage + userInfo,
        createNotificationQuery
      );
      inAppNotificationsToFacilityPeople(
        shift?.facilityID,
        ADD_SHIFT,
        "New shift was added on CareCrew",
        formedMessage + userInfo,
        createNotificationQuery
      );

      // EXTERNAL Notifications
      externalNotificationToInstacare(formedMessage + userInfo, true, false); // CareCrew
      sendNotificationsToFacilityPeople(
        shift?.facilityID,
        formedMessage + userInfo,
        true,
        false // Test disabled
      ); // Facility
    } catch (error) {
      console.error("Error sending shift add notifications:", error);
      throw new Error("Failed to send notifications for shift addition");
    }
  },
  sendAccountUpdateNotifications: async ({
    user,
    changedFields,
    peopleDetails,
    createFieldsString,
    createNotificationQuery,
  }) => {
    const subject = "Account Information Update";
    const formedMessage = `Subject: ${subject}\n\nThe following account has been updated by User: ${
      user?.attributes?.email
    }\n\nChanged fields marked with "*"\n\n${createFieldsString(
      changedFields,
      peopleDetails
    )}`;

    try {
      // INTERNAL Notifications
      inApplNotificationToInstacare(
        PEOPLE_UPDATED,
        "Person information was edited",
        formedMessage,
        createNotificationQuery
      );
      inAppNotificationsToPeople(
        peopleDetails?.id,
        PEOPLE_UPDATED,
        "Person information was edited",
        formedMessage,
        createNotificationQuery
      );

      // EXTERNAL Notifications
      externalNotificationToInstacare(formedMessage, true, false); // CareCrew
      externalNotificationToPeople(
        peopleDetails?.id,
        formedMessage,
        true,
        true // Employee
      );
    } catch (error) {
      console.error("Error sending account update notifications:", error);
      throw new Error("Failed to send notifications for account update");
    }
  },
  sendShiftDeletionNotifications: async ({
    latestShift,
    selectedFacility,
    myFacility,
    createNotificationQuery,
  }) => {
    const subject = "Open Shift Deletion";
    const formedMessage = `Subject: ${subject}\n\nThe following shift has been cancelled by ${
      myFacility?.facilityName ? "Facility" : "CareCrew"
    }\n\nFacility: ${selectedFacility?.facilityName}\nShift Date: ${displayDate(
      latestShift?.shiftStartDT
    )}\nShift Time: ${
      displayTime(latestShift?.shiftStartDT) +
      " - " +
      displayTime(latestShift?.shiftEndDT)
    }\n\nTimestamp: ${
      displayDate(new Date()?.toISOString()) +
      " " +
      displayTime(new Date()?.toISOString())
    }`;

    try {
      // INTERNAL Notifications
      inApplNotificationToInstacare(
        SHIFT_DELETED,
        "Shift Deleted",
        formedMessage,
        createNotificationQuery
      );
      inAppNotificationsToFacilityPeople(
        latestShift?.facilityID,
        SHIFT_DELETED,
        "Shift Deleted",
        formedMessage,
        createNotificationQuery
      );

      // EXTERNAL Notifications
      externalNotificationToInstacare(formedMessage, true, false); // CareCrew
      sendNotificationsToFacilityPeople(
        selectedFacility?.id,
        formedMessage,
        true,
        false // Test disabled
      ); // Facility
    } catch (error) {
      console.error("Error sending shift deletion notifications:", error);
      throw new Error("Failed to send notifications for shift deletion");
    }
  },
  sendNoCallNoShowNotifications: async ({
    peopleObj,
    selectedShift,
    selectedFacility,
    selectedTimecard,
    user,
    createNotificationQuery,
  }) => {
    const subject = "Employee No Call/No Show";
    const formedMessage = `Subject: ${subject}\n\nThe employee did not appear for the following shift:\n\nEmployee: ${
      peopleObj?.firstName
    } ${peopleObj?.lastName}\nShift Date: ${displayDate(
      selectedShift?.shiftStartDT
    )}\nShift Time: ${
      displayTime(selectedShift?.shiftStartDT) +
      " - " +
      displayTime(selectedShift?.shiftEndDT)
    }\nFacility: ${selectedFacility?.facilityName}\n\nTimestamp: ${
      displayDate(new Date()?.toISOString()) +
      " " +
      displayTime(new Date()?.toISOString())
    }`;

    const userInfo = `\nBy User: ${user?.attributes?.email}`;

    try {
      // INTERNAL Notifications
      inAppNotificationsToPeople(
        selectedTimecard?.peopleID,
        NO_CALL_NO_SHOW,
        subject,
        formedMessage,
        createNotificationQuery
      );
      inApplNotificationToInstacare(
        NO_CALL_NO_SHOW,
        subject,
        formedMessage + userInfo,
        createNotificationQuery
      );
      inAppNotificationsToFacilityPeople(
        selectedShift?.facilityID,
        NO_CALL_NO_SHOW,
        subject,
        formedMessage + userInfo,
        createNotificationQuery
      );

      // EXTERNAL Notifications
      externalNotificationToInstacare(formedMessage + userInfo, true, true); // CareCrew
      sendNotificationsToFacilityPeople(
        selectedFacility?.id,
        formedMessage + userInfo,
        true,
        false // Test disabled
      ); // Facility
      externalNotificationToPeople(
        peopleObj?.id,
        formedMessage,
        true,
        true // Employee
      );
    } catch (error) {
      console.error("Error sending No Call/No Show notifications:", error);
      throw new Error("Failed to send notifications for No Call/No Show");
    }
  },
  sendEmployeeDelayNotifications: async ({
    selectedShift,
    selectedFacility,
    peopleObj,
    user,
    createNotificationQuery,
  }) => {
    const subject = "Employee Delay Notice";
    const formedMessage = `Subject: ${subject}\n\nThe following employee is running late for the following shift:\n\nShift Date: ${displayDate(
      selectedShift?.shiftStartDT
    )}\nShift Time: ${
      displayTime(selectedShift?.shiftStartDT) +
      " - " +
      displayTime(selectedShift?.shiftEndDT)
    }\nFacility: ${selectedFacility?.facilityName}\nEmployee: ${
      peopleObj?.firstName + " " + peopleObj?.lastName
    }\nUpdated TOA: N/A\n\nTimestamp: ${
      displayDate(new Date()?.toISOString()) +
      " " +
      displayTime(new Date()?.toISOString())
    }\nBy User: ${user?.attributes?.email}`;

    try {
      // INTERNAL Notifications
      inAppNotificationsToPeople(
        peopleObj?.id,
        EMPLOYEE_LATE,
        "Employee is running late",
        formedMessage,
        createNotificationQuery
      );
      inApplNotificationToInstacare(
        EMPLOYEE_LATE,
        "Employee is running late",
        formedMessage,
        createNotificationQuery
      );
      inAppNotificationsToFacilityPeople(
        selectedShift?.facilityID,
        EMPLOYEE_LATE,
        "Employee is running late",
        formedMessage,
        createNotificationQuery
      );

      // EXTERNAL Notifications
      externalNotificationToInstacare(formedMessage, true, false); // CareCrew
      sendNotificationsToFacilityPeople(
        selectedFacility?.id,
        formedMessage,
        true,
        true
      ); // Facility
      externalNotificationToPeople(
        peopleObj?.id,
        formedMessage,
        true,
        true // Employee
      );
    } catch (error) {
      console.error("Error sending Employee Delay notifications:", error);
      throw new Error("Failed to send notifications for Employee Delay");
    }
  },
  // Other notification methods...
};
