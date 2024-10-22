import React, { useState, useRef, useEffect } from "react";
import IconButton from "../../components/Button/IconButton";
import theme from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";
import NavTab from "../../components/NavTab";
import FacilityDetails from "./FacilityDetails";
import FacilityMembers from "./FacilityMembers";
import AddFacility from "../AddFacility";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import PageNav from "../../components/PageNav";
import TableRow from "../../components/TableRow";
import Table from "../../components/Table";

import BackButton from "../../components/Button/BackButton";

import TrashIcon from "../../assets/icons/delete";
import FilterButton from "../../components/Button/FilterButton";
import { useNavigate } from "react-router-dom";

import { useAdmin, useAuth } from "../../context";
import {
  useDeleteFacility,
  useListFacilities,
} from "../../apolloql/facilities";
import { EMPLOYEE, ADMIN } from "../../constants/userTypes";
import { PuffLoader } from "react-spinners";
import themeStyles from "../../styles/theme.styles";

import { Storage } from "aws-amplify";
import { onUpdateFacility } from "../../graphql/subscriptions";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { ErrorToast, SuccessToast } from "../../services/micro";
import { deletePeople, deletePeopleFacility } from "../../graphql/mutations";
import { deleteBulkUsers } from "../../services/bulkUserCreation";
import { useDeletePeople } from "../../apolloql/people";
import { SUPER_ADMIN } from "../../constants/permissions";
import { getFacility } from "../../graphql/queries";
import ConfirmationModal from "../../components/ConfirmationModal";

const TABLE_HEAD = [
  "",
  "Name",
  "Contact Person",
  "Phone Number",
  "Email",
  "Document",
  "Action",
];

