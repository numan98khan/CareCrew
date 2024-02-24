import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import StaffCard from "../../components/StaffCard";
import { useAdmin, useAuth } from "../../context";
import Button from "../../components/Button/index";
import { useDeletePeople, useListPeople } from "../../apolloql/people";
import { ADMIN } from "../../constants/userTypes";
import PuffLoader from "react-spinners/PuffLoader";
import themeStyles from "../../styles/theme.styles";
import { ScaleHover } from "../../styles/animations";
import { ErrorToast, SuccessToast } from "../../services/micro";
import { deleteBulkUsers } from "../../services/bulkUserCreation";
import { API, graphqlOperation } from "aws-amplify";
import ConfirmationModal from "../../components/ConfirmationModal";

function Staff({ setIsStaffDetails, setSelectedStaff }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    people,
    loading,
    error,
    refetch: refetchPeople,
  } = useListPeople({ type: ADMIN });

  // const [staff, setStaff] = useState([]);
  const staff = useMemo(() => {
    if (!loading && !error) {
      return people.filter((person) => person?.id !== user?.attributes?.sub);
    }
  }, [people]); // Added people in dependency array

  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [personToDelete, setPersonToDelete] = useState(null);

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

  return (
    <div className="flex flex-col items-center bg-white">
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
        <>
          <div className="flex flex-wrap p-4">
            {staff.map((item) => {
              return (
                <div className={``}>
                  <StaffCard
                    people={item}
                    editProfileFunction={() => {
                      setSelectedStaff(item);
                      setIsStaffDetails(true);
                    }}
                    deleteStaffFunction={() => {
                      // setSelectedStaff(item);
                      // setIsStaffDetails(true);
                      setPersonToDelete(item);
                      setIsDeleteConfirmModalOpen(true);

                      // ErrorToast("Deleting staff is not permitted");
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex mt-auto justify-between w-1/6">
            {" "}
            <Button
              children={"ADD MEMBER"}
              onClick={() => {
                navigate("/addStaffMember");
              }}
            />
          </div>
        </>
      )}
      <ConfirmationModal
        modalIsOpen={isDeleteConfirmModalOpen}
        closeModal={() => setIsDeleteConfirmModalOpen(false)}
        message={"Are you sure you want to terminate this staff member?"}
        onConfirm={() => {
          terminateEmployee(personToDelete);
        }}
        onCancel={() => {
          setPersonToDelete();
          setIsDeleteConfirmModalOpen(false);
        }}
      />
    </div>
  );
}

export default Staff;
