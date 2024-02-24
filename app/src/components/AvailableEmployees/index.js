import React, { useState, useMemo } from "react";
import PageHeader from "../Headers/PageHeader";
import DateDropDown from "../DateDropDown";
import IconButton from "../../components/Button/IconButton";
import DualDatePicker from "../../components/DatePicker/DualDatePicker";
import OptionTab from "../../components/NavTab/OptionTab";
import DeleteIcon from "../../assets/icons/deleteIcon";
import FilterIcon from "../../assets/icons/filter";
import themeStyles from "../../styles/theme.styles";
import { useNavigate } from "react-router-dom";
import { Card } from "@material-tailwind/react";
import { useListAvailablePeople, useListPeople } from "../../apolloql/people";
import PageNav from "../../components/PageNav";
import { ADMIN, EMPLOYEE } from "../../constants/userTypes";
import { PuffLoader } from "react-spinners";
import Table from "../../components/Table";
import BackButton from "../../components/Button/BackButton";
import AvailableEmployeesFilter from "../Drawers/AvailableEmployeesFilter";
import { useAuth } from "../../context";

import NurseSummary from "../../screens/PeopleDetails/NurseSummary";
import NurseAccountInfo from "../../screens/PeopleDetails/NurseAccountInfo";
import NurseReviews from "../../screens/PeopleDetails/NurseReviews";
import NurseDocuments from "../../screens/PeopleDetails/NurseDocuments";
import NurseChecklists from "../../screens/PeopleDetails/NurseChecklists";
import NavTab from "../NavTab";

