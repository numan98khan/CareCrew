import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DropDown from "../../DropDown";
import themeStyles from "../../../styles/theme.styles";
import Button from "../../Button";
import { PEOPLE_STATUS } from "../../../constants/status";
import { Roles } from "../../../constants/roles";

function PeopleFilterModal({
  open,
  onClose,
  filters,
  updateFilter,
  resetFilter,
}) {
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
              <DropDown
                placeholder={"Role"}
                value={filters["role"]}
                setValue={(val) => {
                  updateFilter("role", val);
                }}
                options={Roles}
              />
              <DropDown
                placeholder={"Status"}
                value={filters["status"]}
                setValue={(val) => {
                  updateFilter("status", val);
                }}
                options={PEOPLE_STATUS}
              />
              <DropDown
                placeholder={"Rating"}
                value={filters["rating"]}
                setValue={(val) => {
                  updateFilter("rating", val);
                }}
                options={[1, 2, 3, 4, 5]}
              />

              <DropDown
                placeholder={"Points"}
                value={filters["points"]}
                setValue={(val) => {
                  updateFilter("points", val);
                }}
                options={[0, 1, 2, 3, 4, 5]}
              />
              <DropDown
                placeholder={"Admin Hold"}
                value={filters["isAdminHold"]}
                setValue={(val) => {
                  updateFilter("isAdminHold", val);
                }}
                labels={["On Hold", "Active"]}
                options={[true, false]}
              />
              <DropDown
                placeholder={"Latest Activity"}
                value={filters["activity"]}
                setValue={(val) => {
                  updateFilter("activity", val);
                }}
                options={[1, 5, 10, 30, 60, 90, 180, 24 * 60, 7 * 24 * 60]}
                labels={[
                  "1 min",
                  "5 mins",
                  "10 mins",
                  "30 mins",
                  "1 hour",
                  "1.5 hours",
                  "3 hours",
                  "1 day",
                  "1 week",
                ]}
              />
            </div>

            <div className="flex flex-row mt-10 mb-10 w-full h-fit gap-3">
              <Button children={"APPLY"} />
              <Button
                color={"#C4C4C4"}
                children={"RESET"}
                onClick={resetFilter}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default PeopleFilterModal;
