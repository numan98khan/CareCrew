// import { Auth, API, graphqlOperation } from "aws-amplify";
// import { ADMIN } from "../../constants/userTypes";

// import {
//   ErrorToast,
//   SuccessToast,
//   displayDate,
//   displayTime,
//   hasPermission,
// } from "../micro";

// import { sendBulkMessages } from "../../services/messaging";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { ADMIN, EMPLOYEE } from "../../constants/userTypes";

import {
  ErrorToast,
  SuccessToast,
  displayDate,
  displayTime,
  hasPermission,
} from "../micro";

import { sendBulkMessages } from "../../services/messaging";
import { getPeople } from "../../graphql/queries";

const listPeople = /* GraphQL */ `
  query ListPeople(
    $filter: ModelPeopleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        surrogateID
        firstName
        lastName
        phoneNumber
        permissions
        email
        type
        _deleted
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
const getFacilityDetailed = /* GraphQL */ `
  query GetFacility($id: ID!) {
    getFacility(id: $id) {
      id
      imgSrc
      facilityName
      aboutFacility
      streetAddress
      FacilityPeople {
        items {
          id
          peopleId
          facilityId
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

// START;
// CareCrew
export const externalNotificationToInstacare = async (
  message,
  isEmail,
  isText
) => {
  const peopleList = (
    await API.graphql(
      graphqlOperation(listPeople, {
        filter: {
          type: {
            eq: ADMIN,
          },
          _deleted: {
            ne: true,
          },
        },
      })
    )
  )?.data?.listPeople?.items;

  const payload = {
    email: {
      message: message,
      emails: isEmail
        ? peopleList
            ?.map((userData) =>
              hasPermission(userData, "Email") ? userData?.email : null
            )
            .filter((obj) => obj !== null)
        : [],
      // emails: ["numan98khan@gmail.com"],
    },
    text: {
      message: message,
      phoneNumbers: isText
        ? peopleList
            ?.map((userData) =>
              hasPermission(userData, "Text Message")
                ? userData?.phoneNumber
                : null
            )
            .filter((obj) => obj !== null)
        : [],
    },
    app: {
      message: "",
      userIds: [],
    },
  };
  console.log("🚀 ~ file: reporting.js:78 ~ payload:", payload);

  await sendBulkMessages(payload);
};
export const inApplNotificationToInstacare = async (
  type,
  subject,
  message,
  createNotificationQuery
) => {
  const notificationInput = {
    peopleID: -1, // Still unsure about this value.
    receivers: ADMIN,
    type: type,
    subject: subject,
    body: message,
  };

  await createNotificationQuery(notificationInput, []);
};

// EMPLOYEE
export const externalNotificationToPeople = async (
  peopleID,
  message,
  isEmail,
  isText
) => {
  const userData = (
    await API.graphql(
      graphqlOperation(getPeople, {
        id: peopleID,
      })
    )
  )?.data?.getPeople;

  const payload = {
    email: {
      message: message,
      emails: isEmail
        ? hasPermission(userData, "Email")
          ? [userData?.email]
          : null
        : [],
      // emails: ["numan98khan@gmail.com"],
    },
    text: {
      message: message,
      phoneNumbers: isText
        ? hasPermission(userData, "Text Message")
          ? [userData?.phoneNumber]
          : null
        : [],
    },
    app: {
      message: "",
      userIds: [],
    },
  };
  // console.log("🚀 ~ file: reporting.js:78 ~ payload:", payload);

  await sendBulkMessages(payload);
};
export const inAppNotificationsToPeople = async (
  peopleID,
  type,
  subject,
  message,
  createNotificationQuery
) => {
  const notificationInput = {
    peopleID: peopleID, // Still unsure about this value.
    receivers: peopleID === "-1" ? EMPLOYEE : null,
    type: type,
    subject: subject,
    body: message,
  };
  console.log(
    "🚀 ~ file: reporting.js:233 ~ notificationInput:",
    notificationInput
  );

  await createNotificationQuery(notificationInput, [])
    .then((response) => {
      console.log("Notification sent successfully:", response);
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
    });
};

// FACILITY
export const sendNotificationsToFacilityPeople = async (
  facilityID,
  message,
  isEmail,
  isText
) => {
  if (!facilityID) {
    console.error("No facilityID provided.");
    return;
  }

  // Fetch facility details and associated people
  const facilityData = (
    await API.graphql(
      graphqlOperation(getFacilityDetailed, {
        id: facilityID,
      })
    )
  )?.data?.getFacility;

  if (!facilityData) {
    console.error("No facility data found.");
    return;
  }

  // Extract contacts from the facility
  const contactsList = facilityData.contacts;

  // Prepare payload for sending notifications
  const payload = {
    email: {
      message: message,
      emails: isEmail ? contactsList.map((contact) => contact.email) : [], // empty array if isEmail is false
      // emails: ["numan98khan@gmail.com"], // empty array if isEmail is false
    },
    text: {
      message: message,
      phoneNumbers: isText ? contactsList.map((contact) => contact.phone) : [], // empty array if isText is false
      // phoneNumbers: [], // empty array if isText is false
    },
    app: {
      message: "", // Assuming you don't want app notifications for now
      userIds: [], // Assuming you don't want app notifications for now
    },
  };

  // console.log(
  //   '🚀 ~ file: reporting.js ~ Sending notifications payload:',
  //   payload,
  // );

  // Send bulk messages
  await sendBulkMessages(payload);
};
export const inAppNotificationsToFacilityPeople = async (
  facilityID,
  type,
  subject,
  message,
  createNotificationQuery
) => {
  if (!facilityID) {
    console.error("No facilityID provided.");
    return;
  }

  // Fetch facility details and associated people
  const facilityData = (
    await API.graphql(
      graphqlOperation(getFacilityDetailed, {
        id: facilityID,
      })
    )
  )?.data?.getFacility;

  if (!facilityData) {
    console.error("No facility data found.");
    return;
  }
  // Assuming facilityData?.FacilityPeople?.items is an array of objects, each with an id property
  const facilityPeople = facilityData?.FacilityPeople?.items || [];
  console.log("🚀 ~ file: reporting.js:208 ~ facilityPeople:", facilityPeople);

  facilityPeople.forEach((person) => {
    const notificationInput = {
      peopleID: person.peopleId, // using the id property from the current person object
      // receivers: ADMIN,
      type: type,
      subject: subject,
      body: message,
    };
    // console.log(
    //   "🚀 ~ file: reporting.js:261 ~ facilityPeople.forEach ~ notificationInput:",
    //   notificationInput
    // );

    // Call the function to create and send the notification
    // Assuming createNotificationQuery is a function that sends the notification
    createNotificationQuery(notificationInput, [])
      .then((response) => {
        console.log("Notification sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
      });
  });
};
// END;

export const sendNotificationsToFacilityPeople_V1 = async (
  facilityID,
  message,
  isEmail,
  isText
) => {
  if (!facilityID) {
    console.error("No facilityID provided.");
    return;
  }

  // Fetch facility details and associated people
  const facilityData = (
    await API.graphql(
      graphqlOperation(getFacilityDetailed, {
        id: facilityID,
      })
    )
  )?.data?.getFacility;

  if (!facilityData) {
    console.error("No facility data found.");
    return;
  }

  // Extract all people from the facility
  const peopleList = facilityData.FacilityPeople.items.map(
    (item) => item.people
  );

  // Prepare payload for sending notifications
  const payload = {
    email: {
      message: message,
      emails: peopleList
        .filter((person) => person.isEmailNotifications)
        .map((person) => person.email),
    },
    text: {
      message: message,
      phoneNumbers: peopleList
        .filter((person) => person.isTextNotification)
        .map((person) => person.phoneNumber),
    },
    app: {
      message: "", // Assuming you don't want app notifications for now
      userIds: [], // Assuming you don't want app notifications for now
    },
  };

  console.log(
    "🚀 ~ file: reporting.js ~ Sending notifications payload:",
    payload
  );

  // Send bulk messages
  await sendBulkMessages(payload);
};

export const emailTimecardReportToInstacare = async (subject, message) => {
  const peopleList = (
    await API.graphql(
      graphqlOperation(listPeople, {
        filter: {
          type: {
            eq: ADMIN,
          },
          _deleted: {
            ne: true,
          },
        },
      })
    )
  )?.data?.listPeople?.items;

  const payload = {
    email: {
      message: message,
      emails: peopleList
        ?.map((userData) =>
          hasPermission(userData, "Email") ? userData?.email : null
        )
        .filter((obj) => obj !== null),
    },
    text: {
      message: ``,
      phoneNumbers: [],
    },
    app: {
      message: "",
      userIds: [],
    },
  };

  await sendBulkMessages(payload);
};