function AvailableEmployees({ onBackClick }) {
  const { type } = useAuth();

  const [filters, setFilters] = useState({
    role: undefined,
    status: undefined,
    timing: undefined,
  });

  const updateFilter = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const resetFilter = () => {
    setFilters({
      role: undefined,
      status: undefined,
      timing: undefined,
    });
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let date = new Date();
  const navigate = useNavigate();
  const { people, loading, error } = useListAvailablePeople({
    type: EMPLOYEE,
    role: filters?.role,
    status: filters?.status,
  });
  const itemsPerPage = 21; // adjust this as needed
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(null);

  const [open, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onBackClickHandler = () => {
    // console.log("Going back on facility");
    setSelectedPeople(null);
  };

  const DAYS_MAP = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const availableEmployees = useMemo(() => {
    const flattenedItems = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to start of the day for accurate comparison

    // Ensure dates are in correct format
    const filterStartDate = startDate
      ? new Date(startDate + "T00:00:00.000")
      : null;
    const filterEndDate = endDate ? new Date(endDate + "T00:00:00.000") : null;

    people.forEach((item) => {
      const availability = JSON.parse(item.availability || "{}");

      const weekdays = availability.availability || {};
      const weekRange = availability.week || "";

      let startDate = null;

      if (weekRange !== "All") {
        // Extract the start date from the weekRange if it's not "All"
        const [startDateStr] = weekRange.split(" - ");
        startDate = new Date(startDateStr);
      }

      DAYS_MAP.forEach((day, index) => {
        if (weekdays[day] && weekdays[day].available) {
          let exactDate;

          if (weekRange === "All") {
            exactDate = day;
          } else {
            exactDate = new Date(startDate);
            exactDate.setDate(startDate.getDate() + index);
          }

          // Check if the exactDate is not before the currentDate and falls within the filter range
          const isInDateRange =
            weekRange === "All" ||
            ((!filterStartDate || exactDate >= filterStartDate) &&
              (!filterEndDate || exactDate <= filterEndDate) &&
              exactDate >= currentDate);

          if (isInDateRange) {
            flattenedItems.push({
              id: item?.id,
              role: item?.role,
              profilePicture: item?.profilePicture,
              firstName: item?.firstName,
              lastName: item?.lastName,
              email: item?.email,
              startTime: weekdays[day].startTime,
              endTime: weekdays[day].endTime,
              day:
                weekRange === "All"
                  ? `${day} (All weeks)`
                  : exactDate.toDateString(),
            });
          }
        }
      });
    });

    return flattenedItems;
  }, [people, startDate, endDate]);

  const selectedDetailedPeople = useMemo(() => {
    return people?.find((item) => item?.id === selectedPeople?.id);
  }, [selectedPeople]);

  let employees = [];
  if (!loading && !error) {
    employees = people.filter((person) => person.type === EMPLOYEE);
  }
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const handleDateChange = (startOrEnd, value) => {
    if (startOrEnd === "start") {
      setStartDate(value);
    } else if (startOrEnd === "end") {
      setEndDate(value);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const TABLE_HEAD = [
    "",
    "Name",
    "ID",
    "Date",
    "Profile",
    "Available Time/Hours",
    "Email",
    "Action",
  ];

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

  const navTabs =
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
  const [currentTab, setCurrentTab] = useState("Account Info");
  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
  };

  let tabContent;
  if (currentTab === "Account Info") {
    tabContent = <NurseAccountInfo people={selectedPeople} type={type} />;
  } else if (currentTab === "Checklists") {
    tabContent = <NurseChecklists people={selectedPeople} />;
  } else if (currentTab === "Reviews") {
    tabContent = <NurseReviews people={selectedPeople} type={type} />;
  } else if (currentTab === "Documents") {
    tabContent = <NurseDocuments people={selectedPeople} />;
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
        <NurseSummary
          people={selectedDetailedPeople}
          setIsEdit={setIsEdit}
          editDisabled={true}
        />
        {/*Navigation Tabs*/}
        <div>
          <div className="flex flex-col">
            {/* <div
              style={{ height: "50px" }}
              className="w-full bg-white flex mt-3"
            >
              {navTabs.map((tab, index) => (
                <NavTab
                  key={index}
                  title={tab.title}
                  amount={tab.title === "Members" ? tab.amount : ""}
                  // isActive={tab.isActive}
                  isActive={currentTab === tab.title}
                  onClick={() => handleTabChange(tab.title)}
                />
              ))}
            </div> */}
            <div>{tabContent}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {selectedPeople ? (
        renderPeopleDetails()
      ) : (
        <div className="flex flex-col min-h-max px-3 pb-3">
          <AvailableEmployeesFilter
            open={open}
            onClose={onClose}
            filters={filters}
            updateFilter={updateFilter}
            resetFilter={resetFilter}
          />
          <div className="flex flex-col">
            <div className="flex py-1 justify-between">
              <div className="flex items-center gap-2">
                <div onClick={onBackClick}>
                  <BackButton />
                </div>
                <PageHeader text={"Available Employees"} />
                <div className="mx-1" />
                <div className="">
                  <DateDropDown text={"18 March 2023"} />
                </div>
              </div>
            </div>

            <Card className="w-full p-3 flex flex-col justify-between ">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="flex text-xxs">Date Range</div>
                  <DualDatePicker
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleDateChange}
                  />
                </div>

                <div className="flex items-center">
                  <IconButton
                    onClick={onOpen}
                    color={themeStyles.PRIMARY_LIGHT_COLOR}
                    text={"Filter"}
                    icon={<FilterIcon size={8} />}
                  />
                </div>
              </div>
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
                  disableFilter
                  data={availableEmployees || []}
                  config={"available_employees"}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  createPageNumbers={createPageNumbers}
                  TABLE_HEAD={TABLE_HEAD}
                  // editAction={() => setIsEdit(true)}
                  // messageAction={()=>}

                  disableEdit={false}
                  disableHeader={true}
                  setSelectedPeople={setSelectedPeople}

                  // itemOnClick={(e) => {
                  //   e.preventDefault(); // Prevent default anchor tag behavior
                  //   navigate("/peopleDetails", { state: { amount: 7 } });
                  // }}
                />
              )}
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

export default AvailableEmployees;
