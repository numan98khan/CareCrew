import React, { useState, useEffect, useMemo } from "react";

import SummaryCard from "../../components/SummaryCard";
import PageHeader from "../../components/Headers/PageHeader";
import InfoCard from "../../components/InfoCards";
import WhosOnItem from "../../components/WhosOn";
import NewsCard from "../../components/NewsCard";

import OpenIcon from "../../assets/icons/summaryIcons/open";
import ConfirmedIcon from "../../assets/icons/summaryIcons/confirmed";
import CompletedIcon from "../../assets/icons/summaryIcons/completed";
import CancellationIcon from "../../assets/icons/summaryIcons/cancellation";
import CallOffIcon from "../../assets/icons/summaryIcons/calloff";

import NavTab from "../../components/NavTab";
import ScheduleSummary from "../Schedules/ScheduleSummary";

import { enrichWhosOn } from "../../services/whosOnService";

import { useNavigate, useNavigation } from "react-router-dom";
import { useListNews } from "../../apolloql/news";
import {
  draftRichToText,
  reverseFormatDate,
  displayDatetime,
  displayDate,
  displayTime,
  formatDateToAWS,
} from "../../services/micro";
import { useListPeople, useListPeopleByType } from "../../apolloql/people";
import DateDropDown from "../../components/DateDropDown";
import DownChevron from "../../assets/icons/downChevron";
import IconButton from "../../components/Button/IconButton";
import theme from "../../styles/theme.styles";
import AllReminders from "../../components/AllReminders";
import AllNews from "../../components/AllNews";
import MinimalReminderItem from "../../components/AllReminders/MinimalReminderItem";

import AvailableEmployee from "../../components/AvailablePeople";
import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";
import { useListReminders } from "../../apolloql/reminders";
import {
  useListTimecards,
  useListUpcomingTimecards,
} from "../../apolloql/timecards";
import { useListMarketplace, useListShifts } from "../../apolloql/schedules";
import { useCreateNotification } from "../../apolloql/notifications";
import AvailableEmployees from "../../components/AvailableEmployees";

import { REMINDER } from "../../constants/notificationTypes";

import { SuccessToast, ErrorToast } from "../../services/micro";

import { useAuth } from "../../context";
import useFilters from "../Schedules/useFilters";
import ScheduleFilterModal from "../../components/Drawers/ScheduleFilterModal";

import NurseSummary from "../PeopleDetails/NurseSummary";
import NurseAccountInfo from "../PeopleDetails/NurseAccountInfo";
import NurseReviews from "../PeopleDetails/NurseReviews";
import NurseDocuments from "../PeopleDetails/NurseDocuments";
import NurseChecklists from "../PeopleDetails/NurseChecklists";

import BackButton from "../../components/Button/BackButton";
import { SUPER_ADMIN } from "../../constants/permissions";
import { ScaleHover } from "../../styles/animations";
import { userTimezone } from "../../apolloql/timezone";
import Charts, {
  GaugeChart,
  PercentageCard,
  ShiftFullfilmentVisualization,
} from "./Charts";
import { fetchSnowflakeData } from "../../services/mysql";

// import { reverseFormatDate } from "../../services/micro";
const getSummaryData = (type) => {
  const baseData = [
    {
      points: 54,
      label: "Total Daily Shifts",
      gradient: false,
      icon: null,
      datakey: "daily",
    },
    {
      points: 0,
      label: "Open Shifts",
      gradient: true,
      icon: <OpenIcon size={0.6} />,
      datakey: "open",
    },
    {
      points: 0,
      label: "Confirmed Shifts",
      gradient: true,
      icon: <ConfirmedIcon size={0.6} />,
      datakey: "confirmed",
    },
    {
      points: 0,
      label: "Shifts in Progress",
      gradient: true,
      icon: <ConfirmedIcon size={0.6} />,
      datakey: "inprogress",
    },
    {
      points: 0,
      label: "Completed Shifts",
      gradient: true,
      icon: <CompletedIcon size={0.6} />,
      datakey: "completed",
    },
    {
      points: 0,
      label: "Call Off Shifts",
      gradient: true,
      icon: <CallOffIcon size={0.6} />,
      datakey: "calloffs",
    },
  ];

  const extraData = [
    {
      points: 0,
      // label: "Facility Cancellations",
      label: "Cancellations",
      gradient: true,
      icon: <CancellationIcon size={0.6} />,
      datakey: "cancelled",
    },
    {
      points: 0,
      label: "Late",
      gradient: true,
      icon: <CancellationIcon size={0.6} />,
      datakey: "late",
    },
  ];

  return type === FACILITY ? baseData : [...baseData, ...extraData];
};

