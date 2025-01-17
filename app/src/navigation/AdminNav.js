// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import React, { Fragment, useState } from "react";
import "../App.css";

import AppBar from "../components/AppBar";
import SideMenu from "../components/SideMenu";

import { useAdmin, useAuth } from "../context";
import { menuItems } from "../constants/menuItems";
import AddStaffMember from "../screens/Settings/AddStaffMember";
import AddTimeCard from "../screens/Timecards/AddTimeCard";
import MyProfile from "../screens/MyProfile";
import AddShift from "../screens/AddShift";
import AddFacility from "../screens/AddFacility";
import AllNotifications from "../screens/AllNotifications";
import TotalBilling from "../screens/TotalBilling";
import { STAFF_PERMISSIONS } from "../constants/permissions";
import themeStyles from "../styles/theme.styles";

// import  from "../assets/icons/menuIcons/";
// import  from "../assets/icons/menuIcons/";
// import  from "../assets/icons/menuIcons/";
// import  from "../assets/icons/menuIcons/";

const AuthNav = () => {
  const { user, permissions } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Added state for menu

  // const permissions = STAFF_PERMISSIONS;

  const filteredMenuItems = menuItems.filter((item) => {
    const allPermissions = [...permissions.access, "LLM"];
    const permission = allPermissions?.find(
      (permission) => permission.name === item.name
    );
    return permission?.isSelected;
  });

  return (
    <Router>
      <div
        style={{ backgroundColor: themeStyles?.PRIMARY_NEUTRAL_COLOR }}
        className="flex flex-col min-h-max w-full fixed "
      >
        {/* <div style={{}}> */}
        <AppBar
          type={permissions?.type}
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          // toggleMenu={() => {}}
        >
          My App
        </AppBar>
        {/* </div> */}

        {/* <div className="flex flex-row flex-grow"> */}
        <div className="flex" style={{ height: "95vh" }}>
          <div className="h-full">
            <SideMenu
              items={filteredMenuItems}
              activePath={"useLocation().pathname"}
              isMenuOpen={isMenuOpen}
              toggleMenu={() => setIsMenuOpen(false)}
            />
          </div>
          <div className="w-full overflow-y-auto m-2">
            <Routes>
              <Route
                key="My Profile"
                path="/myProfile"
                element={<MyProfile />}
              />
              <Route
                key="Add Staff Member"
                path="/addStaffMember"
                element={<AddStaffMember />}
              />

              <Route
                key="Total Billing"
                path="/billing"
                element={<TotalBilling />}
              />

              <Route
                key="Add Staff Member"
                path="/addShift"
                element={<AddShift />}
              />
              <Route
                key="Add Timecard"
                path="/addTimeCard"
                element={<AddTimeCard />}
              />

              <Route
                key="Add Facility"
                path="/addFacility"
                element={<AddFacility />}
              />

              <Route
                key="All Notifications"
                path="/allNotifications"
                element={<AllNotifications />}
              />

              {filteredMenuItems.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>

            {isMenuOpen && (
              <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={() => setIsMenuOpen(false)}
              ></div>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default AuthNav;
