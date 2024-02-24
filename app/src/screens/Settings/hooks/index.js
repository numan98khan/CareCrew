import {
  useCreateFacility,
  useUpdateFacility,
} from "../../../apolloql/facilities";

import { ErrorToast, SuccessToast } from "../../../services/micro";

import { API, graphqlOperation, Auth } from "aws-amplify";

export const useStaffMemberOperations = () => {
  const { createFacilityQuery } = useCreateFacility();
  const { updateFacilityQuery } = useUpdateFacility();

  const createUsers = async (
    facility,
    permissions,
    imageRef,
    fileRef,
    uploadFile
  ) => {
    const users = {
      Username: facility.email,
      Password: "Rentto@123",
      Email: facility.email,
    };

    try {
      // const { result, parsedBody } = await createBulkUsers(users);
      const result = 1;
      const parsedBody = 1;

      if (!result || !parsedBody) {
        ErrorToast("No response from AdminCreateUser (ic-user-create):");
        return;
      }

      if (result?.statusCode === 400) {
        console.error(
          "AdminCreateUser (ic-user-create):",
          parsedBody?.error?.message
        );
      } else {
        // const ID = parsedBody.user.User.Attributes.find(
        //   (attribute) => attribute.Name === "sub"
        // ).Value;

        // const ID = "5255";

        const updatedFacility = {
          ...facility,
          permissions: JSON.stringify(permissions),
          // id: ID,
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

        try {
          // await updatePeopleQuery(updatedPeople);

          await createFacilityQuery(updatedFacility);

          SuccessToast("Facility created successfully");
        } catch (error) {
          console.error("Error updating people: ", error);
          ErrorToast("Error creating facility: " + error);
        }
      }
    } catch (err) {
      ErrorToast("Error creating facility: " + err);
    }
  };

  const editFacility = async (
    facility,
    permissions,
    imageRef,
    fileRef,
    uploadFile
  ) => {
    //... the content from your editFacility function
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

    try {
      // const result = await API.graphql(
      //   // graphqlOperation(updateFacility, { input: updatedFacility })
      //   graphqlOperation(updateFacilityMutation, { input: updatedFacility })
      // );

      const result = await updateFacilityQuery(updatedFacility);

      SuccessToast("Facility updated successfully");
      return { success: true, data: result.data, error: null };
    } catch (error) {
      // console.error("Error updating facility: ", error);
      return { success: false, data: null, error };
    }
  };

  return { createUsers, editFacility };
};
