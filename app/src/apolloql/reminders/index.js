import { gql, useQuery, useMutation } from "@apollo/client";
// import {
//   // listReminders,
//   getReminder,
// } from "../../graphql/queries";
import {
  createReminders,
  updateReminder,
  createRemindersPeople,
} from "../../graphql/mutations";
import {
  convertDateTimeToAWSDateTime,
  convertTimeToAWSTime,
  convertDateToAWSDate,
  convertAWSDateTimeToLocal,
  convertAWSDateToLocalDate,
} from "../../services/micro";

import moment from "moment-timezone";
import { userTimezone } from "../timezone";

// export const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// import { gql, useMutation } from "@apollo/client";
// import { createReminders } from "../../graphql/mutations";
// import { createRemindersPeople } from "../../graphql/customMutations"; // Adjust the import path for your custom mutation

export const listReminders = /* GraphQL */ `
  query ListReminders(
    $filter: ModelRemindersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReminders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        time
        receiverType
        note
        datetime
        People {
          items {
            id
            remindersId
            peopleId
          }
        }
        read
        message
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

// export const useCreateReminder = () => {
//   const [createReminderMutation, { data, loading, error }] = useMutation(
//     gql(createReminders)
//   );

//   const [createRemindersPeopleMutation] = useMutation(
//     gql(createRemindersPeople)
//   );

//   const createReminderQuery = async (input, receiverPeople) => {
//     try {
//       console.log("Reminder Input:", input, receiverPeople);
//       const response = await createReminderMutation({
//         variables: { input: input },
//       });

//       // Retrieve the newly created reminder's ID
//       const remindersId = response.data.createReminders.id;

//       // Associate people with the reminder
//       for (const peopleId of receiverPeople) {
//         const reminderPeople = {
//           remindersId,
//           peopleId,
//         };

//         await createRemindersPeopleMutation({
//           variables: { input: reminderPeople },
//         });
//       }

//       return response.data.createReminders;
//     } catch (error) {
//       throw error;
//     }
//   };

//   return { createReminderQuery, data, loading, error };
// };

// export const useCreateReminder = () => {
//   const [createReminderMutation, { data, loading, error }] = useMutation(
//     gql(createReminders)
//   );

//   const createReminderQuery = async (input) => {
//     // ...similar to the above
//     try {
//       const { data } = await createReminderMutation({
//         variables: { input: input },
//       });
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   return { createReminderQuery, data, loading, error };
// };

// TODO: this should conditionally load data according to each user

export const useCreateReminder = () => {
  const [createReminderMutation, { data, loading, error }] = useMutation(
    gql(createReminders)
  );

  const [createRemindersPeopleMutation] = useMutation(
    gql(createRemindersPeople)
  );

  const createReminderQuery = async (input, receiverPeople) => {
    try {
      // const userTimezone = userTimezone;

      // Convert date to UTC if date exists in the input
      if (input.date) {
        // Generate the moment object without converting to string
        input.datetime = moment
          .tz(
            `${input.date}T${
              input.time.endsWith("Z") ? input.time.slice(0, -1) : input.time
            }`,
            userTimezone
          )
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

        // input.date = convertDateToAWSDate(input.date, userTimezone);
        input.date = convertDateTimeToAWSDateTime(
          input.date + "T" + input.time,
          userTimezone
        ).split("T")[0];

        input.time = convertTimeToAWSTime(input.time, userTimezone);
      }

      console.log(
        "🚀 ~ file: index.js:138 ~ createReminderQuery ~ input:",
        input
      );

      // return;
      const response = await createReminderMutation({
        variables: { input: input },
      });

      // Retrieve the newly created reminder's ID
      const remindersId = response.data.createReminders.id;

      // Associate people with the reminder
      for (const peopleId of receiverPeople) {
        const reminderPeople = {
          remindersId,
          peopleId,
        };

        await createRemindersPeopleMutation({
          variables: { input: reminderPeople },
        });
      }

      return response.data.createReminders;
    } catch (error) {
      throw error;
    }
  };

  return { createReminderQuery, data, loading, error };
};

export const useListReminders = ({ type, peopleID, date } = {}) => {
  // console.log("🚀 ~ file: index.js:114 ~ useListReminders ~ date:", date);
  // const { data, loading, error } = useQuery(gql(listReminders));
  // const userTimezone = userTimezone;

  // FIXME: need to add the current time to this as well so that we can get current date
  const serverDate = date
    ? convertDateToAWSDate(date, userTimezone)
    : undefined;

  const filter = {
    _deleted: { ne: true },
    ...(type !== undefined && { receiverType: { eq: type.toUpperCase() } }),
    ...(serverDate !== undefined && { date: { eq: serverDate } }),
  };

  const { data, loading, error } = useQuery(gql(listReminders), {
    variables: {
      filter: filter,
    },
    pollInterval: 15000,
  });

  // ...similar to the above
  if (loading) {
    console.log("Loading Reminders...");
    return { loading, error, reasons: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, reasons: [] };
  }

  // console.log("listReminders Data received!", data);

  const reminders = data
    ? data.listReminders.items
        .filter((element) => element._deleted !== true)
        .map((reminder) => {
          // Create a shallow copy of the 'reminder' object
          const newReminder = { ...reminder };

          const localizedStartDT = moment
            .tz(newReminder?.datetime, "UTC")
            .tz(userTimezone)
            .format("YYYY-MM-DDTHH:mm:ss.SSS");

          newReminder.datetime = localizedStartDT;

          return newReminder;
        })
    : [];

  return { reminders, loading, error };
};
