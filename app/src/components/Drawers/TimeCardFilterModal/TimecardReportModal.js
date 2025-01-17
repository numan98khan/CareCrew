import React, { useState, useEffect, useMemo } from "react";
import Modal from "react-modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DatePickerCustom from "../../../components/DatePicker";
import TimePickerCustom from "../../TimePicker";

import { useListPeople } from "../../../apolloql/people";
import { useCreateReminder } from "../../../apolloql/reminders";
import { useCreateNotification } from "../../../apolloql/notifications";

import PageHeader from "../../../components/Headers/PageHeader";

import {
  ErrorToast,
  SuccessToast,
  displayDatetime,
} from "../../../services/micro";

import {
  ADMIN,
  EMPLOYEE,
  FACILITY,
  peopleTypes,
} from "../../../constants/userTypes";
import { REMINDER } from "../../../constants/reminderTypes";

import DropDown from "../../DropDown";
import { useListFacilities } from "../../../apolloql/facilities";
import { createRemindersPeople } from "../../../graphql/mutations";
import { useAuth } from "../../../context";
import { useCreateSupport } from "../../../apolloql/support";
import { useListReasons } from "../../../apolloql/reasons";
import { emailTimecardReportToInstacare } from "../../../services/timecards/reporting";
// import { createNotifications } from "../../../graphql/mutations";

function TimecardReportModal({ open, onClose, timecardDetails }) {
  // const navigate = useNavigate();
  const { personalData, type, myFacility } = useAuth();

  const { loading, error, reasons } = useListReasons("TIMECARD");

  const [reaason, setReason] = useState(null);

  const [support, setSupport] = useState({
    details: "",
    reasonID: "",
  });

  // Update a single key in the people object
  const setSupportKey = (key) => (newValue) =>
    setSupport((prevSupport) => ({ ...prevSupport, [key]: newValue }));

  useEffect(() => {
    setSupportKey("details")(
      `Help ${
        personalData?.firstName + " " + personalData?.lastName
      } with timecard: ${timecardDetails?.facility?.facilityName} ${
        timecardDetails?.people?.firstName +
        " " +
        timecardDetails?.people?.lastName
      } ${displayDatetime(timecardDetails?.clockInTime)} - ${displayDatetime(
        timecardDetails?.clockOutTime
      )} ${timecardDetails?.hours} hours ${timecardDetails?.minutes} min shift.`
    );
  }, [support?.reasonID, timecardDetails]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      // marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      border: "1px solid white",
      backgroundColor: "white",
      width: "30vw",
      // paddingLeft: "30px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const { createTicket } = useCreateSupport();

  const isValidForm = () => {
    // For authenticated users
    if (!support.details.trim() || !support.reasonID) {
      ErrorToast("Please fill in all required fields");
      return false;
    }

    return true;
  };

  const publishReport = async () => {
    if (!isValidForm()) {
      return;
    }

    try {
      await createTicket(
        support,
        personalData?.firstName + " " + personalData?.lastName,
        type === ADMIN
          ? "CareCrew"
          : type === FACILITY
          ? myFacility?.facilityName
          : type === EMPLOYEE
          ? personalData?.firstName + " " + personalData?.lastName
          : null
      );
      SuccessToast("Support ticket created");

      await emailTimecardReportToInstacare(
        reasons.find((obj) => obj.id === support?.reasonID)?.reason,
        support?.details
      );

      // Reset
      setSupport({
        details: "",
        reasonID: "",
      });

      onClose();
    } catch (error) {
      console.error(error);
      ErrorToast(
        "An error occurred while creating/updating the support ticket"
      );
    }
  };

  return (
    // <div>
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div
        // className="w-full h-full flex flex-col gap-6 items-center justify-center"
        className="w-full h-full flex flex-col items-center justify-center"
      >
        <div className="flex w-full flex-col">
          <div className="flex py-1 justify-between">
            <div className="flex items-center">
              <PageHeader text={"Post a Support Ticket"} />
            </div>
          </div>

          <div className="h-full bg-white w-full rounded-lg item-start justify-between">
            <div className="flex flex-col p-2 space-y-4 h-full justify-between">
              {/* First Row */}
              <div className="">
                <div className="flex flex-col">
                  <label className="text-xs text-start font-bold">
                    {"Reason"}
                  </label>
                  <div className="my-1" />
                  <DropDown
                    placeholder={"Select Reason"}
                    value={support?.reasonID}
                    setValue={setSupportKey("reasonID")}
                    options={reasons.map((obj) => obj.id)}
                    labels={reasons.map((obj) => obj.reason)}
                    label={
                      reasons.find((obj) => obj.id === support?.reasonID)
                        ?.reason
                    }
                  />
                </div>
              </div>
              {/* Second Row */}
              <div className="">
                <div className="flex flex-col">
                  <label className="text-xs text-start font-bold">Notes</label>

                  <div className="my-1" />
                  <Input
                    multiline
                    placeholder={"Notes"}
                    value={support.details}
                    setValue={setSupportKey("details")}
                  />
                  {/* <textarea className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2"></textarea> */}
                </div>
              </div>
              {/* Third Row */}
              <div className="">
                <div className="flex flex-col">
                  <Button
                    children={"SUBMIT"}
                    onClick={() => {
                      publishReport();
                    }}
                  />
                  {/* <textarea className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2"></textarea> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    // </div>
  );
}

export default TimecardReportModal;
