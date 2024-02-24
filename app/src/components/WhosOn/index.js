import React from "react";

import TimeIcon from "../../assets/icons/time";
import UserXIcon from "../../assets/icons/userx";
import WatchIcon from "../../assets/icons/watch";
import ClockUpIcon from "../../assets/icons/clockUp";
import { MainHover } from "../../styles/animations";
import Avatar from "../Avatar";

export default function whosOn({
  index,
  name,
  facilty,
  timing,
  shiftType,
  whoson,
}) {
  const isActiveClock = shiftType === "Clocked-In" ? true : false;
  const isActiveClockOut = shiftType === "Clocked-Out" ? true : false;

  return (
    <div
      className={`flex w-full items-center p-2 ${MainHover} ${
        index % 2 !== 0 ? "bg-white" : "bg-PRIMARY_NEUTRAL_COLOR"
      }`}
      //   className="flex w-full items-center p-2 bg-black"
    >
      <div className=" flex-1 flex justify-start items-center">
        <Avatar
          imgSrc={whoson?.people?.profilePicture}
          alt={whoson?.people?.firstName + " " + whoson?.people?.lastName}
        />
        <div className="ml-3 flex-row text-left">
          <p className="text-xs font-semibold text-black font-Inter">{name}</p>
          <p className="text-xxs font-light text-black font-Inter text-left">
            {facilty}
          </p>
        </div>
      </div>

      <div className="flex flex-1 justify-center space-x-2 items-center">
        {/* <img className="w-4 h-4" src={blueClock} alt="Button icon" /> */}
        <TimeIcon size={10} />
        <p className="text-xxs font-medium text-blue-900 font-Inter">
          {timing}
        </p>
      </div>

      <div className="flex-1 flex justify-end gap-2">
        {whoson?.isCallOff ? (
          <button className="px-2 py-1 text-sm font-medium text-white bg-PRIMARY_NEUTRAL_COLOR rounded-full">
            {/* <img className="w-4 h-4" src={userX} alt="Button icon" /> */}
            <UserXIcon size={7} />
          </button>
        ) : null}
        {whoson?.isLate ? (
          <button className="px-2 py-1 text-sm font-medium text-white bg-PRIMARY_NEUTRAL_COLOR rounded-full">
            {/* <img className="w-4 h-4" src={watchIcon} alt="Button icon" /> */}
            <WatchIcon size={7} />
          </button>
        ) : null}

        {!whoson?.isCallOff && (
          <button
            className={`px-2 py-1 text-sm font-medium text-white ${
              isActiveClock
                ? "bg-lightGreen"
                : isActiveClockOut
                ? "bg-lightRed"
                : ""
            } rounded-full flex space-x-2 items-center`}
          >
            {/* <img className="w-4 h-4" src={redClock} alt="Button icon" /> */}
            {isActiveClock || isActiveClock ? (
              <ClockUpIcon
                size={7}
                color={isActiveClock ? "rgba(126, 230, 155, 0.1)" : null}
              />
            ) : null}
            <p
              className={`${
                isActiveClock
                  ? "text-green"
                  : isActiveClockOut
                  ? "text-red-600"
                  : "text-PRIMARY_COLOR"
              } font-Inter text-xxs`}
            >
              {shiftType}
            </p>
          </button>
        )}
      </div>
    </div>
  );
}
