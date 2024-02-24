import React from "react";
import ShiftCard from "../../../components/ShiftCard";

import PuffLoader from "react-spinners/PuffLoader";
import { displayDate, displayTime } from "../../../services/micro";
import themeStyles from "../../../styles/theme.styles";
import { useAuth } from "../../../context";
import { ADMIN, EMPLOYEE, FACILITY } from "../../../constants/userTypes";

const SingleWeekView = ({
  dates,
  groupedShifts,
  filteredShifts,
  facilities,
  filteredPeople,
  shifts,
  handleShiftSelection,
  selectedShifts,
  openModal,
  setSelectedFacility,
  setSelectedPerson,
  loading,
}) => {
  const { type } = useAuth();
  return (
    <div style={{ height: "90%", minHeight: "62vh", overflowY: "scroll" }}>
      <div className="flex justify-between text-xs py-1.5 bg-PRIMARY_NEUTRAL_COLOR">
        {dates.map((item, index) => (
          <div className="w-[14.2857143%] text-center">{item}</div>
        ))}
      </div>

      {/* {shifts.length === 0 ? ( */}
      {loading ? (
        <div className="h-40 w-full flex justify-center items-center">
          <PuffLoader
            color={themeStyles.PRIMARY_LIGHT_COLOR}
            loading={shifts.length === 0}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : shifts?.filter((obj) => obj?.__typename === "Shifts")?.length ===
        0 ? (
        <div className="text-PRIMARY_COLOR text-xl font-bold p-5">
          No shifts to display right now
        </div>
      ) : (
        <>
          <div style={{ overflowY: "auto", maxHeight: "62vh" }}>
            <div className="flex flex-wrap mb-3">
              {dates.map((date, dateIndex) => (
                <div key={dateIndex} className="w-[14.2857143%]">
                  {Object.entries(groupedShifts).map(
                    ([timing, timingShifts]) => {
                      // Filter shifts for the current date and timing
                      const filteredForDateAndTiming = timingShifts.filter(
                        (shift) => filteredShifts(date, shift)
                      );

                      return (
                        <React.Fragment key={timing}>
                          {/* Header for Timing (if there are shifts for this timing on this date) */}
                          {filteredForDateAndTiming.filter(
                            (obj) => !obj.hide || obj.__typename === "Timecard"
                          ).length > 0 &&
                            timing !== " - " && (
                              <div
                                className="text-xs text-white py-1.5"
                                style={{
                                  backgroundColor: themeStyles?.PRIMARY_COLOR,
                                }}
                              >
                                {timing}
                              </div>
                            )}
                          {/* Render Shifts for the Timing */}
                          {filteredForDateAndTiming.map((item, index) => {
                            // console.log(
                            //   "🚀 ~ file: SingleWeekView.js:80 ~ {filteredForDateAndTiming.map ~ item:",
                            //   item
                            // );
                            // console.log(item.shiftStart, item.shiftEnd);
                            const isTimecard = item.__typename === "Timecard";
                            const peopleObj = filteredPeople.find(
                              (people) => people.id === item.peopleID
                            );
                            const shiftFetched = isTimecard
                              ? shifts.find(
                                  (shift_) => shift_.id === item.shiftsID
                                )
                              : item;
                            const facilityObj = facilities?.find(
                              (facility) =>
                                facility.id ===
                                (isTimecard
                                  ? shiftFetched?.facilityID
                                  : item?.facilityID)
                            );

                            const rateTag = `$${shiftFetched?.rate}/hr${
                              shiftFetched?.isIncentive
                                ? " + $" +
                                  shiftFetched?.incentives?.incentiveAmount +
                                  " " +
                                  shiftFetched?.incentives?.incentiveType
                                : ""
                            }`;

                            const now = new Date();
                            const isMarkedLate =
                              new Date(shiftFetched?.shiftStartDT) < now &&
                              isTimecard &&
                              !item?.clockInTime;

                            return !item?.hide ? (
                              <div style={{ padding: 1 }} key={index}>
                                <ShiftCard
                                  disableCheck={
                                    type === EMPLOYEE
                                      ? true
                                      : type === FACILITY
                                      ? isTimecard
                                      : type === ADMIN && isTimecard
                                      ? !item?.isCallOff
                                      : false
                                  }
                                  rateTag={rateTag}
                                  isMarkedLate={isMarkedLate}
                                  shift={item}
                                  onSelectionChange={(isSelected) => {
                                    handleShiftSelection(item.id, isSelected);
                                  }}
                                  index={index}
                                  minimal
                                  numOfPositions={
                                    isTimecard
                                      ? `${peopleObj?.firstName} ${peopleObj?.lastName}`
                                      : `${item?.numOfPositions} Quantity`
                                  }
                                  facility={facilityObj?.facilityName}
                                  shiftTiming={`${item?.shiftStart} - ${item?.shiftEnd}`}
                                  type={
                                    isTimecard
                                      ? shiftFetched?.roleRequired
                                      : item?.roleRequired
                                  }
                                  isAssigned={
                                    isTimecard ? true : item.isAssigned
                                  }
                                  isIncentive={
                                    isTimecard
                                      ? shiftFetched?.isIncentive
                                      : item?.isIncentive
                                  }
                                  isGuarantee={
                                    isTimecard
                                      ? shiftFetched?.cancellationGuarantee
                                      : item?.cancellationGuarantee
                                  }
                                  // isGuarantee={item.isGuarantee}
                                  isLate={item?.isLate}
                                  isCallOff={item?.isCallOff}
                                  isSelected={selectedShifts?.includes(item.id)}
                                  // isSelected={item.isSelected}
                                  isComplete={item?.clockOutTime}
                                  onClick={() => {
                                    openModal(
                                      isTimecard ? shiftFetched : item,
                                      isTimecard ? item : null
                                    );
                                    setSelectedFacility(facilityObj);
                                    setSelectedPerson(peopleObj);
                                  }}
                                />
                              </div>
                            ) : null;
                          })}
                        </React.Fragment>
                      );
                    }
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleWeekView;
