import { gql, useQuery, useMutation } from "@apollo/client";
import { listPeople, getPeople } from "../../graphql/queries";
import {
  createPeople,
  deletePeople,
  updatePeople,
} from "../../graphql/mutations";

import { ErrorToast, SuccessToast } from "../../services/micro";

// createPeople mutation hook
export const useCreatePeople = () => {
  const [createPeopleMutation, { data, loading, error }] = useMutation(
    gql(createPeople)
  );

  const createPeopleQuery = async (input) => {
    try {
      const { data } = await createPeopleMutation({
        variables: { input: input },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { createPeopleQuery, data, loading, error };
};

// deletePeople mutation hook
export const useDeletePeople = () => {
  const [deletePeopleMutation, { data, loading, error }] = useMutation(
    gql(deletePeople) // Assuming deletePeople is your mutation string
  );

  const deletePeopleQuery = async (input) => {
    try {
      const { data } = await deletePeopleMutation({
        variables: { input: input },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { deletePeopleQuery, data, loading, error };
};

// export const useCreateFacility = () => {
//   const [createFacilityAlias, { data, loading, error }] = useMutation(
//     gql(createFacility)
//   );

//   const createFacilityQuery = async (facility) => {
//     try {
//       const { data } = await createFacilityAlias({
//         variables: {
//           input: facility,
//         },
//       });
//       return data;
//     } catch (err) {
//       console.error("Error creating facility: ", err);
//       throw err;
//     }
//   };

//   return { createFacilityQuery, data, loading, error };
// };
// updatePeople mutation hook

export const useUpdatePeople = () => {
  const [updatePeopleMutation, { data, loading, error }] = useMutation(
    gql(updatePeople)
  );

  const updatePeopleQuery = async (input) => {
    try {
      // Ensure that the _version attribute is included in the variables
      const { data } = await updatePeopleMutation({
        variables: { input: input },
      });

      // Display success toast
      // SuccessToast("Employee updated successfully");
      return data;
    } catch (error) {
      // Display error toast
      // ErrorToast("An error occurred while updating employee.");
      throw error;
    }
  };

  return { updatePeopleQuery, data, loading, error };
};

export const useGetPeople = (id) => {
  const { data, loading, error } = useQuery(gql(getPeople), {
    variables: { id },
  });

  if (loading) {
    console.log("Loading People...");
    return { loading, error, people: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, people: [] };
  }

  const person = data ? data.getPeople : [];

  return { person, loading, error };
};

const getActivityDateRange = (activity) => {
  const today = new Date();
  let startDate, endDate;

  switch (activity) {
    case "30 Days":
      endDate = new Date(today);
      startDate = new Date(today.setDate(today.getDate() - 30));
      break;
    case "60 Days":
      endDate = new Date(today);
      startDate = new Date(today.setDate(today.getDate() - 60));
      break;
    case "90 Days":
      endDate = new Date(today);
      startDate = new Date(today.setDate(today.getDate() - 90));
      break;
    case "90+ Days":
      startDate = new Date("1970-01-01"); // set to epoch or a very early date
      endDate = new Date(today.setDate(today.getDate() - 90));
      break;
    default:
      startDate = new Date("1970-01-01");
      endDate = new Date();
      break;
  }

  return { startDate, endDate };
};

// LIST_PEOPLE query hook
export const useListPeople = ({
  role,
  status,
  rating,
  points,
  type,
  lastActiveMinutes,
  isAdminHold,
} = {}) => {
  // Calculate the timestamp for the lastActiveMinutes filter
  let lastActiveDate;
  if (lastActiveMinutes !== undefined) {
    const currentDate = new Date();
    currentDate.setUTCMinutes(currentDate.getUTCMinutes() - lastActiveMinutes);
    lastActiveDate = currentDate.toISOString();
  }

  const filter = {
    _deleted: { ne: true },
    ...(role !== undefined && { role: { eq: role } }),
    ...(status !== undefined && { status: { eq: status } }),
    ...(rating !== undefined && { rating: { ge: rating, lt: rating + 1 } }),
    ...(points !== undefined && {
      points: points === 0 ? { eq: 0 } : { le: points },
    }),
    ...(type !== undefined && { type: { eq: type } }),
    ...(isAdminHold !== undefined && { adminHold: { eq: isAdminHold } }),
    // ...(lastActiveMinutes !== undefined && {
    //   lastActivity: { ge: lastActiveDate },
    // }), // Adding last active minutes filter
  };
  // console.log("🚀 ~ file: index.js:142 ~ filter:", filter);

  const { data, loading, error, refetch } = useQuery(gql(listPeople), {
    variables: {
      filter: filter,
    },
  });

  if (loading) {
    console.log("Loading People List...");
    return { loading, error, people: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, people: [] };
  }

  const people = data
    ? data.listPeople.items.filter((obj) => {
        // console.log(
        //   "🚀 ~ file: index.js:200 ~ ?data.listPeople.items.filter ~ obj?.lastActivity:",
        //   obj?.lastActivity,
        //   lastActiveDate
        // );
        return lastActiveMinutes ? obj?.lastActivity > lastActiveDate : true;
      })
    : [];

  return { people, loading, error, refetch };
};

export const useListAvailablePeople = ({
  role,
  status,
  rating,
  points,
  activity,
  type,
} = {}) => {
  console.log("🚀 ~ file: index.js:177 ~ activity:", activity);
  let activityDate;
  if (activity) {
    const currentDate = new Date(); // This is in local time
    currentDate.setUTCDate(currentDate.getUTCDate() - activity); // Subtract activity days in UTC
    activityDate = currentDate.toISOString(); // Convert to ISO String (AWSDateTime format in UTC)
  }
  const filter = {
    _deleted: { ne: true },
    ...(role !== undefined && { role: { eq: role } }),
    ...(status !== undefined && { status: { eq: status } }),
    ...(rating !== undefined && { rating: { eq: rating } }),
    ...(points !== undefined && { points: { eq: points } }),
    ...(type !== undefined && { type: { eq: type } }),
    ...(activity !== undefined && { updatedAt: { lt: activityDate } }), // Adding activity filter
  };

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
          documents {
            name
            key
            __typename
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
          payrollCycle
          email
          points
          rating
          type
          availability
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

  const { data, loading, error } = useQuery(gql(listPeople), {
    variables: {
      filter: filter,
    },
  });

  if (loading) {
    console.log("Loading...");
    return { loading, error, people: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, people: [] };
  }

  const people = data
    ? data.listPeople.items.filter((element) => element._deleted !== true)
    : [];

  return { people, loading, error };
};

export const useListPeopleByType = (TYPE) => {
  const { data, loading, error } = useQuery(gql(listPeople), {
    variables: { filter: { type: { eq: TYPE } } },
  });

  if (loading) {
    console.log("Loading Available People...");
    return { loading, error, people: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, people: [] };
  }

  const people = data
    ? data.listPeople.items.filter((element) => element._deleted !== true)
    : [];

  return { people, loading, error };
};
