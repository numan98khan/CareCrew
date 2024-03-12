import React, { useState, useEffect, useMemo } from "react";
import IconButton from "../../components/Button/IconButton";
import theme from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";
// import NavTab from "../../components/NavTab";
import NavTab from "../../components/NavTab";

import SummaryCard from "../../components/SummaryCard";
// import { Card, IconButton, Typography } from "@material-tailwind/react";
import { Card, Typography, collapse } from "@material-tailwind/react";

// import ShiftCard from "../../components/ShiftCard";
import PageNav from "../../components/PageNav";
// import FilterButton from "../../components/Button/FilterButton";
import TableRow from "../../components/TableRow";
// import IconIndicator from "../../components/IconIndicator";
import Table from "../../components/Table";

// import FilterIcon from "../../assets/icons/indicators/filter";
import TrashIcon from "../../assets/icons/delete";
import FilterButton from "../../components/Button/FilterButton";
import DateDropDown from "../../components/DateDropDown";
import { useNavigate } from "react-router-dom";

import { useAdmin, useAuth } from "../../context";
import { enrichWhosOn } from "../../services/whosOnService";
import { v4 as uuidv4 } from "uuid";

import { useListPeople } from "../../apolloql/people";
import {
  useCreateTimecard,
  useListTimecards,
  useListUpcomingTimecards,
  useUpdateTimecard,
} from "../../apolloql/timecards";
import { useListShifts } from "../../apolloql/schedules";

import {
  ErrorToast,
  SuccessToast,
  displayDate,
  displayTime,
} from "../../services/micro";

import { EMPLOYEE, FACILITY } from "../../constants/userTypes";
import { PuffLoader } from "react-spinners";
import themeStyles from "../../styles/theme.styles";
import { SUPER_ADMIN } from "../../constants/permissions";
import { ScaleHover } from "../../styles/animations";
import { getTimecard } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useCreateManualTimecard } from "../../apolloql/manualtimecards";
import {
  externalNotificationToInstacare,
  externalNotificationToPeople,
  inAppNotificationsToFacilityPeople,
  inAppNotificationsToPeople,
  inApplNotificationToInstacare,
  sendNotificationsToFacilityPeople,
} from "../../services/timecards/reporting";
import {
  EMPLOYEE_LATE,
  TIMECARD_FLAG,
} from "../../constants/notificationTypes";
import { useCreateNotification } from "../../apolloql/notifications";

const TABLE_HEAD = [
  "",
  "Name",
  "ID",
  "Status",
  "Profile",
  "Points",
  "Activity",
  "",
];

const SHIFT_IN_PROCESS = "Shift in progress";