// const [animationProps, setAnimationProps] = useSpring(() => ({
//   scale: 1,
// }));

const Dashboard = () => {
  const { user, type, myFacility, permissions, personalData } = useAuth();

  // const actionPermissions = [...permissions?.permissions];
  const isSuperAdmin = SUPER_ADMIN === user?.attributes?.email;
  const canCreateShift = isSuperAdmin
    ? true
    : permissions.permissions?.find((obj) => obj?.name === "Create Schedule")
        ?.isSelected;

  const canCreateReminders = isSuperAdmin
    ? true
    : permissions.permissions?.find((obj) => obj?.name === "Create Reminders")
        ?.isSelected;
  const summaryData = getSummaryData(type);

  const [summaryOpen, setSummaryOpen] = useState(false);
  const [currentSummaryKey, setCurrentSummaryKey] = useState(null);
  const [currentViewDate, setCurrentViewDate] = useState(new Date());

  const navigate = useNavigate();

  const handleSummaryCardClick = (event, datakey) => {
    setSummaryOpen(event);
    setCurrentSummaryKey(datakey);
  };

  const { news } = useListNews({ date: currentViewDate, receiver: type });
  // const { news } = useListNews();

  const [currentTab, setCurrentTab] = useState("Scheduled");

  // const [filteredTimecards, setFilteredTimecards] = useState([]);

  const [selectedTab, setSelectedTab] = useState("dash");

  const handleCurrentViewDateChange = (eventDate) => {
    // console.log("handleCurrentViewDateChange", eventDate, datakey);
    setCurrentViewDate(eventDate);
  };

  const handleTabChange = (newTab) => {
    // setFilteredTimecards(enrichedTimecardsData);
    setCurrentTab(newTab);
  };

  const onBackClick = async () => {
    setSelectedTab("dash");
  };

  const navTabs = [
    { title: "Scheduled", amount: 0, isActive: true },
    { title: "Clocked In", amount: 104, isActive: false },
  ];

  const { people } = useListPeople();
  const { people: employee } = useListPeopleByType(EMPLOYEE);

  const { reminders } = useListReminders({
    type: type,
    date: formatDateToAWS(currentViewDate),
  });

  // console.log(
  //   "🚀 ~ file: index.js:182 ~ Dashboard ~ currentViewDate:",
  //   currentViewDate,
  //   currentViewDate.toISOString()
  // );

  const [shiftStatus, setShiftStatus] = useState(null);

  const [selectedShift, setSelectedShift] = useState([]);
  const [selectedTimecard, setSelectedTimecard] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [selectedFacilityDetails, setSelectedFacilityDetails] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [assignedTo, setAssignedTo] = useState();
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [shift, setShift] = useState();

  const filteredPeople = useMemo(() => {
    return employee.filter((person) => {
      // Replace this condition with your actual filter condition
      return person.type === EMPLOYEE;
    });
  }, [people]);

  const [dataState, setDataState] = useState({ loading: true, data: null });

  const snowflakeData = useMemo(async () => {
    const fetchData = async () => {
      try {
        const data = await fetchSnowflakeData({ table: "sample" });
        console.log("🚀 ~ fetchData ~ data:", data);
        setDataState({ loading: false, data });
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setDataState({ loading: false, data: null });
      }
    };

    fetchData();
  }, []);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleApplyFilter = () => {
    onClose();
  };

  const handleResetFilter = () => {
    setFilters();
    // setEndDate();
    setStartDate();
    setSelectedDate();
    setSelectedShiftTimings();
    setEmployeeName();
    setSelectedFacilityId();
    setSelectedRole();
    setShift();
    setShiftStatus();
    onClose();
  };
  // Hooks for filters and states
  const {
    filters,
    setFilters,
    selectedFacilityId,
    setSelectedFacilityId,
    employeeName,
    setEmployeeName,
    selectedRole,
    setSelectedRole,
    selectedDate,
    setSelectedDate,
    selectedShiftTimings,
    setSelectedShiftTimings,
  } = useFilters();

  let date = new Date();
  // const userTimezone = userTimezone;
  let numDaysInView = 2;
  const dates = [];
  for (let i = 0; i < numDaysInView; i++) {
    const d = new Date(date);
    d.setDate(d.getDate() + i);

    // // If we have an endDate and our current date exceeds it, stop the loop.
    // if (endDate && d > new Date(endDate)) {
    //   break;
    // }

    dates.push(
      d.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        timeZone: userTimezone,
      })
    );
  }

  console.log("🚀 ~ file: index.js:297 ~ Dashboard ~ dates:", dates);
  const { shifts, refetch: refetchShifts } = useListShifts(
    myFacility ? myFacility?.id : undefined, //facilityID,
    selectedRole, //role,
    currentViewDate, //date,
    undefined, //timings,
    undefined, //dates[0], //startDate,
    undefined, //dates[1], //endDate,
    undefined, //filterStartDate,
    undefined, //filterEndDate,
    undefined, //isGuarantee,
    undefined //isIncentive
  );
  const { timecards, loading } = useListUpcomingTimecards(
    null,
    true,
    currentViewDate
  );
  // const { timecards } = useListTimecards();

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
      // console.log("timecards filteredTimecards invoked");

      const formattedDate = formatDate(currentViewDate);

      const filteredTimecard = timecards?.filter(
        (obj) =>
          formatDate(new Date(obj?.shift?.shiftStartDT)) === formattedDate &&
          !obj?.isCallOff
      );

      return enrichWhosOn(
        filteredTimecard
          ?.filter((timecard) => {
            return type === FACILITY
              ? myFacility
                ? timecard?.facility?.id === myFacility.id
                : true
              : true;
          })
          .map((obj) => {
            return {
              ...obj,
              people: filteredPeople.find(
                (person) => person?.id === obj.peopleID
              ),
            };
          }),
        currentTab,
        currentViewDate
      );
    }
    return [];
  }, [timecards, shifts, currentTab, currentViewDate]);

  const availableEmployees = useMemo(() => {
    // Get the start and end of the week based on the current view date
    const startOfWeek = new Date(currentViewDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    // Format the week string as "30 July 2023 - 5 August 2023"
    const currentWeekString = `${startOfWeek.getDate()} ${startOfWeek.toLocaleString(
      "en-US",
      { month: "long" }
    )} ${startOfWeek.getFullYear()} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleString(
      "en-US",
      { month: "long" }
    )} ${endOfWeek.getFullYear()}`;

    const currentDayOfWeek = currentViewDate.toLocaleString("en-US", {
      weekday: "long",
    });
    return employee
      .filter((person) => {
        // Parse the availability JSON string
        const availability = JSON.parse(person.availability);

        // Check if the person is available for the current week and day
        return (availability?.week === "All" ||
          availability?.week === currentWeekString) &&
          availability?.availability
          ? availability?.availability[currentDayOfWeek] &&
              availability?.availability[currentDayOfWeek].available
          : false;
      })
      .map((person) => {
        // Extract availability details for the current day
        const availability = JSON.parse(person.availability);

        const { available, startTime, endTime } =
          availability?.availability[currentDayOfWeek];

        // Return the person details along with availability info
        return {
          ...person,
          available,
          startTime,
          endTime,
        };
      });
  }, [employee, currentViewDate]);

  const filterReminders = useMemo(() => {
    return reminders?.filter((reminder) => {
      // Replace this condition with your actual filter condition
      return true;
    });
  }, [reminders]);

  const summaryShifts = useMemo(() => {
    const formattedDate = formatDate(currentViewDate);

    const filteredTimecard = timecards?.filter(
      (obj) => formatDate(new Date(obj?.shift?.shiftStartDT)) === formattedDate
    );

    // Step 1: Create an object from the shifts array
    const shiftIds = Object.fromEntries(
      shifts.map((shift) => [shift.id, true])
    );

    const combinedShifts = shifts
      ?.filter((shift) => {
        if (employeeName) {
          return false;
        }
        if (selectedShiftTimings) {
          const [startFilter, endFilter] = selectedShiftTimings.split("-");

          // Convert shiftStart and shiftEnd to minutes from midnight
          const [shiftStartHour, shiftStartMinute] = shift?.shiftStart
            .split(":")
            .map(Number);
          const [shiftEndHour, shiftEndMinute] = shift?.shiftEnd
            .split(":")
            .map(Number);
          const shiftStartInMinutes = shiftStartHour * 60 + shiftStartMinute;
          const shiftEndInMinutes = shiftEndHour * 60 + shiftEndMinute;

          // Convert filter start and end to minutes from midnight
          const [filterStartHour, filterStartMinute] = startFilter
            .split(":")
            .map(Number);
          const [filterEndHour, filterEndMinute] = endFilter
            .split(":")
            .map(Number);
          const filterStartInMinutes = filterStartHour * 60 + filterStartMinute;
          const filterEndInMinutes = filterEndHour * 60 + filterEndMinute;

          // Compare times
          if (
            shiftStartInMinutes < filterStartInMinutes ||
            shiftEndInMinutes > filterEndInMinutes
          ) {
            return false;
          }
        }
        return type === FACILITY ? shift?.facilityID === myFacility.id : true;
      })
      .concat(
        filteredTimecard?.filter((shift) => {
          if (employeeName) {
            return shift?.peopleID === employeeName;
          }
          return shift?._deleted !== true;
        })
      );
    // console.log(
    //   "🚀 ~ file: index.js:250 ~ summaryShifts ~ combinedShifts:",
    //   combinedShifts.length,
    //   filteredTimecard.length
    // );
    // console.log("🚀 ~ SHIFTS & TIMECARDS:", shifts, timecards);

    // combinedShifts?.map((obj) =>
    //   console.log(obj?.clockInTime !== null, obj?.clockOutTime !== null)
    // );

    const TIMECARD = "Timecard";

    const data = {
      // daily: [],

      open: combinedShifts.filter((shift) => {
        return (
          shift.__typename === "Shifts" &&
          shift.numOfPositions !== "0" &&
          !shift?.isArchive
        );
      }),
      confirmed: combinedShifts.filter((shift) => {
        return (
          shift.__typename === TIMECARD &&
          shifts?.find((obj) => obj?.id === shift?.shiftsID) &&
          shift.clockInTime === null &&
          shift.clockOutTime === null &&
          !shift?.isCallOff &&
          !shift?.isLate
        );
      }),
      inprogress: combinedShifts.filter((shift) => {
        return (
          shift.__typename === TIMECARD &&
          shifts?.find((obj) => obj?.id === shift?.shiftsID) &&
          shift.clockInTime !== null &&
          shift.clockOutTime === null &&
          !shift?.isCallOff
        );
      }),
      completed: combinedShifts.filter((shift) => {
        return (
          shift.__typename === TIMECARD &&
          shifts?.find((obj) => obj?.id === shift?.shiftsID) &&
          shift.clockInTime !== null &&
          shift.clockOutTime !== null &&
          !shift?.isCallOff
        );
      }),
      calloffs: combinedShifts.filter((shift) => {
        return (
          shift.__typename === TIMECARD &&
          shifts?.find((obj) => obj?.id === shift?.shiftsID) &&
          shift.isCallOff &&
          !shift?.lateReason?.includes("Facility Cancellation")
          // shift?.lateReason !== "Facility Cancellation"
        );
      }),

      daily: combinedShifts.filter((timecard) => {
        if (timecard.__typename === TIMECARD) {
          // if (data.confirmed.map((obj) => obj?.id).includes(timecard?.id)) {
          //   return true;
          // } else {
          return false;
          // }
        }

        // return true;
        return false;
      }),
    };

    if (type !== FACILITY) {
      data.cancelled = combinedShifts.filter((shift) => {
        return (
          shift.__typename === TIMECARD &&
          shift.isCallOff &&
          // shift?.lateReason === "Facility Cancellation"
          shift?.lateReason?.includes("Facility Cancellation")
        );
      });

      data.late = combinedShifts.filter((timecard) => {
        // Ensure that this is a Timecards object
        if (timecard?.isLate && !timecard?.isCallOff) {
          return true;
        }
        if (timecard.__typename !== TIMECARD || timecard.clockInTime === null) {
          return false;
        }

        // Find the corresponding shift for this timecard by matching shiftID
        const correspondingShift = combinedShifts.find(
          (shift) =>
            shift.__typename === "Shifts" && shift.id === timecard.shiftID
        );

        // If there's no corresponding shift, or if shiftStart is not defined, we can't determine lateness
        if (!correspondingShift || !correspondingShift.shiftStart) {
          return false;
        }

        // Parse the clockInTime and shiftStart time as Date objects to compare
        const clockInTime = new Date(timecard.clockInTime);
        const shiftStartTime = new Date(correspondingShift.shiftStart);

        // If the clock-in time is after the start time, then the shift was late
        return clockInTime > shiftStartTime;
      });
      // data.late = combinedShifts.filter((timecard) => {
      //   // ... (existing late logic)
      // });
    }

    // console.log("combinedShifts", data, combinedShifts);
    return data;
  }, [reminders, shifts, timecards]);

  const { createNotificationQuery } = useCreateNotification();
  const handleTestNotification = async () => {
    const employeeId = user?.attributes?.sub;
    try {
      // Create the input object for the notification
      const notificationInput = {
        peopleID: people.find((person) => person.id === employeeId)?.id,
        type: REMINDER, // Replace with the appropriate type
        subject: "Test Notification",
        body: "This is a test notification",
        // Add other required fields for the notification here
      };

      const notificationResponse = await createNotificationQuery(
        notificationInput,
        [employeeId]
      );

      // console.log("Notification created:", notificationResponse);
      SuccessToast("Notification created");
    } catch (error) {
      console.error("Failed to create reminder:", error);
      ErrorToast("Failed to create reminder");
    }
  };

  const navTabsEmployee =
    type === ADMIN
      ? [
          { title: "Account Info", amount: 0, isActive: true },
          { title: "Checklists", amount: 0, isActive: false },
          { title: "Reviews", amount: 3, isActive: false },
          { title: "Documents", amount: 0, isActive: false },
        ]
      : [
          { title: "Account Info", amount: 0, isActive: true },
          { title: "Reviews", amount: 3, isActive: false },
        ];

  const [isEdit, setIsEdit] = useState(false);
  const [selectedPeopleEmployee, setSelectedPeopleEmployee] = useState(null);
  const [selectedDetailedPeople, setSelectedDetailedPeople] = useState(null);

  const [openEmployee, setOpenEmployee] = useState(false);
  const onOpenEmployee = () => {
    openEmployee(true);
  };

  const onCloseEmployee = () => {
    openEmployee(false);
  };

  const onBackClickHandler = () => {
    // console.log("Going back on facility");
    setSelectedTab("dash");
    setSelectedPeopleEmployee(null);
  };

  let tabContent;
  if (currentTab === "Account Info") {
    tabContent = (
      <NurseAccountInfo people={selectedPeopleEmployee} type={type} />
    );
  } else if (currentTab === "Checklists") {
    tabContent = <NurseChecklists people={selectedPeopleEmployee} />;
  } else if (currentTab === "Reviews") {
    tabContent = <NurseReviews people={selectedPeopleEmployee} type={type} />;
  } else if (currentTab === "Documents") {
    tabContent = <NurseDocuments people={selectedPeopleEmployee} />;
  }

  const renderPeopleDetails = () => {
    // console.log("PEOPLE DETAIL!!!");

    return (
      <div className="flex flex-col min-h-full px-3 pb-3">
        <div className="flex flex-col">
          <div className="flex flex-row py-1 justify-start space-x-4 items-center mb-2 mt-2">
            <BackButton onClick={onBackClickHandler} />
            <PageHeader text={"People"} />
          </div>
        </div>
        {/* pass required props for each nurse */}
        <NurseSummary people={selectedDetailedPeople} setIsEdit={setIsEdit} />
        {/*Navigation Tabs*/}
        <div>
          <div className="flex flex-col">
            <div
              style={{ height: "50px" }}
              className="w-full bg-white flex mt-3"
            >
              {navTabsEmployee.map((tab, index) => (
                <NavTab
                  key={index}
                  title={tab.title}
                  amount={tab.title === "Members" ? tab.amount : ""}
                  // isActive={tab.isActive}
                  isActive={currentTab === tab.title}
                  onClick={() => handleTabChange(tab.title)}
                />
              ))}
            </div>
            <div>{tabContent}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {summaryOpen ? (
        <>
          <ScheduleFilterModal
            shiftStatus={shiftStatus}
            setShiftStatus={setShiftStatus}
            selectedFacilityId={selectedFacilityId}
            setSelectedFacilityId={setSelectedFacilityId}
            setEmployeeName={setEmployeeName}
            employeeName={employeeName}
            open={open}
            onClose={onClose}
            handleApplyFilter={handleApplyFilter}
            handleResetFilter={handleResetFilter}
            setSelectedRole={setSelectedRole}
            setSelectedDate={setSelectedDate}
            setSelectedShiftTimings={setSelectedShiftTimings}
            selectedShiftTimings={selectedShiftTimings}
            selectedRole={selectedRole}
            selectedDate={selectedDate}
            setShift={setShift}
            shift={shift}
            people={filteredPeople}
            //
            disableFacilities={true}
            disableStatus={true}
            disableDate={true}
          />
          <ScheduleSummary
            currentSummaryKey={currentSummaryKey}
            data={summaryShifts}
            onBackClick={() => {
              handleResetFilter();
              setSummaryOpen(false);
            }}
            refetchShifts={refetchShifts}
            openModal={onOpen}
            setCurrentViewDate={setCurrentViewDate}
            currentViewDate={currentViewDate}
            handleCurrentViewDateChange={handleCurrentViewDateChange}
          />
        </>
      ) : selectedTab === "dash" ? (
        <div className="px-3">
          <div className="flex justify-start ">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-row items-center z-50 space-x-1">
                <PageHeader text={"Dashboard"} />
              </div>
              <DateDropDown
                date={currentViewDate}
                onChange={handleCurrentViewDateChange}
              />
              {/* {canCreateShift && (
                <div className="flex items-center">
                  <IconButton
                    color={theme.SECONDARY_COLOR}
                    text={"+ADD SHIFT"}
                    onClick={() => {
                      navigate("/addshift");
                    }}
                  />
                </div>
              )} */}
            </div>
          </div>

          <div className="flex flex-grow h-full">
            <div className="w-[65%] space-y-2 ">
              <div className="flex flex-row ">
                {/* <div className="w-3/4">
              <Charts />
            </div> */}
                <div
                  // className="flex flex-wrap h-1/2 w-1/4"
                  className="flex flex-wrap w-full"
                >
                  {summaryData.map((item, index) => (
                    <div
                      // className="w-1/2 p-1 flex "
                      className="w-1/6 p-1 flex "
                    >
                      <SummaryCard
                        text={item.label}
                        shifts={summaryShifts?.[item.datakey]}
                        data={summaryShifts}
                        datakey={item.datakey}
                        // gradient={item.gradient}
                        icon={item.icon}
                        onClick={() => {
                          // console.log(summaryShifts[item.datakey]);
                          if (item.datakey !== "daily") {
                            handleSummaryCardClick(true, item.datakey);
                          }
                        }}
                        disableHover={item.datakey === "daily"}
                      />
                    </div>
                  ))}

                  <div
                    // className="w-1/2 p-1 flex "
                    className="w-[33.5%] p-1 flex"
                  >
                    <PercentageCard
                      title={"Efficient Fill Rate"}
                      percent={91}
                    />
                  </div>

                  <div
                    // className="w-1/2 p-1 flex "
                    className="w-[33%] p-1 flex"
                  >
                    <PercentageCard title={"No-show Rate"} percent={10} />
                  </div>
                </div>
              </div>

              {/* <div className="my-3" /> */}

              <InfoCard
                navbar={
                  <div className="flex">
                    {navTabs.map((tab, index) => (
                      <NavTab
                        key={index}
                        title={tab.title}
                        isActive={currentTab === tab.title}
                        onClick={() => handleTabChange(tab.title)}
                      />
                    ))}
                  </div>
                }
                title={"Who's ON"}
                viewAllClick={() => navigate("/whoson")}
                dataComponents={filteredTimecards
                  ?.slice(0, 5)
                  .map((item, index) => {
                    // console.log("🚀 ~ file: index.js:452 ~ .map ~ item:", item);
                    // console.log(item);

                    return (
                      <WhosOnItem
                        index={index}
                        whoson={item}
                        name={
                          item?.person?.firstName + " " + item?.person?.lastName
                        }
                        // facilty={item?.shift?.facilityID?.slice(0, 5)}
                        facilty={
                          item?.facility?.facilityName +
                          " - " +
                          item?.person?.role
                        }
                        // timing={
                        //   reverseFormatDate(item?.shift?.shiftStart) +
                        //   " - " +
                        //   reverseFormatDate(item?.shift?.shiftEnd)
                        // }
                        timing={
                          item?.clockInTime
                            ? displayTime(item?.clockInTime) +
                              " - " +
                              displayTime(item?.clockOutTime)
                            : displayTime(item?.shift?.shiftStartDT) +
                              " - " +
                              displayTime(item?.shift?.shiftEndDT)
                        }
                        shiftType={
                          item?.clockInTime
                            ? "Clocked-In"
                            : item?.clockInTime && item?.clockOutTime
                            ? "Clocked-Out"
                            : item?.activity
                        }
                      />
                    );
                  })}
              />
              {type !== FACILITY ? (
                <>
                  <div className="my-2" />
                  <InfoCard
                    isCreateNews={true}
                    title={"CareCrew Bulletin"}
                    setSelectedTab={setSelectedTab}
                    tabToSelect={"all_news"}
                    dataComponents={news?.map((item, index) => (
                      <NewsCard
                        index={index}
                        headline={item.headline}
                        news={draftRichToText(item.news)}
                        author={item?.author}
                        datetime={displayDatetime(item.createdAt)}
                        // datetime={"March 8, 2023  11:45AM"}
                      />
                    ))}
                  />
                </>
              ) : null}
            </div>
            <div className="mx-1" />
            <div className="w-[35%]">
              {/* KPI */}
              <ShiftFullfilmentVisualization data={dataState?.data} />
              <div className="my-2" />

              {/* <GaugeChart coverageEfficiency={90} /> */}
              <>
                <div className="my-2" />
                <InfoCard
                  isCreateNews={true}
                  title={"CareCrew Bulletin"}
                  setSelectedTab={setSelectedTab}
                  tabToSelect={"all_news"}
                  dataComponents={news?.map((item, index) => (
                    <NewsCard
                      index={index}
                      headline={item.headline}
                      news={draftRichToText(item.news)}
                      author={item?.author}
                      datetime={displayDatetime(item.createdAt)}
                      // datetime={"March 8, 2023  11:45AM"}
                    />
                  ))}
                />
              </>

              <div className="my-2" />

              <InfoCard
                isCreateReminder={canCreateReminders}
                title={"Reminders"}
                setSelectedTab={setSelectedTab}
                tabToSelect={"all_reminders"}
                dataComponents={filterReminders
                  ?.slice(0, 5)
                  .map((reminder, index) => {
                    // console.log(item);
                    return (
                      <MinimalReminderItem
                        key={reminder.id}
                        reminder={reminder}
                      />
                    );
                  })}
              />
              <div className="my-2" />
              {type === FACILITY ? (
                <InfoCard
                  title={"CareCrew Bulletin"}
                  setSelectedTab={setSelectedTab}
                  tabToSelect={"all_news"}
                  dataComponents={news?.map((item, index) => (
                    <NewsCard
                      limitText={true}
                      index={index}
                      headline={item.headline}
                      news={draftRichToText(item.news)}
                      author={item?.author}
                      datetime={displayDatetime(item.createdAt)}
                      // datetime={"March 8, 2023  11:45AM"}
                    />
                  ))}
                />
              ) : (
                <InfoCard
                  title={"Available Employees"}
                  tabToSelect={"available_employees"}
                  setSelectedTab={setSelectedTab}
                  dataComponents={availableEmployees?.map((employee, index) => (
                    <div
                    // onClick={() => {
                    //   console.log(employee?.person);
                    //   setSelectedPeopleEmployee(employee?.person);
                    //   setSelectedTab("employee_details");
                    // }}
                    >
                      <AvailableEmployee
                        employee={employee}
                        startTime={employee.startTime}
                        endTime={employee.endTime}
                        key={index}
                      />
                    </div>
                  ))}
                />
              )}
            </div>
          </div>
        </div>
      ) : selectedTab === "all_reminders" ? (
        <AllReminders onBackClick={onBackClick} />
      ) : selectedTab === "all_news" ? (
        <AllNews onBackClick={onBackClick} />
      ) : selectedTab === "employee_details" ? (
        renderPeopleDetails()
      ) : (
        selectedTab === "available_employees" && (
          <AvailableEmployees onBackClick={onBackClick} />
        )
      )}
    </>
  );
};

export default Dashboard;
