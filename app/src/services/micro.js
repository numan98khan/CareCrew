import toast, { Toaster } from "react-hot-toast";
import themeStyles from "../styles/theme.styles";

import { convertFromRaw } from "draft-js";
import NotificationTab from "../components/Modals/NotificationModal/NotificationTab";

import moment from "moment-timezone";

// Function to check if a given notification type is selected
export const hasPermission = (person, type) => {
  try {
    const permissions = JSON.parse(person.permissions);

    console.log(
      "🚀 ~ file: micro.js:15 ~ hasPermission ~ permissions.notifications:",
      permissions.notifications,
      Array.isArray(permissions.notifications) &&
        permissions.notifications.find(
          (notification) =>
            notification.name === type && notification.isSelected
        )?.isSelected
    );
    return (
      Array.isArray(permissions.notifications) &&
      permissions.notifications.find(
        (notification) => notification.name === type && notification.isSelected
      )?.isSelected
    );
  } catch (e) {
    console.error("Error parsing permissions", e);
    return false;
  }
};

// Utility function to convert date to UTC
// Convert both date and time to AWSDateTime
export const convertDateTimeToAWSDateTime = (dateTime, userTimezone) => {
  return moment
    .tz(dateTime, userTimezone)
    .tz("UTC")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
};

// Convert only date to AWSDate (time will be set to 00:00:00)
export const convertDateToAWSDate = (date, userTimezone) => {
  const localDateWithZeroTime = moment.tz(date, userTimezone).startOf("day");
  return localDateWithZeroTime.clone().tz("UTC").format("YYYY-MM-DD");
};

// Convert only time to AWSTime (date will be set to 1970-01-01)
export const convertTimeToAWSTime = (time, userTimezone) => {
  const localTime = moment.tz(time, "HH:mm:ss", userTimezone);
  const utcTime = localTime.clone().tz("UTC");
  return utcTime.format("HH:mm:ss.SSS[Z]");
};

// Convert AWSDateTime to local DateTime
export const convertAWSDateTimeToLocal = (dateTime, userTimezone) => {
  return moment
    .tz(dateTime, "UTC")
    .tz(userTimezone)
    .format("YYYY-MM-DDTHH:mm:ss.SSS");
};

// Convert AWSDate to local Date
export const convertAWSDateToLocalDate = (date, userTimezone) => {
  return moment.tz(date, "UTC").tz(userTimezone).format("YYYY-MM-DD");
};

// export const convertAWSTimeToLocalTime = (time, userTimezone) => {
//   // Prepend a dummy date so that moment can parse it
//   const dummyDate = "1970-01-01";
//   const fullTimeStr = `${dummyDate}T${time}`;

//   // Convert the time
//   return moment.tz(fullTimeStr, "UTC").tz(userTimezone).format("HH:mm:ss.SSSZ");
// };
export const convertAWSTimeToLocalTime = (time, userTimezone) => {
  // Prepend a dummy date so that moment can parse it
  const dummyDate = "1970-01-01";
  const fullTimeStr = `${dummyDate}T${time}`;

  // Convert the time and format it to "HH:mm:ss.SSS"
  const localTimeStr = moment
    .tz(fullTimeStr, "UTC")
    .tz(userTimezone)
    .format("HH:mm:ss.SSS");

  // Append "Z" to indicate it's in UTC
  return `${localTimeStr}Z`;
};

export const formatDateToAWS = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-11 for JavaScript dates
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function draftRichToText(rawString) {
  const contentState = convertFromRaw(JSON.parse(rawString));
  const plainText = contentState.getPlainText();

  return plainText;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

export const displayDatetime = (dateString) => {
  // const date = new Date(dateString);
  return (
    reverseFormatDateTime(dateString) + " " + reverseFormatDate(dateString)
  );
};

export const displayDate = (dateString) => {
  // const date = new Date(dateString);
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // return reverseFormatDateTime(dateString);
};

export const displayTime = (dateString) => {
  // console.log(
  //   "🚀 ~ file: micro.js:130 ~ displayTime ~ dateString:",
  //   dateString
  // );

  // const date = new Date(dateString);
  // return reverseFormatDate(dateString);
  return dateString
    ? new Date(dateString).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";
};

export function reverseFormatDateTime(dateString) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Create a new Date object from the input string
  const date = new Date(dateString);

  // // Extract and format the month, day, and year
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Extract and format the month, day, and year
  // const month = monthNames[date.getUTCMonth()];
  // const day = date.getUTCDate();
  // const year = date.getUTCFullYear();

  // Return the formatted date
  return `${month} ${day}, ${year}`;
}

