import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";

import AuthNav from "./navigation/AuthNav";
import AdminNav from "./navigation/AdminNav";

import { useAdmin, useAuth } from "./context";
import { Auth, API, graphqlOperation } from "aws-amplify";

import { createPeople } from "./graphql/mutations";
import { getPeople, getFacility } from "./graphql/queries";
import { getFacilityDetailed } from "./apolloql/facilities";

import { people, people_details } from "./dump";
import { Toaster } from "react-hot-toast";
import FacilitiesNav from "./navigation/FacilitiesNav";
import EmployeeNav from "./navigation/EmployeeNav";

import { ADMIN, FACILITY, EMPLOYEE } from "./constants/userTypes";

import Notification from "./components/PushNotifications";
import Loading from "./screens/Loading";
import { STAFF_PERMISSIONS } from "./constants/permissions";
import { onUpdateFacility, onUpdatePeople } from "./graphql/subscriptions";
import { updateLastActivity } from "./services/UserActivty";
import AdminHoldScreen from "./screens/Privacy/AdminHoldScreen";
import { GET_PEOPLE } from "./apolloql/queries";
// import { requestPermission } from "./fire";
// FIXME: remove thisas it is only for testing purposes that I am launching my campaign
// import "@aws-amplify/ui-react/styles.css";
// import { Analytics, Notifications } from "aws-amplify";
// import { Button, View } from "@aws-amplify/ui-react";
// import { useGetFacility } from "./apolloql/facilities";
// const { InAppMessaging } = Notifications;
// // To display your in-app message, make sure this event name matches one you created
// // in an In-App Messaging campaign!
// const myFirstEvent = { name: "my_first_event" };
// FIXME: end

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

function App() {
  const {
    user,
    type,
    myFacility,
    signIn,
    personalData,
    loadPermissions,
    loadType,
    loadMyFacility,
    loadPersonalData,
    loadIsSuperAdmin,
  } = useAuth();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    let subscriptionFacility = null;
    let subscriptionPeople = null;

    Auth.currentAuthenticatedUser()
      .then(async (user) => {
        const userData = await API.graphql(
          graphqlOperation(GET_PEOPLE, { id: user.attributes.sub })
        );

        // Set a new state or context value here if adminHold is true
        if (userData?.data?.getPeople?.adminHold) {
          signIn("adminHold");
        } else {
          signIn(user);
        }

        loadIsSuperAdmin(
          userData?.data?.getPeople?.email === "admin@instacarenursing.com"
        );

        const jsonPermissions = JSON.parse(
          userData?.data?.getPeople?.permissions
        );

        if (userData?.data?.getPeople?.type === FACILITY) {
          const facilityObj = await API.graphql(
            graphqlOperation(getFacility, {
              id: userData?.data?.getPeople?.PeopleFacility?.items[0]
                ?.facilityId,
            })
          );

          const jsonFacilityPermissions = JSON.parse(
            facilityObj?.data?.getFacility?.permissions
          );
          loadMyFacility(facilityObj?.data?.getFacility);
          loadPermissions(jsonFacilityPermissions);
        } else {
          loadPermissions(jsonPermissions);
        }

        loadType(userData?.data?.getPeople?.type);
        loadPersonalData(userData?.data?.getPeople);

        setLoading(false); // Set loading to false after all data is fetched and state is updated

        if (userData?.data?.getPeople?.type === FACILITY) {
          subscriptionFacility = API.graphql(
            graphqlOperation(onUpdateFacility, {
              id: userData?.data?.getPeople?.PeopleFacility?.items[0]
                ?.facilityId,
            })
          ).subscribe({
            next: async ({
              value: {
                data: { onUpdateFacility },
              },
            }) => {
              if (
                onUpdateFacility &&
                (onUpdateFacility?.id ===
                  userData?.data?.getPeople?.PeopleFacility?.items[0]
                    ?.facilityId ||
                  onUpdateFacility?.id === myFacility?.id)
              ) {
                // Call your context setters here

                console.log("Facility Permissions Reloaded");
                const jsonPermissions = JSON.parse(
                  onUpdateFacility.permissions
                );
                loadPermissions(jsonPermissions);
              }
            },
            error: (error) => {
              console.error("Error with the subscription: ", error);
            },
          });
        }

        // Handle subscription for updating facility data
        subscriptionPeople = API.graphql(
          graphqlOperation(onUpdatePeople, { id: user.attributes.sub })
        ).subscribe({
          next: async ({
            value: {
              data: { onUpdatePeople },
            },
          }) => {
            if (
              onUpdatePeople &&
              (onUpdatePeople?.id === user.attributes.sub ||
                onUpdatePeople?.id === personalData?.id)
            ) {
              // Call your context setters here

              const jsonPermissions = JSON.parse(onUpdatePeople.permissions);

              // console.log(
              //   "Employee Permissions Reloaded",
              //   jsonPermissions.access
              // );

              if (onUpdatePeople?.type !== FACILITY) {
                loadPermissions(jsonPermissions);
              }
              loadType(onUpdatePeople.type);
              loadPersonalData(onUpdatePeople);
            }
          },
          error: (error) => {
            console.error("Error with the subscription: ", error);
          },
        });
      })
      .catch((error) => {
        console.log("Error", error);
        signIn(null);
        setLoading(false); // Set loading to false after all data is fetched and state is updated
      });

    // Return a cleanup function to unsubscribe from the subscriptions
    return () => {
      if (subscriptionFacility) {
        subscriptionFacility.unsubscribe();
      }
      if (subscriptionPeople) {
        subscriptionPeople.unsubscribe();
      }
    };
  }, []);

  // useEffect(() => {
  //   if (user?.attributes?.sub) {
  //     // Only setup interval if user is authenticated
  //     const intervalId = setInterval(() => {
  //       updateLastActivity(user?.attributes?.sub);
  //     }, 60000 * 5); // Updates every 5 minutes

  //     return () => clearInterval(intervalId); // Clear interval on component unmount
  //   }
  // }, [user?.attributes?.sub]);

  if (loading) {
    return <Loading />; // Your loading component
  }
  if (!user) {
    return (
      <>
        <Toaster />
        <AuthNav />
      </>
    ); // Your loading component
  }

  // Assume adminHold is a state or context value you've set based on the userData
  // If adminHold is true, render a different view
  if (user === "adminHold") {
    return <AdminHoldScreen />;
  }

  return (
    <div className="App">
      <Toaster />
      <Notification />

      {type === ADMIN ? (
        <AdminNav />
      ) : type === FACILITY ? (
        <FacilitiesNav />
      ) : type === EMPLOYEE ? (
        <EmployeeNav />
      ) : null}
    </div>
  );
}

export default App;
