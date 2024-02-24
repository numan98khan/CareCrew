import React, { useState, useMemo, useRef } from "react";

import themeStyles from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";
import NavTab from "../../components/NavTab";

import OpenIcon from "../../assets/icons/summaryIcons/open";
import DeleteIcon from "../../assets/icons/delete";
import FilterIcon from "../../assets/icons/filter";

import SummaryCard from "../../components/SummaryCard";

import ShiftCard from "../../components/ShiftCard";
import PageNav from "../../components/PageNav";
import IconIndicator from "../../components/IconIndicator";

import DateDropDown from "../../components/DateDropDown";
import IconButton from "../../components/Button/IconButton";

import SideModal from "../../components/SideModal";

import BackButton from "../../components/Button/BackButton";

import { useAdmin, useAuth } from "../../context";
import { useNavigate } from "react-router-dom";

import { useListPeople } from "../../apolloql/people";
import { useListShifts } from "../../apolloql/schedules";
import { useListFacilities } from "../../apolloql/facilities";
// import { displayTime } from "../../services/micro";

import DownChevron from "../../assets/icons/downChevron";
import ScheduleFilterModal from "../../components/Drawers/ScheduleFilterModal";
import ShiftDetailsModal from "./ShiftDetailsModal";
import { SUPER_ADMIN } from "../../constants/permissions";
import { EMPLOYEE } from "../../constants/userTypes";

const MODES = {
  SHIFT_DETAILS: "shiftDetails",
  ADD_MEMBERS: "addMembers",
  SHIFT_EDIT: "shiftEdit",
};