const WhosOn = () => {
  const navigate = useNavigate();
  const { createNotificationQuery } = useCreateNotification();

  const { type, myFacility, permissions, user } = useAuth();
  const isSuperAdmin = SUPER_ADMIN === user?.attributes?.email;
  const canCreateShift = isSuperAdmin
    ? true
    : permissions.permissions?.find((obj) => obj?.name === "Create Schedule")
        ?.isSelected;

  // const { shifts } = useAdmin();
  const [currentTab, setCurrentTab] = useState("Scheduled");
  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
  };

  // const [currentViewDate, setCurrentViewDate] = useState(
  //   new Date("2023-08-02")
  // );
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const handleCurrentViewDateChange = (eventDate) => {
    setCurrentViewDate(eventDate);
  };

  const { people } = useListPeople();
  const { shifts } = useListShifts();
  const { timecards, loading, refetch } = useListUpcomingTimecards(
    null,
    true,
    currentViewDate
  );

  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      // Replace this condition with your actual filter condition
      return person.type === EMPLOYEE;
    });
  }, [people]);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months are zero-based
    let dd = date.getDate();

    mm = mm < 10 ? "0" + mm : mm;
    dd = dd < 10 ? "0" + dd : dd;

    return `${yyyy}-${mm}-${dd}`;
  };

  const filteredTimecards = useMemo(() => {
    if (timecards) {
      // console.log(
      //   "🚀 ~ file: index.js:91 ~ filteredTimecards ~ timecards:",
      // );

      const formattedDate = formatDate(currentViewDate);

      const filteredTimecard = timecards?.filter(
        (obj) =>
          formatDate(new Date(obj?.shift?.shiftStartDT)) === formattedDate &&
          !obj?.isCallOff
      );

      // return filteredTimecard;
      // timecards.map((obj) => {
      //   console.log(obj?.person?.firstName, obj?.shift?.date);
      //   console.log(
      //     "🚀 ~ file: index.js:100 ~ timecards.map ~ obj:",
      //     obj?.shift?.shiftStartDT,
      //     obj?.shift?.shiftEndDT
      //   );
      // });

      // return timecards;

      return enrichWhosOn(
        filteredTimecard.filter((timecard) => {
          return type === FACILITY
            ? timecard?.facility?.id === myFacility.id
            : true;
        }),
        currentTab,
        currentViewDate
      );
    }
    return [];
  }, [timecards, shifts, currentTab, currentViewDate]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // adjust this as needed
  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const createPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PageNav
          text={i.toString()}
          isSelected={i === currentPage}
          onClick={() => handlePageChange(i)}
        />
      );
    }
    return pages;
  };

  const navTabs = [
    { title: "Scheduled", amount: 0, isActive: true },
    { title: "Clocked In", amount: 104, isActive: false },
  ];

  const { updateTimecardQuery } = useUpdateTimecard();

  const [isClockLoading, setIsClockLoading] = useState(false);

  const whosOnClockIn = async (timecard) => {
    // timecard
    console.log(
      "🚀 ~ file: index.js:182 ~ whosOnClockIn ~ timecard:",
      timecard
    );

    const now = new Date();
    setIsClockLoading(true);
    const timecardData = (
      await API.graphql(graphqlOperation(getTimecard, { id: timecard.id }))
    )?.data?.getTimecard;
    const updatedTimecard = {
      id: timecardData.id,
      clockInTime: now.toISOString(),
      _version: timecardData._version,
    };

    if (new Date(timecard?.shift?.shiftStartDT) < now) {
      updatedTimecard.isLate = true;
    }
    const response = await updateTimecardQuery(updatedTimecard);
    await refetch();

    setIsClockLoading(false);
    setShowConfirmModal(false);
  };

  // const { createTimecardQuery } = useCreateTimecard();
  const { createManualTimecardQuery } = useCreateManualTimecard();
  const whosOnClockOut = async (timecard) => {
    // timecard
    console.log(
      "🚀 ~ file: index.js:182 ~ whosOnClockIn ~ timecard:",
      timecard
    );
    setIsClockLoading(true);
    const timecardData = (
      await API.graphql(graphqlOperation(getTimecard, { id: timecard.id }))
    )?.data?.getTimecard;

    const updatedTimecard = {
      id: timecardData.id,
      clockOutTime: new Date().toISOString(),
      _version: timecardData._version,
    };

    // ManualTimecard creation part
    try {
      // Parse the clockInTime and clockOutTime to Date objects
      const clockIn = new Date(timecard?.clockInTime);
      const clockOut = new Date(updatedTimecard?.clockOutTime);

      // console.log("🚀 ~ clockIn:", clockIn);
      // console.log("🚀 ~ clockOut:", clockOut);

      // Calculate the difference in milliseconds
      let difference = clockOut - clockIn;
      // console.log("🚀 ~ difference (ms):", difference);

      // // Convert difference to hours for easier debugging
      // console.log("🚀 ~ difference (hours):", difference / (60 * 60 * 1000));

      // If the shift is longer than 6 hours
      let isBreak = false;
      if (difference >= 6 * 60 * 60 * 1000) {
        isBreak = true;
        // Subtract 30 minutes (in milliseconds) from the difference
        difference -= 30 * 60 * 1000;
      }

      if (difference < 5 * 60 * 60 * 1000) {
        const peopleObj = filteredPeople.find(
          (obj) => obj?.id === timecard?.peopleID
        );
        let formedMessage = `Subject: Timecard Flag\n\nThe following timecard has been flagged for being under 5 hours duration:\n\nEmployee: ${
          peopleObj?.firstName + " " + peopleObj?.lastName
        }\nShift Date: ${displayDate(
          timecard?.shift?.shiftStartDT
        )}\nShift Time: ${
          displayTime(timecard?.shift?.shiftStartDT) +
          " - " +
          displayTime(timecard?.shift?.shiftEndDT)
        }\nFacility: ${timecard?.facility?.facilityName}\n\nTimestamp: ${
          displayDate(new Date()?.toISOString()) +
          " " +
          displayTime(new Date()?.toISOString())
        }`;
        // // INTERNAL

        inApplNotificationToInstacare(
          TIMECARD_FLAG,
          "Timecard Flag",
          formedMessage,
          createNotificationQuery
        );

        // // EXTERNAL
        // externalNotificationToInstacare(formedMessage, true, false); // CareCrew
      }

      // console.log("🚀 ~ isBreak:", isBreak);

      // Calculate the total hours and minutes
      const totalHours = Math.floor(difference / (60 * 60 * 1000));
      const totalMinutes = Math.floor(
        (difference % (60 * 60 * 1000)) / (60 * 1000)
      );

      const timecardDetails = {
        id: uuidv4(),
        clockInTime: timecard?.clockInTime,
        clockOutTime: updatedTimecard?.clockOutTime,
        role: timecard?.shift?.roleRequired,
        isBreak: isBreak,
        hours: totalHours,
        minutes: totalMinutes,
        status: "Process",

        peopleID: timecard?.person?.id,
        facilityID: timecard?.shift?.facilityID,
      };
      Object.assign(timecardDetails, {
        invoiceProcessedFacility: false,
        invoiceProcessedEmployee: false,
        timecardID: timecard?.id,
        startDate: timecard?.shift?.date,

        rate: timecard?.shift?.rate,
        isOvertime: timecard?.isOvertime,
        peopleSurrogateID: timecard?.person?.surrogateID,
        payrollCycle: timecard?.person?.payrollCycle,
        incentiveAmount: timecard?.shift?.incentives?.incentiveAmount,
        incentiveBy: timecard?.shift?.incentives?.incentiveBy,
        incentiveType: timecard?.shift?.incentives?.incentiveType,
      });
      console.log(
        "🚀 ~ timecardDetails:",
        timecardDetails,
        timecard?.shift,
        timecard?.shift?.incentives?.incentiveType
      );
      const res = createManualTimecardQuery(
        timecardDetails,
        timecardDetails?.peopleID,
        timecard?.facility?.facilityName
      );
    } catch (e) {
      console.error(e);
    }

    // console.log(
    //   "🚀 ~ file: index.js:229 ~ whosOnClockOut ~ updatedTimecard:",
    //   updatedTimecard
    // );
    const response = await updateTimecardQuery(updatedTimecard);
    await refetch();
    setIsClockLoading(false);
    setShowConfirmModal(false);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);
  const [selectedWhosOn, setSelectedWhosOn] = useState(null);

  return (
    <div className="flex flex-col min-h-full px-3 pb-3">
      <div className="flex flex-col mx-2">
        <div className="flex py-1 justify-start">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex items-center flex-1  z-50">
              <PageHeader text={"Whos On"} />
              <div
                // className="ml-2"
                className={`ml-2 flex flex-1 flex-row gap-2 items-center justify-center ${ScaleHover}`}
              >
                <DateDropDown
                  date={currentViewDate}
                  onChange={handleCurrentViewDateChange}
                />
              </div>
            </div>
            {canCreateShift && (
              <div>
                <IconButton
                  color={theme.SECONDARY_COLOR}
                  text={"+ADD SHIFT"}
                  onClick={() => {
                    navigate("/addshift");
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-10 bg-white flex">
        {navTabs.map((tab, index) => (
          <NavTab
            key={index}
            title={tab.title}
            isActive={currentTab === tab.title}
            onClick={() => handleTabChange(tab.title)}
          />
        ))}
      </div>

      {/* Info Board */}

      {loading ? (
        <div className="h-40 w-full flex justify-center items-center">
          <PuffLoader
            color={themeStyles.PRIMARY_LIGHT_COLOR}
            loading={loading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <Table
          disableHeader={true}
          data={filteredTimecards}
          config={"whoson"}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          createPageNumbers={createPageNumbers}
          TABLE_HEAD={TABLE_HEAD}
          whosOnClockIn={(val) => {
            setSelectedWhosOn(val);
            setShowConfirmModal(true);
          }}
        />
      )}
      <ConfirmationModal
        disableConfirm={isClockLoading}
        modalIsOpen={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        message={`Are you sure you want to ${
          selectedWhosOn?.clockInTime ? "clock out" : "clock in"
        } this employee?`}
        warning={warningMessage}
        onConfirm={() => {
          if (selectedWhosOn?.clockInTime) {
            whosOnClockOut(selectedWhosOn);
          } else {
            whosOnClockIn(selectedWhosOn);
          }
        }}
        onCancel={() => {
          setShowConfirmModal(false);
        }}
      />
    </div>
  );
};

export default WhosOn;
