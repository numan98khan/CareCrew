import { useState, useEffect } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useQuery, gql } from "@apollo/client";
import {
  createChatRoomPeople,
  createChatRoom,
  createMessage,
} from "../../graphql/mutations";
import { getChatRoom, listPeople } from "../../graphql/queries";
import { onCreateMessage } from "../../graphql/subscriptions";
import { SuccessToast } from "../../services/micro";

const listChatRooms = /* GraphQL */ gql`
  query GetPeople($id: ID!) {
    getPeople(id: $id) {
      id
      chatrooms {
        items {
          chatRoom {
            id
            _deleted
            People {
              items {
                people {
                  id
                  _deleted
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const useChatting = (user, setLoadingChat) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatroom, setChatroom] = useState(null);
  const [text, setText] = useState("");

  const [loader, setLoader] = useState(false);

  let subscriptions = {};

  const {
    loading: loadingCR,
    error: errorCR,
    data: dataCR,
    refetch,
  } = useQuery(listChatRooms, {
    variables: { id: user?.attributes?.sub },
  });

  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    if (!loadingCR && !errorCR) {
      const chatroomsData = dataCR.getPeople?.chatrooms?.items.filter(
        (element) => element.chatRoom._deleted !== true
      );

      setChatrooms(chatroomsData);
      setLoader(false);
    }
  }, [loadingCR, errorCR, dataCR, loader]);

  const getCommonChatRoomWithUser = async (userID) => {
    setLoader(true);
    await refetch();

    const chatRoom = chatrooms.find((chatRoomItem) => {
      return chatRoomItem.chatRoom.People.items.some((userItem) => {
        return userItem.people.id === userID;
      });
    });

    return chatRoom;
  };

  const updateMessages = async (cr) => {
    setLoadingChat(true);
    API.graphql(graphqlOperation(getChatRoom, { id: cr.id })).then((result) => {
      result.data?.getChatRoom.Messages.items?.sort(function (a, b) {
        return a._lastChangedAt - b._lastChangedAt;
      });

      setChatroom(result.data?.getChatRoom);
      setLoadingChat(false);
    });
  };

  const subscribeChatroom = async (cr) => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage, {
        filter: {
          chatroomID: { eq: cr.id },
        },
      })
    ).subscribe({
      next: () => updateMessages(cr),
    });
  };

  const chatRoomFetch = async (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const existingChatRoom = await getCommonChatRoomWithUser(user.id);

        if (existingChatRoom) {
          API.graphql(
            graphqlOperation(getChatRoom, { id: existingChatRoom?.chatRoom.id })
          ).then((result) => {
            result.data?.getChatRoom.Messages.items?.sort(function (a, b) {
              return a._lastChangedAt - b._lastChangedAt;
            });

            setChatroom(result.data?.getChatRoom);
            subscribeChatroom(result.data?.getChatRoom);
            setLoadingChat(false);
          });

          return;
        }

        const newChatRoomData = await API.graphql(
          graphqlOperation(createChatRoom, { input: {} })
        );

        const newChatRoom = newChatRoomData.data?.createChatRoom;

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

        API.graphql(graphqlOperation(getChatRoom, { id: newChatRoom.id })).then(
          (result) => {
            result.data?.getChatRoom.Messages.items?.sort(function (a, b) {
              return a._lastChangedAt - b._lastChangedAt;
            });

            setChatroom(result.data?.getChatRoom);

            subscribeChatroom(result.data?.getChatRoom);
          }
        );

        setLoadingChat(false);
        resolve(); // Resolve the promise when everything is done
      } catch (e) {
        reject(e); // Reject the promise if there's an error
      }
    });
  };

  const handleSelectUser = async (user) => {
    setLoadingChat(true);

    setSelectedUser(user);

    await chatRoomFetch(user);
    setLoadingChat(false);
  };

  const onSend = async () => {
    if (!text.length) {
      SuccessToast("No text");
      return false;
    }

    const authUser = await Auth.currentAuthenticatedUser();

    const messageObj = {
      text: text,
      peopleID: authUser.attributes.sub,
      chatroomID: chatroom.id,
    };

    try {
      await API.graphql(
        graphqlOperation(createMessage, {
          input: messageObj,
        })
      );

      setText("");
    } catch (e) {
      console.error(e);
    }
  };

  const sendBulkMessages = async (users, messageText) => {
    const authUser = await Auth.currentAuthenticatedUser();

    // Loop through each user ID and send the message
    for (const userObj of users) {
      // const chatRoom = await getCommonChatRoomWithUser(userObj.id);
      // await handleSelectUser(userObj);

      //TODO fix first craete chatroom behaviour
      // await chatRoomFetch(userObj);
      const chatRoom = await getCommonChatRoomWithUser(userObj.id);

      if (chatroom) {
        const messageObj = {
          text: messageText,
          peopleID: authUser.attributes.sub,
          chatroomID: chatRoom.chatRoom.id,
        };

        try {
          await API.graphql(
            graphqlOperation(createMessage, {
              input: messageObj,
            })
          );
          console.log(
            `Message sent to: ${
              userObj.firstName + " " + userObj.lastName
            } + (${userObj.id})`
          );
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
    handleSelectUser,
    chatroom,
    chatrooms,
    text,
    setText,
    onSend,
    sendBulkMessages,
    addPersonToChatRoom,
  };
};

// export default useChatting;
