import React, { useState, useEffect, useMemo } from "react";

import SummaryCard from "../../components/SummaryCard";
import EmployeeSummaryCard from "../../components/SummaryCard/EmployeeSummaryCard";
import PageHeader from "../../components/Headers/PageHeader";
import InfoCard from "../../components/InfoCards";
import WhosOnItem from "../../components/WhosOn";
import UpcomingShiftItem from "../../components/UpcomingShiftItem";
import NewsCard from "../../components/NewsCard";
import moment from "moment";

import AvailabilityIcon from "../../assets/icons/menuIcons/availability";
import SettingsIcon from "../../assets/icons/menuIcons/settings";

import DownChevron from "../../assets/icons/downChevron";
import PayrollIcon from "../../assets/icons/menuIcons/reports";

import NavTab from "../../components/NavTab";

import { useSpring, animated } from "react-spring";

import ScheduleSummary from "../Schedules/ScheduleSummary";

import { LIST_TIMECARDS } from "../../apolloql/queries";
import { useQuery, gql } from "@apollo/client";

import { useAdmin, useAuth } from "../../context";
import { enrichWhosOn } from "../../services/whosOnService";

import { useLocation, useNavigate } from "react-router-dom";

import {
  displayDate,
  displayDatetime,
  draftRichToText,
  formatDateToAWS,
  reverseFormatDate,
} from "../../services/micro";

import { useListUpcomingTimecards } from "../../apolloql/timecards";
import UpcomingShiftModal from "../../components/UpcomingShiftItem/UpcomingShiftModal";
import { useListNews } from "../../apolloql/news";
import themeStyles from "../../styles/theme.styles";
import DateDropDown from "../../components/DateDropDown";
import {
  useListMarketplace,
  useListMarketplaceCount,
} from "../../apolloql/schedules";
import { ScaleHover } from "../../styles/animations";
import AllNews from "../../components/AllNews";
import { useListReminders } from "../../apolloql/reminders";
import MinimalReminderItem from "../../components/AllReminders/MinimalReminderItem";
import AllReminders from "../../components/AllReminders";

const summaryData = [
  {
    points: 42,
    label: "Marketplace",
    gradient: false,
    icon: null,
    url: "/marketplace",
  },
  {
    points: -1,
    label: "My Account",
    gradient: true,
    icon: <SettingsIcon color={themeStyles.SECONDARY_COLOR} />,
    url: "/myProfile",
  },
  {
    points: -1,
    label: "My Availability",
    gradient: true,
    icon: <AvailabilityIcon color={themeStyles.SECONDARY_COLOR} />,
    url: "/availability",
  },
  {
    points: -1,
    label: "Payroll",
    gradient: true,
    icon: <PayrollIcon color={themeStyles.SECONDARY_COLOR} />,
    url: "/payroll",
  },
];

// const [animationProps, setAnimationProps] = useSpring(() => ({
//   scale: 1,
// }));

