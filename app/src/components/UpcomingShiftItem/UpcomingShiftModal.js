import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { displayDate, displayTime } from "../../services/micro";

import IncentiveIndicator from "../../assets/icons/indicators/incentive";
import GuaranteeIndicator from "../../assets/icons/indicators/guarantee";
import LateIcon from "../../assets/icons/lateIcon";
import themeStyles from "../../styles/theme.styles";
import CallOff from "../../assets/icons/callOf";
import Button from "../Button";
// import GaraunteeIcon from "../../assets/icons/garaunteeIcon";

import moment from "moment";
import TimePickerCustom from "../TimePicker";
import InputField from "../Input";
import DropDown from "../DropDown";
import { useListReasons } from "../../apolloql/reasons";
import { useCreateSupport } from "../../apolloql/support";

import { ErrorToast, SuccessToast } from "../../services/micro";
import { useUpdateTimecard } from "../../apolloql/timecards";

import { API, Storage, graphqlOperation } from "aws-amplify";
import {
  CLOCK_OUT_ALERT,
  EMPLOYEE_LATE,
} from "../../constants/notificationTypes";
import { useAuth } from "../../context";
import { useCreateNotification } from "../../apolloql/notifications";
import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";
import { ScaleHover } from "../../styles/animations";
import { useNavigate } from "react-router-dom";
import { getFacility } from "../../graphql/queries";
import {
  externalNotificationToInstacare,
  externalNotificationToPeople,
  inAppNotificationsToFacilityPeople,
  inAppNotificationsToPeople,
  inApplNotificationToInstacare,
  sendNotificationsToFacilityPeople,
} from "../../services/timecards/reporting";
import { useUpdateShift } from "../../apolloql/schedules";

//... import your icons and other components here...

