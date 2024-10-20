import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Button from "../../Button";
import theme from "../../../styles/theme.styles";

import Input from "../../Input";
// import Button from "../../components/Button";

import InfoTitle from "../../Headers/InfoTitle";
import InfoData from "../../Headers/InfoData";

import Check from "../../Check";
import Process from "../../Process";
import CrossIcon from "../../../assets/icons/cross";

import { MainHover } from "../../../styles/animations";
import {
  ErrorToast,
  displayDate,
  displayDatetime,
  displayTime,
} from "../../../services/micro";
import { useAuth } from "../../../context";
import { ADMIN, EMPLOYEE } from "../../../constants/userTypes";
import TimecardReportModal from "../TimeCardFilterModal/TimecardReportModal";

function TimecardDetailsModal({
  open,
  onClose,
  selectedTimecard,
  processAndRefetch,
  unprocessAndRefetch,
  downloadPDF,
  modalContentRef,
  canProcessTimecard,
  selectedTimecardNotes,
  setSelectedTimecardNotes,
}) {
  // // console.log("🚀 ~ file: index.js:27 ~ selectedTimecard:", selectedTimecard);
  // const [selectedTimecardNotes, setSelectedTimecardNotes] = useState(null);

  const { isSuperAdmin, type } = useAuth();

  const [reportModalOpen, setReportModalOpen] = useState(false);
  return (
    <Drawer
      open={open}
      onClose={onClose}
      direction="right"
      overlayOpacity={0}
      style={{ bottom: "0", top: "initial", height: "94vh", width: "300px" }}
    >
      <div
        // id="timecard-modal-content"
        ref={modalContentRef}
        style={{
          right: selectedTimecard ? "0px" : "-600px",

          bottom: "0",
          top: "initial",

          // top: "auto",
          // bottom: 0,

          left: "auto",
          border: 0,
          borderRadius: 0,
          boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
          padding: 14,
          minHeight: "100%",
          // width: "300px",
          justifyContent: "space-between",
          backgroundColor: theme.PRIMARY_NEUTRAL_COLOR,
          borderTop: "4px solid", // This is the new line
          borderColor: theme.PRIMARY_LIGHT_COLOR,
        }}
      >
        {/* <div className="h-1 bg-PRIMARY_LIGHT_COLOR absolute top-0 " /> */}
        <div className="flex items-center justify-between">
          <label className="text-lg font-bold">Timecard</label>
          <div className={MainHover} onClick={onClose}>
            <CrossIcon size={7} />
          </div>
        </div>
        <div className="my-2" />
        <div className="flex rounded-xl bg-white  p-3 justify-between items-center">
          <InfoTitle text="Status" />
          <div className="flex items-center text-left">
            {selectedTimecard?.status === "Processed" ? (
              <>
                <Check value={true} color={theme.GREEN} />
                <div className="mx-1" />
                <div className="flex flex-col">
                  <label className="uppercase text-green text-xxs font-semibold">
                    {selectedTimecard?.status}
                  </label>
                  {type !== EMPLOYEE && (
                    <label className="text-xxxs">
                      {"on " + displayDatetime(selectedTimecard?.updatedAt)}
                    </label>
                  )}
                </div>
              </>
            ) : (
              <>
                <Process value={true} color={theme.SECONDARY_COLOR} />
                <div className="mx-1" />
                <div className="flex flex-col">
                  <label className="uppercase text-SECONDARY_COLOR text-xxs font-semibold">
                    {selectedTimecard?.status === "Process"
                      ? "UNPROCESSED"
                      : "PROCESSED"}
                  </label>
                  <label className="text-xxxs">{"--"}</label>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="my-2" />

        <div className="flex flex-col text-left flex-grow rounded-xl bg-white p-3 ">
          <InfoTitle text="Details" />

          <div className="my-2" />
          <div>
            <div className="flex flex-col">
              <label className="text-xxs">Worker</label>
              <InfoData
                text={
                  selectedTimecard?.people?.firstName +
                  " " +
                  selectedTimecard?.people?.lastName
                }
              />
            </div>

            <div className="my-3" />
            <div className="flex flex-row">
              <div className="flex flex-col w-3/5">
                <label className="text-xxs">Start Date</label>
                <InfoData text={displayDate(selectedTimecard?.clockInTime)} />
              </div>

              <div className="mx-2" />
              <div className="flex flex-col w-2/5">
                <label className="text-xxs">Start Time</label>
                <InfoData text={displayTime(selectedTimecard?.clockInTime)} />
              </div>
            </div>

            <div className="my-3" />
            <div className="flex flex-row">
              <div className="flex flex-col w-3/5">
                <label className="text-xxs">End Date</label>
                <InfoData text={displayDate(selectedTimecard?.clockOutTime)} />
              </div>

              <div className="mx-3" />
              <div className="flex flex-col w-2/5">
                <label className="text-xxs">End Time</label>
                <InfoData text={displayTime(selectedTimecard?.clockOutTime)} />
              </div>
            </div>

            <div className="my-3" />
            <div className="flex flex-col">
              <label className="text-xxs">Duration</label>
              <InfoData
                text={
                  selectedTimecard?.hours +
                  " Hours " +
                  selectedTimecard?.minutes +
                  " Minutes" +
                  (selectedTimecard?.isBreak ? " + 30 min break" : "")
                }
              />
            </div>

            <div className="my-3" />
            <div className="flex flex-col">
              {selectedTimecard?.status === "Processed" ? (
                <>
                  <label className="text-xxs">Manager Notes</label>
                  <InfoData text={selectedTimecard?.notes} />
                </>
              ) : (
                <>
                  {type === ADMIN && (
                    <Input
                      placeholder={"Add Notes"}
                      value={selectedTimecardNotes}
                      setValue={setSelectedTimecardNotes}
                      multiline
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* {selectedTimecard?.clockInTime} */}

        <div className="my-3" />

        {
          canProcessTimecard ? (
            <div className="flex">
              {selectedTimecard?.status === "Process" ? (
                <>
                  <Button
                    children={"PROCESS"}
                    onClick={() => {
                      processAndRefetch(
                        selectedTimecard,
                        selectedTimecardNotes
                      );
                      onClose();
                    }}
                  />

                  <div className="mx-1" />
                  <Button
                    children={"REPORT"}
                    color={theme.GRAY}
                    onClick={() => setReportModalOpen(true)}
                  />
                </>
              ) : (
                <>
                  <Button
                    children={"UNPROCESS"}
                    onClick={() => {
                      if (isSuperAdmin) {
                        unprocessAndRefetch(selectedTimecard);
                      } else {
                        ErrorToast("Only Super admin can unprocess a timecard");
                      }
                      onClose();
                    }}
                  />

                  <div className="mx-1" />
                  <Button
                    children={"REPORT"}
                    color={theme.GRAY}
                    onClick={() => setReportModalOpen(true)}
                  />
                </>
              )}
            </div>
          ) : null
          // <Button children={"REPORT"} color={theme.GRAY} />
        }
      </div>
      <TimecardReportModal
        open={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        timecardDetails={selectedTimecard}
      />
    </Drawer>
  );
}

export default TimecardDetailsModal;
