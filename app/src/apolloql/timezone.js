import moment from "moment-timezone";

export const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// export const userTimezone = "America/Chicago";

export const convertAWSDateTimeToLocal = (dateTime, userTimezone) => {
  return moment
    .tz(dateTime, "UTC")
    .tz(userTimezone)
    .format("YYYY-MM-DDTHH:mm:ss.SSS");
};

export const convertToLocalizedDateTime = (dateTime, time, userTimezone) => {
  const fullDateTime = `${dateTime}T${time}`;
  return moment.tz(fullDateTime, "UTC", userTimezone);
};

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
  return `${localTimeStr}`;
};
