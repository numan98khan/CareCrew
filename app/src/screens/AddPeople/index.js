import React, { useState, useRef } from "react";
import PageHeader from "../../components/Headers/PageHeader";
import User from "../../assets/icons/user";
import Image from "../../assets/icons/image";
import Camera from "../../assets/icons/camera";
import Toggle from "../../components/ToggleSwitch";

import InfoTitle from "../../components/Headers/InfoTitle";
import Avatar from "../../components/Avatar";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import Button from "../../components/Button/index";
import InfoSubTitle from "../../components/Headers/InfoSubTitle";
import DatePicker from "../../components/DatePicker";

import PermissionsTab from "../../components/PermissionsTab";
import themeStyles from "../../styles/theme.styles";

import {
  createIDCounter,
  createPeople,
  createPeopleFacility,
  updateIDCounter,
  updatePeople,
} from "../../graphql/mutations";

import { API, graphqlOperation, Auth } from "aws-amplify";

import { countries } from "../../constants/countries";
import { timezones } from "../../constants/timezones";
import { languages } from "../../constants/languages";
import { uniformSizes } from "../../constants/uniform";
import { relationshipTypes } from "../../constants/relationships";
import { distances } from "../../constants/distance";

import { useS3Upload } from "../../services/uploadFileToS3";

import { useLocation, useNavigate } from "react-router-dom";
import { EMPLOYEE, FACILITY } from "../../constants/userTypes";

import { useCreatePeople, useUpdatePeople } from "../../apolloql/people";
import {
  EMPLOYEE_PERMISSIONS,
  STAFF_PERMISSIONS,
} from "../../constants/permissions";

import { people as peopleTemplate } from "../../constants/dataTemplates";
import { createBulkUsers } from "../../services/bulkUserCreation";
import { ErrorToast, SuccessToast } from "../../services/micro";
import { useAuth } from "../../context";
import { getIDCounter } from "../../graphql/queries";
import { GET_PEOPLE } from "../../apolloql/queries";
import { PEOPLE_UPDATED, SHIFT_EDIT } from "../../constants/notificationTypes";
import {
  externalNotificationToInstacare,
  externalNotificationToPeople,
  inAppNotificationsToFacilityPeople,
  inAppNotificationsToPeople,
  inApplNotificationToInstacare,
  sendNotificationsToFacilityPeople,
} from "../../services/timecards/reporting";
import { useCreateNotification } from "../../apolloql/notifications";
// import

