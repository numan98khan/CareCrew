import React, { useState, useEffect, useMemo } from "react";
import IconButton from "../../components/Button/IconButton";
import theme from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";
import PageNav from "../../components/PageNav";
import Table from "../../components/Table";

import BackButton from "../../components/Button/BackButton";
import NavTab from "../../components/NavTab";

import NurseSummary from "../PeopleDetails/NurseSummary";
import NurseAccountInfo from "../PeopleDetails/NurseAccountInfo";
import NurseReviews from "../PeopleDetails/NurseReviews";
import NurseDocuments from "../PeopleDetails/NurseDocuments";
import NurseChecklists from "../PeopleDetails/NurseChecklists";

import AddPeople from "../AddPeople";

import { useLocation, useNavigate } from "react-router-dom";

import {
  useCreatePeople,
  useDeletePeople,
  useListPeople,
  useUpdatePeople,
} from "../../apolloql/people";
import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";
import themeStyles from "../../styles/theme.styles";
import { PuffLoader } from "react-spinners";
import PeopleFilterModal from "../../components/Drawers/PeopleFilterModal";
import { useAuth } from "../../context";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { onUpdatePeople } from "../../graphql/subscriptions";
import { SUPER_ADMIN } from "../../constants/permissions";
import ConfirmationModal from "../../components/ConfirmationModal";
import { deleteBulkUsers } from "../../services/bulkUserCreation";
import { ErrorToast, SuccessToast } from "../../services/micro";
import { GET_PEOPLE } from "../../apolloql/queries";

const TABLE_HEAD = [
  "",
  "Name",
  "ID",
  "Status",
  "Profile",
  "Points",
  "Email",
  "Action",
];

