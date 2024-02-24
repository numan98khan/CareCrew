// hooks/useS3ImageUpload.js
import { useState, useRef } from "react";
// import { useS3Upload } from "some-library"; // Your S3 upload library
import { useS3Upload } from "../../services/uploadFileToS3";
// hooks/useFacilityOperations.js

import { updateFacilityMutation } from "../../apolloql/mutations";
import {
  createBulkUsers,
  deleteBulkUsers,
} from "../../services/bulkUserCreation";
import { FACILITY_PERMISSIONS } from "../../constants/permissions";
import {
  useCreateFacility,
  useUpdateFacility,
} from "../../apolloql/facilities";

import { ErrorToast, SuccessToast } from "../../services/micro";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { useCreateBilling } from "../../apolloql/billing";
import { billing } from "../../constants/dataTemplates";
import {
  createPeople,
  createPeopleFacility,
  deletePeopleFacility,
} from "../../graphql/mutations";
import { FACILITY } from "../../constants/userTypes";
import { getPeople, listPeople } from "../../graphql/queries";
import { useDeletePeople, useUpdatePeople } from "../../apolloql/people";

export const useS3ImageUpload = () => {
  const { uploading, uploadFile, imageUrl } = useS3Upload();
  const fileInput = useRef(null);
  const [imagePlaceholder, setImagePlaceholder] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [fileRef, setFileRef] = useState(null);

  const handleDivClick = () => fileInput.current.click();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setImageRef(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePlaceholder(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return {
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
  };
};

export const useFacilityManagement = (selectedObj, facilityTemplate) => {
  const [facility, setFacility] = useState(
    selectedObj ? selectedObj : facilityTemplate
  );

  const setFacilityKey = (key) => (newValue) =>
    setFacility((prevFacility) => ({ ...prevFacility, [key]: newValue }));

  const setArrayFacilityKey = (key, index, subKey) => (newValue) =>
    setFacility((prevFacility) => ({
      ...prevFacility,
      [key]: prevFacility[key].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [subKey]: newValue } : item
      ),
    }));

  const addContact = () => {
    setFacility((prevFacility) => ({
      ...prevFacility,
      contacts: [
        ...prevFacility.contacts,
        { name: null, phone: null, email: null, position: null },
      ],
    }));
  };

  return {
    facility,
    setFacility,
    setFacilityKey,
    setArrayFacilityKey,
    addContact,
  };
};

export const usePermissionManagement = (initialPermissions) => {
  const [permissions, setPermissions] = useState(initialPermissions);

  const togglePermission = (section, index) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      newPermissions[section][index].isSelected =
        !newPermissions[section][index].isSelected;
      return newPermissions;
    });
  };

  return { permissions, togglePermission };
};