const UpcomingShiftModal = ({
  modalIsOpen,
  closeModal,
  openEditModal,
  buttonRef,
  upcomingShiftDetails,
  disableActions = false,

  // clockInFunction,
  // cancelShiftFunction,
  // ... any other props you may need ...
}) => {
  // console.log(
  //   "🚀 ~ file: UpcomingShiftModal.js:38 ~ upcomingShiftDetails:",
  //   upcomingShiftDetails
  // );

  const { personalData, myFacility, type, user } = useAuth();
  const { createNotificationQwuery } = useCreateNotification();

  const { reasons } = useListReasons();
  const { createTicket } = useCreateSupport();
  const { updateTimecardQuery } = useUpdateTimecard();

  const { createNotificationQuery } = useCreateNotification();

  const { updateShiftQuery } = useUpdateShift();

  // const [clockInTime, setClockInTime] = useState(null);

  const [support, setSupport] = useState({
    details: "",
    reasonID: "",
  });

  const getShifts = /* GraphQL */ `
    query GetShifts($id: ID!) {
      getShifts(id: $id) {
        id
        numOfPositions
        _version
        _deleted
      }
    }
  `;

  const setSupportKey = (key) => (newValue) =>
    setSupport((prevSupport) => ({ ...prevSupport, [key]: newValue }));

  const publishSupport = async () => {
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
    } catch (error) {
      console.error(error);
      ErrorToast(
        "An error occurred while creating/updating the support ticket"
      );
    }
  };

  const [imgUrl, setImgUrl] = useState(null);
  useEffect(() => {
    const getImage = async () => {
      const imgSrc = upcomingShiftDetails?.facility?.imgSrc;
      // Check local storage first
      const cachedImage = localStorage.getItem(`image-${imgSrc}`);

      if (cachedImage) {
        setImgUrl(cachedImage);
        return;
      }

      // If not in cache, fetch from storage
      const image = await Storage.get(imgSrc);

      // Save to local storage for future use
      localStorage.setItem(`image-${imgSrc}`, image);

      setImgUrl(image);
    };

    getImage();
  }, [upcomingShiftDetails?.facility?.imgSrc]); // I assume you might want to refetch when imgSrc changes

  const clockInFunction = async () => {
    console.log("🚀clockInFunction ~ clockInFunction:");

    const inProgress = upcomingShiftDetails?.clockInTime ? true : false;
    // Assuming you have the date from the upcomingShiftDetails
    const clockInDate = upcomingShiftDetails?.shift?.date;

    console.log(
      "🚀 ~ file: UpcomingShiftModal.js:98 ~ clockInFunction ~ upcomingShiftDetails:",
      upcomingShiftDetails
    );

    // Combine AWSDate and AWSTime to form AWSDatetime
    // const clockInDatetime = `${clockInDate}T${clockInTime}`;

    const clockInDatetime = new Date().toISOString(); //`${clockInDate}T${clockInTime}`;
    const clockInTime = clockInDatetime.split("T")[1];

    // clockInTime;
    console.log(
      "🚀 ~ file: UpcomingShiftModal.js:65 ~ clockInFunction ~ clockInTime:",
      clockInDatetime,
      clockInTime
    );

    // return 0;
    try {
      const updatedTimecard = {
        id: upcomingShiftDetails.id,
        clockInTime: inProgress
          ? upcomingShiftDetails?.clockInTime
          : clockInDatetime,
        clockOutTime: inProgress ? clockInDatetime : null,
        _version: upcomingShiftDetails._version,
      };
      // console.log(
      //   "🚀 ~ file: UpcomingShiftModal.js:113 ~ clockInFunction ~ updatedTimecard:",
      //   updatedTimecard
      // );
      const response = await updateTimecardQuery(updatedTimecard);
      // console.log(
      //   "🚀 ~ file: UpcomingShiftModal.js:112 ~ clockInFunction ~ response:",
      //   response
      // );

      if (inProgress) {
        const notificationInput = {
          peopleID: personalData?.id,
          type: CLOCK_OUT_ALERT,
          subject: `Shift Clock-Out Alert`,
          body: `You clocked-out on ${clockInDatetime} for shift at ${upcomingShiftDetails?.facility?.facilityName}`,
          // receivers: newsInput?.receivers === "ALL" ? null : newsInput?.receivers,
        };
        const receiverPeople = [];
        // await createNotificationQuery(notificationInput, receiverPeople);
      }

      SuccessToast("Shift Clocked-In");
    } catch (error) {
      console.error(error);
      ErrorToast("An error occurred while updating the timecard");
    }

    setIsClockInPressed(false);
    closeModal();
  };

  const cancelShiftFunction = async (cancelReason) => {
    try {
      // if (cancelReason !== "Facility Cancellation") {
      //   const shiftData = (
      //     await API.graphql(
      //       graphqlOperation(getShifts, { id: upcomingShiftDetails?.shift?.id })
      //     )
      //   )?.data?.getShifts;
      //   if (!shiftData) throw new Error("Failed to get shift data.");

      //   await updateShiftQuery({
      //     id: shiftData?.id,
      //     numOfPositions: (parseInt(shiftData?.numOfPositions) + 1).toString(),
      //     _version: shiftData?._version,
      //   });
      // }

      const updatedTimecard = {
        id: upcomingShiftDetails.id,
        isCallOff: true,
        lateReason: cancelReason,
        _version: upcomingShiftDetails._version,
      };
      await updateTimecardQuery(updatedTimecard);
      SuccessToast("Shift Cancelled");
    } catch (error) {
      console.error(error);
      ErrorToast("An error occurred while cancelling shift");
    }
  };

  // const shiftStartDateTime = moment.utc(
  //   `${upcomingShiftDetails?.shift?.date}T${upcomingShiftDetails?.shift?.shiftStart}`
  // );

  const shiftStartDateTime = moment(
    `${upcomingShiftDetails?.shift?.shiftStartDT}`
  );
  const now = moment.now();

  const totalMinutesBeforeShiftStarts = shiftStartDateTime.diff(now, "minutes");
  const hoursBeforeShiftStarts = Math.floor(totalMinutesBeforeShiftStarts / 60);
  const minutesBeforeShiftStarts = totalMinutesBeforeShiftStarts % 60;

  const activity =
    hoursBeforeShiftStarts >= 0 && minutesBeforeShiftStarts >= 0
      ? "Starting in " +
        (hoursBeforeShiftStarts !== 0
          ? hoursBeforeShiftStarts + " hours and "
          : "") +
        minutesBeforeShiftStarts +
        " mins"
      : "Late by " +
        (hoursBeforeShiftStarts !== 0
          ? hoursBeforeShiftStarts + " hours and "
          : "") +
        Math.abs(minutesBeforeShiftStarts) +
        " mins";

  const [isClockInPressed, setIsClockInPressed] = useState(false);
  const [isCancelShiftPressed, setIsCancelShiftPressed] = useState(false);
  const [isArriveLatePressed, setIsArriveLatePressed] = useState(false);
  const [isReportPressed, setIsReportPressed] = useState(false);

  const iconSize = 7;

  const ClockInModal = ({ closeModal }) => {
    // console.log(
    //   "🚀 ~ file: UpcomingShiftModal.js:131 ~ closeModal:",
    //   closeModal
    // );
    const inProgress = upcomingShiftDetails?.clockInTime ? true : false;
    return (
      <>
        <div className="flex flex-col relative w-full justify-center items-center p-2">
          <div
            onClick={openEditModal}
            ref={buttonRef}
            className="absolute top-2 right-2 cursor-pointer"
          >
            {/* <KebabMenuWhite /> */}
          </div>
          <label className="text-PRIMARY_COLOR text-xxs font-bold p-2">
            {"SHIFT INFORMATION"}
          </label>

          <label className="text-black text-xl font-semibold">
            {"Confirmation"}
          </label>
          <label className="text-black text-xxs p-2">
            {`Do you really want to clock ${inProgress ? "out" : "in"}?`}
          </label>

          {/* <div className="flex flex-row w-full m-2">
            <TimePickerCustom time={clockInTime} onChange={setClockInTime} />
          </div> */}

          <div className="flex flex-row w-full space-x-1">
            <Button children={"Yes"} onClick={clockInFunction} />
            <Button
              children={"No"}
              onClick={closeModal}
              color={themeStyles.GRAY}
            />
          </div>
        </div>
      </>
    );
  };

  const CancelShiftModal = ({ closeModal }) => {
    // console.log("🚀 ~ file: UpcomingShiftModal.js:217 ~ closeModal:", closeModal)
    const [cancelReason, setCancelReason] = useState(null);
    return (
      <>
        <div className="flex flex-col relative w-full justify-center items-center p-2">
          <div
            onClick={openEditModal}
            ref={buttonRef}
            className="absolute top-2 right-2 cursor-pointer"
          >
            {/* <KebabMenuWhite /> */}
          </div>
          <label className="text-PRIMARY_COLOR text-xxs font-semibold p-2">
            {"SHIFT INFORMATION"}
          </label>

          <label
            className=" text-xl font-bold"
            style={{ color: themeStyles.RED }}
          >
            {"Confirmation"}
          </label>
          <label className="text-black text-xxs p-2">
            {"Do you really want to cancel your shift?"}
          </label>

          <div className="flex flex-row w-full m-2">
            <InputField
              placeholder={"Enter reason"}
              multiline
              value={cancelReason}
              setValue={setCancelReason}
            />
          </div>

          <div className="flex flex-row w-full space-x-1">
            <Button
              children={"Cancel"}
              onClick={() => cancelShiftFunction(cancelReason)}
              color={themeStyles.RED}
            />
            <Button
              children={"Go Back"}
              onClick={closeModal}
              color={themeStyles.PRIMARY_LIGHT_COLOR}
            />
          </div>
        </div>
        {/* <button onClick={closeModal}>Close Modal</button> */}
      </>
    );
  };

  const ArriveLateModal = ({ closeModal }) => {
    // console.log(
    //   "🚀 ~ file: UpcomingShiftModal.js:265 ~ closeModal:",
    //   closeModal
    // );
    const arriveLateFunction = async () => {
      // Assuming lateBy is a string like "90 mins"
      const lateByMinutes = parseInt(lateBy.split(" ")[0]); // Extracts the number of minutes from the string

      // Parsing the shift start time
      const shiftStartDT = new Date(upcomingShiftDetails?.shift?.shiftStartDT);

      // Adding the late minutes to the shift start time
      const updatedTOA = displayTime(
        new Date(shiftStartDT.getTime() + lateByMinutes * 60 * 1000)
      );
      try {
        const updatedTimecard = {
          id: upcomingShiftDetails.id,
          isLate: true,
          lateReason: `${lateReason} - (${lateBy})`,
          _version: upcomingShiftDetails._version,
        };
        await updateTimecardQuery(updatedTimecard);
        SuccessToast("Shift Arrived Late");

        let formedMessage = `Subject: Employee Delay Notice\n\nThe following employee is running late for the following shift:\n\nShift Date: ${displayDate(
          upcomingShiftDetails?.shift?.shiftStartDT
        )}\nShift Time: ${
          displayTime(upcomingShiftDetails?.shift?.shiftStartDT) +
          " - " +
          displayTime(upcomingShiftDetails?.shift?.shiftEndDT)
        }\nEmployee: ${
          upcomingShiftDetails?.person?.firstName +
          " " +
          upcomingShiftDetails?.person?.lastName
        }\nUpdated TOA: ${updatedTOA}\n\nTimestamp: ${
          displayDate(new Date()?.toISOString()) +
          " " +
          displayTime(new Date()?.toISOString())
        }\nBy User: ${user?.attributes?.email}`;

        // // INTERNAL
        inAppNotificationsToPeople(
          upcomingShiftDetails?.person?.id,
          EMPLOYEE_LATE,
          "Employee is running late",
          formedMessage,
          createNotificationQuery
        );
        inApplNotificationToInstacare(
          EMPLOYEE_LATE,
          "Employee is running late",
          formedMessage,
          createNotificationQuery
        );
        inAppNotificationsToFacilityPeople(
          upcomingShiftDetails?.facility?.id,
          EMPLOYEE_LATE,
          "Employee is running late",
          formedMessage,
          createNotificationQuery
        );

        // // // EXTERNAL
        externalNotificationToInstacare(formedMessage, true, false); // CareCrew
        sendNotificationsToFacilityPeople(
          upcomingShiftDetails?.facility?.id,
          formedMessage,
          true,
          true
        ); // Facility
        externalNotificationToPeople(
          upcomingShiftDetails?.person?.id,
          formedMessage,
          false,
          false
        ); // Employee
      } catch (error) {
        console.error(error);
        ErrorToast("An error occurred while arrving late shift");
      }
    };

    const [lateBy, setLateBy] = useState(null);
    const [lateReason, setLateReason] = useState(null);
    return (
      <>
        <div className="flex flex-col relative w-full justify-center items-center p-2">
          <div
            onClick={openEditModal}
            ref={buttonRef}
            className="absolute top-2 right-2 cursor-pointer"
          >
            {/* <KebabMenuWhite /> */}
          </div>
          <label className="text-PRIMARY_COLOR text-xxs font-semibold p-2">
            {"SHIFT INFORMATION"}
          </label>

          <label
            className=" text-xl font-bold"
            style={{ color: themeStyles.RED }}
          >
            {"Why Late?"}
          </label>
          <label className="text-black text-xxs p-2">
            {"Do you really want to cancel your shift?"}
          </label>

          <div className="flex flex-col w-full m-2 space-y-2">
            <DropDown
              placeholder={"An estimate time of how long?"}
              value={lateBy}
              setValue={setLateBy}
              options={["5 mins", "10 mins", "30 mins", "60 mins", "120 mins"]}
            />
            <InputField
              placeholder={"Provide reason for being late"}
              multiline
              value={lateReason}
              setValue={setLateReason}
            />
          </div>

          <div className="flex flex-row w-full space-x-1">
            <Button
              children={"Submit"}
              onClick={arriveLateFunction}
              color={themeStyles.RED}
            />
            <Button
              children={"Go Back"}
              onClick={closeModal}
              color={themeStyles.PRIMARY_LIGHT_COLOR}
            />
          </div>
        </div>
        {/* <button onClick={closeModal}>Close Modal</button> */}
      </>
    );
  };

  const ReportModal = ({ closeModal }) => (
    <>
      <div className="flex flex-col relative w-full justify-center items-center p-2">
        <div
          onClick={openEditModal}
          ref={buttonRef}
          className="absolute top-2 right-2 cursor-pointer"
        >
          {/* <KebabMenuWhite /> */}
        </div>
        <label className="text-PRIMARY_COLOR text-xxs font-semibold p-2">
          {"SHIFT INFORMATION"}
        </label>

        <label
          className="text-black text-xl font-bold"
          // style={{ color: themeStyles.RED }}
        >
          {"Confirmation"}
        </label>
        <label className="text-black text-xxs p-2">
          {"What is your reason?"}
        </label>

        <div className="flex flex-col w-full m-2 space-y-2">
          <DropDown
            placeholder={"Select reason"}
            // options={["5 mins", "10 mins", "30 mins", "60 mins", "120 mins"]}
            value={support?.reasonID}
            setValue={setSupportKey("reasonID")}
            options={reasons.map((obj) => obj.id)}
            labels={reasons.map((obj) => obj.reason)}
            label={reasons.find((obj) => obj.id === support?.reasonID)?.reason}
          />
          <InputField
            placeholder={"Provide reason for being late"}
            multiline
            value={support.details}
            setValue={setSupportKey("details")}
          />
        </div>

        <div className="flex flex-row w-full space-x-1">
          <Button
            children={"Submit"}
            onClick={() => {
              publishSupport();
            }}
            color={themeStyles.RED}
          />
          <Button
            children={"Go Back"}
            onClick={closeModal}
            color={themeStyles.PRIMARY_LIGHT_COLOR}
          />
        </div>
      </div>
      {/* <button onClick={closeModal}>Close Modal</button> */}
    </>
  );

  const navigate = useNavigate();

  const isCompletedShift =
    upcomingShiftDetails?.clockInTime !== null &&
    upcomingShiftDetails?.clockOutTime !== null;
  const isInProgress = upcomingShiftDetails?.clockInTime !== null;
  // console.log(
  //   "🚀 ~ file: UpcomingShiftModal.js:452 ~ isCompletedShift:",
  //   isCompletedShift
  // );

  const getFacilityRepMessage = async () => {
    const getFacilityPeople = /* GraphQL */ `
      query GetFacility($id: ID!) {
        getFacility(id: $id) {
          id
          FacilityPeople {
            items {
              id
              peopleId
              facilityId
              _deleted
            }
            nextToken
            startedAt
            __typename
          }
          permissions
          createdAt
          updatedAt
          _version
          _deleted
        }
      }
    `;
    const facilityObj = (
      await API.graphql(
        graphqlOperation(getFacilityPeople, {
          id: upcomingShiftDetails?.facility?.id,
        })
      )
    )?.data?.getFacility;

    const facilitymember = facilityObj?.FacilityPeople?.items[0];
    navigate("/messaging", { state: facilitymember });
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="People Add Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "relative",
          borderRadius: 20,
          width: "300px",
          // maxWidth: "300px",
          // minWidth: "200px",
          padding: "0px",
        },
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {isClockInPressed && (
          <ClockInModal closeModal={() => setIsClockInPressed(false)} />
        )}
        {isCancelShiftPressed && (
          <CancelShiftModal closeModal={() => setIsCancelShiftPressed(false)} />
        )}

        {isArriveLatePressed && (
          <ArriveLateModal closeModal={() => setIsArriveLatePressed(false)} />
        )}

        {isReportPressed && (
          <ReportModal closeModal={() => setIsReportPressed(false)} />
        )}

        {!isCancelShiftPressed &&
        !isClockInPressed &&
        !isArriveLatePressed &&
        !isReportPressed ? (
          <>
            <div
              style={{ backgroundColor: themeStyles?.PRIMARY_COLOR }}
              className="flex flex-col relative w-full justify-center items-center py-2"
            >
              <div
                onClick={openEditModal}
                ref={buttonRef}
                className="absolute top-2 right-2 cursor-pointer"
              >
                {/* <KebabMenuWhite /> */}
              </div>
              <label className="text-PRIMARY_LIGHT_COLOR text-xs font-semibold p-2">
                {activity}
              </label>
              <div className="flex flex-row w-full">
                <div className="w-1/4 flex flex-col items-center ">
                  <img
                    className={`w-12 h-12 ${"rounded"}`}
                    src={
                      imgUrl
                        ? imgUrl
                        : "https://randomuser.me/api/portraits/men/20.jpg"
                    }
                    alt="User avatar"
                  />
                </div>
                <div className="w-3/4 text-white flex flex-col">
                  <label className="text-xs font-semibold">
                    {upcomingShiftDetails?.facility?.facilityName}
                  </label>
                  <label className="text-xs text-grey opacity-60">
                    {displayDate(upcomingShiftDetails?.shift?.date)}
                  </label>

                  <div className="flex flex-row flex-wrap space-x-1">
                    {upcomingShiftDetails?.shift?.isIncentive ? (
                      <div className="flex flex-row items-start space-x-1">
                        <IncentiveIndicator size={iconSize} />
                        <label className="text-xxs">Incentive</label>
                      </div>
                    ) : null}
                    {upcomingShiftDetails?.shift?.isGuarantee ? (
                      <div className="flex flex-row items-start space-x-1">
                        <GuaranteeIndicator size={iconSize} />
                        <label className="text-xxs">Garauntee</label>
                      </div>
                    ) : null}
                    {upcomingShiftDetails?.clockInTime >
                    upcomingShiftDetails?.shift?.shiftStart ? (
                      <div className="flex flex-row items-start space-x-1">
                        <LateIcon
                          size={iconSize}
                          color={themeStyles.SECONDARY_COLOR}
                        />
                        <label className="text-xxs">Late</label>
                      </div>
                    ) : null}
                    {upcomingShiftDetails?.isCallOff ? (
                      <div className="flex flex-row items-start space-x-1">
                        <CallOff
                          size={iconSize}
                          color={themeStyles.SECONDARY_COLOR}
                        />
                        <label className="text-xxs">Call Off</label>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full justify-between p-2 text-xs space-y-2">
              <div className="rounded-xl bg-PRIMARY_NEUTRAL_COLOR p-3 space-y-3">
                <div className="flex flex-row justify-between">
                  <label className="font-semibold"> Clock-in</label>
                  <label className="font-bold">
                    {upcomingShiftDetails?.clockInTime
                      ? displayTime(upcomingShiftDetails?.clockInTime)
                      : "--:--"}
                  </label>
                </div>
                <div className="flex flex-row justify-between">
                  <label className="font-semibold"> Clock-Out</label>
                  <label className="font-bold">
                    {upcomingShiftDetails?.clockOutTime
                      ? displayTime(upcomingShiftDetails?.clockOutTime)
                      : "--:--"}
                  </label>
                </div>
              </div>

              <div className="rounded-xl bg-PRIMARY_NEUTRAL_COLOR p-3 space-y-3">
                <div className="flex flex-row justify-between">
                  <label className="font-semibold">Rate (per hour)</label>
                  <label className="font-bold">
                    ${upcomingShiftDetails?.shift?.rate}
                  </label>
                </div>
                <div className="flex flex-row justify-between">
                  <label className="font-semibold">
                    Incentive Amount (
                    {upcomingShiftDetails?.shift?.incentives?.incentiveType})
                  </label>
                  <label className="font-bold">
                    $
                    {upcomingShiftDetails?.shift?.isIncentive
                      ? upcomingShiftDetails?.shift?.incentives?.incentiveAmount
                      : 0}
                  </label>
                </div>
              </div>

              {!upcomingShiftDetails?.isCallOff &&
              !isCompletedShift &&
              !disableActions ? (
                <div className="flex flex-row space-x-1">
                  {/* <Button
                    children={
                      upcomingShiftDetails?.clockInTime
                        ? "Clock Out"
                        : "Clock In"
                    }
                    color={themeStyles?.GREEN}
                    onClick={() => setIsClockInPressed(true)}
                    disabled={isCancelShiftPressed}
                  /> */}
                  <Button
                    children={"Cancel Shift"}
                    color={themeStyles?.RED}
                    onClick={() => setIsCancelShiftPressed(true)}
                    disabled={isClockInPressed}
                  />
                </div>
              ) : null}
              <div className="text-xs text-PRIMARY_COLOR font-semibold justify-between flex flex-row py-2 px-2">
                <div
                  className={`${ScaleHover}`}
                  onClick={
                    () => getFacilityRepMessage()
                    //   console.log(
                    //     "🚀 ~ file: UpcomingShiftModal.js:662 ~ upcomingShiftDetails?.facility?.FacilityPeople?:",
                    //     upcomingShiftDetails?.facility?.FacilityPeople
                    //   )
                    // navigate("/messaging", {
                    //   state:
                    //     upcomingShiftDetails?.facility?.FacilityPeople?.items[0]
                    //       ?.people,
                    // })
                  }
                >
                  Message
                </div>
                {!upcomingShiftDetails?.isCallOff &&
                !isCompletedShift &&
                !isInProgress &&
                !disableActions ? (
                  <div
                    className={`${ScaleHover}`}
                    onClick={() => setIsArriveLatePressed(true)}
                  >
                    Arrive Late
                  </div>
                ) : null}
                <div
                  className={`${ScaleHover}`}
                  onClick={() => setIsReportPressed(true)}
                >
                  Report an Issue
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {/* your component content here ... */}
    </Modal>
  );
};

export default UpcomingShiftModal;
