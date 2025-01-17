import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  createNotifications,
  createNotificationsPeople,
} from "../../graphql/mutations"; // Adjust these imports to your actual paths
import { listNotifications } from "../../graphql/queries"; // Adjust the import path to your actual query
// import { useQuery, useSubscription } from "@apollo/client";
import { useState, useEffect } from "react";
import { useRef } from "react";

import { SuccessToast, NotificationToast } from "../../services/micro";
import { API, graphqlOperation } from "aws-amplify";

import { onCreateNotifications } from "../../graphql/subscriptions";
import { IMPORTANT_NOTIFICATIONS } from "../../constants/notificationTypes";

export const listNotificationsDeep = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Receivers {
          items {
            id
            peopleId
          }
          nextToken
        }
        peopleID
        type
        subject
        body
        receivers
        thumbnail
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

export const onCreateNotificationsDeep = /* GraphQL */ `
  subscription OnCreateNotifications(
    $filter: ModelSubscriptionNotificationsFilterInput
  ) {
    onCreateNotifications(filter: $filter) {
      id
      Receivers {
        items {
          id
          peopleId
        }
        nextToken
      }
      peopleID
      type
      subject
      body
      thumbnail
      organization
      receivers
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

export const onNotificationUpdated = /* GraphQL */ `
  subscription OnNotificationUpdated {
    onUpdateNotifications {
      id
      Receivers {
        items {
          id
          peopleId
        }
        nextToken
      }
      peopleID
      type
      subject
      body
      thumbnail
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

//...

export const useListNotifications = ({
  userId,
  setAlertNotification,
  type,
} = {}) => {
  const { data, loading, error, refetch } = useQuery(
    gql(listNotificationsDeep),
    {
      variables: {
        // filter: { _deleted: { ne: true } },
        limit: 1000,
        sortDirection: "ASC",
        sortField: "updatedAt",
      },
    }
  );

  const [notifications, setNotifications] = useState([]);
  const [previousNotifications, setPreviousNotifications] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  const [latestNotificationId, setLatestNotificationId] = useState(null);

  const [toNotify, setToNotify] = useState(null);

  // const [notifications, setNotifications] = useState([]);
  const [latestNotification, setLatestNotification] = useState(null);

  useEffect(() => {
    if (data) {
      // data.listNotifications.items

      const initialNotifications = data.listNotifications.items
        .filter(
          (notification) =>
            notification?.peopleID === userId ||
            (notification?.peopleID === "-1" &&
              notification?.receivers === null) ||
            (notification?.peopleID === "-1" &&
              notification?.receivers === type)
        )
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Check if the latest notification is new
      if (
        latestNotification &&
        initialNotifications.some(
          (notification) => notification.id === latestNotification.id
        )
      ) {
        // // If it's new, show the toast
        if (IMPORTANT_NOTIFICATIONS.includes(latestNotification?.type)) {
          NotificationToast(latestNotification);
        }
        setAlertNotification(latestNotification);
        setLatestNotification(null);
      }

      setNotifications(initialNotifications);
    }
  }, [data, userId]);

  useEffect(() => {
    if (refetch) {
      const subscription = API.graphql(
        graphqlOperation(onCreateNotificationsDeep)
      ).subscribe({
        next: async ({ provider, value }) => {
          const newNotification = value.data.onCreateNotifications;

          setLatestNotification(newNotification);

          await refetch();
        },
      });

      return () => subscription.unsubscribe();
    }
  }, [refetch]);

  if (loading) {
    return { loading, error, notifications: [] };
  }

  if (error) {
    console.error("Error!", error);
    return { loading, error, notifications: [] };
  }

  return { notifications, loading, error, refetch };
};

export const useCreateNotification = () => {
  const [createNotificationMutation, { data, loading, error }] = useMutation(
    gql(createNotifications)
  );

  const [createNotificationsPeopleMutation] = useMutation(
    gql(createNotificationsPeople)
  );

  const createNotificationQuery = async (input, receiverPeople) => {
    try {
      const response = await createNotificationMutation({
        variables: { input: input },
      });

      // Retrieve the newly created notification's ID
      const notificationsId = response.data.createNotifications.id;

      // // Associate people with the notification
      // for (const peopleId of receiverPeople) {
      //   const notificationPeople = {
      //     notificationsId,
      //     peopleId,
      //   };

      //   await createNotificationsPeopleMutation({
      //     variables: { input: notificationPeople },
      //   });
      // }

      return response.data.createNotifications;
    } catch (error) {
      throw error;
    }
  };

  return { createNotificationQuery, data, loading, error };
};
