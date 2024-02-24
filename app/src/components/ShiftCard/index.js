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
import { MainHover, ScaleHover } from "../../styles/animations";
// import WhosOnItem from "../../components/WhosOn/index";

const ShiftCard = ({
  index,
  shift,
  isMarkedLate,
  rateTag,
  minimal,
  numOfPositions,
  facility,
  shiftTiming,
  type,
  isAssigned,
  isIncentive,
  isGuarantee,
  isLate,
  isCallOff,
  isSelected,
  isComplete,
  onClick,
  onSelectionChange,
  disableCheck = false,
}) => {
  const iconSize = 8;
  // Inside your component...
  const [animationProps, setAnimationProps] = useSpring(() => ({
    scale: 1,
  }));

  const onCardClick = () => {
    setAnimationProps({
      scale: 1.1,
      reset: true,
      reverse: true,
      from: { scale: 1 },
      config: { duration: 100 },
    });
  };

  return (
    <>
      {minimal ? (
        <div
          style={{
            opacity: numOfPositions === 0 ? 0.5 : 1,
            position: "relative",
            transform: animationProps.scale.to((scale) => `scale(${scale})`),
          }}
          className={`flex flex-col justify-between border-greyhiglight border rounded w-full ${
            isLate
              ? "bg-[#f330471a]"
              : isCallOff
              ? "bg-[#16478E1a]"
              : shift.__typename === "Timecard" &&
                shift?.clockInTime &&
                shift?.clockOutTime
              ? "bg-[#7EE69B]"
              : shift.__typename === "Timecard"
              ? "bg-[#DCF6E9]"
              : index % 2 !== 0
              ? "bg-white"
              : "bg-PRIMARY_NEUTRAL_COLOR"
          } ${ScaleHover}`}
          onClick={onClick}
        >
          {!disableCheck && (
            <div
              className="absolute top-1 right-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Check
                value={isSelected}
                onChange={(e) => onSelectionChange(e.target.checked)}
              />
            </div>
          )}

          <div className="absolute bottom-2 right-2">
            <ColoredTag small title={type} />
          </div>

          <div className="flex justify-between items-center p-2">
            <div className="flex">
              {/* <div className="m-1" /> */}
              <div className="flex flex-col justify-start items-start">
                <label
                  className={`text-xs font-bold ${
                    isCallOff ? "line-through" : ""
                  }`}
                >
                  {numOfPositions}
                </label>
                <label
                  className={`text-xxs ${isCallOff ? "line-through" : ""}`}
                >
                  {facility}
                </label>

                <label
                  className="text-[7px] text-left"
                  style={{ color: themeStyles?.RED }}
                >
                  {shift?.lateReason?.replace("Instacare", "CareCrew")}
                </label>

                {isMarkedLate && (
                  <label
                    className="text-[7px] text-left"
                    style={{ color: themeStyles?.RED }}
                  >
                    {"Marked Late"}
                  </label>
                )}
                {isComplete && (
                  <label
                    className="text-[7px] text-left"
                    style={{ color: themeStyles?.GREEN }}
                  >
                    {"Completed"}
                  </label>
                )}

                <div className="py-1">
                  <RateTag title={rateTag} />
                </div>

                <div className="flex py-1">
                  <OpenIndicator
                    isOpen={isAssigned}
                    size={iconSize}
                    className="mr-2"
                  />

                  {isIncentive ? (
                    <IncentiveIndicator size={iconSize} className="mr-2" />
                  ) : null}

                  {isGuarantee ? (
                    <GuaranteeIndicator size={iconSize} className="mr-2" />
                  ) : null}

                  {isLate ? (
                    <WatchIndicator size={iconSize} className="mr-2" />
                  ) : null}

                  {isCallOff ? (
                    <UserXIndicator size={iconSize} className="mr-2" />
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col justify-between items-center bg-black">
              <div className="flex h-full justify-end">
                {/* <ColoredTag small title={type} /> */}
              </div>
              {/* <label className="text-xxs text-grey">{shiftTiming}</label> */}
            </div>
          </div>

          {/* {dataComponents} */}
        </div>
      ) : (
        <div
          style={{
            transform: animationProps.scale.to((scale) => `scale(${scale})`),
          }}
          className={`flex flex-col p-1 justify-between border-PRIMARY_NEUTRAL_COLOR border rounded-lg w-full bg-white shadow-custom-light `}
        >
          <div className="flex justify-between items-center px-3 pt-2 py-1">
            <div className="flex">
              <div className="flex flex-col justify-start items-start">
                <label className="text-xs font-bold">{numOfPositions}</label>
                <label className="text-xxs ">{facility}</label>
                <div className="flex py-1">
                  <OpenIndicator
                    isOpen={isAssigned}
                    size={iconSize}
                    className="mr-2"
                  />

                  {isIncentive ? (
                    <IncentiveIndicator size={iconSize} className="mr-2" />
                  ) : null}

                  {isGuarantee ? (
                    <GuaranteeIndicator size={iconSize} className="mr-2" />
                  ) : null}

                  {isLate ? (
                    <WatchIndicator size={iconSize} className="mr-2" />
                  ) : null}

                  {isCallOff ? (
                    <UserXIndicator size={iconSize} className="mr-2" />
                  ) : null}
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-end">
                <ColoredTag title={type} />
              </div>
              <label className="text-xxs text-grey">{shiftTiming}</label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShiftCard;
