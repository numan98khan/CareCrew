import React from "react";
import themeStyles from "../../styles/theme.styles";
import { useSpring, animated } from "react-spring";

import Check from "../Check";

import OpenIndicator from "../../assets/icons/indicators/open";
import IncentiveIndicator from "../../assets/icons/indicators/incentive";
import GuaranteeIndicator from "../../assets/icons/indicators/guarantee";
import UserXIndicator from "../../assets/icons/userx";
import WatchIndicator from "../../assets/icons/watch";

import ColoredTag from "../ColoredTag";
import RateTag from "../ColoredTag/RateTag";
import LocationTag from "../ColoredTag/LocationTag";

import { MainHover, ScaleHover } from "../../styles/animations";
import TimingTag from "../ColoredTag/TimingTag";
// import WhosOnItem from "../../components/WhosOn/index";

const MarketplaceItem = ({ index, shift, shiftTiming, onClick, disabled }) => {
  const iconSize = 8;
  // Inside your component...

  // const dateobj = new Date(shift?.date);

  const dateobj = new Date(shift?.shiftStartDT);

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
  // console.log(monthName); //

  return (
    <>
      {/* <div
        style={{
          position: "relative",
        }}
        className={`flex flex-col justify-between border-greyhighlight border rounded w-full p-3 ${
          index % 2 !== 0 ? "bg-white" : "bg-PRIMARY_NEUTRAL_COLOR"
        } ${ScaleHover}`}
        onClick={onClick}
      > */}
      <div
        className={`flex flex-col justify-between border-greyhighlight border rounded w-full p-3 
        ${index % 2 !== 0 ? "bg-white" : "bg-PRIMARY_NEUTRAL_COLOR"} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ScaleHover}
        `}
        onClick={disabled ? undefined : onClick}
      >
        <div className="flex flex-row justify-between mb-1">
          <div className=" flex flex-row items-center w-full bg-slate-40">
            <div className=" flex flex-col items-center justify-center">
              <label className="text-PRIMARY_COLOR text-xxl font-bold ">
                {dayOfMonth}
              </label>
              <label className="uppercase text-xxxs text-greycus">
                {monthName}
              </label>
            </div>
            <div className="h-2/3 w-[1px] bg-greyhighlight mx-1" />
            <div className="flex flex-col text-left items-start py-1 w-full h-full">
              <label className="text-xs font-bold">
                {shift?.facility?.facilityName}
              </label>
              <label className="text-[9px] text-gray-500">
                {shift?.roleRequired}
              </label>

              <div className="flex flex-row items-center justify-between">
                {shift?.isGuarantee ? (
                  <>
                    <GuaranteeIndicator size={iconSize - 1} />
                    <label className="text-xxs ml-1">
                      {"Cancellation Guarantee"}
                    </label>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {shift?.isIncentive ? <IncentiveIndicator size={iconSize} /> : null}
        </div>

        <div className=" flex flex-row space-x-2">
          <RateTag
            title={`$${shift?.rate}/hr${
              shift?.isIncentive
                ? " + $" +
                  shift?.incentives?.incentiveAmount +
                  " " +
                  shift?.incentives?.incentiveType
                : ""
            }`}
          />

          <TimingTag title={shiftTiming} />

          <LocationTag title={`${shift?.distance} miles`} />
        </div>
      </div>
    </>
  );
};

export default MarketplaceItem;
