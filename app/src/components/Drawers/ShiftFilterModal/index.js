import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DropDown from "../../DropDown";
import Input from "../../Input";
import themeStyles from "../../../styles/theme.styles";
import ScheduleButtons from "../../ScheduleButtons";
import Button from "../../Button";

function ShiftFilterModal({ open, onClose }) {
  const [role, setRole] = useState();
  const [status, setStatus] = useState();
  const [employeeName, setEmployeeName] = useState();


  const roles = [
    {
      value: "Role 1",
      label: "Role 1",
    },
    {
      value: "Role 2",
      label: "Role 2",
    },
  ];

  const statues = [
    {
      value: "Status 1",
      label: "Status 1",
    },
    {
      value: "Status 2",
      label: "Status 2",
    },
  ];

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
              <Input
                placeholder={"Employee"}
                value={employeeName}
                setValue={setEmployeeName}
              />
              <DropDown
                placeholder={"Role"}
                value={role}
                setValue={setRole}
                options={roles.map((item) => item.label)}
              />
              <DropDown
                placeholder={"Status"}
                value={status}
                setValue={setStatus}
                options={statues.map((item) => item.label)}
              />
            </div>

            <div className="flex flex-col mt-10 mb-10 w-full h-fit gap-3">
              <p
                style={{ fontSize: "18px", width: "100%", textAlign: "left" }}
                className="text-xl font-bold"
              >
                Shift Times
              </p>
              <ScheduleButtons
                active={false}
                label={"Morning Shifts 7:00AM - 3:00PM"}
              />
              <ScheduleButtons
                active={true}
                label={"Afternoon Shifts 3:00PM - 11:00PM"}
              />
              <ScheduleButtons
                active={false}
                label={"Night Shifts 11:00PM - 7:00AM"}
              />
            </div>

            <div className="flex flex-row mt-10 mb-10 w-full h-fit gap-3">
              <Button children={"APPLY"} />
              <Button color={"#C4C4C4"} children={"RESET"} />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default ShiftFilterModal;