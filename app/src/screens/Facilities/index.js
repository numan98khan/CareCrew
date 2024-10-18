import React, { useState, useRef, useEffect } from "react";
import IconButton from "../../components/Button/IconButton";
import theme from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";
import NavTab from "../../components/NavTab";
import FacilityDetails from "./FacilityDetails";
import FacilityMembers from "./FacilityMembers";
import AddFacility from "../AddFacility";

// import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// import ShiftCard from "../../components/ShiftCard";
import PageNav from "../../components/PageNav";
// import FilterButton from "../../components/Button/FilterButton";
import TableRow from "../../components/TableRow";
// import IconIndicator from "../../components/IconIndicator";
import Table from "../../components/Table";

import BackButton from "../../components/Button/BackButton";

// import FilterIcon from "../../assets/icons/indicators/filter";
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
          // Call your context setters here

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

  // console.log("PPPP", people);

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
  // const [selectedFacility, setSelectedFacility] = useState(1);

  const onBackClickHandler = () => {
    // console.log("Going back on facility");
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
    // let peopleArray = selectedFacility?.FacilityPeople?.items?.map(
    //   (item) => item.people
    // );

    // navTabs[1].amount = peopleArray.length;

    // peopleArray
    console.log(
      "🚀 ~ file: index.js:179 ~ Facilities ~ peopleArray:",
      peopleArray
    );
    tabContent = <FacilityMembers people={peopleArray} />;
    // tabContent = null;
  }

  const [isDownloadMode, setIsDownloadMode] = useState(false);
  // const facilityDetailsRef = useRef(null);
  const renderFacilityDetails = () => {
    console.log("type", type);
    return (
      <div
        id="facilityDetailsToPrint"
        // ref={facilityDetailsRef}
        // className="flex flex-col min-h-full px-3 pb-3"
        className={`flex flex-col min-h-full px-3 pb-3 ${
          isDownloadMode ? "absolute -z-10" : ""
        }`}
      >
        <div className="flex flex-col">
          <div className="flex flex-row py-1 justify-start space-x-2 items-center mb-2  mt-2">
            <BackButton onClick={onBackClickHandler} />
            <PageHeader text={selectedFacility?.facilityName} />
          </div>
        </div>
        {/* pass required props for each nurse */}
        {/* <NurseSummary /> */}
        {/*Navigation Tabs*/}
        <div>
          <div className="flex flex-col">
            {type === ADMIN ? (
              <div className="w-full h-10 bg-white flex">
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
              </div>
            ) : null}
            <div>{tabContent}</div>
          </div>
        </div>
      </div>
    );
  };

  const downloadAction = (facility) => {
    // console.log(
    //   "🚀 ~ file: index.js:196 ~ downloadAction ~ facility:",
    //   facility
    // );
    if (!facility.documents || !facility.documents.key) {
      console.error("No document key found for the facility!");
      return;
    }

    const storageKey = facility.documents.key;

    // Use regex to extract the filename. Assumes format: UUID_timestamp_filename.ext
    const filenameMatch = storageKey.match(/^[a-f0-9-]+_\d+_(.+)$/i);
    const filename = filenameMatch ? filenameMatch[1] : storageKey; // Fallback to full key if regex fails

    // Get the file URL from Amplify Storage
    Storage.get(storageKey, { level: "public" }) // Ensure you have the right access level set
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
          // setSelectedFacility();
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
        // isEdit={false}
        // selectedObj={selectedFacility}
        goBackHandler={() => {
          // setSelectedFacility();
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
        console.log(
          "🚀 ~ file: hooks.js:353 ~ fetchUsersByEmails ~ response:",
          response
        );

        // Merge with the main list
        fetchedEmails.push(...response.data.listPeople?.items);
      } catch (error) {
        console.error(`Error fetching user by email ${email}:`, error);
        // Optionally: continue fetching for the next emails even if one fails
        // continue;
      }
    }

    return fetchedEmails;
  }

  const { deletePeopleQuery } = useDeletePeople();
  const { deleteFacilityQuery } = useDeleteFacility();

  const deleteFacility = async (facility) => {
    console.log(
      "🚀 ~ file: index.js:285 ~ deleteFacility ~ facilityId:",
      facility
    );

    // return;
    try {
      // 1. Fetch the people associated with the facility
      // Step 1: Fetch existing users using their email IDs
      const associatedPeople = await fetchUsersByEmails(
        facility.contacts.map((contact) => contact.email)
      );

      // 2. Delete each person's account from the UserPool
      for (let person of facility.contacts) {
        const temp = { Username: person?.email };
        await deleteBulkUsers(temp);
      }

      // 3. Delete each person from DynamoDB
      for (let person of associatedPeople) {
        console.log(
          "🚀 ~ file: index.js:362 ~ deleteFacility ~ person:",
          person
        );
        await deletePeopleQuery({ id: person?.id, _version: person?._version });
      }

      for (let facilityPeople of facility?.FacilityPeople?.items) {
        console.log(
          "🚀 ~ file: index.js:382 ~ deleteFacility ~ person:",
          facilityPeople
        );
        try {
          // Assuming person.id and facility.id are the correct identifiers
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
          // ErrorToast(
          //   "Error deleting Facility-People association. Please try again."
          // );
        }
      }

      // 4. Delete the facility itself
      await deleteFacilityQuery({
        id: facility?.id,
        _version: facility?._version,
      });

      // 5. Refetch the list of facilities to reflect the changes
      await refetchFacilities();

      // Provide feedback to the user
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
  // const adminHoldFacility = async (facility) => {
  //   const getFacilityAdminHold = /* GraphQL */ `
  //     query GetFacility($id: ID!) {
  //       getFacility(id: $id) {
  //         id
  //         FacilityPeople {
  //           nextToken
  //           startedAt
  //           __typename
  //         }
  //         imgSrc
  //         facilityName
  //         aboutFacility
  //         streetAddress
  //         country
  //         city
  //         state
  //         zip
  //         email
  //         isHidden
  //         permissions
  //         adminHold
  //         createdAt
  //         updatedAt
  //         _version
  //         _deleted
  //         _lastChangedAt
  //         facilityBillingId
  //         __typename
  //       }
  //     }
  //   `;

  //   try {
  //     const rawFacility = await API.graphql(
  //       graphqlOperation(getFacilityAdminHold, { id: facility?.id })
  //     );

  //     const facilityData = userData?.data?.getFacility;

  //     const updatedFacility = {
  //       id: facilityData?.id,
  //       adminHold: facilityData?.adminHold ? false : true,
  //       _version: facilityData._version,
  //     };

  //     console.log("updatedFacility", updatedFacility);

  //     // try {
  //     //   await updatePeopleQuery(updatedFacility);
  //     //   SuccessToast("User updated successfully");
  //     // } catch (error) {
  //     //   console.error("Error updating people: ", error);

  //     //   ErrorToast("Error updating user");
  //     // }
  //   } catch (error) {
  //     console.error(error);
  //     ErrorToast("Error deleting people" + error);
  //     setIsDeleteConfirmModalOpen(false);
  //     setPersonToDelete(null);
  //     return;
  //   }
  //   setIsDeleteConfirmModalOpen(false);
  //   setPersonToDelete(null);
  // };

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
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center">
                  <PageHeader text={"Facilities"} />

                  <input
                    type="text"
                    id="people_search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="text-sm rounded-full ps-3.5 h-8 w-80 ml-6 mt-2"
                    placeholder="Search by name"
                  />
                </div>
                {type === ADMIN ? (
                  <div>
                    <IconButton
                      color={theme.SECONDARY_COLOR}
                      text={"+ADD FACILITY"}
                      onClick={() => {
                        setIsAdd(true);
                        // navigate("/addFacility");
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
              // data={facilities || []}
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

      {/* {isAdd && renderAddFacility()} */}
      {selectedFacility && !isEdit && renderFacilityDetails()}
      {isDownloadMode && renderFacilityDetails()}
    </>
  );
};

export default Facilities;