const People = ({ route }) => {
  const location = useLocation();

  const [warningMessage, setWarningMessage] = useState("");

  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [personToDelete, setPersonToDelete] = useState(null);
  const [personToHold, setPersonToHold] = useState(null);

  const [isEdit, setIsEdit] = useState(location?.state?.isEdit || false);
  const [isAdd, setIsAdd] = useState(false);

  const { type, permissions, user } = useAuth();
  const isSuperAdmin = SUPER_ADMIN === user?.attributes?.email;
  const canWriteReview = isSuperAdmin
    ? true
    : permissions.permissions?.find((obj) => obj?.name === "Write Review")
        ?.isSelected;

  const canPutOnAdminHold = isSuperAdmin;

  // const [selectedPeople, setSelectedPeople] = useState(
  //   location?.state?.people || null
  // );
  const [selectedPeople, setSelectedPeople] = useState(null);
  // const [isAdd, setIsAdd] = useState(false);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [filters, setFilters] = useState({
    role: undefined,
    status: undefined,
    rating: undefined,
    points: undefined,
    activity: undefined,
    isAdminHold: undefined,
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
      rating: undefined,
      points: undefined,
      activity: undefined,
    });
  };

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // adjust this as needed
  // const { people, loading, error } = useListPeople();

  const {
    people,
    loading,
    error,
    refetch: refetchPeople,
  } = useListPeople({
    role: filters?.role,
    status: filters?.status,
    rating: filters?.rating,
    points: filters?.points,
    type: EMPLOYEE,
    lastActiveMinutes: filters?.activity,
    isAdminHold: filters?.isAdminHold,
  });

  const filteredEmployees = useMemo(() => {
    console.log(
      "🚀 ~ file: index.js:182 ~ filteredEmployees ~ people:",
      people
    );
    return people
      .filter(
        (person) =>
          person.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (person.firstName + " " + person.lastName)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
      .filter((obj) => (canPutOnAdminHold ? true : !obj?.adminHold));
  }, [people]);

  // let employees = [];
  // if (!loading && !error) {
  //   employees = people.filter((person) => person.type === EMPLOYEE);
  // }

  // const filteredEmployees = employees.filter(
  //   (person) =>
  //     person.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     person.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     (person.firstName + " " + person.lastName)
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase())
  // );

  const { createPeopleQuery } = useCreatePeople();

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredEmployees.slice(startIndex, endIndex);
  const [checked, setChecked] = useState(false);

  const onBackClickHandler = () => {
    // console.log("Going back on facility");
    setSelectedPeople(null);
  };

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

  const [userData, setUserData] = useState(null);
  const [refetchUser, setRefetchUser] = useState(false);

  useEffect(() => {
    if (selectedPeople?.id) {
      const fetchData = async () => {
        try {
          const result = (
            await API.graphql(
              graphqlOperation(GET_PEOPLE, { id: selectedPeople?.id })
            )
          )?.data?.getPeople;
          // console.log("🚀 ~ file: index.js:256 ~ fetchData ~ result:", result);
          setUserData(result); // Update state with fetched data
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          refetchPeople(false);
        }
      };

      fetchData(); // Trigger async data fetching
    }
  }, [selectedPeople, refetchUser]); // Dependency array ensures useEffect runs again if selectedPeople.id changes

  let tabContent;
  if (currentTab === "Account Info") {
    tabContent = <NurseAccountInfo people={userData} type={type} />;
  } else if (currentTab === "Checklists") {
    tabContent = (
      <NurseChecklists
        people={userData}
        goBackHandler={() => {
          setSelectedPeople(null);
          setIsEdit(false);
        }}
        refetchPeople={setRefetchUser}
      />
    );
  } else if (currentTab === "Reviews") {
    tabContent = (
      <NurseReviews
        people={userData}
        type={type}
        canWriteReview={canWriteReview}
      />
    );
  } else if (currentTab === "Documents") {
    tabContent = <NurseDocuments people={userData} />;
  }

  const renderPeopleDetails = () => {
    return (
      <div className="flex flex-col min-h-full px-3 pb-3">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row py-1 justify-start space-y-4 md:space-y-0 md:space-x-4 items-center mb-2 mt-2">
            <BackButton onClick={onBackClickHandler} />
            <PageHeader text={"People"} />
          </div>
        </div>
        {/* pass required props for each nurse */}
        <NurseSummary people={userData} setIsEdit={setIsEdit} />
        {/*Navigation Tabs*/}
        <div>
          <div className="flex flex-col">
            <div
              className="w-full bg-white flex flex-col md:flex-row justify-center md:justify-start mt-3"
              style={{ height: "auto", minHeight: "50px" }}
            >
              {navTabs.map((tab, index) => (
                <NavTab
                  key={index}
                  title={tab.title}
                  amount={tab.title === "Members" ? tab.amount : ""}
                  isActive={currentTab === tab.title}
                  onClick={() => handleTabChange(tab.title)}
                  className="text-sm md:text-base px-4 py-2 md:px-6" // Responsive padding
                />
              ))}
            </div>
            <div className="mt-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Content for the active tab */}
                {tabContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEditPeople = () => {
    return (
      <AddPeople
        isEdit={true}
        peopleObj={selectedPeople}
        goBackHandler={() => {
          setSelectedPeople(null);
          setIsEdit(false);
        }}
        refetchPeople={refetchPeople}
      />
    );
  };

  const renderAddPeople = () => {
    return (
      <AddPeople
        goBackHandler={() => setIsAdd(false)}
        refetchPeople={refetchPeople}
      />
    );
  };

  const { deletePeopleQuery } = useDeletePeople();
  const terminateEmployee = async (person) => {
    const temp = { Username: person?.email };

    try {
      await deleteBulkUsers(temp);
      SuccessToast("Successfully removed employee form UserPool");
    } catch (error) {
      ErrorToast("Error removing user from UserPool");
      setIsDeleteConfirmModalOpen(false);
      setPersonToDelete(null);
      return;
    }
    // const fetchedPeopleObj = removingContactPeople.find(
    //   (obj) => obj?.email === toRemoveContact?.email
    // );
    // console.log(
    //   "🚀 ~ file: hooks.js:368 ~ useFacilityOperations ~ fetchedPeopleObj:",
    //   fetchedPeopleObj
    // );

    const getPeople = /* GraphQL */ `
      query GetPeople($id: ID!) {
        getPeople(id: $id) {
          id
          surrogateID
          firstName
          lastName
          phoneNumber
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
      }
    `;

    try {
      const userData = await API.graphql(
        graphqlOperation(getPeople, { id: person?.id })
      );

      const peopleData = userData?.data?.getPeople;

      await deletePeopleQuery({
        id: peopleData?.id,
        _version: peopleData?._version,
      });

      SuccessToast("Successfully deleted people");
    } catch (error) {
      ErrorToast("Error deleting people" + error);
      setIsDeleteConfirmModalOpen(false);
      setPersonToDelete(null);
      return;
    }
    await refetchPeople();
    setIsDeleteConfirmModalOpen(false);
    setPersonToDelete(null);
  };

  const { updatePeopleQuery } = useUpdatePeople();

  const adminHoldEmployee = async (person) => {
    const getPeopleAdminHold = /* GraphQL */ `
      query GetPeople($id: ID!) {
        getPeople(id: $id) {
          id
          surrogateID
          firstName
          lastName
          adminHold
          phoneNumber
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
      }
    `;

    try {
      const userData = await API.graphql(
        graphqlOperation(getPeopleAdminHold, { id: person?.id })
      );

      const peopleData = userData?.data?.getPeople;

      const updatedPeople = {
        id: peopleData?.id,
        adminHold: peopleData?.adminHold ? false : true,
        _version: peopleData._version,
      };

      console.log("updatedPeople", updatedPeople);

      try {
        await updatePeopleQuery(updatedPeople);
        SuccessToast("User updated successfully");
      } catch (error) {
        console.error("Error updating people: ", error);

        ErrorToast("Error updating user");
      }
    } catch (error) {
      console.error(error);
      ErrorToast("Error deleting people" + error);
      setIsDeleteConfirmModalOpen(false);
      setPersonToDelete(null);
      return;
    }
    setIsDeleteConfirmModalOpen(false);
    setPersonToDelete(null);
  };

  return (
    <>
      {isAdd ? (
        renderAddPeople()
      ) : selectedPeople === null || isDeleteConfirmModalOpen ? (
        <div className="flex flex-col min-h-full px-3 pb-3">
          <PeopleFilterModal
            open={open}
            onClose={onClose}
            filters={filters}
            updateFilter={updateFilter}
            resetFilter={resetFilter}
          />
          <div className="flex flex-col mx-2">
            <div className="flex py-1 justify-start">
              <div className="flex flex-col md:flex-row items-center justify-between w-full">
                <div className="flex items-center space-y-2 md:space-y-0 md:space-x-6">
                  <PageHeader text={"People"} />
                  <input
                    type="text"
                    id="people_search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="text-sm rounded-full ps-3.5 h-8 w-full md:w-80 mt-2"
                    placeholder="Search by name"
                  />
                </div>
                {type === ADMIN && (
                  <div className="mt-2 md:mt-0">
                    <IconButton
                      color={theme.SECONDARY_COLOR}
                      text={"+ADD USER"}
                      onClick={() => setIsAdd(true)}
                    />
                  </div>
                )}
              </div>
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
              setFilterModalOpen={setOpen}
              data={currentItems}
              config={"people"}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
              createPageNumbers={createPageNumbers}
              TABLE_HEAD={TABLE_HEAD}
              setSelectedPeople={setSelectedPeople}
              editAction={() => {
                if (type === ADMIN) {
                  setIsEdit(true);
                }
              }}
              disableEdit={type !== ADMIN}
              deleteAction={(item) => {
                setPersonToDelete(item);
                setWarningMessage(
                  "Are you sure you want to terminate this employee?"
                );
                setIsDeleteConfirmModalOpen(true);
              }}
              adminHoldAction={(item) => {
                setPersonToHold(item);
                setWarningMessage(
                  item?.adminHold
                    ? "Are you sure you want to remove this employee from Admin Hold?"
                    : "Are you sure you want to put this employee on Admin Hold?"
                );
                setIsDeleteConfirmModalOpen(true);
              }}
              canPutOnAdminHold={canPutOnAdminHold}
            />
          )}

          <ConfirmationModal
            modalIsOpen={isDeleteConfirmModalOpen}
            closeModal={() => setIsDeleteConfirmModalOpen(false)}
            message={warningMessage}
            onConfirm={() => {
              if (
                warningMessage ===
                "Are you sure you want to terminate this employee?"
              ) {
                terminateEmployee(personToDelete);
              } else {
                adminHoldEmployee(personToHold);
              }
            }}
            onCancel={() => setIsDeleteConfirmModalOpen(false)}
          />
        </div>
      ) : isEdit ? (
        renderEditPeople()
      ) : (
        renderPeopleDetails()
      )}
    </>
  );
};
export default People;
