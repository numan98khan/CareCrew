import { createContext, useContext, useEffect, useState } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";

import { listShifts, listPeople } from "./graphql/queries";
import { listFacilities, LIST_TIMECARDS } from "./apolloql/queries";
import { useQuery, gql } from "@apollo/client";

// import { createPeople, createShifts } from "./graphql/mutations";

const AuthContext = createContext({
  user: null,
  personalData: null,
  type: null,
  myFacility: null,
  permissions: null,
  isSuperAdmin: null,
  signIn: () => {},
  signUp: () => {},
  removeUser: () => {},
  signedIn: null,
  setSignedIn: () => {},
});
function useAuth() {
  return useContext(AuthContext);
}

const AdminContext = createContext({
  shifts: [],
  people: [],
  fetchPeople: async () => {},
  fetchShifts: async () => {},
});
function useAdmin() {
  return useContext(AdminContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);
  const [personalData, setPersonalData] = useState(null);
  const [myFacility, setMyFacility] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(null);

  const [signedIn, setSignedIn] = useState(false);
  const [shifts, setShifts] = useState([]);
  const [people, setPeople] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const [timecards, setTimecards] = useState([]);

  useEffect(() => {
    if (typeof window !== undefined) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
      setSignedIn(true);
    }
  }, []);

  const signUp = (userInformation) => {
    // localStorage.setItem("user", JSON.stringify(userInformation));
    setUser(userInformation);
  };

  const signIn = (userInformation) => {
    // Sign in set user
    // localStorage.setItem("user", JSON.stringify(userInformation));
    setUser(userInformation);
  };

  const loadPermissions = (permissions) => {
    // Sign in set user
    // localStorage.setItem("user", JSON.stringify(userInformation));
    setPermissions(permissions);
  };

  const loadType = (type) => {
    setType(type);
  };

  const loadMyFacility = (item) => {
    setMyFacility(item);
  };

  const loadPersonalData = (item) => {
    setPersonalData(item);
  };

  const loadIsSuperAdmin = (item) => {
    setIsSuperAdmin(item);
  };

  const removeUser = (value) => {
    setUser(null);
    localStorage.clear();
  };

  const authValue = {
    user,
    signIn,
    signUp,
    type,
    myFacility,
    personalData,
    permissions,
    isSuperAdmin,
    removeUser,
    signedIn,
    setSignedIn,
    loadPermissions,
    loadType,
    loadMyFacility,
    loadPersonalData,
    loadIsSuperAdmin,
  };

  const adminValue = {
    shifts,
    people,
    facilities,
    timecards,
  };

  return (
    <>
      <AuthContext.Provider value={authValue}>
        <AdminContext.Provider value={adminValue}>
          {children}
        </AdminContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

function AdminProvider({ children }) {
  const [shifts, setShifts] = useState([]);

  const fetchShifts = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listShifts));
      const shiftsData = result.data.listShifts.items.filter(
        (element) => element._deleted !== true
      );
      setShifts(shiftsData);
    } catch (error) {
      console.error("Error fetching shifts: ", error);
    }
  };

  const value = {
    shifts,
    fetchShifts,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export { useAuth, useAdmin, AuthProvider, AdminProvider };
