import React, { useState, useEffect } from "react";
import IconButton from "../../components/Button/IconButton";
import theme from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";
// import NavTab from "../../components/NavTab";
import NavTab from "../../components/NavTab";
import DateDropDown from "../../components/DateDropDown";
import Staff from "./Staff";
import UserSettings from "./UserSettings";
import Billing from "./Billing.js";
import Templates from "./Templates.js";
import News from "./News.js";
import Points from "./Points.js";
import Reasons from "./Reasons";
import MyProfile from "../MyProfile";
import { useAuth } from "../../context";
import { SUPER_ADMIN } from "../../constants/permissions";

function Settings() {
  const { user } = useAuth();
  const isSuperAdmin = SUPER_ADMIN === user?.attributes?.email;
  const navTabs = isSuperAdmin
    ? [
        { title: "Staff", isActive: false },
        { title: "Billing", isActive: true },
        { title: "Templates", isActive: false },
        { title: "News", isActive: false },
        { title: "Reasons", isActive: false },
      ]
    : [
        { title: "Billing", isActive: true },
        { title: "Templates", isActive: false },
        { title: "News", isActive: false },
        { title: "Reasons", isActive: false },
      ];

  const [currentTab, setCurrentTab] = useState(
    isSuperAdmin ? "Staff" : "Billing"
  );
  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
  };

  const [isStaffDetails, setIsStaffDetails] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  return (
    <>
      {!isStaffDetails ? (
        <div className="flex flex-col min-h-full px-3 pb-3">
          <div className="flex flex-col mx-2">
            <div className="flex py-1 justify-start">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center">
                  <PageHeader text={"Settings"} />
                </div>
                <div></div>
              </div>
            </div>
          </div>

          <div style={{ height: "50px" }} className="w-full bg-white flex mt-3">
            {navTabs.map((tab, index) => (
              <NavTab
                key={index}
                title={tab.title}
                isActive={currentTab === tab.title}
                onClick={() => handleTabChange(tab.title)}
              />
            ))}
          </div>

          {isSuperAdmin && currentTab === "Staff" ? (
            <div
              className="flex-1 bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between "
              // className="h-full bg-black relative flex-grow mt-2 p-3 rounded-lg item-start justify-between "
            >
              {isSuperAdmin ? (
                <Staff
                  setIsStaffDetails={setIsStaffDetails}
                  setSelectedStaff={setSelectedStaff}
                />
              ) : null}
            </div>
          ) : currentTab === "User Settings" ? (
            <div
              className="flex-1 bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between "
              // className="h-full bg-black relative flex-grow mt-2 p-3 rounded-lg item-start justify-between "
            >
              {" "}
              <UserSettings />
            </div>
          ) : currentTab === "Billing" ? (
            <div
              className="flex-1 bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between "
              // className="h-full bg-black relative flex-grow mt-2 p-3 rounded-lg item-start justify-between "
            >
              {" "}
              <Billing />
            </div>
          ) : currentTab === "Templates" ? (
            <Templates />
          ) : currentTab === "News" ? (
            <News />
          ) : // ) : currentTab === "Points" ? (
          //   <Points />
          currentTab === "Reasons" ? (
            <Reasons />
          ) : null}
        </div>
      ) : (
        <MyProfile
          personDetails={selectedStaff}
          onBackClickHandler={() => setIsStaffDetails(false)}
          refetchPeople={() => console.log("")}
          isEditOpen={true}
        />
      )}
    </>
  );
}

export default Settings;
