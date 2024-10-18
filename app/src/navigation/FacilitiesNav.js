// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "../App.css";

import AppBar from "../components/AppBar";
import SideMenu from "../components/SideMenu";
import { useAdmin, useAuth } from "../context";
import { concat } from "@apollo/client";

import AddShift from "../screens/AddShift";

import { menuItems } from "../constants/menuItems";
import AddStaffMember from "../screens/Settings/AddStaffMember";
import MyProfile from "../screens/MyProfile";

import AllNotifications from "../screens/AllNotifications";
import { FACILITY_EMPLOYEE_TYPES } from "../constants/userTypes";

const FacilitiesNav = () => {
  const { user, permissions, personalData, signIn, loadPermissions } =
    useAuth();
  // console.log(
  //   "🚀 ~ file: FacilitiesNav.js:26 ~ FacilitiesNav ~ permissions:",
  //   permissions
  // );

  const filteredMenuItems = menuItems.filter((item) => {
    const allPermissions = [
      ...permissions.access,
      // ...permissions.permissions,
      // ...permissions.notifications,
    ];
    const permission = allPermissions.find(
      (permission) => permission.name === item.name
    );

    // console.log(
    //   "🚀 ~ file: FacilitiesNav.js:47 ~ filteredMenuItems ~ personalData?.position:",
    //   personalData?.position
    // );

    if (
      permission?.name === "Total Billing" &&
      personalData?.position !== FACILITY_EMPLOYEE_TYPES[1]
    ) {
      return false;
    }
    if (permission?.name === "People") {
      return false;
    }
    return permission?.isSelected;
  });

  return (
    <Router>
      <div className="flex flex-col min-h-max w-full fixed  bg-PRIMARY_NEUTRAL_COLOR">
        {/* <div style={{}}> */}
        <AppBar type={permissions?.type}>My App</AppBar>
        {/* </div> */}

        {/* <div className="flex flex-row flex-grow"> */}
        <div className="flex" style={{ height: "95vh" }}>
          <div className="h-full">
            <SideMenu
              items={filteredMenuItems}
              activePath={"useLocation().pathname"}
            />
          </div>
          <div className="w-full overflow-y-auto m-2">
            <Routes>
              <Route
                key="My Profile"
                path="/myProfile"
                element={<MyProfile />}
              />
              {/* <Route path="/" element={<Dashboard />} />
              <Route path="/whoson" element={<WhosOn />} /> */}
              <Route
                key="Add Staff Member"
                path="/addShift"
                element={<AddShift />}
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
          </div>
        </div>
      </div>
    </Router>
  );
};

export default FacilitiesNav;
