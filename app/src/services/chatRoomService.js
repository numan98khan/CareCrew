import { API, graphqlOperation, Auth } from "aws-amplify";

export const getCommonChatRoomWithUser = async (userID) => {
  const authUser = await Auth.currentAuthenticatedUser();

  // get all chat room of user1
  const response = await API.graphql(
    graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
  );

  // const chatRooms = response.data?.getPeople?.chatrooms?.items || [];

  const chatRooms = (response.data?.getPeople?.chatrooms?.items || []).filter(
    (element) => element.chatRoom._deleted === null // && element.id !== user?.attributes?.sub
  );

  const chatRoom = chatRooms.find((chatRoomItem) => {
    return chatRoomItem.chatRoom.People.items.some((userItem) => {
      return userItem.people.id === userID;
    });
  });

  return chatRoom;
};

export const listChatRooms = /* GraphQL */ `
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
