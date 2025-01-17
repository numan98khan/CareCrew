import React, { useState, useRef, useMemo } from "react";
import PageHeader from "../../components/Headers/PageHeader";

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

import { MainHover, ScaleHover, ShadowHover } from "../../styles/animations";

import { useS3Upload } from "../../services/uploadFileToS3";

import { createFacility, createPeopleFacility } from "../../graphql/mutations";
import { API, graphqlOperation, Auth } from "aws-amplify";

import Modal from "react-modal";

import MinimalPeopleRow from "../../components/MinimalPeopleRow";

import { ErrorToast, SuccessToast } from "../../services/micro";
import { FACILITY, FACILITY_EMPLOYEE_TYPES } from "../../constants/userTypes";

import { useListPeople } from "../../apolloql/people";

import { updateFacilityMutation } from "../../apolloql/mutations";

import { createBulkUsers } from "../../services/bulkUserCreation";
import { FACILITY_PERMISSIONS } from "../../constants/permissions";
import { useCreateFacility } from "../../apolloql/facilities";

Modal.setAppElement("#root");

const MODES = {
  SHIFT_DETAILS: "shiftDetails",
  ADD_MEMBERS: "addMembers",
};

const AddFacility = ({ isEdit, selectedObj }) => {
  const { uploading, uploadFile, imageUrl } = useS3Upload();

  const { createFacilityQuery } = useCreateFacility();

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
  const [facility, setFacility] = useState(
    selectedObj
      ? selectedObj
      : {
          // facilityId: "32",
          // id: null,
          imgSrc: null,
          facilityName: null,
          aboutFacility: null,
          streetAddress: null,
          country: null,
          city: null,
          state: null,
          zip: null,
          email: null,
          floorNumber: null,
          // type: "facility",
          contacts: [
            // {
            //   name: null,
            //   phone: null,
            //   email: null,
            //   position: null,
            // },
            {
              name: "Douglas White",
              phone: "+923315882990",
              email: "dougwhite23@gmail.com",
              position: "General Manager",
            },
          ],
          // FacilityPeople: null,
        }
  );

  // Update a single key in the people object
  const setFacilityKey = (key) => (newValue) =>
    setFacility((prevPeople) => ({ ...prevPeople, [key]: newValue }));

  const setArrayFacilityKey = (key, index, subKey) => (newValue) =>
    setFacility((prevPeople) => ({
      ...prevPeople,
      [key]: prevPeople[key].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [subKey]: newValue } : item
      ),
    }));
  // Add a new blank contact to the contacts array
  const addContact = () => {
    setFacility((prevFacility) => ({
      ...prevFacility,
      contacts: [
        ...prevFacility.contacts,
        {
          name: null,
          phone: null,
          email: null,
          position: null,
        },
      ],
    }));
  };

  const [permissions, setPermissions] = useState(FACILITY_PERMISSIONS);

  const togglePermission = (section, index) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      newPermissions[section][index].isSelected =
        !newPermissions[section][index].isSelected;
      return newPermissions;
    });
  };

  async function createUsers() {
    const users = {
      Username: facility.email,
      Password: "Rentto@123",
      Email: facility.email,
    };

    try {
      const { result, parsedBody } = await createBulkUsers(users);

      if (!result || !parsedBody) {
        return;
      }

      // ... the rest of your code after API.post
      if (result?.statusCode === 400) {
        console.error(
          "AdminCreateUser (ic-user-create):",
          parsedBody?.error?.message
        );
      } else {
        console.log(result, parsedBody);
        const ID = parsedBody.user.User.Attributes.find(
          (attribute) => attribute.Name === "sub"
        ).Value;


        // setFacilityKey("id")(ID);

        const updatedFacility = {
          ...facility,
          permissions: JSON.stringify(permissions),
          id: ID,
          // FacilityPeople: FacilityPeople,
          // profilePicture: response.key,
        };

        // const permissionsString = JSON.stringify(permissions);
        // setFacilityKey("permissions")(permissionsString);

        if (imageRef) {
          // trigger upload
          const response = await uploadFile(imageRef);
          // console.log(imageUrl, response);

          if (response.key) {
            console.log("setting image", response, imageUrl);

            Object.assign(updatedFacility, {
              imgSrc: response.key,
            });
          }
        }

        console.log("updatedFacility", updatedFacility);

        await createFacilityQuery(updatedFacility);

        // console.log("Publish People", facility);
      }
    } catch (err) {
      ErrorToast("Error creating people or facility: " + err);
      console.log(err);
    }
  }

  const publishPeople = () => {
    createUsers();
    // console.log("Publish Facility", facility);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // const [people, setPeople] = useState([]);
  const { people } = useListPeople();

  const facilityPeople = useMemo(() => {
    // console.log("people fecthed for facility", people);
    return people.filter((person) => {
      // Replace this condition with your actual filter condition

      if (person.type === FACILITY) {
        return true;
      }
    });
  }, [people]);

  const [selectedPeople, setSelectedPeople] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const updateFacilityInternal = async (facility, imageRef, permissions) => {
    const permissionsString = JSON.stringify(permissions);

    const {
      __typename,
      PeopleFacility,
      chatrooms,
      Messages,
      empCheckList,
      // _version,
      _deleted,
      _lastChangedAt,
      createdAt,
      updatedAt,
      FacilityPeople,
      ...updatedFacility
    } = facility;

    // const { ...updatedFacility } = facility;

    Object.assign(updatedFacility, {
      permissions: permissionsString,
      // imgSrc: imageUrl,
      _version: facility._version,
    });

    console.log("updatedFacility", updatedFacility);

    try {
      const result = await API.graphql(
        // graphqlOperation(updateFacility, { input: updatedFacility })
        graphqlOperation(updateFacilityMutation, { input: updatedFacility })
      );
      console.log(result);
      return { success: true, data: result.data, error: null };
    } catch (error) {
      console.error("Error updating facility: ", error);
      return { success: false, data: null, error };
    }
  };

  const editFacility = () => {
    updateFacilityInternal(facility, imageRef, permissions);
  };

  return (
    <div className="flex flex-col min-h-max px-3 pb-3">
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-start w-full">
        <PageHeader text={"Add People"} />
      </div>
      <div className="min-h-max px-3 mt-3 pb-3 bg-white">
        <div className="flex flex-row ">
          <div className="flex flex-col items-center" style={{ width: "55%" }}>
            <div className="flex my-3 flex-row justify-around w-full bg-red">
              <div
                className="flex flex-col w-full h-full rounded-lg border-blue-300 border-dotted border bg-PRIMARY_NEUTRAL_COLOR"
                style={{
                  paddingTop: imagePlaceholder ? "0%" : "15%",
                  paddingBottom: imagePlaceholder ? "0%" : "15%",
                }}
              >
                {imagePlaceholder ? (
                  // <div onClick={handleDivClick}>
                  <img
                    onClick={handleDivClick}
                    className={`flex-1 ${MainHover}
                        ${true ? "rounded" : "rounded-full"}
                        `}
                    src={
                      imagePlaceholder
                        ? imagePlaceholder
                        : "https://randomuser.me/api/portraits/men/20.jpg"
                    }
                    alt="User avatar"
                  />
                ) : (
                  // </div>
                  <>
                    <div className="text-xxs text-grey">
                      {"Drop here or Upload cover image"}
                    </div>
                    <div className="my-2" />
                    <div className="flex w-full items-center justify-center">
                      <div
                        className={`${ScaleHover} py-4 flex flex-col justify-center items-center w-1/4 h-full rounded-3xl border-2 border-blue-300 border-dotted`}
                        onClick={handleDivClick}
                      >
                        <div className="flex flex-col items-center">
                          <Image />

                          <span className="mt-1">Open Gallery</span>
                        </div>
                      </div>

                      <div className="mx-1" />
                      <div
                        // className=" dark:hover:shadow-black/30 flex flex-col justify-center items-center w-40 h-full rounded-3xl border-2 border-blue-300 border-dotted"
                        className={`${ScaleHover} py-4 flex flex-col justify-center items-center w-1/4 h-full rounded-3xl border-2 border-blue-300 border-dotted`}
                      >
                        <div className="flex flex-col items-center">
                          <Camera />
                          <span className="mt-1">Camera</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mb-2 flex flex-row justify-around w-full items-center  ">
              <div className="flex flex-col w-full ">
                <div className="flex mb-2">
                  <InfoTitle text={"Basic Information"} />
                </div>
                <div className="flex flex-row ">
                  <div className="flex flex-col w-full ">
                    <div className="flex flex-row">
                      <Input
                        placeholder={"Facility Name"}
                        value={facility.facilityName}
                        setValue={setFacilityKey("facilityName")}
                      />
                    </div>

                    <div className="my-1" />

                    <div className="flex flex-row">
                      <Input
                        placeholder={"Facility Email"}
                        value={facility.email}
                        setValue={setFacilityKey("email")}
                      />
                    </div>

                    <div className="my-1" />

                    <div className="flex flex-row">
                      <Input
                        placeholder={"About Facility"}
                        multiline
                        value={facility.aboutFacility}
                        setValue={setFacilityKey("aboutFacility")}
                      />
                    </div>

                    <div className="flex flex-row">
                      <Input
                        placeholder={"Facility Guide"}
                        disabled
                        // value={people.driverLicenseNumber}
                        // setValue={setFacilityKey("driverLicenseNumber")}
                      />
                    </div>
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
                    <Input
                      placeholder={"Street Address"}
                      value={facility.streetAddress}
                      setValue={setFacilityKey("streetAddress")}
                    />
                    <div className="my-1" />

                    <div className="flex flex-row space-x-2">
                      <Input
                        placeholder={"State"}
                        value={facility.state}
                        setValue={setFacilityKey("state")}
                      />
                      <Input
                        placeholder={"City"}
                        value={facility.city}
                        setValue={setFacilityKey("city")}
                      />
                    </div>
                  </div>

                  <div className="mx-1" />

                  <div className="flex flex-col w-1/2">
                    {/* {" "} */}
                    <div className="flex flex-row">
                      <DropDown
                        placeholder={"Country"}
                        value={facility.country}
                        setValue={setFacilityKey("country")}
                        options={countries.map((item) => item.label)}
                      />
                    </div>

                    <div className="my-1" />

                    <div className="flex flex-row">
                      <Input
                        placeholder={"Zip"}
                        value={facility.zip}
                        setValue={setFacilityKey("zip")}
                      />
                      <div className="mx-1" />
                      <Input
                        placeholder={"Floor Number"}
                        value={facility.floorNumber}
                        setValue={setFacilityKey("floorNumber")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2 flex flex-row justify-around w-full items-center  ">
              <div className="flex flex-col w-full ">
                <div className="flex mb-2">
                  <InfoTitle text={"Contact Info"} />
                </div>
                {facility.contacts.map((contact, index) => {
                  return (
                    <div className="flex flex-row my-1 " key={index}>
                      <div className="flex flex-col w-1/2 ">
                        <div className="flex flex-row">
                          <Input
                            placeholder={"Contact Person Name"}
                            value={facility.contacts[index].name}
                            setValue={setArrayFacilityKey(
                              "contacts",
                              index,
                              "name"
                            )}
                          />
                        </div>

                        <div className="my-1" />
                        <div className="flex flex-row">
                          <DropDown
                            placeholder={"Position"}
                            value={facility.contacts[index].position}
                            setValue={setArrayFacilityKey(
                              "contacts",
                              index,
                              "position"
                            )}
                            options={["Employee", "General Manager"]}
                          />
                        </div>
                      </div>

                      <div className="mx-1" />

                      <div className="flex flex-col w-1/2">
                        <div className="flex flex-row">
                          <Input
                            placeholder={"Contact Person Phone"}
                            value={facility.contacts[index].phone}
                            setValue={setArrayFacilityKey(
                              "contacts",
                              index,
                              "phone"
                            )}
                          />
                        </div>
                        <div className="my-1" />

                        <div className="flex flex-row">
                          <Input
                            placeholder={"Email"}
                            value={facility.contacts[index].email}
                            setValue={setArrayFacilityKey(
                              "contacts",
                              index,
                              "email"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div
                  onClick={addContact}
                  className={`text-left text-PRIMARY_COLOR text-xs font-bold p-2 mt-2 w-full ${MainHover}`}
                >
                  + Add More Contact Info
                </div>
              </div>
            </div>

            <div className="my-3" />
            <div className="flex w-full">
              {/* <Button children={"PUBLISH"} onClick={publishPeople} /> */}
              {isEdit ? (
                <Button
                  children={"EDIT"}
                  onClick={() => {
                    editFacility();
                  }}
                />
              ) : (
                <Button children={"POST"} onClick={publishPeople} />
              )}
              <div className="mx-1" />

              <Button children={"CANCEL"} color={themeStyles.GRAY} />
            </div>
          </div>

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
                        onToggle={() => togglePermission("permissions", index)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-2" />

              <div className="w-full">
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

              <div className="my-2" />
              <div className="flex w-full" onClick={openModal}>
                <label className="text-xs text-PRIMARY_COLOR font-bold text-left">
                  + Add Members
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add People Modal */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // closeTimeoutMS={200} // add this line for fade-out animation
        contentLabel="People Add Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            position: "relative", // Changed from fixed to relative
            borderRadius: 20,
            boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "300px",
            padding: 20,
          },
        }}
      >
        <div className="flex w-full">
          <label className="text-left text-lg text-PRIMARY_COLOR font-bold">
            Add Members
          </label>
        </div>
        <div className="my-1" />
        <div className="flex w-full">
          <label className="text-left text-xs ">
            Please select the person to whom you want to add for this facility
          </label>
        </div>
        <div className="my-2" />
        <div className="w-full overflow-y-auto">
          {facilityPeople?.map((item, index) => {
            return (
              <>
                <MinimalPeopleRow
                  imgSrc={item.profilePicture}
                  name={item.firstName + " " + item.lastName}
                  role={item.role}
                  initChecked={selectedPeople.includes(item.id)}
                  onClick={() => {
                    if (selectedPeople.includes(item.id)) {
                      setSelectedPeople(
                        selectedPeople.filter((person) => person !== item.id)
                      );
                    } else {
                      setSelectedPeople([...selectedPeople, item.id]);
                    }
                  }}
                />
                <div className="my-1" />
              </>
            );
          })}
        </div>
        <div className="my-2" />
        <div className="flex w-full">
          {/* <Button children={"ADD"} /> */}
          <Button
            children={"ADD"}
            // onClick={() => setModalIsOpen(false)}
            onClick={() => {
              console.log(selectedPeople);
              closeModal();
            }}
          />
          {/* selectedPeople contains all the selected users */}
          <div className="mx-1" />
          <Button
            children={"CANCEL"}
            color={themeStyles.GRAY}
            onClick={() => {
              closeModal();
              setSelectedPeople([]);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddFacility;











/////


/////



import React, { useState, useRef, useMemo } from "react";
import PageHeader from "../../components/Headers/PageHeader";

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

import { MainHover, ScaleHover, ShadowHover } from "../../styles/animations";
import { useS3Upload } from "../../services/uploadFileToS3";
import { API, graphqlOperation, Auth } from "aws-amplify";
import Modal from "react-modal";
import { ErrorToast, SuccessToast } from "../../services/micro";

import { updateFacilityMutation } from "../../apolloql/mutations";
import { createBulkUsers } from "../../services/bulkUserCreation";
import { FACILITY_PERMISSIONS } from "../../constants/permissions";
import { useCreateFacility } from "../../apolloql/facilities";

import { facility as facilityTemplate } from "../../constants/dataTemplates";

import { useUpdateFacility } from "../../apolloql/facilities";

import { useS3ImageUpload } from "./hooks";
import { useFacilityManagement } from "./hooks";
import { usePermissionManagement } from "./hooks";
import { useFacilityOperations } from "./hooks";

Modal.setAppElement("#root");

const MODES = {
  SHIFT_DETAILS: "shiftDetails",
  ADD_MEMBERS: "addMembers",
};

const AddFacility = ({ isEdit, selectedObj }) => {
  const {
    uploading,
    uploadFile,
    imageUrl,
    fileInput,
    imagePlaceholder,
    handleDivClick,
    handleFileChange,
  } = useS3ImageUpload();

  const { facility, setFacilityKey, setArrayFacilityKey, addContact } =
    useFacilityManagement(selectedObj, facilityTemplate);

  const { permissions, togglePermission } =
    usePermissionManagement(FACILITY_PERMISSIONS);

  const { createUsers, editFacility } = useFacilityOperations();
  ////

  // const { uploading, uploadFile, imageUrl } = useS3Upload();

  const { createFacilityQuery } = useCreateFacility();

  // const fileInput = useRef(null);

  // const handleDivClick = () => {
  //   fileInput.current.click();
  // };

  // const [imagePlaceholder, setImagePlaceholder] = useState(null);
  const [imageRef, setImageRef] = useState(null);

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   setImageRef(file);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = function () {
  //       setImagePlaceholder(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  // const [facility, setFacility] = useState(
  //   selectedObj ? selectedObj : facilityTemplate
  // );

  // Update a single key in the people object
  // const setFacilityKey = (key) => (newValue) =>
  //   setFacility((prevPeople) => ({ ...prevPeople, [key]: newValue }));

  // const setArrayFacilityKey = (key, index, subKey) => (newValue) =>
  //   setFacility((prevPeople) => ({
  //     ...prevPeople,
  //     [key]: prevPeople[key].map((item, itemIndex) =>
  //       itemIndex === index ? { ...item, [subKey]: newValue } : item
  //     ),
  //   }));
  // Add a new blank contact to the contacts array
  // const addContact = () => {
  //   setFacility((prevFacility) => ({
  //     ...prevFacility,
  //     contacts: [
  //       ...prevFacility.contacts,
  //       {
  //         name: null,
  //         phone: null,
  //         email: null,
  //         position: null,
  //       },
  //     ],
  //   }));
  // };

  // const [permissions, setPermissions] = useState(FACILITY_PERMISSIONS);

  // const togglePermission = (section, index) => {
  //   setPermissions((prevPermissions) => {
  //     const newPermissions = { ...prevPermissions };
  //     newPermissions[section][index].isSelected =
  //       !newPermissions[section][index].isSelected;
  //     return newPermissions;
  //   });
  // };

  // async function createUsers() {
  //   const users = {
  //     Username: facility.email,
  //     Password: "Rentto@123",
  //     Email: facility.email,
  //   };

  //   try {
  //     const { result, parsedBody } = await createBulkUsers(users);

  //     if (!result || !parsedBody) {
  //       return;
  //     }

  //     if (result?.statusCode === 400) {
  //       console.error(
  //         "AdminCreateUser (ic-user-create):",
  //         parsedBody?.error?.message
  //       );
  //     } else {
  //       console.log(result, parsedBody);
  //       const ID = parsedBody.user.User.Attributes.find(
  //         (attribute) => attribute.Name === "sub"
  //       ).Value;

  //       const updatedFacility = {
  //         ...facility,
  //         permissions: JSON.stringify(permissions),
  //         id: ID,
  //       };

  //       if (imageRef) {
  //         const response = await uploadFile(imageRef);
  //         if (response.key) {
  //           Object.assign(updatedFacility, {
  //             imgSrc: response.key,
  //           });
  //         }
  //       }

  //       await createFacilityQuery(updatedFacility);

  //       SuccessToast("Facility updated successfully");
  //       console.log("Publish People", facility);
  //     }
  //   } catch (err) {
  //     ErrorToast("Error creating people or facility: " + err);
  //     console.log(err);
  //   }
  // }

  const publishPeople = () => {
    createUsers();
  };

  const updateFacilityInternal = async (facility, imageRef, permissions) => {
    const permissionsString = JSON.stringify(permissions);

    const {
      __typename,
      PeopleFacility,
      chatrooms,
      Messages,
      empCheckList,
      // _version,
      _deleted,
      _lastChangedAt,
      createdAt,
      updatedAt,
      FacilityPeople,
      ...updatedFacility
    } = facility;

    // const { ...updatedFacility } = facility;

    Object.assign(updatedFacility, {
      permissions: permissionsString,
      // imgSrc: imageUrl,
      _version: facility._version,
    });

    console.log("updatedFacility", updatedFacility);

    try {
      const result = await API.graphql(
        // graphqlOperation(updateFacility, { input: updatedFacility })
        graphqlOperation(updateFacilityMutation, { input: updatedFacility })
      );
      console.log(result);
      SuccessToast("Facility updated successfully");
      return { success: true, data: result.data, error: null };
    } catch (error) {
      console.error("Error updating facility: ", error);
      return { success: false, data: null, error };
    }
  };

  // const editFacility = () => {
  //   updateFacilityInternal(facility, imageRef, permissions);
  // };

  return (
    <div className="flex flex-col min-h-max px-3 pb-3">
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-start w-full">
        <PageHeader text={"Add People"} />
      </div>
      <div className="min-h-max px-3 mt-3 pb-3 bg-white">
        <div className="flex flex-row ">
          <div className="flex flex-col items-center" style={{ width: "55%" }}>
            <div className="flex my-3 flex-row justify-around w-full bg-red">
              <div
                className="flex flex-col w-full h-full rounded-lg border-blue-300 border-dotted border bg-PRIMARY_NEUTRAL_COLOR"
                style={{
                  paddingTop: imagePlaceholder ? "0%" : "15%",
                  paddingBottom: imagePlaceholder ? "0%" : "15%",
                }}
              >
                {imagePlaceholder ? (
                  <img
                    onClick={handleDivClick}
                    className={`flex-1 ${MainHover}
                        ${true ? "rounded" : "rounded-full"}
                        `}
                    src={
                      imagePlaceholder
                        ? imagePlaceholder
                        : "https://randomuser.me/api/portraits/men/20.jpg"
                    }
                    alt="User avatar"
                  />
                ) : (
                  <>
                    <div className="text-xxs text-grey">
                      {"Drop here or Upload cover image"}
                    </div>
                    <div className="my-2" />
                    <div className="flex w-full items-center justify-center">
                      <div
                        className={`${ScaleHover} py-4 flex flex-col justify-center items-center w-1/4 h-full rounded-3xl border-2 border-blue-300 border-dotted`}
                        onClick={handleDivClick}
                      >
                        <div className="flex flex-col items-center">
                          <Image />

                          <span className="mt-1">Open Gallery</span>
                        </div>
                      </div>

                      <div className="mx-1" />
                      <div
                        // className=" dark:hover:shadow-black/30 flex flex-col justify-center items-center w-40 h-full rounded-3xl border-2 border-blue-300 border-dotted"
                        className={`${ScaleHover} py-4 flex flex-col justify-center items-center w-1/4 h-full rounded-3xl border-2 border-blue-300 border-dotted`}
                      >
                        <div className="flex flex-col items-center">
                          <Camera />
                          <span className="mt-1">Camera</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mb-2 flex flex-row justify-around w-full items-center  ">
              <div className="flex flex-col w-full ">
                <div className="flex mb-2">
                  <InfoTitle text={"Basic Information"} />
                </div>
                <div className="flex flex-row ">
                  <div className="flex flex-col w-full ">
                    <div className="flex flex-row">
                      <Input
                        placeholder={"Facility Name"}
                        value={facility.facilityName}
                        setValue={setFacilityKey("facilityName")}
                      />
                    </div>

                    <div className="my-1" />

                    <div className="flex flex-row">
                      <Input
                        placeholder={"Facility Email"}
                        value={facility.email}
                        setValue={setFacilityKey("email")}
                      />
                    </div>

                    <div className="my-1" />

                    <div className="flex flex-row">
                      <Input
                        placeholder={"About Facility"}
                        multiline
                        value={facility.aboutFacility}
                        setValue={setFacilityKey("aboutFacility")}
                      />
                    </div>

                    <div className="flex flex-row">
                      <Input placeholder={"Facility Guide"} disabled />
                    </div>
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
                    <Input
                      placeholder={"Street Address"}
                      value={facility.streetAddress}
                      setValue={setFacilityKey("streetAddress")}
                    />
                    <div className="my-1" />

                    <div className="flex flex-row space-x-2">
                      <Input
                        placeholder={"State"}
                        value={facility.state}
                        setValue={setFacilityKey("state")}
                      />
                      <Input
                        placeholder={"City"}
                        value={facility.city}
                        setValue={setFacilityKey("city")}
                      />
                    </div>
                  </div>

                  <div className="mx-1" />

                  <div className="flex flex-col w-1/2">
                    {/* {" "} */}
                    <div className="flex flex-row">
                      <DropDown
                        placeholder={"Country"}
                        value={facility.country}
                        setValue={setFacilityKey("country")}
                        options={countries.map((item) => item.label)}
                      />
                    </div>

                    <div className="my-1" />

                    <div className="flex flex-row">
                      <Input
                        placeholder={"Zip"}
                        value={facility.zip}
                        setValue={setFacilityKey("zip")}
                      />
                      <div className="mx-1" />
                      <Input
                        placeholder={"Floor Number"}
                        value={facility.floors[0].floorNumber}
                        setValue={setArrayFacilityKey(
                          "floors",
                          0,
                          "floorNumber"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2 flex flex-row justify-around w-full items-center  ">
              <div className="flex flex-col w-full ">
                <div className="flex mb-2">
                  <InfoTitle text={"Contact Info"} />
                </div>
                {facility.contacts.map((contact, index) => {
                  return (
                    <div className="flex flex-row my-1 " key={index}>
                      <div className="flex flex-col w-1/2 ">
                        <div className="flex flex-row">
                          <Input
                            placeholder={"Contact Person Name"}
                            value={facility.contacts[index].name}
                            setValue={setArrayFacilityKey(
                              "contacts",
                              index,
                              "name"
                            )}
                          />
                        </div>

                        <div className="my-1" />
                        <div className="flex flex-row">
                          <DropDown
                            placeholder={"Position"}
                            value={facility.contacts[index].position}
                            setValue={setArrayFacilityKey(
                              "contacts",
                              index,
                              "position"
                            )}
                            options={["Employee", "General Manager"]}
                          />
                        </div>
                      </div>

                      <div className="mx-1" />

                      <div className="flex flex-col w-1/2">
                        <div className="flex flex-row">
                          <Input
                            placeholder={"Contact Person Phone"}
                            value={facility.contacts[index].phone}
                            setValue={setArrayFacilityKey(
                              "contacts",
                              index,
                              "phone"
                            )}
                          />
                        </div>
                        <div className="my-1" />

                        <div className="flex flex-row">
                          <Input
                            placeholder={"Email"}
                            value={facility.contacts[index].email}
                            setValue={setArrayFacilityKey(
                              "contacts",
                              index,
                              "email"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div
                  onClick={addContact}
                  className={`text-left text-PRIMARY_COLOR text-xs font-bold p-2 mt-2 w-full ${MainHover}`}
                >
                  + Add More Contact Info
                </div>
              </div>
            </div>

            <div className="my-3" />
            <div className="flex w-full">
              {/* <Button children={"PUBLISH"} onClick={publishPeople} /> */}
              {isEdit ? (
                <Button
                  children={"EDIT"}
                  onClick={() => {
                    editFacility();
                  }}
                />
              ) : (
                <Button children={"POST"} onClick={publishPeople} />
              )}
              <div className="mx-1" />

              <Button children={"CANCEL"} color={themeStyles.GRAY} />
            </div>
          </div>

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
                        onToggle={() => togglePermission("permissions", index)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-2" />

              <div className="w-full">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFacility;




////






///
//////



import React from "react";
import PageHeader from "../../components/Headers/PageHeader";

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

import { MainHover, ScaleHover } from "../../styles/animations";
import Modal from "react-modal";
import { FACILITY_PERMISSIONS } from "../../constants/permissions";

import { facility as facilityTemplate } from "../../constants/dataTemplates";

import { useS3ImageUpload } from "./hooks";
import { useFacilityManagement } from "./hooks";
import { usePermissionManagement } from "./hooks";
import { useFacilityOperations } from "./hooks";

Modal.setAppElement("#root");

const AddFacility = ({ isEdit, selectedObj }) => {
  const {
    imageRef,
    uploading,
    uploadFile,
    imageUrl,
    fileInput,
    imagePlaceholder,
    handleDivClick,
    handleFileChange,
  } = useS3ImageUpload();

  const { facility, setFacilityKey, setArrayFacilityKey, addContact } =
    useFacilityManagement(selectedObj, facilityTemplate);

  const { permissions, togglePermission } =
    usePermissionManagement(FACILITY_PERMISSIONS);

  const { createUsers, editFacility } = useFacilityOperations();

  const publishPeople = () => {
    createUsers(facility, permissions, imageRef, uploadFile);
  };

  return (
    <div className="flex flex-col min-h-max px-3 pb-3">
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-start w-full">
        <PageHeader text={"Add People"} />
      </div>
      <div className="min-h-max px-3 mt-3 pb-3 bg-white">
        <div className="flex flex-row ">
          <div className="flex flex-col items-center" style={{ width: "55%" }}>
            <div className="flex my-3 flex-row justify-around w-full bg-red">
              <div
                className="flex flex-col w-full h-full rounded-lg border-blue-300 border-dotted border bg-PRIMARY_NEUTRAL_COLOR"
                style={{
                  paddingTop: imagePlaceholder ? "0%" : "15%",
                  paddingBottom: imagePlaceholder ? "0%" : "15%",
                }}
              >
                {imagePlaceholder ? (
                  <img
                    onClick={handleDivClick}
                    className={`flex-1 ${MainHover}
                        ${true ? "rounded" : "rounded-full"}
                        `}
                    src={
                      imagePlaceholder
                        ? imagePlaceholder
                        : "https://randomuser.me/api/portraits/men/20.jpg"
                    }
                    alt="User avatar"
                  />
                ) : (
                  <>
                    <div className="text-xxs text-grey">
                      {"Drop here or Upload cover image"}
                    </div>
                    <div className="my-2" />
                    <div className="flex w-full items-center justify-center">
                      <div
                        className={`${ScaleHover} py-4 flex flex-col justify-center items-center w-1/4 h-full rounded-3xl border-2 border-blue-300 border-dotted`}
                        onClick={handleDivClick}
                      >
                        <div className="flex flex-col items-center">
                          <Image />

                          <span className="mt-1">Open Gallery</span>
                        </div>
                      </div>

                      <div className="mx-1" />
                      <div
                        // className=" dark:hover:shadow-black/30 flex flex-col justify-center items-center w-40 h-full rounded-3xl border-2 border-blue-300 border-dotted"
                        className={`${ScaleHover} py-4 flex flex-col justify-center items-center w-1/4 h-full rounded-3xl border-2 border-blue-300 border-dotted`}
                      >
                        <div className="flex flex-col items-center">
                          <Camera />
                          <span className="mt-1">Camera</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mb-2 flex flex-row justify-around w-full items-center  ">
              <div className="flex flex-col w-full ">
                <div className="flex mb-2">
                  <InfoTitle text={"Basic Information"} />
                </div>
                <div className="flex flex-row ">
                  <div className="flex flex-col w-full ">
                    <div className="flex flex-row">
                      <Input
                        placeholder={"Facility Name"}
                        value={facility.facilityName}
                        setValue={setFacilityKey("facilityName")}
                      />
                    </div>

                    <div className="my-1" />

                    <div className="flex flex-row">
                      <Input
                        placeholder={"Facility Email"}
                        value={facility.email}
                        setValue={setFacilityKey("email")}
                      />
                    </div>

                    <div className="my-1" />

                    <div className="flex flex-row">
                      <Input
                        placeholder={"About Facility"}
                        multiline
                        value={facility.aboutFacility}
                        setValue={setFacilityKey("aboutFacility")}
                      />
                    </div>

                    <div className="flex flex-row">
                      <Input placeholder={"Facility Guide"} disabled />
                    </div>
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
                    <Input
                      placeholder={"Street Address"}
                      value={facility.streetAddress}
                      setValue={setFacilityKey("streetAddress")}
                    />
                    <div className="my-1" />

                    <div className="flex flex-row space-x-2">
                      <Input
                        placeholder={"State"}
                        value={facility.state}
                        setValue={setFacilityKey("state")}
                      />
                      <Input
                        placeholder={"City"}
                        value={facility.city}
                        setValue={setFacilityKey("city")}
                      />
                    </div>
                  </div>

                  <div className="mx-1" />

                  <div className="flex flex-col w-1/2">
                    {/* {" "} */}
                    <div className="flex flex-row">
                      <DropDown
                        placeholder={"Country"}
                        value={facility.country}
                        setValue={setFacilityKey("country")}
                        options={countries.map((item) => item.label)}
                      />
                    </div>

                    <div className="my-1" />

                    <div className="flex flex-row">
                      <Input
                        placeholder={"Zip"}
                        value={facility.zip}
                        setValue={setFacilityKey("zip")}
                      />
                      <div className="mx-1" />
                      <Input
                        placeholder={"Floor Number"}
                        value={facility.floors[0].floorNumber}
                        setValue={setArrayFacilityKey(
                          "floors",
                          0,
                          "floorNumber"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2 flex flex-row justify-around w-full items-center  ">
              <div className="flex flex-col w-full ">
                <div className="flex mb-2">
                  <InfoTitle text={"Contact Info"} />
                </div>
                {facility.contacts.map((contact, index) => {
                  return (
                    <div className="flex flex-row my-1 " key={index}>
                      <div className="flex flex-col w-1/2 ">
                        <div className="flex flex-row">
                          <Input
                            placeholder={"Contact Person Name"}
                            value={facility.contacts[index].name}
                            setValue={setArrayFacilityKey(
                              "contacts",
                              index,
                              "name"
                            )}
                          />
                        </div>

                        <div className="my-1" />
                        <div className="flex flex-row">
                          <DropDown
                            placeholder={"Position"}
                            value={facility.contacts[index].position}
                            setValue={setArrayFacilityKey(
                              "contacts",
                              index,
                              "position"
                            )}
                            options={FACILITY_EMPLOYEE_TYPES}
                          />
                        </div>
                      </div>

                      <div className="mx-1" />

                      <div className="flex flex-col w-1/2">
                        <div className="flex flex-row">
                          <Input
                            placeholder={"Contact Person Phone"}
                            value={facility.contacts[index].phone}
                            setValue={setArrayFacilityKey(
                              "contacts",
                              index,
                              "phone"
                            )}
                          />
                        </div>
                        <div className="my-1" />

                        <div className="flex flex-row">
                          <Input
                            placeholder={"Email"}
                            value={facility.contacts[index].email}
                            setValue={setArrayFacilityKey(
                              "contacts",
                              index,
                              "email"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div
                  onClick={addContact}
                  className={`text-left text-PRIMARY_COLOR text-xs font-bold p-2 mt-2 w-full ${MainHover}`}
                >
                  + Add More Contact Info
                </div>
              </div>
            </div>

            <div className="my-3" />
            <div className="flex w-full">
              {/* <Button children={"PUBLISH"} onClick={publishPeople} /> */}
              {isEdit ? (
                <Button
                  children={"EDIT"}
                  onClick={() => {
                    editFacility();
                  }}
                />
              ) : (
                <Button children={"POST"} onClick={publishPeople} />
              )}
              <div className="mx-1" />

              <Button children={"CANCEL"} color={themeStyles.GRAY} />
            </div>
          </div>

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
                        onToggle={() => togglePermission("permissions", index)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-2" />

              <div className="w-full">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFacility;
