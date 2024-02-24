import React, { useState, useRef } from "react";
import PageHeader from "../../components/Headers/PageHeader";
import User from "../../assets/icons/user";
import Image from "../../assets/icons/image";
import Camera from "../../assets/icons/camera";
import Toggle from "../../components/ToggleSwitch";

import InfoTitle from "../../components/Headers/InfoTitle";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import Button from "../../components/Button/index";
import InfoSubTitle from "../../components/Headers/InfoSubTitle";
import themeStyles from "../../styles/theme.styles";
import { countries } from "../../constants/countries";
import { timezones } from "../../constants/timezones";
import { languages } from "../../constants/languages";
import { useS3Upload } from "../../services/uploadFileToS3";
import { ADMIN } from "../../constants/userTypes";

import { API, graphqlOperation, Auth } from "aws-amplify";

import { createPeople, updatePeople } from "../../graphql/mutations";

import { v4 as uuidv4 } from "uuid";

import { ErrorToast, SuccessToast } from "../../services/micro";
import { staff } from "../../constants/dataTemplates";
import { STAFF_PERMISSIONS } from "../../constants/permissions";

import { createBulkUsers } from "../../services/bulkUserCreation";
import { useCreatePeople, useUpdatePeople } from "../../apolloql/people";
import Avatar from "../../components/Avatar";
import { useAuth } from "../../context";

