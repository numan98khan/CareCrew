import React, { useState } from "react";
import PageHeader from "../../components/Headers/PageHeader";
import NavTab from "../../components/NavTab";
import Staff from "./Staff";
import UserSettings from "./UserSettings";
import Billing from "./Billing.js";
import Templates from "./Templates.js";
import News from "./News.js";
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
  const [isStaffDetails, setIsStaffDetails] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
  };

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

          {/* Responsive Tab Navigation */}
          <div className="w-full bg-white mt-3 overflow-x-auto flex justify-start space-x-2">
            {navTabs.map((tab, index) => (
              <NavTab
                key={index}
                title={tab.title}
                isActive={currentTab === tab.title}
                onClick={() => handleTabChange(tab.title)}
              />
            ))}
          </div>

          {/* Dynamic Content Section */}
          <div className="flex-1 bg-white flex-grow mt-2 p-3 rounded-lg">
            {isSuperAdmin && currentTab === "Staff" ? (
              <Staff
                setIsStaffDetails={setIsStaffDetails}
                setSelectedStaff={setSelectedStaff}
              />
            ) : currentTab === "User Settings" ? (
              <UserSettings />
            ) : currentTab === "Billing" ? (
              <Billing />
            ) : currentTab === "Templates" ? (
              <Templates />
            ) : currentTab === "News" ? (
              <News />
            ) : currentTab === "Reasons" ? (
              <Reasons />
            ) : null}
          </div>
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
