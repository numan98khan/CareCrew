import React, { useState, useMemo } from "react";

import themeStyles from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";
import MessageHead from "../../components/MessageHead";
import Message from "../../components/Message";
import Input from "../../components/Input";
import ComposeModal from "./ComposeModal";

import IconButton from "../../components/Button/IconButton";
import AddUserIcon from "../../assets/icons/adduser";
import SendIcon from "../../assets/icons/send";
import MoreIcon from "../../assets/icons/more";
import FileIcon from "../../assets/icons/file";
import EmojiIcon from "../../assets/icons/emoji";

import { useAuth } from "../../context";

import { useChatting } from "../../apolloql/messaging";
import { useListPeople } from "../../apolloql/people";
import { BeatLoader, PuffLoader } from "react-spinners"; // Importing the BeatLoader spinner
import { MainHover, ScaleHover } from "../../styles/animations";

const Messaging = () => {
  // TODO: Make the tab filter functional
  // const filteredSummaryData = summaryData.filter(item => item.label === currentFilter);
  const [isLoadingChat, setLoadingChat] = useState(false);

  const [isComposeModalOpen, setComposeModalOpen] = useState(false);
  const [isGroupAddModal, setIsGroupAddModal] = useState(false);
  // const [groupChatId, setGroupChatId] = useState(null);

  // const [isComposeModalOpen, setComposeModalOpen] = useState(true);
  const closeModal = () => {
    setComposeModalOpen(false);
    setIsGroupAddModal(false);
  };

  const handleAddUserGroup = () => {
    setComposeModalOpen(true);
    setIsGroupAddModal(true);
  };

  // const [people, setPeople] = useState();
  const { user } = useAuth();

  const {
    selectedUser,
    handleSelectUser,
    chatroom,
    chatrooms,
    text,
    setText,
    onSend,
    sendBulkMessages,
    addPersonToChatRoom,
  } = useChatting(user, setLoadingChat);

  const { people, loading } = useListPeople();

  // const filteredPeople = useMemo(() => {
  //   console.log("Chatrooms in Messaging!!", chatrooms);

  //   return people.filter((person) => {
  //     // Replace this condition with your actual filter condition
  //     return person.id !== user?.attributes?.sub;
  //   });
  // }, [people, chatrooms]);

  const filteredPeople = useMemo(() => {
    // console.log("Chatrooms in Messaging!!", chatrooms);

    // FIXME: this is a temporary fix for the demo
    return people.filter((person) => {
      // Check if person's id is found in chatroom and is not equal to user's sub
      return person.id !== user?.attributes?.sub;
    });

    // Extract the people ids from chatrooms
    const peopleIdsInChatroom =
      chatrooms
        ?.map((chatRoom) =>
          chatRoom?.chatRoom?.People?.items?.map((item) => item.people.id)
        )
        ?.flat() // Flatten one level to get rid of inner arrays
        ?.filter(Boolean) || // Remove any null or undefined values
      [];

    // Remove duplicates by converting to a Set and back to an Array
    const uniquePeopleIdsInChatroom = [...new Set(peopleIdsInChatroom)];

    // console.log(uniquePeopleIdsInChatroom);

    return people.filter((person) => {
      // Check if person's id is found in chatroom and is not equal to user's sub
      return (
        uniquePeopleIdsInChatroom.includes(person.id) &&
        person.id !== user?.attributes?.sub
      );
    });
  }, [people, chatrooms]);

  return (
    <div className="flex flex-col min-h-full p-2">
      {loading ? (
        <div className="h-40 w-full flex justify-center items-center">
          <PuffLoader
            color={themeStyles.PRIMARY_LIGHT_COLOR}
            loading={loading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="h-full w-full">
          <ComposeModal
            isOpen={isComposeModalOpen}
            reqClose={closeModal}
            sendInAppBulkMessages={sendBulkMessages}
            isAddGroup={isGroupAddModal}
            addPersonToChatRoom={addPersonToChatRoom}
            chatroomID={chatroom?.id}
          />
          <div className="flex py-1 justify-between">
            <div className="flex items-center">
              <PageHeader text={"Messages"} />
            </div>

            <div className="flex items-center">
              {/* <IconButton
                color={themeStyles.SECONDARY_COLOR}
                text={"Test Notifications"}
                onClick={() => setComposeModalOpen(true)}
              /> */}
              <IconButton
                color={themeStyles.SECONDARY_COLOR}
                text={"Compose"}
                onClick={() => setComposeModalOpen(true)}
              />
            </div>
          </div>

          <div className="flex mt-2">
            <div
              // className="w-4/12 bg-white p-3 rounded-lg overflow-y-auto"
              className="w-4/12 bg-white p-3 rounded-lg overflow-y-auto flex-grow"
              style={{ height: "82vh" }}
            >
              {/* {filteredPeople?.map((item, index) => ( */}
              {filteredPeople?.map((item, index) => (
                <div onClick={() => handleSelectUser(item)} key={index}>
                  <MessageHead
                    key={index}
                    profilePicture={item?.profilePicture}
                    // firstName={item.email}
                    // secondName={""}

                    firstName={item?.firstName}
                    secondName={item?.lastName + " " + item.email}
                    latestMessage={"Lorem ipsum dolor"}
                    latestTime={"10:20AM"}
                    unreadMessages={"3"}
                    isOnline={false}
                    isSelected={item?.id === selectedUser?.id}
                  />
                </div>
              ))}

              {/* {chatrooms?.map((item, index) => (
                <div onClick={() => handleSelectUser(item)} key={index}>
                  <MessageHead
                    key={index}
                    profilePicture={item?.profilePicture}
                    // firstName={item.email}
                    // secondName={""}

                    firstName={item?.__typename}
                    secondName={'item?.lastName + " " + item.email'}
                    latestMessage={"Lorem ipsum dolor"}
                    latestTime={"10:20AM"}
                    unreadMessages={"3"}
                    isOnline={false}
                    // isSelected={item?.id === selectedUser?.id}
                  />
                </div>
              ))} */}
            </div>
            <div className="mx-1" />

            <div className="flex flex-col w-9/12 bg-white rounded-lg justify-between">
              {chatroom?.Messages.items && selectedUser ? (
                <>
                  {/* Messages */}
                  <div className="h-12 py-5 px-4 top-0 border-b-2 w-full flex justify-between items-center">
                    <label className="text-lg font-semibold">
                      {selectedUser?.firstName +
                        " " +
                        selectedUser?.lastName +
                        " (" +
                        selectedUser?.email +
                        ")"}
                    </label>
                    <div className="flex">
                      <div
                        className={`${ScaleHover}`}
                        onClick={handleAddUserGroup}
                      >
                        <AddUserIcon size={6} />
                      </div>
                      <div className="mx-1" />
                      <MoreIcon size={6} />
                    </div>
                  </div>

                  <div className="h-full">
                    {isLoadingChat ? ( // Conditionally render the spinner
                      <div className="flex justify-center align-middle mt-5">
                        <BeatLoader color="#4A90E2" />
                      </div>
                    ) : (
                      <>
                        {chatroom?.Messages.items.map((item, index) => {
                          console.log("Message Items", item);
                          return (
                            <Message
                              key={index}
                              textMessage={item.text}
                              time={"10:20AM"}
                              messageType={"App"}
                              isSender={item.peopleID === user?.attributes?.sub}
                            />
                          );
                        })}
                      </>
                    )}
                  </div>

                  <div className="h-12 py-5 px-2 bottom-0 border-t-2 w-full flex justify-between items-center">
                    {/* <label className="text-lg font-semibold">{"Muhammad Nauman"}</label> */}
                    <Input
                      disabled={chatroom ? false : true}
                      placeholder={"Message"}
                      value={text}
                      setValue={setText}
                      icons={[
                        {
                          component: FileIcon,
                          onClick: () => console.log("Clicked icon 1"),
                        },
                        {
                          component: EmojiIcon,
                          onClick: () => console.log("Clicked icon 2"),
                        },
                      ]}
                    />

                    <div className="mx-1" />
                    <div
                      className="flex bg-SECONDARY_COLOR rounded-full p-2 transition duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-black/30"
                      onClick={onSend}
                    >
                      <SendIcon size={6} />
                    </div>
                  </div>
                </>
              ) : isLoadingChat ? ( // Conditionally render the spinner
                <div className="flex justify-center align-middle mt-5">
                  <BeatLoader color="#4A90E2" />
                </div>
              ) : (
                <div className="flex h-full justify-center items-center">
                  <label className="text-3xl text-PRIMARY_COLOR font-bold">
                    Select a user to chat with
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messaging;
