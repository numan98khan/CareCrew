import React, { useState } from "react";
import Modal from "react-modal";

import themeStyles from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";
import Button from "../../components/Button/index";

import { FACILITY_PERMISSIONS, SUPER_ADMIN } from "../../constants/permissions";
import { facility as facilityTemplate } from "../../constants/dataTemplates";

import {
  useS3ImageUpload,
  useFacilityManagement,
  usePermissionManagement,
  useFacilityOperations,
} from "./hooks";

import {
  ImageUploader,
  BasicInformationForm,
  AddressForm,
  ContactInfoForm,
  PermissionsTab,
} from "./forms";
import { ErrorToast } from "../../services/micro";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";

Modal.setAppElement("#root");

const AddFacility = ({
  isEdit,
  selectedObj,
  goBackHandler,
  refetchFacilities,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();
  const isSuperAdmin = SUPER_ADMIN === user?.attributes?.email;

  const {
    fileRef,
    setFileRef,
    imageRef,
    uploading,
    uploadFile,
    imageUrl,
    fileInput,
    imagePlaceholder,
    handleDivClick,
    handleFileChange,
  } = useS3ImageUpload();

  const {
    facility,
    setFacility,
    setFacilityKey,
    setArrayFacilityKey,
    addContact,
  } = useFacilityManagement(selectedObj, facilityTemplate);

  const [removedContactList, setRemovedContactList] = useState([]);
  const removeContact = (emailToRemove) => {
    const contactToRemove = facility.contacts.find(
      (contact) => contact.email === emailToRemove
    );

    if (!contactToRemove) {
      console.error("Contact to remove not found.");
      return;
    }

    const updatedContacts = facility.contacts.filter(
      (contact) => contact.email !== emailToRemove
    );

    // Log for debugging
    console.log(
      "🚀 ~ file: index.js:65 ~ removeContact ~ updatedContacts:",
      updatedContacts,
      facility?.contacts
    );

    // Update facility state
    setFacility((prevFacility) => ({
      ...prevFacility,
      contacts: updatedContacts,
    }));

    // Add the removed contact to removedContactList state
    setRemovedContactList((prevList) => [...prevList, contactToRemove]);
  };

  const { permissions, togglePermission } = usePermissionManagement(
    selectedObj ? JSON.parse(selectedObj?.permissions) : FACILITY_PERMISSIONS
  );

  const { createUsers, editFacility } = useFacilityOperations();

  function validateFacility(facility) {
    // Email format validation using regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Latitude and Longitude format validation using regex
    // Matches numbers with at least 6 decimal points
    const latLngPattern = /^-?\d+\.\d{6,}$/;
    // const latLngPattern = /^-?\d+\.\d{6,}$/;

    // Some basic validations
    if (!facility.facilityName) {
      return "Facility name is required.";
    }

    // if (!facility.aboutFacility) {
    //   return "About facility is required.";
    // }

    if (!facility.streetAddress) {
      return "Street address is required.";
    }
    if (!facility.country) {
      return "Country is required.";
    }
    if (!facility.city) {
      return "City is required.";
    }
    if (!facility.state) {
      return "State is required.";
    }
    if (!facility.zip) {
      return "Zip code is required.";
    }
    if (facility?.zip?.toString()?.length !== 5) {
      return "Zip code can only be 5 digits.";
    }

    // TEMP DISABLE
    if (!facility.lat || !latLngPattern.test(facility.lat)) {
      return "Latitude is required and should be a float with at least 6 decimal points.";
    }
    if (!facility.lng || !latLngPattern.test(facility.lng)) {
      return "Longitude is required and should be a float with at least 6 decimal points.";
    }

    // Validate the latitude and longitude ranges
    if (parseFloat(facility.lat) < -90 || parseFloat(facility.lat) > 90) {
      return "Latitude should be between -90 and 90.";
    }
    if (parseFloat(facility.lng) < -180 || parseFloat(facility.lng) > 180) {
      return "Longitude should be between -180 and 180.";
    }

    // Check if there is at least one contact
    if (
      !facility.contacts ||
      !Array.isArray(facility.contacts) ||
      facility.contacts.length === 0
    ) {
      return "At least one contact is required.";
    }

    // Validate details for all contacts
    for (let i = 0; i < facility.contacts.length; i++) {
      const contact = facility.contacts[i];
      // if (!contact.name) {
      //   return `Contact ${i + 1} name is required.`;
      // }
      if (!contact.firstName) {
        return `Contact ${i + 1} first name is required.`;
      }
      if (!contact.lastName) {
        return `Contact ${i + 1} last name is required.`;
      }
      if (!contact.phone) {
        return `Contact ${i + 1} phone is required.`;
      }
      if (!contact.phone || !/^\d{10}$/.test(contact.phone)) {
        return "A valid US phone number in the format '1234567890' is required.";
      }
      if (!contact.email || !emailPattern.test(contact.email)) {
        return `Contact ${i + 1} valid email is required.`;
      }
      if (!contact.position) {
        return `Contact ${i + 1} position is required.`;
      }
    }

    return null; // Returns null if validation is successful
  }

  const deduplicateContacts = (contacts) => {
    const seen = new Set();
    return contacts.filter((contact) => {
      if (seen.has(contact.email)) {
        return false;
      }
      seen.add(contact.email);
      return true;
    });
  };
  const publish = async () => {
    const result = validateFacility(facility);
    if (result) {
      ErrorToast(result);
      return;
    }

    const facilityObj = {
      ...facility,
      contacts: deduplicateContacts(facility.contacts),
    };

    setIsLoading(true);
    const createUsersResponse = await createUsers(
      facilityObj,
      permissions,
      imageRef,
      fileRef,
      uploadFile
    );
    refetchFacilities();
    if (goBackHandler && createUsersResponse === 1) {
      goBackHandler();
    }
    // navigate("/facilities");
    setIsLoading(false);
  };

  const edit = async () => {
    const result = validateFacility(facility);
    if (result) {
      ErrorToast(result);
      return;
    }

    const facilityObj = {
      ...facility,
      contacts: deduplicateContacts(facility.contacts),
    };

    setIsLoading(true);
    await editFacility(
      facilityObj,
      permissions,
      imageRef,
      fileRef,
      uploadFile,
      removedContactList
    );
    refetchFacilities();
    if (goBackHandler) {
      goBackHandler();
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-max px-3 pb-3">
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*" // Add this line
      />
      <div className="flex flex-col items-start w-full">
        <PageHeader text={isEdit ? "Change Facility" : "Add Facility"} />
      </div>
      <div className="min-h-max px-3 mt-3 pb-3 bg-white">
        <div className="flex flex-row ">
          <div className="flex flex-col items-center" style={{ width: "55%" }}>
            <div className="flex my-3 flex-row justify-around w-full bg-red">
              {/* <ImageUploader /> */}
              <ImageUploader
                imagePlaceholder={imagePlaceholder}
                handleDivClick={handleDivClick}
                disableCamera={true}
              />
            </div>

            <div className="mb-2 flex flex-row justify-around w-full items-center  ">
              <BasicInformationForm
                facility={facility}
                setFacilityKey={setFacilityKey}
                setFileRef={setFileRef}
              />
            </div>

            <div className="mb-2 flex flex-row justify-around w-full items-center">
              <AddressForm
                facility={facility}
                setFacilityKey={setFacilityKey}
                setArrayFacilityKey={setArrayFacilityKey}
              />
            </div>

            <div className="mb-2 flex flex-row justify-around w-full items-center  ">
              <ContactInfoForm
                facility={facility}
                setArrayFacilityKey={setArrayFacilityKey}
                addContact={addContact}
                isEdit={isEdit}
                deleteContact={removeContact}
                isSuperAdmin={isSuperAdmin}
              />
            </div>

            <div className="my-3" />
            <div className="flex w-full">
              {isEdit ? (
                <Button
                  children={"SAVE CHANGES"}
                  onClick={edit}
                  disabled={isLoading}
                />
              ) : (
                <Button
                  children={"POST"}
                  onClick={publish}
                  disabled={isLoading}
                />
              )}
              <div className="mx-1" />

              <Button
                children={"CANCEL"}
                color={themeStyles.GRAY}
                disabled={isLoading}
                onClick={() => {
                  isEdit ? goBackHandler() : goBackHandler();
                }}
              />
            </div>
          </div>

          <div className="p-4" style={{ width: "45%" }}>
            <PermissionsTab
              permissions={permissions}
              togglePermission={togglePermission}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFacility;
