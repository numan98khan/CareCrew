import React, { useState, useMemo } from "react";

import EmployeeSummaryCard from "../../components/SummaryCard/EmployeeSummaryCard";
import PageHeader from "../../components/Headers/PageHeader";
import InfoCard from "../../components/InfoCards";
import UpcomingShiftItem from "../../components/UpcomingShiftItem";
import NewsCard from "../../components/NewsCard";

import AvailabilityIcon from "../../assets/icons/menuIcons/availability";
import SettingsIcon from "../../assets/icons/menuIcons/settings";
import PayrollIcon from "../../assets/icons/menuIcons/reports";

import { useAuth } from "../../context";
import { useNavigate } from "react-router-dom";

import {
  displayDatetime,
  draftRichToText,
  formatDateToAWS,
} from "../../services/micro";

import { useListUpcomingTimecards } from "../../apolloql/timecards";
import UpcomingShiftModal from "../../components/UpcomingShiftItem/UpcomingShiftModal";
import { useListNews } from "../../apolloql/news";
import themeStyles from "../../styles/theme.styles";
import DateDropDown from "../../components/DateDropDown";
import { useListMarketplace } from "../../apolloql/schedules";
import { ScaleHover } from "../../styles/animations";
import AllNews from "../../components/AllNews";
import { useListReminders } from "../../apolloql/reminders";
import MinimalReminderItem from "../../components/AllReminders/MinimalReminderItem";
import AllReminders from "../../components/AllReminders";

const Dashboard = () => {
  const [upcomingShiftDetails, setUpcomingShiftDetails] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { user, type, personalData } = useAuth();
  const navigate = useNavigate();

  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const handleCurrentViewDateChange = (eventDate) => {
    setCurrentViewDate(eventDate);
  };

  const [selectedTab, setSelectedTab] = useState("dash");

  const { news } = useListNews({ date: currentViewDate, receiver: type });
  const { timecards } = useListUpcomingTimecards(
    user?.attributes?.sub,
    currentViewDate
  );
  const { shifts: marketShifts } = useListMarketplace(
    undefined,
    personalData?.role,
    undefined
  );
  const { reminders } = useListReminders({
    type: type,
    date: formatDateToAWS(currentViewDate),
  });

  const upcomingShifts = useMemo(() => {
    return timecards
      .filter(
        (obj) =>
          new Date() < new Date(obj?.shift?.shiftEndDT) && !obj?.isCallOff
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [timecards]);

  const marketplaceItems_COUNT = useMemo(() => {
    const shiftPool = upcomingShifts.map((shift) => shift?.shiftsID);

    if (!marketShifts?.length) return 0;

    return marketShifts.filter((shift) => {
      const shiftEndDateTime = new Date(shift?.shiftEndDT);
      if (shiftEndDateTime < currentViewDate) return false;

      const hasOverlappingTimecard = upcomingShifts.some((timecard) => {
        const existingStart = new Date(timecard.desiredClockInTime);
        const existingEnd = new Date(timecard.desiredClockOutTime);
        const newStart = new Date(shift.shiftStartDT);
        const newEnd = new Date(shift.shiftEndDT);

        // Check for overlapping time ranges
        return (
          (newStart < existingEnd && newStart >= existingStart) ||
          (newEnd > existingStart && newEnd <= existingEnd) ||
          (existingStart >= newStart && existingEnd <= newEnd) ||
          (existingStart < newStart && existingEnd > newEnd)
        );
      });

      if (hasOverlappingTimecard || shiftPool.includes(shift?.id)) return false;
      if (new Date() > new Date(shift?.shiftStartDT)) return false;

      return true;
    }).length;
  }, [marketShifts, upcomingShifts, currentViewDate]);

  const filterReminders = useMemo(() => reminders || [], [reminders]);

  const summaryData = [
    {
      label: "Marketplace",
      gradient: false,
      icon: null,
      url: "/marketplace",
      points: marketplaceItems_COUNT,
    },
    {
      label: "My Account",
      gradient: true,
      icon: <SettingsIcon color={themeStyles.SECONDARY_COLOR} />,
      url: "/myProfile",
      points: -1,
    },
    {
      label: "My Availability",
      gradient: true,
      icon: <AvailabilityIcon color={themeStyles.SECONDARY_COLOR} />,
      url: "/availability",
      points: -1,
    },
    {
      label: "Payroll",
      gradient: true,
      icon: <PayrollIcon color={themeStyles.SECONDARY_COLOR} />,
      url: "/payroll",
      points: -1,
    },
  ];

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onBackClick = () => {
    setSelectedTab("dash");
  };

  return (
    <>
      {selectedTab === "dash" ? (
        <div className="p-3">
          <div className="flex justify-start flex-1 z-50">
            <PageHeader text="Dashboard" />
            <div
              className={`ml-2 flex flex-1 flex-row gap-2 items-center justify-center ${ScaleHover}`}
            >
              <DateDropDown
                date={currentViewDate}
                onChange={handleCurrentViewDateChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            {summaryData.map((item) => (
              <div key={item.label} className="w-1/5 p-1 flex">
                <EmployeeSummaryCard
                  text={item.label}
                  points={item.points}
                  gradient={item.gradient}
                  icon={item.icon}
                  onClick={() => navigate(item.url)}
                />
              </div>
            ))}
          </div>

          <div className="my-3" />

          <div className="flex flex-grow h-full">
            <div className="w-1/2">
              <InfoCard
                title="Upcoming Shifts"
                dataComponents={upcomingShifts.map((item) => (
                  <UpcomingShiftItem
                    key={item.id}
                    facilityName={item?.facility?.facilityName}
                    timecard={item}
                    activity="ACTIVITY"
                    onClick={() => {
                      setUpcomingShiftDetails(item);
                      setModalIsOpen(true);
                    }}
                  />
                ))}
              />
            </div>
            <div className="mx-1" />
            <div className="w-1/2">
              <InfoCard
                title="CareCrew Bulletin"
                viewAllClick={() => setSelectedTab("all_news")}
                dataComponents={news?.map((item) => (
                  <NewsCard
                    key={item.id}
                    index={item.id}
                    headline={item.headline}
                    news={draftRichToText(item.news)}
                    author={item?.author}
                    datetime={displayDatetime(item.createdAt)}
                  />
                ))}
              />
              <div className="my-2" />
              <InfoCard
                isCreateReminder={false}
                title="Reminders"
                setSelectedTab={setSelectedTab}
                tabToSelect="all_reminders"
                dataComponents={filterReminders.slice(0, 5).map((reminder) => (
                  <MinimalReminderItem key={reminder.id} reminder={reminder} />
                ))}
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
