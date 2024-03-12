import { useState, useEffect } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useQuery, gql } from "@apollo/client";
import {
  createChatRoomPeople,
  createChatRoom,
  createMessage,
  updateChatRoom,
} from "../../graphql/mutations";
// import { getChatRoom, listPeople } from "../../graphql/queries";
import { onCreateMessage } from "../../graphql/subscriptions";
import { useCreateNotification } from "../notifications";
import { MESSAGE_NOTIFICATIONS } from "../../constants/notificationTypes";
import { useS3Upload } from "../../services/uploadFileToS3";

const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      People {
        items {
          people {
            id
            firstName
            lastName
            phoneNumber
          }
        }
      }
      Messages {
        items {
          id
          text
          document {
            name
            key
          }
          peopleID
          chatroomID
          platform
          createdAt
          __typename
        }
        nextToken
      }
      title
      latestMessage
      latestMessageTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

const listChatRooms = /* GraphQL */ gql`
  query GetPeople($id: ID!) {
    getPeople(id: $id) {
      id
      chatrooms {
        items {
          chatRoom {
            id
            _deleted
            _version
            People {
              items {
                people {
                  id
                  profilePicture
                  firstName
                  lastName
                  email
                  _version
                  _deleted
                }
              }
            }
            latestMessage
            latestMessageTime
          }
        }
      }
    }
  }
`;