export const useFacilityOperations = () => {
  const { createFacilityQuery } = useCreateFacility();
  const { updateFacilityQuery } = useUpdateFacility();
  const { createBillingQuery } = useCreateBilling();

  const { updatePeopleQuery } = useUpdatePeople();

  const { deletePeopleQuery } = useDeletePeople();

  const createUsers = async (
    facility,
    permissions,
    imageRef,
    fileRef,
    uploadFile
  ) => {
    try {
      let billingObj = null;
      let facilityResult = null;

      let finalResponse = 1;

      const userCreationPromises = []; // Store promises here
      const createdMembers = [];

      for (const contact of facility?.contacts) {
        const userObj = {
          Username: contact.email,
          Password: "Rentto@123",
          Email: contact.email,
        };

        const userCreation = (async () => {
          const { result, parsedBody } = await createBulkUsers(userObj);
          if (result?.statusCode === 400) {
            throw new Error(`${userObj?.Email}: ` + parsedBody?.error?.message);
            finalResponse = -1;
          }

          const ID = parsedBody?.user?.User?.Attributes?.find(
            (attribute) => attribute.Name === "sub"
          ).Value;

          const updatedPeople = {
            permissions: JSON.stringify(permissions),
            email: userObj?.Email,
            firstName: contact?.firstName,
            lastName: contact?.lastName,
            phoneNumber: contact?.phone,
            position: contact?.position,
            type: FACILITY,
            id: ID,
          };

          const result_createPeople = await API.graphql(
            graphqlOperation(createPeople, { input: updatedPeople })
          );
          return result_createPeople;
        })();

        userCreationPromises.push(userCreation);
      }

      try {
        const results = await Promise.all(userCreationPromises);
        createdMembers.push(...results);
      } catch (error) {
        ErrorToast(error.message);
        return; // Stop execution
      }

      // Now create the facility, as all users have been successfully created
      // ... [rest of your code]

      try {
        billingObj = await createBillingQuery(billing);
        // SuccessToast("Billing created successfully");
        console.log("Billing created successfully");
      } catch (error) {
        ErrorToast("Error in creating billing.");
        return;
      }

      try {
        const updatedFacility = {
          ...facility,
          permissions: JSON.stringify(permissions),
          facilityBillingId: billingObj.id,
          // id: ID, // FIXME
        };

        if (imageRef) {
          const response = await uploadFile(imageRef);
          if (response.key) {
            Object.assign(updatedFacility, {
              imgSrc: response.key,
            });
          }
        }

        if (fileRef) {
          const response = await uploadFile(fileRef);
          if (response.key) {
            Object.assign(updatedFacility, {
              documents: { name: "Facility Guide", key: response.key },
            });
          }
        }

        facilityResult = await createFacilityQuery(updatedFacility);
        SuccessToast("Facility created successfully");
      } catch (error) {
        console.error("Error in creating facility:", error);
        ErrorToast("Error in creating facility.");
        // return;
      }

      for (const person of createdMembers) {
        // console.log(
        //   "🚀 ~ file: hooks.js:209 ~ useFacilityOperations ~ person:",
        //   person
        // );
        try {
          const resultFP = await API.graphql(
            graphqlOperation(createPeopleFacility, {
              input: {
                facilityId: facilityResult?.createFacility?.id,
                peopleId: person?.data?.createPeople?.id,
              },
            })
          );
        } catch (error) {
          ErrorToast("Error creating Facility People: ", error);
        }
      }

      return finalResponse;
    } catch (err) {
      ErrorToast("Error creating facility: " + err);
      console.log(err);
    }
  };

  const editFacility = async (
    facility,
    permissions,
    imageRef,
    fileRef,
    uploadFile,
    removedContactList
  ) => {
    try {
      const permissionsString = JSON.stringify(permissions);
      const {
        __typename,
        PeopleFacility,
        Billing,
        chatrooms,
        Messages,
        empCheckList,
        _deleted,
        _lastChangedAt,
        createdAt,
        updatedAt,
        FacilityPeople,
        ...updatedFacility
      } = facility;

      Object.assign(updatedFacility, {
        permissions: permissionsString,
        contacts: facility.contacts.map(({ __typename, ...rest }) => rest),
        floors: facility.floors.map(({ __typename, ...rest }) => rest),
        _version: facility._version,
      });

      if (imageRef) {
        const response = await uploadFile(imageRef);
        if (response.key) {
          Object.assign(updatedFacility, {
            imgSrc: response.key,
          });
        }
      }

      if (fileRef) {
        const response = await uploadFile(fileRef);
        if (response.key) {
          Object.assign(updatedFacility, {
            documents: { name: "Facility Guide", key: response.key },
          });
        }
      }

      // Step 1: Fetch existing users using their email IDs
      const existingContactPeople = await fetchUsersByEmails(
        facility.contacts.map((contact) => contact.email)
      );

      // Step 2: Update existing users
      for (const contactPerson of existingContactPeople) {
        const getPeople = /* GraphQL */ `
          query GetPeople($id: ID!) {
            getPeople(id: $id) {
              id
              firstName
              lastName
              phoneNumber
              email
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              __typename
            }
          }
        `;
        const contact = facility.contacts.find(
          (c) => c.email === contactPerson?.email
        );
        const fetchedPerson = (
          await API.graphql(
            graphqlOperation(getPeople, {
              id: contactPerson?.id,
            })
          )
        )?.data?.getPeople;
        const toUpdate = {
          id: fetchedPerson?.id,
          firstName: contact?.firstName,
          lastName: contact?.lastName,
          phoneNumber: contact?.phone,
          position: contact?.position,
          _version: fetchedPerson?._version,
        };
        const response = await updatePeopleQuery(toUpdate);
      }

      // Step 3: Create new users
      const newUserContacts = facility.contacts.filter(
        (contact) =>
          !existingContactPeople
            ?.map((person) => person?.email)
            .includes(contact.email)
      );
      for (const newContact of newUserContacts) {
        await createSingleUser(newContact, updatedFacility); // Using logic from createUsers function
      }

      // Step 1: Fetch existing users using their email IDs
      const removingContactPeople = await fetchUsersByEmails(
        removedContactList.map((contact) => contact.email)
      );
      for (const toRemoveContact of removedContactList) {
        const temp = { Username: toRemoveContact?.email };
        await deleteBulkUsers(temp);

        const fetchedPeopleObj = removingContactPeople.find(
          (obj) => obj?.email === toRemoveContact?.email
        );

        await deletePeopleQuery({
          id: fetchedPeopleObj?.id,
          _version: fetchedPeopleObj?._version,
        });
      }

      for (let facilityPeople of facility?.FacilityPeople?.items) {
        if (
          !removedContactList
            .map((contact) => contact.email)
            .includes(facilityPeople?.people?.email)
        ) {
          continue;
        }

        try {
          // Assuming person.id and facility.id are the correct identifiers
          await API.graphql(
            graphqlOperation(deletePeopleFacility, {
              input: {
                id: facilityPeople?.id,
                _version: facilityPeople?._version,
              },
            })
          );
        } catch (error) {
          console.error("Error deleting Facility-People association: ", error);
          // ErrorToast(
          //   "Error deleting Facility-People association. Please try again."
          // );
        }
      }

      if (facility?.documents) {
        const { __typename: _, ...documentsWithoutTypename } =
          facility.documents;

        Object.assign(updatedFacility, {
          documents: documentsWithoutTypename,
        });
      }
      console.log(
        "🚀 ~ file: hooks.js:407 ~ useFacilityOperations ~ updatedFacility:",
        updatedFacility
      );

      const result = await updateFacilityQuery(updatedFacility);
      SuccessToast("Facility updated successfully");
      return { success: true, data: result.data, error: null };
    } catch (error) {
      console.error("Error updating facility: ", error);
      return { success: false, data: null, error };
    }
  };

  async function fetchUsersByEmails(emails) {
    const fetchedEmails = [];

    const listPeople = /* GraphQL */ `
      query ListPeople(
        $filter: ModelPeopleFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            id
            firstName
            lastName
            phoneNumber
            email
            _version
          }
          nextToken
          startedAt
          __typename
        }
      }
    `;

    for (const email of emails) {
      try {
        const response = await API.graphql(
          graphqlOperation(listPeople, {
            filter: {
              email: {
                eq: email,
              },
              _deleted: {
                ne: true,
              },
            },
          })
        );

        // Merge with the main list
        fetchedEmails.push(...response.data.listPeople?.items);
      } catch (error) {
        console.error(`Error fetching user by email ${email}:`, error);
        // Optionally: continue fetching for the next emails even if one fails
        // continue;
      }
    }

    return fetchedEmails;
  }

  // Update an existing user using their email ID
  async function updateUserByEmail(contact) {}

  // Create single user
  async function createSingleUser(contact, facility) {
    const userObj = {
      Username: contact.email,
      Password: "Rentto@123",
      Email: contact.email,
    };

    try {
      const { result, parsedBody } = await createBulkUsers(userObj);
      if (result?.statusCode === 400) {
        throw new Error(`${userObj?.Email}: ` + parsedBody?.error?.message);
      }

      const ID = parsedBody?.user?.User?.Attributes?.find(
        (attribute) => attribute.Name === "sub"
      ).Value;

      const updatedPeople = {
        email: userObj?.Email,
        firstName: contact?.firstName,
        lastName: contact?.lastName,
        phoneNumber: contact?.phone,
        position: contact?.position,
        type: FACILITY,
        id: ID,
      };

      const result_createPeople = await API.graphql(
        graphqlOperation(createPeople, { input: updatedPeople })
      );

      try {
        const resultFP = await API.graphql(
          graphqlOperation(createPeopleFacility, {
            input: {
              facilityId: facility?.id,
              peopleId: result_createPeople?.data?.createPeople?.id,
            },
          })
        );
      } catch (error) {
        ErrorToast(
          "Error creating Facility People for contact creation: ",
          error
        );
      }

      return result_createPeople;
    } catch (error) {
      console.error(`Error creating user for email ${contact.email}:`, error);
      throw error; // rethrowing the error to handle it outside
    }
  }

  return { createUsers, editFacility };
};
