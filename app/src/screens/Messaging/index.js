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
import { useChatting } from "../../apolloql/messaging/beta";
import { useListPeople } from "../../apolloql/people";
import { BeatLoader, PuffLoader } from "react-spinners";
import { ScaleHover } from "../../styles/animations";
import { displayDate } from "../../services/micro";
import Picker from "emoji-picker-react";
import { SUPER_ADMIN } from "../../constants/permissions";

const Messaging = () => {
  const location = useLocation();
  const peoplePayload = location.state;

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pickerStyle, setPickerStyle] = useState({});
  const emojiIconRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const [isLoadingChat, setLoadingChat] = useState(false);
  const [isComposeModalOpen, setComposeModalOpen] = useState(false);
  const [isGroupAddModal, setIsGroupAddModal] = useState(false);
  const [text, setText] = useState(null);
  const [title, setTitle] = useState(null);

  const { user, personalData, permissions } = useAuth();
  const isSuperAdmin = SUPER_ADMIN === user?.attributes?.email;
  const canMessage =
    isSuperAdmin ||
    permissions.permissions?.find((obj) => obj?.name === "Messaging")
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
    if (Array.isArray(chatroom?.Messages?.items)) {
      const sortedMessages = [...chatroom.Messages.items].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
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
      sendMessage(user?.attributes?.sub, text, chatroom, "App", selectedFile);
      setText("");
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />

      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <PuffLoader
            color={themeStyles.PRIMARY_LIGHT_COLOR}
            loading={loading}
            size={40}
            aria-label="Loading Spinner"
          />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row h-full gap-4">
          <ComposeModal
            isOpen={isComposeModalOpen}
            reqClose={() => setComposeModalOpen(false)}
            sendInAppBulkMessages={sendBulkMessages}
            isAddGroup={isGroupAddModal}
            addPersonToChatRoom={addPersonToChatRoom}
            chatroomID={chatroom?.id}
          />

          <div className="flex flex-col w-full md:w-4/12 bg-white p-4 rounded-lg overflow-y-auto shadow">
            {/* <PageHeader text="Messages" /> */}

            {/* Header with Compose Button */}
            <div className="flex items-center justify-between mb-4">
              <PageHeader text="Messages" />
              <div className="">
                <IconButton
                  color={themeStyles.SECONDARY_COLOR}
                  text={"Compose"}
                  onClick={() => setComposeModalOpen(true)}
                  className="ml-2"
                />
              </div>
            </div>

            <div className="mt-2">
              {chatrooms
                ?.sort(
                  (a, b) =>
                    new Date(b.latestMessageTime) -
                    new Date(a.latestMessageTime)
                )
                ?.map((item, index) => {
                  const chatPeople = item.People?.items.filter(
                    (obj) => obj.people.id !== user?.attributes?.sub
                  );
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelectChatroom(item)}
                      // className={`p-3 rounded-lg cursor-pointer ${
                      //   item?.id === chatroom?.id ? "bg-gray-200" : ""
                      // }`}

                      className={`rounded-lg cursor-pointer ${
                        item?.id === chatroom?.id ? "bg-gray-200" : ""
                      }`}
                    >
                      <MessageHead
                        profilePicture={item?.profilePicture}
                        people={chatPeople}
                        latestMessage={item?.latestMessage}
                        latestTime={item?.latestMessageTime}
                        unreadMessages={"3"}
                        isSelected={item?.id === chatroom?.id}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          <div
            // className="flex flex-col w-full md:w-8/12 bg-white rounded-lg shadow h-[60vh] md:h-[85vh]"
            className="flex flex-col w-full md:w-8/12 bg-white rounded-lg shadow "
          >
            {chatroom?.Messages?.items && selectedChatroom ? (
              <>
                <div className="h-12 py-3 px-4 border-b flex justify-between items-center">
                  <span className="text-lg font-semibold">{title}</span>
                </div>
                <div className="flex-grow overflow-y-auto p-4">
                  {isLoadingChat ? (
                    <div className="flex justify-center items-center h-full">
                      <BeatLoader color="#4A90E2" />
                    </div>
                  ) : (
                    sortedMessages.map((item, index) => (
                      <Message
                        key={index}
                        textMessage={item.text}
                        time={item.createdAt}
                        messageType={item.platform}
                        title={title}
                        isSender={item.peopleID === user?.attributes?.sub}
                        document={item?.document}
                      />
                    ))
                  )}
                </div>
                {canMessage && (
                  <div className="py-2 px-4 border-t flex items-center gap-2">
                    <Input
                      // multiline
                      rows={1}
                      disabled={!chatroom}
                      placeholder="Message"
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
                              />
                            </div>
                          ),
                          onClick: () => fileInputRef.current.click(),
                        },
                        {
                          component: (props) => (
                            <div ref={emojiIconRef} className={`${ScaleHover}`}>
                              <EmojiIcon {...props} />
                            </div>
                          ),
                          onClick: () => setShowEmojiPicker(!showEmojiPicker),
                        },
                      ]}
                    />
                    {showEmojiPicker && (
                      <div ref={emojiPickerRef} style={pickerStyle}>
                        <Picker
                          onEmojiClick={(event, emojiObject) =>
                            setText((prev) => prev + event.emoji)
                          }
                        />
                      </div>
                    )}
                    <button
                      className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
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
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-grow justify-center items-center">
                <span className="text-2xl font-semibold text-gray-500">
                  Select a user to chat with
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messaging;