const Facilities = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const { people, permissions } = useAdmin();

  const { type, user } = useAuth();

  const isSuperAdmin = SUPER_ADMIN === user?.attributes?.email;
  const canPutOnAdminHold = isSuperAdmin;

  const {
    facilities,
    loading,
    refetch: refetchFacilities,
  } = useListFacilities();
  const filteredFacilities = facilities?.filter((facility) =>
    facility?.facilityName?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  // SUBSCRIPTION DISABLED
  useEffect(() => {
    const subscriptionFacility = API.graphql(
      graphqlOperation(onUpdateFacility)
    ).subscribe({
      next: async ({
        value: {
          data: { onUpdateFacility },
        },
      }) => {
        if (onUpdateFacility) {
          if (refetchFacilities) {
            refetchFacilities();
          }
        }
      },
      error: (error) => {
        console.error("Error with the facilities subscription: ", error);
      },
    });

    return () => {
      subscriptionFacility.unsubscribe();
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // adjust this as needed
  const totalPages = Math.ceil(people.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = people.slice(startIndex, endIndex);
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

  const [selectedFacility, setSelectedFacility] = useState(null);

  const onBackClickHandler = () => {
    setSelectedFacility(null);
  };

  const [currentTab, setCurrentTab] = useState("About");
  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
  };

  let peopleArray = selectedFacility?.FacilityPeople?.items
    .filter((obj) => obj._deleted !== true)
    ?.map((item) => item.people);

  const navTabs = [
    { title: "About", amount: 0, isActive: true },
    { title: "Members", amount: peopleArray?.length, isActive: false },
  ];

  let tabContent;
  if (currentTab === "About") {
    tabContent = (
      <FacilityDetails
        facility={selectedFacility}
        editAction={() => setIsEdit(true)}
      />
    );
  } else if (currentTab === "Members") {
    tabContent = <FacilityMembers people={peopleArray} />;
  }

  const [isDownloadMode, setIsDownloadMode] = useState(false);

  const renderFacilityDetails = () => {
    return (
      <div
        id="facilityDetailsToPrint"
        className={`flex flex-col min-h-full px-3 pb-3 ${
          isDownloadMode ? "absolute -z-10" : ""
        }`}
      >
        <div className="flex flex-col">
          <div className="flex flex-row py-1 justify-start space-x-2 items-center mb-2 mt-2">
            <BackButton onClick={onBackClickHandler} />
            <PageHeader text={selectedFacility?.facilityName} />
          </div>
        </div>
        {/* Navigation Tabs */}
        <div>
          <div className="flex flex-col">
            {type === ADMIN ? (
              <div className="w-full h-10 bg-white flex">
                {navTabs.map((tab, index) => (
                  <NavTab
                    key={index}
                    title={tab.title}
                    amount={tab.title === "Members" ? tab.amount : ""}
                    isActive={currentTab === tab.title}
                    onClick={() => handleTabChange(tab.title)}
                  />
                ))}
              </div>
            ) : null}
            <div>{tabContent}</div>
          </div>
        </div>
      </div>
    );
  };

  const downloadAction = (facility) => {
    if (!facility.documents || !facility.documents.key) {
      console.error("No document key found for the facility!");
      return;
    }

    const storageKey = facility.documents.key;

    // Use regex to extract the filename. Assumes format: UUID_timestamp_filename.ext
    const filenameMatch = storageKey.match(/^[a-f0-9-]+_\d+_(.+)$/i);
    const filename = filenameMatch ? filenameMatch[1] : storageKey;

    // Get the file URL from Amplify Storage
    Storage.get(storageKey, { level: "public" })
      .then((url) => {
        fetch(url)
          .then((response) => response.blob())
          .then((blob) => {
            const localUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = localUrl;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
      })
      .catch((err) => console.error("Error fetching file: ", err));
  };

  const renderEditFacility = () => {
    return (
      <AddFacility
        isEdit={true}
        selectedObj={selectedFacility}
        goBackHandler={() => {
          setIsEdit(false);
          setSelectedFacility(null);
        }}
        refetchFacilities={refetchFacilities}
      />
    );
  };

  const renderAddFacility = () => {
    return (
      <AddFacility
        goBackHandler={() => {
          setIsAdd(false);
          setSelectedFacility(null);
        }}
        refetchFacilities={refetchFacilities}
      />
    );
  };
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  async function fetchUsersByEmails(emails) {
    const fetchedEmails = [];

    const listPeople = /* GraphQL */ `
      query ListPeople(
        $filter: ModelPeopleFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            id
            firstName
            lastName
            phoneNumber
            email
            _version
          }
          nextToken
          startedAt
          __typename
        }
      }
    `;

    for (const email of emails) {
      try {
        const response = await API.graphql(
          graphqlOperation(listPeople, {
            filter: {
              email: {
                eq: email,
              },
              _deleted: {
                ne: true,
              },
            },
          })
        );

        fetchedEmails.push(...response.data.listPeople?.items);
      } catch (error) {
        console.error(`Error fetching user by email ${email}:`, error);
      }
    }

    return fetchedEmails;
  }

  const { deletePeopleQuery } = useDeletePeople();
  const { deleteFacilityQuery } = useDeleteFacility();

  const deleteFacility = async (facility) => {
    try {
      const associatedPeople = await fetchUsersByEmails(
        facility.contacts.map((contact) => contact.email)
      );

      for (let person of facility.contacts) {
        const temp = { Username: person?.email };
        await deleteBulkUsers(temp);
      }

      for (let person of associatedPeople) {
        await deletePeopleQuery({ id: person?.id, _version: person?._version });
      }

      for (let facilityPeople of facility?.FacilityPeople?.items) {
        try {
          await API.graphql(
            graphqlOperation(deletePeopleFacility, {
              input: {
                id: facilityPeople?.id,
                _version: facilityPeople?._version,
              },
            })
          );
        } catch (error) {
          console.error("Error deleting Facility-People association: ", error);
        }
      }

      await deleteFacilityQuery({
        id: facility?.id,
        _version: facility?._version,
      });

      await refetchFacilities();

      SuccessToast(
        "Facility and its associated people were deleted successfully!"
      );
    } catch (error) {
      console.error(
        "Error deleting the facility and associated people: ",
        error
      );
      ErrorToast(
        "Error deleting the facility and its associated people. Please try again."
      );
    }
  };

  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [personToHold, setPersonToHold] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");

  return (
    <>
      {isAdd ? (
        renderAddFacility()
      ) : isEdit ? (
        renderEditFacility()
      ) : selectedFacility === null ? (
        <div className="flex flex-col min-h-full px-3 pb-3">
          <div className="flex flex-col mx-2">
            <div className="flex py-1 justify-start">
              <div className="flex flex-col md:flex-row items-center justify-between w-full">
                <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
                  <PageHeader text={"Facilities"} />

                  <input
                    type="text"
                    id="people_search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="text-sm rounded-full ps-3.5 h-8 w-full md:w-80 mt-2 md:mt-0 md:ml-6"
                    placeholder="Search by name"
                  />
                </div>
                {type === ADMIN ? (
                  <div className="mt-2 md:mt-0">
                    <IconButton
                      color={theme.SECONDARY_COLOR}
                      text={"+ADD FACILITY"}
                      onClick={() => {
                        setIsAdd(true);
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
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
              disableFilter
              data={filteredFacilities || []}
              config={"facilities"}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
              createPageNumbers={createPageNumbers}
              TABLE_HEAD={TABLE_HEAD}
              setSelectedFacility={setSelectedFacility}
              editAction={() => setIsEdit(true)}
              disableEdit={type === EMPLOYEE ? true : false}
              downloadAction={downloadAction}
              deleteAction={isSuperAdmin ? deleteFacility : false}
            />
          )}
        </div>
      ) : null}

      <ConfirmationModal
        modalIsOpen={isDeleteConfirmModalOpen}
        closeModal={() => setIsDeleteConfirmModalOpen(false)}
        message={warningMessage}
        onConfirm={() => {
          console.log("Hold facility");
        }}
        onCancel={() => {
          setIsDeleteConfirmModalOpen(false);
        }}
      />

      {selectedFacility && !isEdit && renderFacilityDetails()}
      {isDownloadMode && renderFacilityDetails()}
    </>
  );
};

export default Facilities;