function AddStaffMember({ isEdit, peopleObj, goBackHandler, refetchPeople }) {
  const [isLoading, setIsLoading] = useState(false);

  const { personalData } = useAuth();

  const isEditMyProfile = isEdit && personalData?.id === peopleObj?.id;

  const { createPeopleQuery } = useCreatePeople();

  const [imagePlaceholder, setImagePlaceholder] = useState(null);
  const [imageRef, setImageRef] = useState(null);

  // const [people, setPeople] = useState(staff);
  const [people, setPeople] = useState(peopleObj ? peopleObj : staff);

  // Update a single key in the people object
  // const setPeopleKey = (key) => (newValue) =>
  //   setPeople((prevPeople) => ({ ...prevPeople, [key]: newValue }));

  const setPeopleKey = (key) => (newValue) =>
    setPeople((prevPeople) => {
      if (prevPeople[key] !== newValue) {
        setChangedFields({ ...changedFields, [key]: newValue });
      }
      return { ...prevPeople, [key]: newValue };
    });

  const [permissions, setPermissions] = useState(
    peopleObj ? JSON.parse(peopleObj?.permissions) : STAFF_PERMISSIONS
  );

  const togglePermission = (section, index) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      newPermissions[section][index].isSelected =
        !newPermissions[section][index].isSelected;
      return newPermissions;
    });
  };
  const fileInput = useRef(null);

  const handleDivClick = () => {
    fileInput.current.click();
  };

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

  async function createUsers() {
    const users = {
      Username: people.email,
      Password: "Rentto@123", //generatePassword(),
      Email: people.email,
    };
    // more users
    try {
      const { result, parsedBody } = await createBulkUsers(users);

      // let result = null;
      // const parsedBody = null;

      if (!result || result?.statusCode === 400) {
        throw new Error(
          parsedBody?.error?.message || "Failed to create bulk users."
        );
      } else {
        const ID = parsedBody.user.User.Attributes.find(
          (attribute) => attribute.Name === "sub"
        ).Value;

        setPeopleKey("id")(ID);

        if (imageRef) {
          // trigger upload
          const response = await uploadFile(imageRef);

          if (response.key) {
            setPeople((prevPeople) => ({
              ...prevPeople,
              profilePicture: response.key, // This is the image url after successful upload
            }));
          }
        }

        const updatedPeople = {
          ...people,
          permissions: JSON.stringify(permissions),
          // immunization: JSON.stringify(people.immunization),
          id: ID,
          // profilePicture: response.key,
        };

        try {
          const result = await API.graphql(
            graphqlOperation(createPeople, { input: updatedPeople })
          );

          // const result = await createPeopleQuery(updatePeople);

          SuccessToast("People Created");
        } catch (error) {
          ErrorToast("Error creating people: ", error);
        }
      }
    } catch (err) {
      ErrorToast(err?.message);

      console.log(err);
    }
  }
  const uploadImageAndGetUrl = async (imageRef, currentImageUrl) => {
    if (imageRef) {
      const response = await uploadFile(imageRef);
      if (response.key) {
        return response.key;
      }
    }
    return currentImageUrl;
  };

  const [changedFields, setChangedFields] = useState({});
  // editPeople
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
  const { updatePeopleQuery } = useUpdatePeople();
  const updatePerson = async (people, imageRef, permissions) => {
    const permissionsString = JSON.stringify(permissions);
    const imageUrl = await uploadImageAndGetUrl(
      imageRef,
      people.profilePicture
    );

    const updatedFields = filterOutUnneededFields(changedFields);

    const updatedPeople = {
      ...updatedFields,
      id: people.id,
      permissions: permissionsString,
      profilePicture: imageUrl,
      // empCheckList: people.empCheckList.map(({ __typename, ...rest }) => rest),
      _version: people._version,
    };

    try {
      await updatePeopleQuery(updatedPeople);
      SuccessToast("User updated successfully");
    } catch (error) {
      console.error("Error updating people: ", error);

      ErrorToast("Error updating user");
    }
  };

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

    if (
      (!people.phoneNumber || !/^\d{10}$/.test(people.phoneNumber)) &&
      !isEditMyProfile
    ) {
      return "A valid US phone number in the format '+12345678900' is required.";
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

    // Add more validation logic as per your requirement.

    return null; // Returns null if validation is successful
  }

  const createStaff = async () => {
    const result = validatePeople(people);
    if (result) {
      ErrorToast(result);
      return;
    }

    // deduplicateEmpCheckList(data)

    const peopleObj = {
      ...people,
      // empCheckList: deduplicateEmpCheckList(people),
    };

    setIsLoading(true);
    // await updatePerson(peopleObj, imageRef, permissions);
    await createUsers();
    // await updatePerson(people, imageRef, permissions);
    if (refetchPeople) {
      await refetchPeople();
    }
    if (goBackHandler) {
      goBackHandler();
    }
    setIsLoading(false);
  };

  const editPeople = async () => {
    // console.log("🚀 ~ file: index.js:417 ~ editPeople ~ people:", people);
    const result = validatePeople(people);
    if (result) {
      ErrorToast(result);
      return;
    }

    // deduplicateEmpCheckList(data)

    const peopleObj = {
      ...people,
      // empCheckList: deduplicateEmpCheckList(people),
    };

    setIsLoading(true);
    await updatePerson(peopleObj, imageRef, permissions);
    if (refetchPeople) {
      await refetchPeople();
    }
    if (goBackHandler) {
      goBackHandler();
    }
    setIsLoading(false);

    // navigate(-1);
  };

  const { uploading, uploadFile, imageUrl } = useS3Upload();
  return (
    <div className="flex flex-col min-h-full px-3 pb-3">
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*" // Add this line
      />
      <div className="flex flex-col mx-2">
        <div className="flex py-1 justify-start">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex items-center">
              <PageHeader text={isEdit ? "Edit Staff" : "Add Staff"} />
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div
        className="h-full bg-white relative flex-grow mt-2 p-3 rounded-lg item-start justify-between "
        // className="h-full bg-black relative flex-grow mt-2 p-3 rounded-lg item-start justify-between "
      >
        <div className="flex flex-row ">
          <div className="flex flex-col items-center" style={{ width: "55%" }}>
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

            <div className="mb-2 flex flex-row justify-around w-full items-center">
              <div className="flex flex-col w-full ">
                <div className="flex mb-2">
                  <InfoTitle text={"Account Information"} />
                </div>
                <div className="flex flex-row ">
                  <div className="flex flex-col w-1/2 ">
                    <div className="flex flex-row">
                      <Input
                        placeholder={"First Name"}
                        value={people.firstName}
                        setValue={setPeopleKey("firstName")}
                      />
                      <div className="mx-1" />
                      <Input
                        placeholder={"Last Name"}
                        value={people.lastName}
                        setValue={setPeopleKey("lastName")}
                      />
                    </div>
                    <div className="my-1" />
                    <div className="flex flex-row">
                      <Input
                        placeholder={"Email Address"}
                        value={people.email}
                        setValue={setPeopleKey("email")}
                      />
                    </div>
                  </div>

                  <div className="mx-1" />

                  <div className="flex flex-col w-1/2">
                    <Input
                      placeholder={"Phone Number"}
                      value={people.phoneNumber}
                      setValue={setPeopleKey("phoneNumber")}
                    />
                    <div className="my-1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2 flex flex-row justify-around w-full items-center">
              <div className="flex flex-col w-full ">
                <div className="flex mb-2">
                  <InfoTitle text={"Address"} />
                </div>
                <div className="flex flex-row ">
                  <div className="flex flex-col w-1/2 ">
                    <div className="flex flex-row">
                      <DropDown
                        placeholder={"Country"}
                        value={people.country}
                        setValue={setPeopleKey("country")}
                        options={countries.map((item) => item.label)}
                      />
                    </div>
                    <div className="my-1" />
                    <div className="flex flex-row">
                      <Input
                        placeholder={"State"}
                        value={people.state}
                        setValue={setPeopleKey("state")}
                      />
                      <div className="mx-1" />
                      <Input
                        placeholder={"Zip"}
                        value={people.zip}
                        setValue={setPeopleKey("zip")}
                      />
                    </div>
                  </div>

                  <div className="mx-1" />

                  <div className="flex flex-col w-1/2">
                    {/* {" "} */}
                    <Input
                      placeholder={"City"}
                      value={people.city}
                      setValue={setPeopleKey("city")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2 flex flex-row justify-around w-full items-center">
              <div className="flex flex-col w-full ">
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
                    {/* {" "} */}

                    <DropDown
                      placeholder={"Language"}
                      value={people.language}
                      setValue={setPeopleKey("language")}
                      options={languages}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-3" />
            <div className="flex w-full">
              {/* {
                <Button
                  children={"SAVE"}
                  onClick={() => {
                    createUsers();
                  }}
                />
              } */}

              {isEdit ? (
                <Button
                  children={"SAVE"}
                  onClick={editPeople}
                  disabled={isLoading}
                />
              ) : (
                <Button
                  children={"POST"}
                  onClick={createStaff}
                  disabled={isLoading}
                />
              )}

              <div className="mx-1" />

              <Button
                children={"CANCEL"}
                color={themeStyles.GRAY}
                disabled={isLoading}
                onClick={goBackHandler}
              />
            </div>
          </div>

          {personalData?.id !== peopleObj?.id ? (
            <div className="p-4" style={{ width: "45%" }}>
              {/* <PermissionsTab /> */}
              <div className="flex flex-col items-center w-full ">
                <div className="w-full">
                  <div className="flex">
                    <InfoTitle text={"Access"} />
                  </div>
                  <div className="my-2" />
                  <div className="flex flex-wrap">
                    {permissions?.access.map((item, index) => (
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
                    {permissions?.permissions.map((item, index) => (
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

                <div className="my-2" />

                {/* TODO: Remove as this is disabled because can't enforce this */}
                {/* <div className="w-full">
                <div className="flex">
                  <InfoTitle text={"Notifications"} />
                </div>
                <div className="my-2" />
                <div className="flex flex-wrap">
                  {permissions?.notifications.map((item, index) => (
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

               */}
                <div className="my-2" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AddStaffMember;