export function formatTime(timeString) {
  const timePeriod = timeString.slice(-2); // Extract AM/PM
  let [hours, minutes] = timeString.slice(0, -2).split(":");

  if (timePeriod === "PM" && hours !== "12") {
    hours = String(Number(hours) + 12).padStart(2, "0"); // Pad hours with leading zero
  } else if (timePeriod === "AM" && hours === "12") {
    hours = "00";
  } else {
    hours = hours.padStart(2, "0"); // Pad hours with leading zero for AM hours
  }

  return `${hours}:${minutes}`;
}

// export function reverseFormatDate(timeString) {
//   if (!timeString) {
//     return "";
//   }
//   // Extract the hours and minutes
//   const [hours, minutes] = timeString.split(":");

//   // Determine if the time is AM or PM
//   const period = +hours < 12 ? "AM" : "PM";

//   // Convert the hours to a 12-hour format
//   const hours12 = (+hours % 12 || 12).toString();

//   // Pad the hours and minutes with leading zeros if necessary
//   const paddedHours = hours12.padStart(2, "0");
//   const paddedMinutes = minutes.padStart(2, "0");

//   // Return the formatted time
//   return `${paddedHours}:${paddedMinutes} ${period}`;
// }

export function reverseFormatDate(timeString) {
  if (!timeString) {
    return "";
  }
  const containsT = timeString.includes("T");

  if (containsT) {
    return displayDateTimeToTime(timeString);
  }

  // Extract the hours and minutes
  const [hours, minutes] = timeString.split(":");

  // Determine if the time is AM or PM
  const period = +hours < 12 ? "AM" : "PM";

  // Convert the hours to a 12-hour format
  const hours12 = (+hours % 12 || 12).toString();

  // Pad the hours and minutes with leading zeros if necessary
  const paddedHours = hours12.padStart(2, "0");
  const paddedMinutes = minutes.padStart(2, "0");
  // Return the formatted time
  return `${paddedHours}:${paddedMinutes} ${period}`;
}

export const displayDateTimeToTime = (dateTimeString) => {
  // export function reverseFormatDate(dateTimeString) {
  if (!dateTimeString) {
    return "";
  }

  // Extract the time part from the ISO string
  const timeString = dateTimeString.split("T")[1].split(".")[0];

  // Extract the hours and minutes
  const [hours, minutes] = timeString.split(":");

  // Determine if the time is AM or PM
  const period = +hours < 12 ? "AM" : "PM";

  // Convert the hours to a 12-hour format
  const hours12 = (+hours % 12 || 12).toString();

  // Pad the hours and minutes with leading zeros if necessary
  const paddedHours = hours12.padStart(2, "0");
  const paddedMinutes = minutes.padStart(2, "0");

  // Return the formatted time
  return `${paddedHours}:${paddedMinutes} ${period}`;
};

export const ErrorToast = (msg) => {
  toast.error(msg, {
    style: {
      background: "white",
      color: themeStyles.RED,
      border: "1px solid",
    },
    // position: "bottom-left",
    // position: "top-right",
    position: "top-center",
  });
};

export const SuccessToast = (msg) => {
  toast.success(msg, {
    style: {
      background: "white",
      color: "#0F0",
      border: "1px solid ",
    },
    position: "top-right",
    // position: "center",
  });
};

export const NotificationToast = (notification) => {
  toast(
    <NotificationTab
      key={notification.id}
      isCrucial={true}
      subject={notification.subject}
      body={notification.body}
      datetime={notification?.createdAt}
    />,
    {
      duration: 5000,
      position: "top-right", //section of the browser page
    }
  );
};
