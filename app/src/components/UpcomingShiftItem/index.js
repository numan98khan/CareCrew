import React, { useState, useEffect } from "react";

import TimeIcon from "../../assets/icons/time";
import UserXIcon from "../../assets/icons/userx";
import WatchIcon from "../../assets/icons/watch";
import ClockUpIcon from "../../assets/icons/clockUp";
import { MainHover } from "../../styles/animations";
import moment from "moment";
import themeStyles from "../../styles/theme.styles";
import {
  displayDate,
  displayDatetime,
  displayTime,
} from "../../services/micro";
import { Storage } from "aws-amplify";
import RateTag from "../ColoredTag/RateTag";

export default function UpcomingShiftItem({
  index,
  facilityName,

  // activity,
  timecard,
  shiftType,
  onClick,
}) {
  const isActiveClock = shiftType === "Clocked-In" ? true : false;
  // console.log("isActiveClock", isActiveClock);

  // // const shiftStartDateTime = moment(
  // //   `${timecard?.shift?.date}T${timecard?.shift?.shiftStart}`
  // // );
  // const shiftStartDateTime = moment(`${timecard?.shift?.shiftStartDT}`);
  // const now = moment(); // Local time

  // const totalMinutesBeforeShiftStarts = shiftStartDateTime.diff(now, "minutes");

  // const absTotalMinutes = Math.abs(totalMinutesBeforeShiftStarts);
  // const hoursBeforeShiftStarts = Math.floor(absTotalMinutes / 60);
  // const minutesBeforeShiftStarts = absTotalMinutes % 60;

  // const activity = timecard.isCallOff
  //   ? `Shift cancelled at ${displayDatetime(timecard.updatedAt)}`
  //   : timecard.clockOutTime
  //   ? `Shift completed at ${displayDatetime(timecard.clockOutTime)}`
  //   : timecard.isLate
  //   ? `Shift clocked in late: ${timecard?.lateReason || ""} ${displayDatetime(
  //       timecard.clockInTime
  //     )} `
  //   : timecard.clockInTime
  //   ? `Shift started at ${displayDatetime(timecard.clockInTime)}`
  //   : totalMinutesBeforeShiftStarts >= 0
  //   ? "Starting in " +
  //     (hoursBeforeShiftStarts !== 0
  //       ? hoursBeforeShiftStarts + " hours and "
  //       : "") +
  //     minutesBeforeShiftStarts +
  //     " mins"
  //   : "Late by " +
  //     (hoursBeforeShiftStarts !== 0
  //       ? hoursBeforeShiftStarts + " hours and "
  //       : "") +
  //     minutesBeforeShiftStarts +
  //     " mins";

  const shiftStartDateTime = moment(`${timecard?.shift?.shiftStartDT}`);
  const now = moment(); // Local time

  const isSameDay = shiftStartDateTime.isSame(now, "day");

  const totalMinutesBeforeShiftStarts = shiftStartDateTime.diff(now, "minutes");

  const absTotalMinutes = Math.abs(totalMinutesBeforeShiftStarts);
  const hoursBeforeShiftStarts = Math.floor(absTotalMinutes / 60);
  const minutesBeforeShiftStarts = absTotalMinutes % 60;

  const formattedShiftStartDate = shiftStartDateTime.format("MMMM Do YYYY");

  const activity = timecard.isCallOff
    ? `Shift cancelled at ${displayTime(timecard.updatedAt)}`
    : timecard.clockOutTime
    ? `Shift completed at ${displayTime(timecard.clockOutTime)}`
    : timecard.isLate
    ? `Shift clocked in late ${timecard?.lateReason || ""} ${
        timecard.clockInTime ? ": " + displayDate(timecard.clockInTime) : ""
      } `
    : timecard.clockInTime
    ? `Shift started at ${displayTime(timecard.clockInTime)}`
    : !isSameDay
    ? `Shift starts on ${formattedShiftStartDate}`
    : totalMinutesBeforeShiftStarts >= 0
    ? "Starting in " +
      (hoursBeforeShiftStarts !== 0
        ? hoursBeforeShiftStarts + " hours and "
        : "") +
      minutesBeforeShiftStarts +
      " mins"
    : "Late by " +
      (hoursBeforeShiftStarts !== 0
        ? hoursBeforeShiftStarts + " hours and "
        : "") +
      minutesBeforeShiftStarts +
      " mins";

  // const absTotalMinutes = Math.abs(totalMinutesBeforeShiftStarts);
  // const hoursBeforeShiftStarts = Math.floor(absTotalMinutes / 60);
  // const minutesBeforeShiftStarts = absTotalMinutes % 60;

  const highlightColor =
    timecard.isCallOff || timecard.isLate || totalMinutesBeforeShiftStarts < 0
      ? timecard.clockOutTime
        ? themeStyles.PRIMARY_COLOR
        : themeStyles.RED
      : timecard.clockInTime
      ? themeStyles.GREEN
      : themeStyles.SECONDARY_COLOR;

  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    const getImage = async () => {
      const imgSrc = timecard?.facility?.imgSrc;
      // Check local storage first
      const cachedImage = localStorage.getItem(`image-${imgSrc}`);

      if (cachedImage) {
        setImgUrl(cachedImage);
        return;
      }

      // If not in cache, fetch from storage
      const image = await Storage.get(imgSrc);

      // Save to local storage for future use
      localStorage.setItem(`image-${imgSrc}`, image);

      setImgUrl(image);
    };

    getImage();
  }, [timecard?.facility?.imgSrc]); // I assume you might want to refetch when imgSrc changes

  const dateobj = new Date(timecard?.shift?.shiftStartDT);

  // Get day of the month number
  const dayOfMonth = dateobj.getDate();
  // console.log(dayOfMonth); // Outputs: 17

  // Get name of the month
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
  const monthName = monthNames[dateobj.getMonth()];

  // useEffect(() => {
  //   const imgSrc = timecard?.facility?.imgSrc;
  //   const getImage = async () => {
  //     const image = await Storage.get(imgSrc);
  //     setImgUrl(image);
  //   };

  //   getImage();
  // }, []);

  return (
    <div
      className={`flex w-full items-center p-2 ${MainHover} ${
        index % 2 !== 0 ? "bg-white" : "bg-PRIMARY_NEUTRAL_COLOR"
      }`}
      onClick={onClick}
      //   className="flex w-full items-center p-2 bg-black"
    >
      <div className="flex-grow flex justify-between items-center">
        <div className="flex ">
          {/* <img
            className="w-8 h-8 rounded"
            src={
              imgUrl ? imgUrl : "https://randomuser.me/api/portraits/men/20.jpg"
            }
            alt="User avatar"
          /> */}
          <div className=" flex flex-col items-center justify-center">
            <label className="text-PRIMARY_COLOR text-xxl font-bold ">
              {dayOfMonth}
            </label>
            <label className="uppercase text-xxxs text-greycus">
              {monthName}
            </label>

            <RateTag title={"$" + timecard?.shift?.rate} />
          </div>

          <div className="mx-1" />

          <div className="flex flex-col text-left">
            <label className="text-xxs font-bold">{facilityName}</label>
            <label className="text-xxs text-slate-500">
              {`${displayTime(timecard?.shift?.shiftStartDT)} - 
                ${displayTime(timecard?.shift?.shiftEndDT)}`}
            </label>
          </div>
        </div>

        <div className="flex flex-col text-left">
          <label
            className={`text-xxs font-bold `}
            style={{ color: highlightColor }}
          >
            {activity}
          </label>
        </div>
      </div>

      <div className="flex justify-center space-x-2 items-center">
        {/* <img className="w-4 h-4" src={blueClock} alt="Button icon" /> */}
        {/* <TimeIcon size={10} />
        <p className="text-xxs font-medium text-blue-900 font-Inter">
          {timing}
        </p> */}
      </div>

      {/* <div className="flex-grow flex justify-end gap-2"></div> */}
    </div>
  );
}
