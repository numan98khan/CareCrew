import React, { useEffect, useState, useMemo } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DropDown from "../../DropDown";
import Input from "../../Input";
import themeStyles from "../../../styles/theme.styles";
import ScheduleButtons from "../../ScheduleButtons";
import Button from "../../Button";
import { useListFacilities } from "../../../apolloql/facilities";
import { useListPeople } from "../../../apolloql/people";
import { Roles } from "../../../constants/roles";
import { statuses } from "../../../constants/status";
import { ADMIN, EMPLOYEE } from "../../../constants/userTypes";
import { useAuth } from "../../../context";

function ShiftFilterModal({
  open,
  onClose,

  shiftStatus,
  setShiftStatus,

  selectedFacilityId,
  setSelectedFacilityId,
  handleApplyFilter,
  handleResetFilter,
  employeeName,
  setEmployeeName,
  setSelectedRole,
  setSelectedDate,
  setSelectedShiftTimings,
  selectedRole,
  selectedDate,
  setShift,
  shift,
  people,
  //
  disableFacilities = false,
  disableStatus = false,
  disableDate = false,
}) {
  const { type } = useAuth();
  const [role, setRole] = useState();
  const [selectedFacility, setSelectedFacility] = useState();

  const { facilities } = useListFacilities();

  const facilitiesDropDownOption = useMemo(() => {
    if (facilities?.length) {
      return facilities.map((facility) => ({
        value: facility.id,
        label: facility?.facilityName,
      }));
    }
    return [];
  }, [facilities]);

  const rolesDropDownOption = useMemo(() => {
    if (Roles?.length > 0) {
      return Roles.map((role) => ({
        value: role,
        label: role,
      }));
    }
    return [];
  }, [Roles]);

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        direction="right"
        className="bla bla bla"
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
              {type !== EMPLOYEE && type === ADMIN && !disableFacilities ? (
                <DropDown
                  placeholder={"Facilities"}
                  value={selectedFacilityId}
                  setValue={setSelectedFacilityId}
                  labels={facilitiesDropDownOption.map((item) => item.label)}
                  options={facilitiesDropDownOption.map((item) => item.value)}
                  // setIdValue={setSelectedFacilityId}
                />
              ) : null}
              {type !== EMPLOYEE && (
                <DropDown
                  placeholder={"Employee"}
                  value={employeeName}
                  setValue={setEmployeeName}
                  labels={people.map(
                    (item) => item.firstName + " " + item.lastName
                  )}
                  options={people.map((item) => item.id)}
                  // setIdValue={setSelectedFacilityId}
                />
              )}
              <DropDown
                placeholder={"Role"}
                value={selectedRole}
                setValue={setSelectedRole}
                options={rolesDropDownOption?.map((item) => item.value)}
              />

              {!disableStatus ? (
                <DropDown
                  placeholder={"Shift Status"}
                  value={shiftStatus}
                  setValue={setShiftStatus}
                  options={
                    type !== EMPLOYEE
                      ? [
                          "Open",
                          "Assigned",
                          "Incentive",
                          "Guarantee",
                          "Late",
                          "Call-Off",
                        ]
                      : [
                          "Assigned",
                          "Incentive",
                          "Guarantee",
                          "Late",
                          "Call-Off",
                        ]
                  }
                />
              ) : null}

              {/* {!disableDate ? (
                <Input
                  placeholder={"Date"}
                  type="date"
                  value={selectedDate}
                  setValue={setSelectedDate}
                />
              ) : null} */}
            </div>

            <div className="flex flex-col mt-10 mb-10 w-full h-fit gap-3">
              <p
                style={{ fontSize: "18px", width: "100%", textAlign: "left" }}
                className="text-xl font-bold"
              >
                Shift Times
              </p>
              <ScheduleButtons
                active={shift === 1 ? true : false}
                label={"Morning Shifts 7:00AM - 3:00PM"}
                value={"07:00:00.000Z-15:00:00.000Z"}
                id={1}
                setShift={setShift}
                setSelectedShiftTimings={setSelectedShiftTimings}
              />
              <ScheduleButtons
                active={shift === 2 ? true : false}
                label={"Afternoon Shifts 3:00PM - 11:00PM"}
                value={"15:00:00.000Z-23:00:00.000Z"}
                setSelectedShiftTimings={setSelectedShiftTimings}
                id={2}
                setShift={setShift}
              />
              <ScheduleButtons
                active={shift === 3 ? true : false}
                label={"Night Shifts 11:00PM - 7:00AM"}
                value={"23:00:00.000Z-07:00:00.000Z"}
                setSelectedShiftTimings={setSelectedShiftTimings}
                id={3}
                setShift={setShift}
              />
            </div>

            <div className="flex flex-row mt-10 mb-10 w-full h-fit gap-3">
              <Button onClick={handleApplyFilter} children={"APPLY"} />
              <Button
                onClick={handleResetFilter}
                color={"#C4C4C4"}
                children={"RESET"}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default ShiftFilterModal;
