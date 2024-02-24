import React, { useState, useMemo, useEffect, useRef } from "react";

import { NavLink, useLocation } from "react-router-dom";

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

// import { useChatting } from "../../apolloql/messaging";
import { useChatting } from "../../apolloql/messaging/beta";

import { useListPeople } from "../../apolloql/people";
import { BeatLoader, PuffLoader } from "react-spinners"; // Importing the BeatLoader spinner
import { MainHover, ScaleHover } from "../../styles/animations";
import { displayDate } from "../../services/micro";
import Picker from "emoji-picker-react";
import { SUPER_ADMIN } from "../../constants/permissions";

const Messaging = () => {
  const location = useLocation();
  const peoplePayload = location.state;
  // console.log("🚀 ~ file: index.js:33 ~ peoplePayload:", peoplePayload);

  // const activePath = location.pathname;

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const fileInputRef = useRef(null);

  const openFileSelector = () => {
    if (selectedFile) {
      setSelectedFile(null);
    } else {
      fileInputRef.current.click();
    }
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pickerStyle, setPickerStyle] = useState({});
  const emojiIconRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const onEmojiClick = (event, emojiObject) => {
    // console.log(
    //   "🚀 ~ file: index.js:44 ~ onEmojiClick ~ emojiObject:",
    //   emojiObject
    // );
    setText((prevText) => (prevText ? prevText + event.emoji : event.emoji));
    // setText(text + event.emoji);
  };

  const toggleEmojiPicker = () => {
    if (emojiIconRef.current) {
      const rect = emojiIconRef.current.getBoundingClientRect();
      setPickerStyle({
        position: "absolute",
        bottom: `${window.innerHeight - rect.top}px`,
        right: `${window.innerWidth - rect.right}px`,
        zIndex: 1000,
      });
    }
    setShowEmojiPicker(!showEmojiPicker);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        !emojiIconRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // TODO: Make the tab filter functional
  // const filteredSummaryData = summaryData.filter(item => item.label === currentFilter);
  const [isLoadingChat, setLoadingChat] = useState(false);

  const [isComposeModalOpen, setComposeModalOpen] = useState(false);
  const [isGroupAddModal, setIsGroupAddModal] = useState(false);
  const [text, setText] = useState(null);
  const [title, setTitle] = useState(null);
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
  const { user, personalData, permissions } = useAuth();
  const isSuperAdmin = SUPER_ADMIN === user?.attributes?.email;
  const canMessage = isSuperAdmin
    ? true
    : permissions.permissions?.find((obj) => obj?.name === "Messaging")
        ?.isSelected;

  const {
    selectedUser,
    selectedChatroom,
    handleSelectChatroom,
    getOrCreateChatroom,
    chatroom,
    setChatroom,
    chatrooms,
    sendMessage,
    sendBulkMessages,
    addPersonToChatRoom,
  } = useChatting(user, personalData, setLoadingChat);

  const sortedMessages = useMemo(() => {
    // Check if messages exist and are an array
    if (Array.isArray(chatroom?.Messages?.items)) {
      // Clone the array before sorting to avoid mutating the original array
      const sortedMessages = [...chatroom.Messages.items].sort((a, b) => {
        // Convert createdAt to a date object if it's a string, otherwise assume it's a timestamp
        let dateA = new Date(a.createdAt);
        let dateB = new Date(b.createdAt);

        // Compare the dates to sort in ascending order (oldest to newest)
        return dateA - dateB;

        // For descending order (newest to oldest), swap dateA and dateB
        // return dateB - dateA;
      });

      return sortedMessages;
    }

    return [];
  }, [chatroom]);

  const { people, loading } = useListPeople();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingChat(true);
      const cr = await getOrCreateChatroom(peoplePayload);
      await handleSelectChatroom(cr);
      setLoadingChat(false);

      const names = cr?.People?.items
        ?.filter((obj) => obj.people.id !== user?.attributes?.sub)
        .map((item) => `${item.people.firstName} ${item.people.lastName}`);
      const title = names?.join(" & ");
      setTitle(title);
    };

    if (peoplePayload) {
      fetchData();
    }
  }, [peoplePayload]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey && text.trim().length > 0) {
      // Check that the shift key is not held down
      sendMessage(user?.attributes?.sub, text, chatroom, "App", selectedFile);
      console.log(
        "🚀 ~ file: index.js:162 ~ handleKeyPress ~ selectedFile:",
        selectedFile
      );
      setText("");
    }
  };

  return (
    // <div className="flex flex-col min-h-full p-2">

    <div className="flex flex-col h-full w-full">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
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
        <div className="flex flex-col h-full w-full">
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

            {canMessage && (
              <div className="flex items-center">
                <IconButton
                  color={themeStyles.SECONDARY_COLOR}
                  text={"Compose"}
                  onClick={() => setComposeModalOpen(true)}
                />
              </div>
            )}
          </div>

          <div className="flex mt-2">
            <div
              // className="w-4/12 bg-white p-3 rounded-lg overflow-y-auto"
              className="w-4/12 bg-white p-3 rounded-lg overflow-y-auto flex-grow"
              style={{ height: "85vh" }}
            >
              {/* {filteredPeople?.map((item, index) => ( */}
              {chatrooms
                ?.sort((a, b) => {
                  const dateA = new Date(a.latestMessageTime);
                  const dateB = new Date(b.latestMessageTime);

                  return dateB - dateA; // sort in descending order, so latest chatrooms come first
                })
                ?.map((item, index) => {
                  // console.log("🚀 ~ file: index.js:226 ~ ?.map ~ item:", item);

                  const chatPeople = item.People?.items.filter(
                    (obj) => obj.people.id !== user?.attributes?.sub
                  );

                  return (
                    <div
                      onClick={() => {
                        // setChatroom(item);
                        // handleSelectUser(item);
                        const names = item?.People?.items
                          ?.filter(
                            (obj) => obj.people.id !== user?.attributes?.sub
                          )
                          .map(
                            (item) =>
                              `${item.people.firstName} ${item.people.lastName}`
                          );
                        const title = names?.join(" & ");
                        setTitle(title);

                        handleSelectChatroom(item);
                        setChatroom(item);
                        // console.log(
                        //   "🚀 ~ file: index.js:260 ~ ?.map ~ item:",
                        //   item
                        // );
                      }}
                      key={index}
                    >
                      <MessageHead
                        key={index}
                        profilePicture={item?.profilePicture}
                        people={chatPeople}
                        latestMessage={item?.latestMessage}
                        latestTime={item?.latestMessageTime}
                        unreadMessages={"3"}
                        isOnline={false}
                        isSelected={item?.id === chatroom?.id}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="mx-1" />

            <div className="flex flex-col w-9/12 h-[85vh] bg-white rounded-lg justify-between">
              {chatroom?.Messages?.items && selectedChatroom ? (
                <>
                  <div className="h-12 py-5 px-4 top-0 border-b-2 w-full flex justify-between items-center">
                    <label className="text-lg font-semibold">{title}</label>
                    <div className="flex">
                      <div
                        className={`${ScaleHover}`}
                        onClick={handleAddUserGroup}
                      >
                        <AddUserIcon size={6} />
                      </div>
                      {/* <div className="mx-1" />
                      <MoreIcon size={6} /> */}
                    </div>
                  </div>

                  <div className="h-full overflow-y-auto ">
                    {isLoadingChat ? ( // Conditionally render the spinner
                      <div className="flex justify-center align-middle mt-5">
                        <BeatLoader color="#4A90E2" />
                      </div>
                    ) : (
                      <>
                        {sortedMessages?.map((item, index) => {
                          // console.log("Message Items", item);
                          return (
                            <Message
                              key={index}
                              textMessage={item.text}
                              time={item.createdAt}
                              messageType={item.platform}
                              title={title}
                              isSender={item.peopleID === user?.attributes?.sub}
                              document={item?.document}
                            />
                          );
                        })}
                      </>
                    )}
                  </div>

                  {canMessage && (
                    <div className="py-2 px-2 bottom-0 border-t-2 w-full flex justify-between items-center">
                      {/* <label className="text-lg font-semibold">{"Muhammad Nauman"}</label> */}
                      {/* <div className="h-full w-full"> */}
                      <Input
                        multiline={true}
                        rows={1}
                        disabled={chatroom ? false : true}
                        placeholder={"Message"}
                        value={text}
                        setValue={setText}
                        onKeyPress={handleKeyPress}
                        icons={[
                          {
                            component: (props) => (
                              <div className={`${ScaleHover}`}>
                                <FileIcon
                                  {...props}
                                  color={
                                    selectedFile
                                      ? themeStyles?.SECONDARY_COLOR
                                      : null
                                  }
                                  opacity={selectedFile ? 1 : null}
                                  stroke={selectedFile ? 3 : null}
                                />
                              </div>
                            ), //<FileIcon size={10} />,
                            // onClick: () => console.log("Clicked icon 1"),
                            onClick: openFileSelector,
                          },
                          {
                            component: (props) => (
                              <div
                                ref={emojiIconRef}
                                className={`${ScaleHover}`}
                              >
                                <EmojiIcon {...props} />
                              </div>
                            ),
                            onClick: toggleEmojiPicker,
                          },
                        ]}
                      />
                      {showEmojiPicker && (
                        <div ref={emojiPickerRef} style={pickerStyle}>
                          <Picker onEmojiClick={onEmojiClick} />
                        </div>
                      )}
                      {/* </div> */}
                      <div className="mx-1" />
                      <div
                        className="flex bg-SECONDARY_COLOR rounded-full p-2 transition duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-black/30"
                        onClick={() => {
                          if (text.trim().length > 0) {
                            sendMessage(
                              user?.attributes?.sub,
                              text.trim(),
                              chatroom,
                              "App",
                              selectedFile
                            );
                            setText("");
                          }
                        }}
                      >
                        <SendIcon size={6} />
                      </div>
                    </div>
                  )}
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