const displayTime = (timestring) => {
  return new Date(timestring)?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const SchedulesSummary = ({
  onBackClick,
  currentSummaryKey,
  data,
  openModal,
  currentViewDate,
  setCurrentViewDate,
  handleCurrentViewDateChange,
  refetchShifts,
}) => {
  // const { shifts } = useAdmin();

  const navigate = useNavigate();
  // console.log(shifts);

  const [dataKey, setDataKey] = useState(currentSummaryKey);

  const navTabs = [
    {
      title: "Open Shifts",
      amount: data?.open
        ?.map((obj) => {
          const numOfPositions = obj?.numOfPositions || "1";
          return typeof numOfPositions === "string"
            ? parseInt(numOfPositions, 10)
            : numOfPositions;
        })
        .reduce((acc, curr) => acc + curr, 0),
      isActive: true,
      tag: "isAssigned",
      datakey: "open",
    },
    {
      title: "Confirmed Shifts",
      amount: data?.confirmed?.length,
      isActive: false,
      datakey: "confirmed",
    },
    {
      title: "Shifts in Progress",
      amount: data?.inprogress?.length,
      isActive: false,
      datakey: "inprogress",
    },
    {
      title: "Completed Shifts",
      amount: data?.completed?.length,
      isActive: false,
      datakey: "completed",
    },
    {
      title: "Call Off Shifts",
      amount: data?.calloffs?.length,
      isActive: false,
      datakey: "calloffs",
    },
    {
      title: "Facility Cancellations",
      amount: data?.cancelled?.length,
      isActive: false,
      datakey: "cancelled",
    },
    {
      title: "Late",
      amount: data?.late?.length,
      isActive: false,
      datakey: "late",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // adjust this as needed
  const totalPages = Math.ceil(data?.[dataKey].length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [currentTab, setCurrentTab] = useState(
    navTabs.find((item) => item.datakey === dataKey)?.title
  );
  // const [currentTab, setCurrentTab] = useState(navTabs.find((item) => (item.tag === "isAssigned" ? item.isActive : item.tag === "isAssigned" ? item.isActive : item.isActive)));
  const handleTabChange = (newTab) => {
    setDataKey(navTabs.find((item) => item.title === newTab).datakey);
    setCurrentTab(newTab);
  };

  const currentItems = data?.[dataKey]?.filter((obj) =>
    obj?.__typename === "Shifts"
      ? (typeof obj?.numOfPositions === "string"
          ? parseInt(obj?.numOfPositions, 10)
          : obj?.numOfPositions) > 0
      : true
  );

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

  const [isOpen, setIsOpen] = useState(false);

  const { people, loading } = useListPeople();
  const { facilities } = useListFacilities();
  const { shifts } = useListShifts();

  const { user, type, myFacility, permissions } = useAuth();
  const isSuperAdmin = SUPER_ADMIN === user?.attributes?.email;
  const canDeleteShift =
    type === EMPLOYEE
      ? false
      : isSuperAdmin
      ? true
      : permissions.permissions?.find((obj) => obj?.name === "Delete Schedule")
          ?.isSelected;

  const buttonRef = useRef();
  const [shift, setShift] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mode, setMode] = useState(MODES.SHIFT_DETAILS);

  const [selectedShift, setSelectedShift] = useState([]);
  const [selectedTimecard, setSelectedTimecard] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState([]);
  const [selectedFacilityDetails, setSelectedFacilityDetails] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [assignedTo, setAssignedTo] = useState();
  const [open, setOpen] = useState(false);

  const openDetailsModal = (shift, timecard) => {
    // console.log(
    //   "🚀 ~ file: index.js:235 ~ openModal ~ shift:",
    //   shift,
    //   timecard
    // );

    setSelectedShift(shift);
    setSelectedTimecard(timecard);
    setSelectedFacilityDetails(
      facilities?.find((facility) => facility.id === shift.facilityID)
    );
    setModalIsOpen(true);
  };

  const closeModal = () => {
    if (MODES.SHIFT_DETAILS) {
      setSelectedPeople([]);
    }

    if (MODES.ADD_MEMBERS) {
      setMode(MODES.SHIFT_DETAILS);
    }
    // console.log(selectedPeople);
    setModalIsOpen(false);
  };

  const filteredPeople = useMemo(() => {
    // console.log("Chatrooms in Messaging!!", chatrooms);

    return people.filter((person) => {
      // Replace this condition with your actual filter condition
      return person.id;
    });
  }, [people]);

  return (
    <div className="h-full flex flex-col min-h-max px-3 pb-3">
      <div className="flex flex-col">
        <div className="flex py-1 justify-between">
          <div className="flex items-center">
            <BackButton onClick={onBackClick} />
            <div className="mx-1" />
            <PageHeader text={"Shifts"} />
            <div className="mx-1" />
            {/* <div className="">
              <DateDropDown text={"18 March 2023"} />
            </div> */}
            <div className="ml-2 flex flex-row gap-2 items-center justify-center">
              <DateDropDown
                date={currentViewDate}
                onChange={handleCurrentViewDateChange}
              />
              <DownChevron color={"rgba(2, 5, 10, 0.50)"} size={6} />
            </div>
          </div>

          <div className="flex items-center">
            <IconButton
              onClick={() => {
                navigate("/addshift");
              }}
              color={themeStyles.SECONDARY_COLOR}
              text={"+ADD SHIFT"}
            />
          </div>
        </div>

        <div className="w-full h-10 bg-white flex">
          {navTabs.map((tab, index) => (
            <NavTab
              key={index}
              title={tab.title}
              amount={tab.amount}
              // amount={data?.[tab.datakey]?.length}
              // isActive={tab.isActive}
              isActive={currentTab === tab.title}
              onClick={() => handleTabChange(tab.title)}
            />
          ))}
        </div>
      </div>

      {/* Info Board */}
      <div className="h-full flex flex-col bg-white mt-2 p-3 rounded-lg item-center justify-between">
        <div>
          <div className="flex justify-end items-center">
            {/* <div className="flex text-xs px-2 pb-1 items-center">
              <strong>{data?.[dataKey].length}</strong> <div className="m-1" />
              {currentTab} found out of <div className="m-1" />{" "}
              <strong>{data?.[dataKey].length}</strong> <div className="m-1" />
              shifts
            </div> */}
            <div className="flex items-center">
              <IconButton
                color={themeStyles.PRIMARY_LIGHT_COLOR}
                text={"Filter"}
                icon={<FilterIcon size={8} />}
                onClick={() => openModal()}
              />
            </div>
          </div>

          <div className="flex flex-wrap mb-3">
            {currentItems?.map((item, index) => {
              const peopleObj = filteredPeople.find(
                (people) => people.id === item.peopleID
              );
              const isTimecard = item.__typename === "Timecard";

              const numOfPositions = isTimecard
                ? item?.person?.firstName + " " + item?.person?.lastName
                : item?.numOfPositions + " Quantity";

              const facility = facilities?.find(
                (facility) =>
                  facility.id ===
                  (isTimecard ? item?.shift?.facilityID : item?.facilityID)
              );
              console.log(
                "🚀 ~ file: ScheduleSummary.js:314 ~ {currentItems?.map ~ facility:",
                facility
              );

              const shiftFetched = isTimecard
                ? shifts.find((shift_) => shift_.id === item.shiftsID)
                : item;

              return (
                <div
                  className="w-1/3 flex py-1 px-2"
                  // onClick={() =>
                  //   openDetailsModal(
                  //     isTimecard ? shiftFetched : item,
                  //     isTimecard ? item : null
                  //   )
                  // }
                >
                  <ShiftCard
                    numOfPositions={numOfPositions}
                    facility={facility?.facilityName}
                    shiftTiming={
                      (isTimecard
                        ? displayTime(item.clockInTime)
                        : displayTime(item.shiftStartDT)) +
                      " - " +
                      (isTimecard
                        ? displayTime(item.clockOutTime)
                        : displayTime(item.shiftEndDT))
                    }
                    type={
                      isTimecard
                        ? item?.shift?.roleRequired
                        : item?.roleRequired
                    }
                    isAssigned={dataKey !== "open"}
                    isIncentive={item.isIncentive}
                    isGuarantee={item.isGuarantee}
                    isLate={item.isLate}
                    isCallOff={item.isCallOff}
                    isSelected={true}
                    // isSelected={false}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex px-2 items-center justify-between">
          <div className="flex">
            <PageNav
              text="<"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {createPageNumbers()}
            <PageNav
              text=">"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </div>

          <IconIndicator />
        </div>
      </div>

      <ShiftDetailsModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        selectedShift={selectedShift}
        selectedTimecard={selectedTimecard}
        selectedFacility={selectedFacility}
        setSelectedPeople={setSelectedPeople} // replace with your function or state setter
        assignedTo={assignedTo} // replace with your data or state
        setMode={setMode} // replace with your function or state setter
        buttonRef={buttonRef} // replace with your ref
        refetchShifts={refetchShifts}
        // openShiftEditModal={openShiftEditModal}
        //
        canDeleteShift={canDeleteShift}
        // handleDelete={handleDelete}
      />
    </div>
  );
};

export default SchedulesSummary;
