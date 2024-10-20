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
    <div
      style={{ height: "90%", minHeight: "62vh", overflowY: "scroll" }}
      className="mt-4"
    >
      {/* Date Header and Shift Layout */}
      <div className="flex flex-col md:flex-row justify-between text-xs py-1.5 bg-PRIMARY_NEUTRAL_COLOR">
        {dates.map((date, dateIndex) => (
          <div
            key={dateIndex}
            className="w-full md:w-[14.2857143%] text-center mb-2 md:mb-0"
          >
            <div>{date}</div>

            {/* Grouping shifts under the respective date */}
            {Object.entries(groupedShifts).map(([timing, timingShifts]) => {
              const filteredForDateAndTiming = timingShifts.filter((shift) =>
                filteredShifts(date, shift)
              );

              return (
                <React.Fragment key={timing}>
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
                  {filteredForDateAndTiming.map((item, index) => {
                    const isTimecard = item.__typename === "Timecard";
                    const peopleObj = filteredPeople.find(
                      (people) => people.id === item.peopleID
                    );
                    const shiftFetched = isTimecard
                      ? shifts.find((shift_) => shift_.id === item.shiftsID)
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
                      <div key={index} className="p-[1px]">
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
                          isAssigned={isTimecard ? true : item.isAssigned}
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
                          isLate={item?.isLate}
                          isCallOff={item?.isCallOff}
                          isSelected={selectedShifts?.includes(item.id)}
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
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleWeekView;
