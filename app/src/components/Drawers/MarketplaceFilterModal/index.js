import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DropDown from "../../DropDown";
import Input from "../../Input";
import themeStyles from "../../../styles/theme.styles";
import ScheduleButtons from "../../ScheduleButtons";
import Button from "../../Button";
import { Roles } from "../../../constants/roles";
import { useListFacilities } from "../../../apolloql/facilities";
import { useListPeople } from "../../../apolloql/people";
import { EMPLOYEE } from "../../../constants/userTypes";
import { useAuth } from "../../../context";

import DatePickerCustom from "../../../components/DatePicker";
function MarketplaceFilterModal({
  open,
  onClose,
  filters,
  updateFilter,
  resetFilter,
  // shift,
  distance,
  setDistance,
}) {
  const { type } = useAuth();

  const { facilities } = useListFacilities();
  const { people } = useListPeople({ type: EMPLOYEE });

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        direction="right"
        overlayOpacity={0}
        style={{ bottom: "0", top: "initial", height: "94vh", width: "350px" }}
      >
        <div className=" flex h-full w-full relative justify-center items-center">
          <div
            style={{ backgroundColor: themeStyles.PRIMARY_LIGHT_COLOR }}
            className="absolute w-full h-1 top-0"
          />

          <div style={{ height: "95%", width: "87%" }}>
            <div className="flex row-auto justify-between items-center">
              <p style={{ fontSize: "24px" }} className="text-xl font-bold">
                Apply Filters
              </p>
            </div>

            <div className="flex flex-col mt-10 mb-10 w-full h-fit gap-3">
              <DropDown
                placeholder={"Facilities"}
                value={filters?.facility}
                setValue={(val) => {
                  updateFilter("facility", val);
                }}
                options={facilities?.map((item) => item.id)}
                labels={facilities?.map((item) => item.facilityName)}
              />

              {/* <Cus */}
              <DatePickerCustom
                date={filters?.date}
                onChange={(val) => {
                  updateFilter("date", val);
                }}
                // onChange={(date) => setStartDate(date)}
              />

              {/* <DropDown
                placeholder={"Status"}
                value={filters?.status}
                setValue={(val) => {
                  updateFilter("status", val);
                }}
                options={["Process", "Processed"]}
              /> */}
            </div>

            <div className="flex flex-col mt-10 mb-10 w-full h-fit gap-3">
              <div>
                <p
                  style={{ fontSize: "18px", width: "100%", textAlign: "left" }}
                  className="text-xl font-bold"
                >
                  Distance
                </p>
                <p className="text-xs text-gray-500 text-left w-full">
                  Shows shifts within a certain distance
                </p>
              </div>

              <div className="flex flex-col">
                <input
                  type="range"
                  id="distanceRange"
                  name="distanceRange"
                  min="1"
                  max="100"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  style={{
                    appearance: "none",
                    height: "5px",
                    background: themeStyles?.PRIMARY_COLOR,
                    outline: "none",
                    opacity: "0.7",
                    transition: "opacity 0.2s",
                  }}
                />
                <label
                  htmlFor="distanceRange"
                  className="w-full text-right text-xs text-PRIMARY_COLOR py-2"
                >
                  {distance} miles
                </label>
              </div>
            </div>

            <div className="flex flex-col mt-10 mb-10 w-full h-fit gap-3">
              <p
                style={{ fontSize: "18px", width: "100%", textAlign: "left" }}
                className="text-xl font-bold"
              >
                Shift Times
              </p>
              <ScheduleButtons
                active={filters?.shift === 1 ? true : false}
                label={"Morning Shifts 7:00AM - 3:00PM"}
                value={"07:00:00.000Z-15:00:00.000Z"}
                id={1}
                setShift={(val) => updateFilter("shift", val)}
                setSelectedShiftTimings={(val) =>
                  updateFilter("shiftTimings", val)
                }
              />
              <ScheduleButtons
                active={filters?.shift === 2 ? true : false}
                label={"Afternoon Shifts 3:00PM - 11:00PM"}
                value={"15:00:00.000Z-23:00:00.000Z"}
                id={2}
                setShift={(val) => updateFilter("shift", val)}
                setSelectedShiftTimings={(val) =>
                  updateFilter("shiftTimings", val)
                }
              />
              <ScheduleButtons
                // active={shift === 3 ? true : false}
                active={filters?.shift === 3 ? true : false}
                label={"Night Shifts 11:00PM - 7:00AM"}
                value={"23:00:00.000Z-07:00:00.000Z"}
                id={3}
                setShift={(val) => updateFilter("shift", val)}
                setSelectedShiftTimings={(val) =>
                  updateFilter("shiftTimings", val)
                }
              />
            </div>

            <div className="flex flex-row mt-10 mb-10 w-full h-fit gap-3">
              <Button children={"APPLY"} onClick={onClose} />
              <Button
                color={"#C4C4C4"}
                onClick={() => {
                  resetFilter();
                  // onClose();
                }}
                children={"RESET"}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default MarketplaceFilterModal;
