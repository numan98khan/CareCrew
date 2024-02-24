import React, { useEffect, useState } from "react";
import NurseAccountInfo from "../PeopleDetails/NurseAccountInfo";
// import BackButton from "../../components/Button/BackButton";

import BackButton from "../../components/Button/BackButton";
import PageHeader from "../../components/Headers/PageHeader";
import NurseSummary from "../PeopleDetails/NurseSummary";
import EditProfileInfo from "./EditProfileInfo";
import { useAuth } from "../../context";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { getPeople } from "../../graphql/queries";
import { PuffLoader } from "react-spinners";
import themeStyles from "../../styles/theme.styles";
import AddPeople from "../AddPeople";
import { ADMIN, EMPLOYEE } from "../../constants/userTypes";
import AddStaffMember from "../Settings/AddStaffMember";

function MyProfile({ personDetails, onBackClickHandler, isEditOpen = false }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  const { type, personalData } = useAuth();

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const currentUser = await Auth.currentAuthenticatedUser();
      const userData = await API.graphql(
        graphqlOperation(getPeople, { id: currentUser.attributes.sub })
      );
      setUser(userData?.data?.getPeople);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (personDetails) {
      setUser(personDetails);
    } else {
      fetchUserData();
    }
  }, []);

  const [isEdit, setIsEdit] = useState(isEditOpen);
  const renderEditPeople = () => {
    return type !== ADMIN ? (
      <AddPeople
        isEdit={true}
        peopleObj={user}
        goBackHandler={() => {
          setIsEdit(false);
          fetchUserData();
        }}
        refetchPeople={() => console.log("")}
      />
    ) : (
      // <AddStaffMember isEdit={true} peopleObj={user} />
      <AddStaffMember
        isEdit={true}
        peopleObj={user?.id === personalData?.id ? user : personDetails}
        goBackHandler={() => {
          setIsEdit(false);
          if (!isEditOpen) {
            fetchUserData();
          } else {
            onBackClickHandler();
          }
        }}
        refetchPeople={() => console.log("")}
      />
    );
  };

  return (
    <>
      {isEdit ? (
        renderEditPeople()
      ) : (
        <div className="flex flex-col min-h-full px-3 pb-3">
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
              <div className="flex flex-col">
                <div className="flex flex-row py-1 justify-start space-x-4">
                  {/* <BackButton onClick={onBackClickHandler} /> */}
                  <PageHeader text={"My Profile"} />
                </div>
              </div>
              <NurseSummary
                isMyProfile={true}
                people={user}
                refetch={fetchUserData}
                setIsEdit={setIsEdit}
              />
              <div>
                <div className="flex flex-col">
                  <EditProfileInfo
                    user={user}
                    refetch={fetchUserData}
                    isMyProfile={personDetails ? false : true}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default MyProfile;