const Dashboard = () => {
  const [summaryOpen, setSummaryOpen] = useState(false);

  const [upcomingShiftDetails, setUpcomingShiftDetails] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    // console.log(selectedPeople);
    setModalIsOpen(false);
  };

  const { shiftsCount, refetch: refetchMarketplaceCount } =
    useListMarketplaceCount();

  const navigate = useNavigate();

  const { user, type, personalData } = useAuth();

  const [currentTab, setCurrentTab] = useState("Scheduled");
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const handleCurrentViewDateChange = (eventDate) => {
    // console.log("handleCurrentViewDateChange", eventDate, datakey);
    setCurrentViewDate(eventDate);
  };

  const { news } = useListNews({ date: currentViewDate, receiver: type });

  // const { loading, error, data } = useQuery(LIST_TIMECARDS);
  // // const { people } = useAdmin();
  // const [timecards, setTimecards] = useState([]);

  // const [filteredTimecards, setFilteredTimecards] = useState([]);

  const { timecards } = useListUpcomingTimecards(
    user?.attributes?.sub,
    currentViewDate //.toISOString().split("T")[0]
  );

  const upcomingShifts = useMemo(() => {
    // setUpcomingShiftDetails(upcomingShifts[0]);
    // setModalIsOpen(true);
    return timecards
      .sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
      })
      .filter((obj) => {
        return new Date() < new Date(obj?.shift?.shiftEndDT) && !obj?.isCallOff;
        // return true && !obj?.isCallOff;
      });
  }, [timecards]);

  const navTabs = [
    { title: "Scheduled", amount: 0, isActive: true },
    { title: "Clocked In", amount: 104, isActive: false },
  ];

  const { shifts: marketShifts } = useListMarketplace(
    undefined, //filters?.facility, //facilityID,
    personalData?.role, //role,
    undefined //filters?.date //date
  );

  // const shiftPool = upcomingShifts.map((shift) => shift?.shiftsID);

  const { timecards: upcomingShifts_pool } = useListUpcomingTimecards(
    personalData?.id,
    false,
    undefined //currentViewDate.toISOString().split("T")[0]
  );

  const marketplaceItems_COUNT = useMemo(() => {
    // Get the current date and time
    // const currentDateTime = new Date();

    // // marketShifts;
    console.log(
      "🚀 ~ file: EmployeeDashboard.js:151 ~ constmarketplaceItems_COUNT=useMemo ~ marketShifts:",
      marketShifts,
      personalData?.role
    );

    const shiftPool = upcomingShifts_pool.map((shift) => shift?.shiftsID);
    console.log(
      "🚀 ~ file: EmployeeDashboard.js:173 ~ constmarketplaceItems_COUNT=useMemo ~ shiftPool:",
      shiftPool
    );

    return marketShifts?.length
      ? marketShifts?.filter((shift) => {
          const shiftEndDateTime = new Date(shift?.shiftEndDT);
          if (shiftEndDateTime < currentViewDate) {
            return false;
          }

          // LOGIC START: Accept a shift only if the shifts aren't overlapping any times
          const hasOverlappingTimecard = upcomingShifts.some((timecard) => {
            const existingStart = new Date(timecard.desiredClockInTime);
            const existingEnd = new Date(timecard.desiredClockOutTime);
            const newStart = new Date(shift.shiftStartDT);
            const newEnd = new Date(shift.shiftEndDT);

            // Check for overlapping time ranges
            return (
              (newStart < existingEnd && newStart >= existingStart) || // New shift starts within an existing shift
              (newEnd > existingStart && newEnd <= existingEnd) || // New shift ends within an existing shift
              (existingStart >= newStart && existingEnd <= newEnd) || // New shift completely covers an existing shift
              (existingStart < newStart && existingEnd > newEnd) // Existing shift completely covers the new shift
            );
          });

          if (hasOverlappingTimecard) {
            return false;
          }

          if (shiftPool.includes(shift?.id)) {
            return false;
          }

          if (new Date() > new Date(shift?.shiftStartDT)) return false;

          return true;
        }).length
      : 0;
  }, [marketShifts, upcomingShifts_pool]);

  const [selectedTab, setSelectedTab] = useState("dash");
  const onBackClick = async () => {
    setSelectedTab("dash");
  };

  const { reminders } = useListReminders({
    type: type,
    date: formatDateToAWS(currentViewDate),
  });
  const filterReminders = useMemo(() => {
    return reminders?.filter((reminder) => {
      // Replace this condition with your actual filter condition
      return true;
    });
  }, [reminders]);

  return (
    <>
      {summaryOpen ? (
        <ScheduleSummary onBackClick={() => setSummaryOpen(false)} />
      ) : selectedTab === "dash" ? (
        <div className="p-3">
          <div className="flex justify-start flex-1 z-50">
            <PageHeader text={"Dashboard"} />
            <div
              className={`ml-2 flex flex-1 flex-row gap-2 items-center justify-center ${ScaleHover}`}
            >
              <DateDropDown
                date={currentViewDate}
                onChange={handleCurrentViewDateChange}
              />
              {/* <DownChevron color={"rgba(2, 5, 10, 0.50)"} size={6} /> */}
            </div>
          </div>
          <div className="flex flex-wrap">
            {summaryData.map((item, index) => (
              <div
                className="w-1/5 p-1 flex "
                // onClick={() => {
                //   navigate(item.url);
                // }}
              >
                <EmployeeSummaryCard
                  text={item.label}
                  points={
                    item.label === "Marketplace"
                      ? marketplaceItems_COUNT
                      : item?.points
                  }
                  gradient={item.gradient}
                  icon={item.icon}
                  onClick={() => {
                    navigate(item.url);
                    // setSummaryOpen(true);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="my-3" />

          <div className="flex flex-grow h-full">
            <div className="w-1/2 ">
              <InfoCard
                title={"Upcoming Shifts"}
                dataComponents={upcomingShifts
                  // .slice(0, 5)
                  .map((item, index) => {
                    return (
                      <UpcomingShiftItem
                        facilityName={item?.facility?.facilityName}
                        // datetime={displayDate(item?.shift?.date)}
                        timecard={item}
                        activity={"ACTIVITY"}
                        onClick={() => {
                          setUpcomingShiftDetails(item);
                          setModalIsOpen(true);
                        }}
                      />
                    );
                  })}
              />
            </div>
            <div className="mx-1" />
            <div className="w-1/2">
              <InfoCard
                title={"Instacare Bulletin"}
                // viewAllFunction={() => navigate("/news")}
                viewAllClick={() => setSelectedTab("all_news")}
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
              <div className="my-2" />
              <InfoCard
                isCreateReminder={false}
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
            </div>
          </div>

          <UpcomingShiftModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            upcomingShiftDetails={upcomingShiftDetails}
            disableActions={false}
          />
        </div>
      ) : selectedTab === "all_news" ? (
        <AllNews onBackClick={onBackClick} />
      ) : selectedTab === "all_reminders" ? (
        <AllReminders onBackClick={onBackClick} />
      ) : null}
    </>
  );
};

export default Dashboard;