export const useChatting = (user, personalData, setLoadingChat) => {
  let subscriptions = {};

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChatroom, setSelectedChatroom] = useState(null);

  const { createNotificationQuery } = useCreateNotification();

  const { uploading, uploadFile, imageUrl } = useS3Upload();

  const [chatroom, setChatroom] = useState(null);
  const [text, setText] = useState("");
  const [chatrooms, setChatrooms] = useState([]);
  const {
    loading: loadingCR,
    error: errorCR,
    data: dataCR,
    refetch,
  } = useQuery(listChatRooms, {
    variables: { id: user?.attributes?.sub },
  });

  useEffect(() => {
    fetchChatRoomsForPerson(user?.attributes?.sub).then((chatRooms) => {
      // chatRooms

      setChatrooms(chatRooms);
    });
  }, []);

  const fetchChatRoomsForPerson = async (peopleId) => {
    try {
      const result = await API.graphql(
        graphqlOperation(listChatRooms, { id: peopleId })
      );

      // Extract chat rooms from the result
      const chatRooms = result.data.getPeople.chatrooms.items
        .map((item) => item.chatRoom)
        .filter((obj) => !obj._deleted);

      return chatRooms;
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
      return [];
    }
  };

  const fetchMessagesForChatRoom = async (cr) => {
    const result = await API.graphql(
      graphqlOperation(getChatRoom, { id: cr.id })
    );
    console.log(
      "🚀 ~ file: beta.js:99 ~ fetchMessagesForChatRoom ~ result:",
      result
    );
    const messages = result.data?.getChatRoom.Messages.items?.sort(
      (a, b) => a._lastChangedAt - b._lastChangedAt
    );

    // FIXME: uncomment in case things break
    setChatroom(result.data?.getChatRoom);
    setLoadingChat(false);
    return messages;
  };

  const getCommonChatRoomWithUser = async (userID) => {
    try {
      const chatRooms = await fetchChatRoomsForPerson(user?.attributes?.sub);
      // setChatrooms(chatRooms);

      const chatRoom = chatRooms.find((chatRoomItem) => {
        return chatRoomItem.People.items.some(
          (userItem) => userItem.people.id === userID
        );
      });
      return chatRoom;
    } catch (error) {
      console.error("Failed to refetch chatrooms:", error);
      return null;
    }
  };

  const createNewChatRoom = async (user) => {
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );
    const newChatRoom = newChatRoomData.data?.createChatRoom;
    // console.log(
    //   "🚀 ~ file: beta.js:96 ~ createNewChatRoom ~ newChatRoom:",
    //   newChatRoom
    // );

    await API.graphql(
      graphqlOperation(createChatRoomPeople, {
        input: { chatRoomId: newChatRoom.id, peopleId: user.id },
      })
    );
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createChatRoomPeople, {
        input: {
          chatRoomId: newChatRoom.id,
          peopleId: authUser.attributes.sub,
        },
      })
    );

    const chatRooms = await fetchChatRoomsForPerson(authUser?.attributes?.sub);

    return chatRooms.find((obj) => obj.id === newChatRoom.id);
    // await fetchMessagesForChatRoom(newChatRoom);
    // return newChatRoom;
  };

  const updateMessages = async (cr) => {
    API.graphql(graphqlOperation(getChatRoom, { id: cr.id })).then(
      async (result) => {
        result.data?.getChatRoom.Messages.items?.sort(function (a, b) {
          return a._lastChangedAt - b._lastChangedAt;
        });

        setChatroom(result.data?.getChatRoom);

        const chatRooms = await fetchChatRoomsForPerson(user?.attributes?.sub);
        setChatrooms(chatRooms);
      }
    );
  };

  // ... Rest of your helper functions like fetchMessagesForChatRoom, getCommonChatRoomWithUser, createNewChatRoom remains the same

  const subscribeChatroom = async (cr) => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage, {
        filter: {
          chatroomID: { eq: cr.id },
        },
      })
    ).subscribe({
      next: () => {
        updateMessages(cr);
      },
    });
  };

  const unsubscribeChatroom = (crId) => {
    const subscription = subscriptions[crId];
    if (subscription) {
      subscription.unsubscribe();
      delete subscriptions[crId];
    }
  };

  const handleSelectUser = async (selectedUser) => {
    // console.log(
    //   "🚀 ~ file: beta.js:152 ~ handleSelectUser ~ selectedUser:",
    //   selectedUser
    // );

    if (chatroom) {
      unsubscribeChatroom(chatroom.id); // Unsubscribe from previous chatroom
      // setChatroom(null); // Set chatroom to null
    }

    setSelectedUser(selectedUser);
    setLoadingChat(true);

    const existingChatRoom = await getCommonChatRoomWithUser(selectedUser.id);

    // const existingChatRoom = false;
    if (existingChatRoom) {
      await fetchMessagesForChatRoom(existingChatRoom);
      await subscribeChatroom(existingChatRoom); // Subscribe to new chatroom
    } else {
      const newChatRoom = await createNewChatRoom(selectedUser);

      await subscribeChatroom(newChatRoom); // Subscribe to new chatroom
    }
    // await subscribeChatroom(chatroom); // Subscribe to new chatroom

    setLoadingChat(false);
  };

  const handleSelectChatroom = async (selectedChatroom) => {
    // const existingChatRoom = false;

    setSelectedChatroom(selectedChatroom);
    if (selectedChatroom) {
      await fetchMessagesForChatRoom(selectedChatroom);
      await subscribeChatroom(selectedChatroom); // Subscribe to new chatroom
    }
    setLoadingChat(false);
  };

  const sendMessage = async (
    senderID,
    message,
    chatroom_,
    platform,
    document = null
  ) => {
    if (!message) return;
    let documentKey = null;
    console.log("🚀 ~ file: beta.js:249 ~ useChatting ~ document:", document);

    if (document) {
      try {
        const response = await uploadFile(document);

        documentKey = {
          name: document.name, // This assumes that docType is the name of the document
          key: response.key,
        };
      } catch (e) {
        console.error("Error uploading document:", e);
        return; // Stop further execution if upload fails
      }
    }

    // return;

    const messageObj = {
      text: message,
      // peopleID: senderID,
      peopleID: senderID,
      chatroomID: chatroom_.id,
      platform: platform,
      document: documentKey,
    };
    console.log(
      "🚀 ~ file: beta.js:272 ~ useChatting ~ messageObj:",
      messageObj
    );

    // return;
    try {
      const retMessage = await API.graphql(
        graphqlOperation(createMessage, { input: messageObj })
      );
      await API.graphql(
        graphqlOperation(updateChatRoom, {
          input: {
            id: chatroom_.id,
            latestMessage: retMessage.data.createMessage.text,
            latestMessageTime: retMessage.data.createMessage.createdAt,
            _version: chatroom_._version,
          },
        })
      );

      // Create the input object for the notification
      const notificationInput = {
        peopleID: senderID,
        type: MESSAGE_NOTIFICATIONS, // Replace with the appropriate type
        subject: `${personalData?.firstName + " " + personalData?.lastName}`,
        // subject: `New message from ${
        //   personalData?.firstName + " " + personalData?.lastName
        // } on ${platform}`,
        body: message,
      };

      const receiverPeople = chatroom_.People.items
        .map((obj) => obj.peopleId)
        .filter((obj) => obj !== user?.attributes?.sub);

      // Loop over each person in receiverPeople to create a notification
      for (const receiverPersonId of receiverPeople) {
        const notificationInputForPerson = {
          ...notificationInput,
          peopleID: receiverPersonId, // Set the peopleID for each person
        };

        const receiverPeople = chatroom_.People.items
          .map((obj) => obj.peopleId)
          .filter((obj) => obj !== user?.attributes?.sub);
        // console.log(
        //   '🚀 ~ file: beta.js:296 ~ sendMessage ~ receiverPeople:',
        //   receiverPeople,
        //   chatroom,
        // );

        // FIXME: Need to create a system where we can differentiate between specifc people notfications and broader audience notifications
        const notificationResponse = await createNotificationQuery(
          notificationInput,
          receiverPeople
        );

        // // FIXME: MAJOR ISSUES CREATING NOTIFICATIONS HERE
        // // FIXME: Need to create a system where we can differentiate between specific people notifications and broader audience notifications
        // const notificationResponse = await createNotificationQuery(
        //   notificationInputForPerson
        //   // receiverPersonId // Pass the individual receiverPersonId
        // );

        // console.log(
        //   `Notification sent to ${receiverPersonId}: `,
        //   notificationResponse
        // );
      }

      // setChatroom(result.data.getChatRoom);
    } catch (e) {
      console.error(e);
    }
  };

  // Other methods go here (like sendBulkMessages, addPersonToChatRoom)

  const getOrCreateChatroom = async (userObj) => {
    let chatRoom = await getCommonChatRoomWithUser(userObj.id);

    if (!chatRoom) {
      chatRoom = await createNewChatRoom(userObj);
    }

    return chatRoom;
  };

  const sendBulkMessages = async (users, messageText, platform) => {
    const authUser = await Auth.currentAuthenticatedUser();

    // Loop through each user ID and send the message
    for (const userObj of users) {
      // console.log("User in sendBulkMessages:", userObj);
      //TODO fix first craete chatroom behaviour
      // await chatRoomFetch(userObj);
      let chatRoom = await getCommonChatRoomWithUser(userObj.id);

      if (!chatRoom) {
        chatRoom = await createNewChatRoom(userObj);
        console.log(
          "🚀 ~ file: beta.js:330 ~ sendBulkMessages ~ chatRoom:",
          chatRoom
        );
      }

      if (chatRoom) {
        try {
          sendMessage(authUser.attributes.sub, messageText, chatRoom, platform);
        } catch (e) {
          console.error(e);
        }
      } else {
        // Handle the case when there's no common chat room with the user
        // console.warn(`No chat room found for user ID: ${userId}`);
        console.error(
          `No chat room found for: ${
            userObj.firstName + " " + userObj.lastName
          } + (${userObj.id})`
        );
      }
    }
  };

  const addPersonToChatRoom = async (chatRoomId, personId) => {
    try {
      console.log("addPersonToChatRoom", chatRoomId, personId);
      await API.graphql(
        graphqlOperation(createChatRoomPeople, {
          input: { chatRoomId: chatRoomId, peopleId: personId },
        })
      );
      console.log(
        `Added person with ID: ${personId} to chat room with ID: ${chatRoomId}`
      );
    } catch (e) {
      console.log(e);
      console.error(`Failed to add person to chat room: ${e}`);
    }
  };

  return {
    selectedUser,
    selectedChatroom,
    // handleSelectUser,
    getOrCreateChatroom,
    handleSelectChatroom,
    chatroom,
    setChatroom,
    chatrooms,
    text,
    setText,
    sendMessage,
    sendBulkMessages,
    addPersonToChatRoom,
    // ... other methods
  };
};

//  useChatting;