const AddPeople = ({ isEdit, peopleObj, goBackHandler, refetchPeople }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  // console.log("location received params", location);
  const { createPeopleQuery } = useCreatePeople();

  const { personalData, type, myFacility, user } = useAuth();

  const isFacilityMember = type === FACILITY;

  const isEditMyProfile = isEdit && personalData?.id === peopleObj?.id;

  const [people, setPeople] = useState(peopleObj ? peopleObj : peopleTemplate);

  const navigate = useNavigate();
  const { uploading, uploadFile, imageUrl } = useS3Upload();

  const fileInput = useRef(null);

  const handleDivClick = () => {
    fileInput.current.click();
  };

  const [imagePlaceholder, setImagePlaceholder] = useState(null);
  const [imageRef, setImageRef] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setImageRef(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        setImagePlaceholder(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>,.";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    // setPassword(retVal);

    return retVal;
  };

  // FIXME: This is to detect changes in the data only
  const [changedFields, setChangedFields] = useState({});
  const setPeopleKey = (key) => (newValue) =>
    setPeople((prevPeople) => {
      if (prevPeople[key] !== newValue) {
        setChangedFields({ ...changedFields, [key]: newValue });
      }
      return { ...prevPeople, [key]: newValue };
    });

  // // Update a single key in the people object
  // const setPeopleKey = (key) => (newValue) =>
  //   setPeople((prevPeople) => ({ ...prevPeople, [key]: newValue }));

  // Update a key in a nested object within people
  const setNestedPeopleKey = (key, subKey) => (newValue) =>
    setPeople((prevPeople) => ({
      ...prevPeople,
      [key]: {
        ...prevPeople[key],
        [subKey]: newValue,
      },
    }));

  // Update a key in an object within an array within people
  const setArrayPeopleKey = (key, index, subKey) => (newValue) =>
    setPeople((prevPeople) => ({
      ...prevPeople,
      [key]: prevPeople[key].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [subKey]: newValue } : item
      ),
    }));

  async function incrementUserID() {
    const idCounterData = (
      await API.graphql(graphqlOperation(getIDCounter, { id: "people" }))
    )?.data?.getIDCounter;
    let res = null;
    if (idCounterData === null) {
      await API.graphql(
        graphqlOperation(createIDCounter, {
          input: { id: "people", people: 0 },
        })
      );

      const idCounterData = (
        await API.graphql(graphqlOperation(getIDCounter, { id: "people" }))
      )?.data?.getIDCounter;

      res = await API.graphql(
        graphqlOperation(updateIDCounter, {
          input: {
            id: "people",
            people: idCounterData?.people + 1,
            _version: idCounterData?._version,
          },
        })
      );
    } else {
      res = await API.graphql(
        graphqlOperation(updateIDCounter, {
          input: {
            id: "people",
            people: idCounterData?.people + 1,
            _version: idCounterData?._version,
          },
        })
      );
    }
    // console.log(
    //   "🚀 ~ file: index.js:140 ~ incrementUserID ~ idCounterData:",
    //   idCounterData,
    //   res
    // );

    return res?.data?.updateIDCounter?.people;
  }
  async function createUsers() {
    // return;
    const users = {
      Username: people.email,
      Password: "Rentto@123", //generatePassword(),
      Email: people.email,
    };
    // more users
    try {
      const { result, parsedBody } = await createBulkUsers(users);
      console.log("🚀 ~ file: index.js:126 ~ createUsers ~ result:", result);

      // FIXME: Undo this logic
      // let result = 1;
      // const parsedBody = null;

      if (!result || (result?.statusCode === 400 && false)) {
        throw new Error(
          parsedBody?.error?.message || "Failed to create bulk users."
        );
      } else {
        console.log(result, parsedBody);
        const ID = parsedBody.user.User.Attributes.find(
          (attribute) => attribute.Name === "sub"
        ).Value;

        // FIXME: Undo this logic
        // const ID = "1";

        setPeopleKey("id")(ID);

        if (imageRef) {
          // trigger upload
          const response = await uploadFile(imageRef);
          // console.log(imageUrl, response);

          if (response.key) {
            // console.log("setting image", response, imageUrl);
            setPeople((prevPeople) => ({
              ...prevPeople,
              profilePicture: response.key, // This is the image url after successful upload
            }));
          }
        }

        const numberedID = await incrementUserID();

        const updatedPeople = {
          ...people,
          permissions: JSON.stringify(permissions),
          immunization: JSON.stringify(people.immunization),
          // permissions: null, //JSON.stringify(permissions),
          // immunization: null, //JSON.stringify(people.immunization),
          // FIXME: Undo this logic
          id: ID,
          surrogateID: numberedID,
          adminHold: false,
          // profilePicture: response.key,
        };

        console.log("updatedPeople", updatedPeople);

        try {
          const result = await API.graphql(
            graphqlOperation(createPeople, { input: updatedPeople })
          );

          if (isFacilityMember) {
            try {
              const facilityResult = myFacility;

              const resultFP = await API.graphql(
                graphqlOperation(createPeopleFacility, {
                  input: {
                    facilityId: facilityResult?.id,
                    peopleId: ID,
                  },
                })
              );

              SuccessToast("Linked Member successfully");
            } catch (error) {
              console.error("Error linking member to facility: ", error);
              ErrorToast("Error linking member to facility: " + error);
            }
          }

          // const result = await createPeopleQuery(updatePeople);
          console.log(result);

          SuccessToast("User added successfully");
          return 1;
        } catch (error) {
          console.error("Error creating people: ", error);

          ErrorToast("Error uploading user");
        }

        // console.log("Publish People", people);
      }
    } catch (err) {
      console.error("Error publishing people", err);
      ErrorToast(
        "Error publishing people. Make sure you are not using an email that is already in use"
      );
    }
  }

  function validatePeople(people) {
    // Some basic validations
    if (!people.firstName || !people.lastName) {
      return "First name and last name is required.";
    }

    if (!people.email) {
      return "Email is required.";
    }

    // Email format validation using regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(people.email)) {
      return "Invalid email format.";
    }

    if (!people.phoneNumber && !isEditMyProfile) {
      return "Phone number is required.";
    }

    // if (
    //   (!people.phoneNumber || !/^\+\d{11}$/.test(people.phoneNumber)) &&
    //   !isEditMyProfile
    // ) {
    //   return "A valid US phone number in the format '+12345678900' is required.";
    // }

    if (
      (!people.phoneNumber || !/^\d{10}$/.test(people.phoneNumber)) &&
      !isEditMyProfile
    ) {
      return "A valid US phone number in the format '1234567890' is required.";
    }

    if (!people.role && !isEditMyProfile) {
      return "Role is required.";
    }

    if (!people.country && !isEditMyProfile) {
      return "Country is required.";
    }
    if (!people.city && !isEditMyProfile) {
      return "City is required.";
    }
    if (!people.state && !isEditMyProfile) {
      return "State is required.";
    }

    if (!people.zip && !isEditMyProfile) {
      return "Zip code is required.";
    }

    if (people?.zip?.toString()?.length !== 5) {
      return "Zip code can only be 5 digits.";
    }

    if (people?.emergencyContactNumber) {
      if (
        !people.emergencyContactNumber ||
        !/^\d{10}$/.test(people.emergencyContactNumber)
      ) {
        return "A valid US phone number in the format '2345678900' is required for emergency contact number.";
      }
    }

    // if (
    //   (!people.SSN || !/^\d{3}-\d{2}-\d{4}$/.test(people.SSN)) &&
    //   !isEditMyProfile
    // ) {
    //   return "A valid US SSN in the format 'XXX-XX-XXXX' is required.";
    // }

    // if (!people.uniformSize && !isEditMyProfile) {
    //   return "Uniform size is required.";
    // }

    return null; // Returns null if validation is successful
  }

  const publishPeople = async () => {
    // await createUsers();
    // return;
    // console.log("Publish People", people);
    const result = validatePeople(people);
    if (result) {
      ErrorToast(result);
      return;
    }

    setIsLoading(true);
    const resp = await createUsers();
    // refetchPeople();
    if (goBackHandler && resp === 1) {
      goBackHandler();
    }
    setIsLoading(false);
  };

  const { updatePeopleQuery } = useUpdatePeople();

  const uploadImageAndGetUrl = async (imageRef, currentImageUrl) => {
    if (imageRef) {
      const response = await uploadFile(imageRef);
      if (response.key) {
        return response.key;
      }
    }
    return currentImageUrl;
  };

  const generateUpdatedFieldsString = (updatedFields) => {
    let updatesString = "";
    for (const [key, value] of Object.entries(updatedFields)) {
      updatesString += `${key}: ${value}\n`;
    }
    return updatesString;
  };

  const { createNotificationQuery } = useCreateNotification();

  const filterOutUnneededFields = (fields) => {
    const {
      __typename,
      Notifications,
      ManualTimecards,
      Templates,
      Timecards,
      News,
      PeopleFacility,
      chatrooms,
      Messages,
      // empCheckList,
      _deleted,
      _lastChangedAt,
      updatedAt,
      createdAt,
      ...filteredFields
    } = fields;
    return filteredFields;
  };

  const notifyPeopleUpdate = async (peopleDetails) => {
    function createFieldsString(changedFields, userData) {
      const excludeKeys = [
        "__typename",
        "permissions",
        "profilePicture",
        "Notifications",
        "createdAt",
        "updatedAt",
        "_version",
        "_deleted",
        "_lastChangedAt",
        "availability",
        "isTerminated",
        "lastActivity",
        "lastActivityNotifications",
        "adminHold",
        "type",
        "immunization",
        "PeopleFacility",
        "chatrooms",
        "Messages",
        "empCheckList",
        "Timecards",
        "ManualTimecards",
        "News",
        "Templates",
        "reminderss",
        "notificationss",
        "Reviews",
        "Requests",
      ]; // List of keys to exclude

      let fieldsArray = [];

      function camelCaseToTitle(camelCase) {
        // Split the camel case string into words and capitalize the first letter of each word
        return (
          camelCase
            // Insert a space before all caps
            .replace(/([A-Z])/g, " $1")
            // Uppercase the first character of each word
            .replace(/^./, function (str) {
              return str.toUpperCase();
            })
        );
      }

      for (const field in userData) {
        // Skip fields that are in the exclude list
        if (excludeKeys.includes(field)) {
          continue;
        }

        // Check if the field is present in changedFields and if it is different from userData
        let isChanged =
          changedFields.hasOwnProperty(field) &&
          userData[field] !== changedFields[field].value;

        // If the field is changed, use the value from changedFields, otherwise use the value from userData
        let fieldValue = isChanged
          ? `${userData[field]} -> ${changedFields[field]}*`
          : userData[field];

        // Format the field name
        let formattedField = camelCaseToTitle(field);

        // Create the field string
        let fieldString = `${formattedField}: ${fieldValue}\n`;

        fieldsArray.push(fieldString);
      }

      return fieldsArray.join("");
    }
    let formedMessage = `Subject: Account Information Update\n\nThe following account has been updated by User: ${
      user?.attributes?.email
    }\n\nChanged fields marked with "*"\n\n${createFieldsString(
      changedFields,
      peopleDetails
    )}`;

    // console.log(formedMessage);
    // console.log(changedFields);

    // return;

    // START: Send notification on all platforms to instacare
    // INTERNAL

    inApplNotificationToInstacare(
      PEOPLE_UPDATED,
      "Person information was edited",
      formedMessage,
      createNotificationQuery
    );
    // // INTERNAL
    inAppNotificationsToPeople(
      peopleDetails?.id,
      PEOPLE_UPDATED,
      "Person information was edited",
      formedMessage,
      createNotificationQuery
    );
    // EXTERNAL
    externalNotificationToInstacare(formedMessage, true, false); // Instacare
    externalNotificationToPeople(peopleDetails?.id, formedMessage, true, true); // Employee
  };

  const updatePerson = async (people, imageRef, permissions) => {
    const permissionsString = JSON.stringify(permissions);
    const imageUrl = await uploadImageAndGetUrl(
      imageRef,
      people.profilePicture
    );

    const updatedFields = filterOutUnneededFields(changedFields);

    const GET_PEOPLE_MINIMAL = /* GraphQL */ `
      query GetPeople($id: ID!) {
        getPeople(id: $id) {
          id
          _version
        }
      }
    `;

    // const userData = (
    //   await API.graphql(graphqlOperation(GET_PEOPLE_MINIMAL, { id: people.id }))
    // )?.data?.getPeople;
    // console.log("🚀 ~ file: index.js:442 ~ updatePerson ~ userData:", userData);

    // return;
    const updatedPeople = {
      ...updatedFields,
      id: people.id,
      permissions: permissionsString,
      profilePicture: imageUrl,
      empCheckList: people?.empCheckList?.map(
        ({ __typename, ...rest }) => rest
      ),
      // _version: userData._version,
    };

    // Generate a string from the updatedFields
    const updatedFieldsString = generateUpdatedFieldsString(updatedFields);

    // console.log("updatedPeople", updatedFieldsString, updatedPeople);

    try {
      await updatePeopleQuery(updatedPeople);

      await notifyPeopleUpdate(peopleObj);
      SuccessToast("User updated successfully");
    } catch (error) {
      console.error("Error updating people: ", error);

      ErrorToast("Error updating user");
    }
  };

  function deduplicateEmpCheckList(data) {
    const seen = new Set();
    const empCheckList =
      data?.empCheckList?.filter((item) => {
        const isDuplicate = seen.has(item.name);
        seen.add(item.name);
        return !isDuplicate;
      }) || [];

    return empCheckList;
  }

  const editPeople = async () => {
    // people
    console.log("🚀 ~ file: index.js:417 ~ editPeople ~ people:", people);
    const result = validatePeople(people);
    if (result) {
      ErrorToast(result);
      return;
    }

    // deduplicateEmpCheckList(data)

    const peopleObj = {
      ...people,
      empCheckList: deduplicateEmpCheckList(people),
    };

    setIsLoading(true);
    await updatePerson(peopleObj, imageRef, permissions);
    refetchPeople();
    if (goBackHandler) {
      goBackHandler();
    }
    setIsLoading(false);
  };

  const toggleEmpCheckList = (index) => {
    setPeople((prevState) => {
      const newEmpCheckList = [...prevState.empCheckList];
      const employee = { ...newEmpCheckList[index] }; // Create a shallow copy of the object
      employee.isBool = !employee.isBool;
      newEmpCheckList[index] = employee; // Replace the object in the array with the modified copy

      return { ...prevState, empCheckList: newEmpCheckList };
    });
  };

  const handleToggleChange = (key, value) => {
    setPeople((prevState) => ({
      ...prevState,
      immunization: {
        ...prevState.immunization,
        [key]: value,
      },
    }));
  };

  const handleDateChange = (key, date) => {
    setPeople((prevState) => ({
      ...prevState,
      immunization: {
        ...prevState.immunization,
        [key]: date,
      },
    }));
  };

  const [permissions, setPermissions] = useState(EMPLOYEE_PERMISSIONS);
  // const [permissions, setPermissions] = useState(STAFF_PERMISSIONS);

  const togglePermission = (section, index) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      newPermissions[section][index].isSelected =
        !newPermissions[section][index].isSelected;
      return newPermissions;
    });
  };

  const setPermission = (section, index, value) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      newPermissions[section][index].value = value;
      return newPermissions;
    });
  };

  const handleToggle = (category, index) => () => {
    setPermissions((prevState) => {
      // Create a copy of the state
      const newState = { ...prevState };
      // Toggle the isSelected property of the given item
      newState[category][index].isSelected =
        !newState[category][index].isSelected;
      // Return the updated state
      return newState;
    });
  };

  return (
    <>
      <div className="flex flex-col min-h-max px-3 pb-3">
        <input
          type="file"
          ref={fileInput}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*" // Add this line
        />
        <div className="flex flex-col items-start w-full">
          <PageHeader
            text={
              isEditMyProfile
                ? "Edit My Profile"
                : isEdit
                ? "Edit People"
                : isFacilityMember
                ? "Add Member"
                : "Add People"
            }
          />
        </div>
        <div className="min-h-max px-3 mt-3 pb-3 bg-white">
          <div className="flex flex-row ">
            <div
              className="flex flex-col items-center"
              style={{ width: "55%" }}
            >
              <div className="flex flex-row justify-around w-full ">
                <div className="flex w-full items-center py-3">
                  <div className="bg-lightGrey flex flex-row justify-center items-center w-24 h-24 rounded-3xl overflow-hidden">
                    {imagePlaceholder ? (
                      <img
                        className={`w-full h-full object-cover ${
                          true ? "rounded" : "rounded-full"
                        }`}
                        src={imagePlaceholder}
                        alt="User avatar"
                      />
                    ) : isEdit ? (
                      <>
                        <Avatar imgSrc={peopleObj?.profilePicture} size={15} />
                      </>
                    ) : (
                      <User />
                    )}
                  </div>

                  <div className="mx-1" />
                  <div
                    onClick={handleDivClick}
                    className="bg-[#F3FAFD] hover:scale-105 flex flex-col justify-center items-center w-40 h-full rounded-3xl border-2 border-blue-300 border-dotted"
                  >
                    <div className="flex flex-col items-center">
                      <Image />
                      <span className="mt-1">Open Gallery</span>
                    </div>
                  </div>

                  {/* <div className="mx-1" />
                  <div className="bg-[#F3FAFD] dark:hover:shadow-black/30 flex flex-col justify-center items-center w-40 h-full rounded-3xl border-2 border-blue-300 border-dotted">
                    <div className="flex flex-col items-center">
                      <Camera />
                      <span className="mt-1">Camera</span>
                    </div>
                  </div> */}
                  <div className="mx-1" />
                  <div className="font-medium text-sm text-[#02050A80] self-end">
                    {" "}
                    Maximum size : 1MB
                  </div>
                </div>
              </div>

              <div className="mb-2 flex flex-row justify-around w-full items-center mt-7">
                <div className="flex flex-col w-full gap-2">
                  <div className="flex mb-2">
                    <InfoTitle text={"Account Information"} />
                  </div>
                  <div className="flex flex-row ">
                    <div className="flex flex-col w-1/2 ">
                      <div className="flex flex-row">
                        <Input
                          color={"#F3FAFD"}
                          placeholder={"First Name"}
                          value={people.firstName}
                          setValue={setPeopleKey("firstName")}
                        />
                        <div className="mx-1" />
                        <Input
                          color={"#F3FAFD"}
                          placeholder={"Last Name"}
                          value={people.lastName}
                          setValue={setPeopleKey("lastName")}
                        />
                      </div>
                      <div className="my-1" />
                      <div className="flex flex-row">
                        <Input
                          color={"#F3FAFD"}
                          placeholder={"Email Address"}
                          value={people.email}
                          disabled={isEditMyProfile}
                          setValue={setPeopleKey("email")}
                        />
                      </div>
                    </div>

                    <div className="mx-1" />

                    <div className="flex flex-col w-1/2">
                      {/* {" "} */}
                      <Input
                        color={"#F3FAFD"}
                        placeholder={"Phone Number"}
                        value={people.phoneNumber}
                        setValue={setPeopleKey("phoneNumber")}
                      />
                      <div className="my-1" />
                      {!isEditMyProfile && (
                        <DropDown
                          placeholder={"Select Role"}
                          value={people.role}
                          setValue={setPeopleKey("role")}
                          options={["CNA", "RN", "LPN"]}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Form */}
              <div className="mb-2 flex flex-row justify-around w-full items-center mt-7">
                <div className="flex flex-col w-full gap-2">
                  <div className="flex mb-2">
                    <InfoTitle text={"Address"} />
                  </div>
                  <div className="flex flex-row ">
                    <div className="flex flex-col w-1/2 ">
                      <Input
                        color={"#F3FAFD"}
                        placeholder={"Street Address"}
                        value={people.streetAddress}
                        setValue={setPeopleKey("streetAddress")}
                        options={countries.map((item) => item.label)}
                      />
                      <div className="my-1" />
                      <div className="flex flex-row">
                        <Input
                          color={"#F3FAFD"}
                          placeholder={"State"}
                          value={people.state}
                          setValue={setPeopleKey("state")}
                        />
                        <div className="mx-1" />
                        <Input
                          color={"#F3FAFD"}
                          placeholder={"Zip"}
                          value={people.zip}
                          setValue={setPeopleKey("zip")}
                          type="number"
                        />
                      </div>
                    </div>

                    <div className="mx-1" />

                    <div className="flex flex-col w-1/2">
                      {/* {" "} */}
                      <Input
                        color={"#F3FAFD"}
                        placeholder={"City"}
                        value={people.city}
                        setValue={setPeopleKey("city")}
                      />
                      <div className="my-1" />

                      <div className="flex flex-row">
                        <DropDown
                          placeholder={"Country"}
                          value={people.country}
                          setValue={setPeopleKey("country")}
                          options={countries.map((item) => item.label)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Form */}
              <div className="mb-2 flex flex-row justify-around w-full items-center mt-7">
                <div className="flex flex-col w-full gap-2">
                  <div className="flex mb-2">
                    <InfoTitle text={"Instacare Notes"} />
                  </div>
                  <div className="flex flex-row ">
                    <div className="flex flex-col w-full ">
                      <Input
                        color={"#F3FAFD"}
                        placeholder={"Notes"}
                        value={people.personalNote}
                        setValue={setPeopleKey("personalNote")}
                        multiline
                        rows={5}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* General Form */}
              {/* <div className="mb-2 flex flex-row justify-around w-full items-center mt-7">
                <div className="flex flex-col w-full gap-2">
                  <div className="flex mb-2">
                    <InfoTitle text={"General"} />
                  </div>
                  <div className="flex flex-row ">
                    <div className="flex flex-col w-1/2 ">
                      <div className="flex flex-row">
                        <DropDown
                          placeholder={"Time Zone"}
                          value={people.timezone}
                          setValue={setPeopleKey("timezone")}
                          options={timezones}
                        />
                      </div>
                    </div>

                    <div className="mx-1" />

                    <div className="flex flex-col w-1/2">
                      <DropDown
                        placeholder={"Language"}
                        value={people.language}
                        setValue={setPeopleKey("language")}
                        options={languages}
                      />
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Basic Nursing Information */}
              {isEdit && !isFacilityMember && !isEditMyProfile && (
                <div className="mb-2 flex flex-row justify-around w-full items-center mt-7 ">
                  <div className="flex flex-col w-full gap-2">
                    <div className="flex mb-2">
                      <InfoTitle text={"Basic Information"} />
                    </div>
                    <div className="flex flex-row ">
                      <div className="flex flex-col w-1/2 ">
                        <div className="flex flex-row">
                          <Input
                            color={"#F3FAFD"}
                            placeholder={"Driver License Number"}
                            value={people.driverLicenseNumber}
                            setValue={setPeopleKey("driverLicenseNumber")}
                          />
                        </div>
                        <div className="my-1" />
                        <div className="flex flex-row">
                          <Input
                            color={"#F3FAFD"}
                            placeholder={"SSN/TaxID"}
                            value={people.SSN}
                            setValue={setPeopleKey("SSN")}
                          />
                        </div>
                      </div>

                      <div className="mx-1" />

                      <div className="flex flex-col w-1/2">
                        <div className="flex flex-row">
                          <Input
                            color={"#F3FAFD"}
                            placeholder={"Driver License Status"}
                            value={people.driverLicenseState}
                            setValue={setPeopleKey("driverLicenseState")}
                          />
                        </div>
                        <div className="my-1" />
                        <div className="flex flex-row">
                          <DropDown
                            placeholder={"Uniform Size"}
                            value={people.uniformSize}
                            setValue={setPeopleKey("uniformSize")}
                            options={uniformSizes}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Nursing Forms */}
              {isEdit && !isFacilityMember && (
                <>
                  <div className="mb-2 flex flex-row justify-around w-full items-center mt-7">
                    <div className="flex flex-col w-full gap-2">
                      <div className="flex mb-2">
                        <InfoTitle text={"Emergency Contact"} />
                      </div>
                      <div className="flex flex-row ">
                        <div className="flex flex-col w-1/2 ">
                          <div className="flex flex-row">
                            <Input
                              color={"#F3FAFD"}
                              placeholder={"Contact Person Name"}
                              value={people.emergencyContactName}
                              setValue={setPeopleKey("emergencyContactName")}
                            />
                          </div>
                          <div className="my-1" />
                          <div className="flex flex-row">
                            {/* <Input color={"#F3FAFD"}
                        placeholder={"Relationship"}
                        value={people.emergencyContactRelationship}
                        setValue={setPeopleKey("emergencyContactRelationship")}
                      /> */}
                            <DropDown
                              placeholder={"Relationship"}
                              value={people.emergencyContactRelationship}
                              setValue={setPeopleKey(
                                "emergencyContactRelationship"
                              )}
                              options={relationshipTypes}
                            />
                          </div>
                          <div className="my-1" />
                          <div className="flex flex-row">
                            <Input
                              color={"#F3FAFD"}
                              placeholder={"RN/LPN/CNA License Number"}
                              value={people.licenseCode}
                              setValue={setPeopleKey("licenseCode")}
                            />
                          </div>
                        </div>

                        <div className="mx-1" />

                        <div className="flex flex-col w-1/2">
                          {/* {" "} */}
                          <div className="flex flex-row">
                            <Input
                              color={"#F3FAFD"}
                              placeholder={"Contact Person Phone"}
                              value={people.emergencyContactNumber}
                              setValue={setPeopleKey("emergencyContactNumber")}
                            />
                          </div>
                          <div className="my-1" />
                          <div className="flex flex-row">
                            <Input
                              placeholder={
                                "How many miles are you willing to travel to work?"
                              }
                              value={people.milesToWork}
                              setValue={setPeopleKey("milesToWork")}
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!isEditMyProfile && (
                    <>
                      <div className="mb-2 flex flex-row justify-around w-full items-center mt-7">
                        <div className="flex flex-col w-full gap-2">
                          <div className="flex mb-2">
                            <InfoTitle text={"Employee Checklist"} />
                          </div>
                          <div className="flex flex-col gap-2">
                            {people?.empCheckList?.map((item, index) => (
                              <div className="flex w-full justify-between mb-1">
                                <InfoSubTitle text={item.name} />
                                <Toggle
                                  isChecked={item.isBool}
                                  onToggle={() => toggleEmpCheckList(index)}
                                  // onToggle={setIsEmailNotifications}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mb-2 flex flex-row justify-around w-full items-center  mt-7">
                        <div className="flex flex-col w-full gap-2">
                          <div className="flex mb-2">
                            <InfoTitle text={"Immunization"} />
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex w-full justify-between mb-1">
                              <InfoSubTitle
                                text={"Verify TB Test Results (Annual)"}
                              />
                              <Toggle
                                isChecked={people?.immunization?.isVerifyTB}
                                onToggle={() =>
                                  handleToggleChange(
                                    "isVerifyTB",
                                    !people?.immunization.isVerifyTB
                                  )
                                }
                              />
                            </div>

                            <div className="flex flex-row ">
                              <div className="flex flex-col text-left w-full gap-2">
                                <InfoSubTitle text={"Start TB Test Date"} />

                                <DatePicker
                                  date={people?.immunization?.startTBDate}
                                  onChange={(date) =>
                                    handleDateChange("startTBDate", date)
                                  }
                                />
                              </div>
                              <div className="mx-1 my-1" />
                              <div className="flex flex-col text-left w-full  gap-2">
                                <InfoSubTitle text={"Last TB Test Date"} />

                                <DatePicker
                                  date={people?.immunization?.lastTBDate}
                                  onChange={(date) =>
                                    handleDateChange("lastTBDate", date)
                                  }
                                />
                              </div>
                            </div>
                            <div className="flex flex-col w-1/2 ">
                              <div className="flex flex-col text-left  gap-2">
                                <InfoSubTitle
                                  text={"COVID-19 Immunization Date"}
                                />
                                <DatePicker
                                  date={people?.immunization?.covidDate}
                                  onChange={(date) =>
                                    handleDateChange("covidDate", date)
                                  }
                                />
                              </div>
                            </div>

                            <div className="flex w-full justify-between mb-1">
                              <InfoSubTitle
                                text={
                                  "Employee Influenza Vaccine Consent - Declination Form"
                                }
                              />
                              <Toggle
                                isChecked={
                                  people?.immunization?.infVaccineConsent
                                }
                                onToggle={() =>
                                  handleToggleChange(
                                    "infVaccineConsent",
                                    !people?.immunization?.infVaccineConsent
                                  )
                                }
                              />
                            </div>
                            <div className="flex w-full justify-between mb-1">
                              <InfoSubTitle
                                text={
                                  "Religious Exemption Form - Employee Influenze"
                                }
                              />
                              <Toggle
                                isChecked={
                                  people?.immunization?.religiousExemption
                                }
                                onToggle={() =>
                                  handleToggleChange(
                                    "religiousExemption",
                                    !people?.immunization?.religiousExemption
                                  )
                                }
                              />
                            </div>
                            <div className="flex w-full justify-between mb-1">
                              <InfoSubTitle
                                text={
                                  "Medical Exemption Form - Employee Influenze"
                                }
                              />
                              <Toggle
                                isChecked={
                                  people?.immunization?.medicalExemption
                                }
                                onToggle={() =>
                                  handleToggleChange(
                                    "medicalExemption",
                                    !people?.immunization?.medicalExemption
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              <div className="my-3" />
              <div className="flex w-full">
                {isEdit ? (
                  <Button
                    children={"SAVE"}
                    onClick={editPeople}
                    disabled={isLoading}
                  />
                ) : (
                  <Button
                    children={"POST"}
                    onClick={publishPeople}
                    // disabled={isLoading}
                  />
                )}

                <div className="mx-1" />

                <Button
                  children={"CANCEL"}
                  color={themeStyles.GRAY}
                  onClick={goBackHandler}
                  disabled={isLoading}
                />
              </div>
            </div>

            {!isFacilityMember && personalData?.id !== peopleObj?.id ? (
              <div className="p-4" style={{ width: "45%" }}>
                {/* <PermissionsTab /> */}
                <div className="flex flex-col items-center w-full ">
                  <div className="w-full">
                    <div className="flex">
                      <InfoTitle text={"Access"} />
                    </div>
                    <div className="my-2" />
                    <div className="flex flex-wrap">
                      {permissions?.access?.map((item, index) => (
                        <div
                          className="flex justify-between mb-2 w-1/2"
                          key={index}
                        >
                          <InfoSubTitle text={item?.name} />
                          <Toggle
                            isChecked={item.isSelected}
                            onToggle={() => togglePermission("access", index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="my-2" />

                  <div className="w-full">
                    <div className="flex">
                      <InfoTitle text={"Permissions"} />
                    </div>
                    <div className="my-2" />
                    <div className="flex flex-wrap">
                      {permissions?.permissions?.map((item, index) => (
                        <div
                          className="flex justify-between mb-2 w-1/2"
                          key={index}
                        >
                          <InfoSubTitle text={item?.name} />
                          <Toggle
                            isChecked={item.isSelected}
                            onToggle={() =>
                              togglePermission("permissions", index)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TODO: Remove as this is disabled because can't enforce this */}
                  {/* <>
                  <div className="my-2" />
                  <div className="w-full">
                    <div className="flex">
                      <InfoTitle text={"Notifications"} />
                    </div>
                    <div className="my-2" />
                    <div className="flex flex-wrap">
                      {permissions?.notifications?.map((item, index) => (
                        <div
                          className="flex justify-between mb-2 w-1/2"
                          key={index}
                        >
                          <InfoSubTitle text={item?.name} />
                          <Toggle
                            isChecked={item.isSelected}
                            onToggle={() =>
                              togglePermission("notifications", index)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </> */}

                  <div className="my-2" />

                  <div className="w-full">
                    <div className="flex">
                      <InfoTitle text={"Other"} />
                    </div>
                    <div className="my-2" />
                    <div className="flex flex-col">
                      {permissions?.other?.map((item, index) => (
                        <div
                          className="flex justify-between mb-2 w-full"
                          key={index}
                        >
                          <div className="flex flex-row w-2/3 justify-between items-center">
                            <div className="">
                              <InfoSubTitle text={item?.name} />
                            </div>
                            <div>
                              <Toggle
                                isChecked={item.isSelected}
                                onToggle={() =>
                                  togglePermission("other", index)
                                }
                              />
                            </div>
                          </div>
                          {item.hasOwnProperty("value") && (
                            <div className="flex-1">
                              {/* <DropDown /> */}
                              <DropDown
                                placeholder={"Duration"}
                                value={item?.value}
                                setValue={(value) =>
                                  setPermission("other", index, value)
                                }
                                labels={
                                  item?.name === "Point Expiry Days"
                                    ? ["1 month", "2 months", "3 months"]
                                    : [
                                        "10 min",
                                        "30 min",
                                        "60 min",
                                        "90 min",
                                        "120 min",
                                      ]
                                }
                                options={
                                  item?.name === "Point Expiry Days"
                                    ? ["1 month", "2 months", "3 months"]
                                    : [10, 30, 60, 90, 120]
                                }
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPeople;
