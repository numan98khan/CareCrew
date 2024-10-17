import React, { useState, useMemo } from "react";

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

import { useNavigate } from "react-router-dom";
import { useListNews } from "../../apolloql/news";
import {
  draftRichToText,
  displayDatetime,
  formatDateToAWS,
} from "../../services/micro";
import { useListPeople, useListPeopleByType } from "../../apolloql/people";
import DateDropDown from "../../components/DateDropDown";
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
import { useListShifts } from "../../apolloql/schedules";
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
import { userTimezone } from "../../apolloql/timezone";
import Charts, {
  GaugeChart,
  PercentageCard,
  ShiftFullfilmentVisualization,
} from "./Charts";
import WhosOnComponent from "./WhosOnComponent";

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

const Dashboard = () => {
  const { user, type, myFacility, permissions } = useAuth();

  const isSuperAdmin = SUPER_ADMIN === user?.attributes?.email;
  const canCreateReminders = isSuperAdmin
    ? true
    : permissions.permissions?.find((obj) => obj?.name === "Create Reminders")
        ?.isSelected;
  const summaryData = getSummaryData(type);

  const [summaryOpen, setSummaryOpen] = useState(false);
  const [currentSummaryKey, setCurrentSummaryKey] = useState(null);
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const [currentTab, setCurrentTab] = useState("Scheduled");
  const [selectedTab, setSelectedTab] = useState("dash");
  const [shiftStatus, setShiftStatus] = useState(null);
  const [shift, setShift] = useState();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSummaryCardClick = (event, datakey) => {
    setSummaryOpen(event);
    setCurrentSummaryKey(datakey);
  };

  const { news } = useListNews({ date: currentViewDate, receiver: type });

  const handleCurrentViewDateChange = (eventDate) => {
    setCurrentViewDate(eventDate);
  };

  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
  };

  const onBackClick = () => {
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

  const { shifts, refetch: refetchShifts } = useListShifts(
    myFacility ? myFacility?.id : undefined,
    selectedRole,
    currentViewDate
  );
  const { timecards } = useListUpcomingTimecards(null, true, currentViewDate);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    mm = mm < 10 ? "0" + mm : mm;
    dd = dd < 10 ? "0" + dd : dd;

    return `${yyyy}-${mm}-${dd}`;
  };

  const filteredTimecards = useMemo(() => {
    if (timecards && employee) {
      const formattedDate = formatDate(currentViewDate);

      const filteredTimecard = timecards.filter(
        (obj) =>
          formatDate(new Date(obj?.shift?.shiftStartDT)) === formattedDate
      );

      return enrichWhosOn(
        filteredTimecard
          .filter((timecard) =>
            type === FACILITY
              ? myFacility
                ? timecard?.facility?.id === myFacility.id
                : true
              : true
          )
          .map((obj) => ({
            ...obj,
            people: employee.find((person) => person?.id === obj.peopleID),
          })),
        currentTab,
        currentViewDate
      );
    }
    return [];
  }, [timecards, employee, type, myFacility, currentTab, currentViewDate]);

  const availableEmployees = useMemo(() => {
    const startOfWeek = new Date(currentViewDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

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
        try {
          const availability = JSON.parse(person.availability);
          return (availability?.week === "All" ||
            availability?.week === currentWeekString) &&
            availability?.availability
            ? availability?.availability[currentDayOfWeek] &&
                availability?.availability[currentDayOfWeek].available
            : false;
        } catch (error) {
          console.error(
            "Error parsing availability for person",
            person.id,
            error
          );
          return false;
        }
      })
      .map((person) => {
        const availability = JSON.parse(person.availability);
        const { available, startTime, endTime } =
          availability?.availability[currentDayOfWeek];

        return {
          ...person,
          available,
          startTime,
          endTime,
        };
      });
  }, [employee, currentViewDate]);

  const summaryShifts = useMemo(() => {
    const formattedDate = formatDate(currentViewDate);

    const filteredTimecard = timecards?.filter(
      (obj) => formatDate(new Date(obj?.shift?.shiftStartDT)) === formattedDate
    );

    const combinedShifts = shifts
      ?.filter((shift) => {
        if (employeeName) {
          return false;
        }
        if (selectedShiftTimings) {
          const [startFilter, endFilter] = selectedShiftTimings.split("-");

          const [shiftStartHour, shiftStartMinute] = shift?.shiftStart
            .split(":")
            .map(Number);
          const [shiftEndHour, shiftEndMinute] = shift?.shiftEnd
            .split(":")
            .map(Number);
          const shiftStartInMinutes = shiftStartHour * 60 + shiftStartMinute;
          const shiftEndInMinutes = shiftEndHour * 60 + shiftEndMinute;

          const [filterStartHour, filterStartMinute] = startFilter
            .split(":")
            .map(Number);
          const [filterEndHour, filterEndMinute] = endFilter
            .split(":")
            .map(Number);
          const filterStartInMinutes = filterStartHour * 60 + filterStartMinute;
          const filterEndInMinutes = filterEndHour * 60 + filterEndMinute;

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

    const TIMECARD = "Timecard";

    const data = {
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
        );
      }),
      daily: combinedShifts.filter((timecard) => {
        return false;
      }),
    };

    if (type !== FACILITY) {
      data.cancelled = combinedShifts.filter((shift) => {
        return (
          shift.__typename === TIMECARD &&
          shift.isCallOff &&
          shift?.lateReason?.includes("Facility Cancellation")
        );
      });

      data.late = combinedShifts.filter((timecard) => {
        if (timecard?.isLate && !timecard?.isCallOff) {
          return true;
        }
        if (timecard.__typename !== TIMECARD || timecard.clockInTime === null) {
          return false;
        }

        const correspondingShift = combinedShifts.find(
          (shift) =>
            shift.__typename === "Shifts" && shift.id === timecard.shiftID
        );

        if (!correspondingShift || !correspondingShift.shiftStart) {
          return false;
        }

        const clockInTime = new Date(timecard.clockInTime);
        const shiftStartTime = new Date(correspondingShift.shiftStart);

        return clockInTime > shiftStartTime;
      });
    }

    return data;
  }, [
    shifts,
    timecards,
    employeeName,
    selectedShiftTimings,
    type,
    myFacility,
    currentViewDate,
  ]);

  const { createNotificationQuery } = useCreateNotification();
  const handleTestNotification = async () => {
    const employeeId = user?.attributes?.sub;
    try {
      const notificationInput = {
        peopleID: people.find((person) => person.id === employeeId)?.id,
        type: REMINDER,
        subject: "Test Notification",
        body: "This is a test notification",
      };

      await createNotificationQuery(notificationInput, [employeeId]);
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

  const renderPeopleDetails = () => {
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

    return (
      <div className="flex flex-col min-h-full px-3 pb-3">
        <div className="flex flex-col">
          <div className="flex flex-row py-1 justify-start space-x-4 items-center mb-2 mt-2">
            <BackButton onClick={onBackClick} />
            <PageHeader text={"People"} />
          </div>
        </div>
        <NurseSummary people={selectedDetailedPeople} setIsEdit={setIsEdit} />
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
            onClose={() => setOpen(false)}
            handleApplyFilter={() => setOpen(false)}
            handleResetFilter={() => {
              setFilters();
              setSelectedDate(null);
              setSelectedShiftTimings(null);
              setEmployeeName(null);
              setSelectedFacilityId(null);
              setSelectedRole(null);
              setShift(null);
              setShiftStatus(null);
              setOpen(false);
            }}
            setSelectedRole={setSelectedRole}
            setSelectedDate={setSelectedDate}
            setSelectedShiftTimings={setSelectedShiftTimings}
            selectedShiftTimings={selectedShiftTimings}
            selectedRole={selectedRole}
            selectedDate={selectedDate}
            setShift={setShift}
            shift={shift}
            people={employee}
            disableFacilities={true}
            disableStatus={true}
            disableDate={true}
          />
          <ScheduleSummary
            currentSummaryKey={currentSummaryKey}
            data={summaryShifts}
            onBackClick={() => {
              setOpen(false);
              setSummaryOpen(false);
            }}
            refetchShifts={refetchShifts}
            openModal={() => setOpen(true)}
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
            </div>
          </div>

          <div className="flex flex-grow h-full">
            <div className="w-[65%] space-y-2 ">
              <div className="flex flex-row ">
                <div className="flex flex-wrap w-full">
                  {summaryData.map((item, index) => (
                    <div key={index} className="w-1/6 p-1 flex ">
                      <SummaryCard
                        text={item.label}
                        shifts={summaryShifts?.[item.datakey]}
                        data={summaryShifts}
                        datakey={item.datakey}
                        icon={item.icon}
                        onClick={() => {
                          if (item.datakey !== "daily") {
                            handleSummaryCardClick(true, item.datakey);
                          }
                        }}
                        disableHover={item.datakey === "daily"}
                      />
                    </div>
                  ))}

                  <div className="w-[33.5%] p-1 flex">
                    <PercentageCard
                      title={"Efficient Fill Rate"}
                      percent={91}
                    />
                  </div>

                  <div className="w-[33%] p-1 flex">
                    <PercentageCard title={"No-show Rate"} percent={10} />
                  </div>
                </div>
              </div>

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
                dataComponents={<WhosOnComponent shifts={filteredTimecards} />}
              />
            </div>
            <div className="mx-1" />
            <div className="w-[35%]">
              <ShiftFullfilmentVisualization data={null} />
              <div className="my-2" />
              <InfoCard
                isCreateNews={true}
                title={"CareCrew Bulletin"}
                setSelectedTab={setSelectedTab}
                tabToSelect={"all_news"}
                dataComponents={news?.map((item, index) => (
                  <NewsCard
                    key={index}
                    index={index}
                    headline={item.headline}
                    news={draftRichToText(item.news)}
                    author={item?.author}
                    datetime={displayDatetime(item.createdAt)}
                  />
                ))}
              />
              <div className="my-2" />
              <InfoCard
                isCreateReminder={canCreateReminders}
                title={"Reminders"}
                setSelectedTab={setSelectedTab}
                tabToSelect={"all_reminders"}
                dataComponents={reminders?.slice(0, 5).map((reminder) => (
                  <MinimalReminderItem key={reminder.id} reminder={reminder} />
                ))}
              />
              <div className="my-2" />
              {type === FACILITY ? (
                <InfoCard
                  title={"CareCrew Bulletin"}
                  setSelectedTab={setSelectedTab}
                  tabToSelect={"all_news"}
                  dataComponents={news?.map((item, index) => (
                    <NewsCard
                      key={index}
                      limitText={true}
                      index={index}
                      headline={item.headline}
                      news={draftRichToText(item.news)}
                      author={item?.author}
                      datetime={displayDatetime(item.createdAt)}
                    />
                  ))}
                />
              ) : (
                <InfoCard
                  title={"Available Employees"}
                  tabToSelect={"available_employees"}
                  setSelectedTab={setSelectedTab}
                  dataComponents={availableEmployees?.map((employee, index) => (
                    <AvailableEmployee
                      key={index}
                      employee={employee}
                      startTime={employee.startTime}
                      endTime={employee.endTime}
                    />
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
