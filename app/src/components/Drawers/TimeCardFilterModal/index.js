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
import { ADMIN, EMPLOYEE, FACILITY } from "../../../constants/userTypes";
import { useAuth } from "../../../context";

import DatePickerCustom from "../../../components/DatePicker";
import TimecardReportModal from "./TimecardReportModal";
function TimeCardFilterModal({
  open,
  onClose,
  filters,
  updateFilter,
  resetFilter,
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
              {type === ADMIN ? (
                <DropDown
                  placeholder={"Payroll Cycle"}
                  value={filters?.payrollCycle}
                  setValue={(val) => {
                    updateFilter("payrollCycle", val);
                  }}
                  options={["Daily", "Weekly"]}
                />
              ) : null}

              {type !== FACILITY ? (
                <DropDown
                  placeholder={"Facilities"}
                  value={filters?.facility}
                  setValue={(val) => {
                    updateFilter("facility", val);
                  }}
                  options={facilities?.map((item) => item.id)}
                  labels={facilities?.map((item) => item.facilityName)}
                />
              ) : null}
              {type !== EMPLOYEE ? (
                <DropDown
                  placeholder={"Employee"}
                  value={filters?.employee}
                  setValue={(val) => {
                    updateFilter("employee", val);
                  }}
                  options={people?.map((item) => item.id)}
                  labels={people?.map(
                    (item) => item.firstName + " " + item.lastName
                  )}
                />
              ) : null}

              {/* <Cus */}
              <DatePickerCustom
                date={filters?.date}
                onChange={(val) => {
                  updateFilter("date", val);
                }}
                // onChange={(date) => setStartDate(date)}
              />

              {type !== EMPLOYEE ? (
                <DropDown
                  placeholder={"Role"}
                  value={filters?.role}
                  setValue={(val) => {
                    updateFilter("role", val);
                  }}
                  options={Roles}
                />
              ) : null}
              <DropDown
                placeholder={"Status"}
                value={filters?.status}
                setValue={(val) => {
                  updateFilter("status", val);
                }}
                labels={["Unprocessed", "Processed"]}
                options={["Process", "Processed"]}
              />
            </div>

            <div className="flex flex-row mt-10 mb-10 w-full h-fit gap-3">
              <Button children={"APPLY"} onClick={onClose} />
              <Button
                color={"#C4C4C4"}
                onClick={resetFilter}
                children={"RESET"}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default TimeCardFilterModal;
