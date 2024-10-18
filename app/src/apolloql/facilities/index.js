import { gql, useQuery, useMutation } from "@apollo/client";
import {
  createFacility,
  deleteFacility,
  updateFacility,
} from "../../graphql/mutations";

// import { listFacilities } from "../../graphql/queries";

import { ErrorToast, SuccessToast } from "../../services/micro";

export const listFacilities = /* GraphQL */ `
  query ListFacilities(
    $filter: ModelFacilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFacilities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        FacilityPeople {
          items {
            id
            peopleId
            facilityId
            people {
              id
              firstName
              lastName
              phoneNumber
              documents {
                name
                key
              }
              country
              city
              state
              zip
              timezone
              language
              isEmailNotifications
              isTextNotification
              effectiveStartDate
              driverLicenseNumber
              driverLicenseState
              SSN
              uniformSize
              isCompleteDrugScreening
              emergencyContactName
              emergencyContactNumber
              emergencyContactRelationship
              milesToWork
              licenseCode
              profilePicture
              role
              status
              email
              points
              rating
              empCheckList {
                name
                isBool
              }
              permissions
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            __typename
          }
          nextToken
          startedAt
          __typename
        }
        imgSrc
        facilityName
        aboutFacility
        streetAddress
        country
        city
        state
        lat
        lng
        documents {
          name
          key
        }
        zip
        floors {
          floorNumber
        }
        contacts {
          name
          firstName
          lastName
          phone
          email
          position
        }
        email
        permissions
        Billing {
          id
          hourlyRate
          hourlyRateCNA
          hourlyRateLPN
          hourlyRateRN
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;

export const getFacilityDetailed = /* GraphQL */ `
  query GetFacility($id: ID!) {
    getFacility(id: $id) {
      id
      FacilityPeople {
        items {
          id
          peopleId
          facilityId
          people {
            id
            firstName
            lastName
            phoneNumber
            documents {
              name
              key
            }
            country
            city
            state
            zip
            timezone
            language
            isEmailNotifications
            isTextNotification
            effectiveStartDate
            driverLicenseNumber
            driverLicenseState
            SSN
            uniformSize
            isCompleteDrugScreening
            emergencyContactName
            emergencyContactNumber
            emergencyContactRelationship
            milesToWork
            licenseCode
            profilePicture
            role
            status
            email
            points
            rating
            empCheckList {
              name
              isBool
            }
            permissions
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      imgSrc
      facilityName
      aboutFacility
      streetAddress
      country
      city
      state
      zip
      documents {
        name
        key
      }
      floors {
        floorNumber
      }
      contacts {
        name
        phone
        email
        position
      }
      email
      permissions
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const useGetFacility = (id) => {
  const { data, loading, error } = useQuery(gql(getFacilityDetailed), {
    variables: { id: id },
  });

  if (loading) {
    console.log("Loading Facility...");
    return { loading, error, facility: null };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, facility: null };
  }

  const facility = data ? data.getFacility : null;

  return { facility, loading, error };
};

export const useCreateFacility = () => {
  const [createFacilityAlias, { data, loading, error }] = useMutation(
    gql(createFacility)
  );

  const createFacilityQuery = async (facility) => {
    try {
      const { data } = await createFacilityAlias({
        variables: {
          input: facility,
        },
      });
      return data;
    } catch (err) {
      console.error("Error creating facility: ", err);
      throw err;
    }
  };

  return { createFacilityQuery, data, loading, error };
};
export const useDeleteFacility = () => {
  const [deleteFacilityAlias, { data, loading, error }] = useMutation(
    gql(deleteFacility)
  );

  const deleteFacilityQuery = async (facility) => {
    try {
      const { data } = await deleteFacilityAlias({
        variables: {
          input: facility,
        },
      });
      return data;
    } catch (err) {
      console.error("Error deleting facility: ", err);
      throw err;
    }
  };

  return { deleteFacilityQuery, data, loading, error };
};

export const useUpdateFacility = () => {
  const [updateFacilityMutation, { data, loading, error }] = useMutation(
    gql(updateFacility)
  );

  const updateFacilityQuery = async (input) => {
    try {
      // Ensure that the _version attribute is included in the variables
      const { data } = await updateFacilityMutation({
        variables: { input: input },
      });

      // Display success toast
      // SuccessToast("Facility updated successfully");
      return data;
    } catch (error) {
      // Display error toast
      // ErrorToast("An error occurred while updating facility.");
      throw error;
    }
  };

  return { updateFacilityQuery, data, loading, error };
};

// LIST_PEOPLE query hook
export const useListFacilities = () => {
  const { data, loading, error, refetch } = useQuery(gql(listFacilities));

  // const { data, loading, error, refetch } = useQuery(gql(listFac));

  if (loading) {
    console.log("Loading Facilities...");
    return { loading, error, people: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, people: [] };
  }

  // console.log("listFacilities Data received!", data);

  const facilities = data
    ? data.listFacilities.items.filter((element) => element._deleted !== true)
    : [];

  return { facilities, loading, error, refetch };
};
