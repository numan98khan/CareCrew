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
    <div className="flex flex-col h-full w-full">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />

      {loading ? (
        <div className="h-40 w-full flex justify-center items-center">
          <PuffLoader
            color={themeStyles.PRIMARY_LIGHT_COLOR}
            loading={loading}
            size={40}
            aria-label="Loading Spinner"
          />
        </div>
      ) : (
        <div className="flex flex-col h-full w-full md:flex-row">
          <ComposeModal
            isOpen={isComposeModalOpen}
            reqClose={() => setComposeModalOpen(false)}
            sendInAppBulkMessages={sendBulkMessages}
            isAddGroup={isGroupAddModal}
            addPersonToChatRoom={addPersonToChatRoom}
            chatroomID={chatroom?.id}
          />

          {/* Left panel - Chatrooms List */}
          <div
            className="w-full md:w-4/12 bg-white p-3 rounded-lg overflow-y-auto flex-grow"
            style={{ height: "40vh", md: "85vh" }}
          >
            {chatrooms
              ?.sort(
                (a, b) =>
                  new Date(b.latestMessageTime) - new Date(a.latestMessageTime)
              )
              ?.map((item, index) => {
                const chatPeople = item.People?.items.filter(
                  (obj) => obj.people.id !== user?.attributes?.sub
                );
                return (
                  <div key={index} onClick={() => handleSelectChatroom(item)}>
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

          <div className="mx-1" />

          {/* Right panel - Chatroom Messages */}
          <div className="flex flex-col w-full md:w-9/12 h-[40vh] md:h-[85vh] bg-white rounded-lg justify-between">
            {chatroom?.Messages?.items && selectedChatroom ? (
              <>
                <div className="h-12 py-5 px-4 top-0 border-b-2 w-full flex justify-between items-center">
                  <label className="text-lg font-semibold">{title}</label>
                  <div className="flex">
                    <div
                      className={`${ScaleHover}`}
                      onClick={() => setComposeModalOpen(true)}
                    >
                      <AddUserIcon size={6} />
                    </div>
                  </div>
                </div>

                <div className="h-full overflow-y-auto">
                  {isLoadingChat ? (
                    <div className="flex justify-center align-middle mt-5">
                      <BeatLoader color="#4A90E2" />
                    </div>
                  ) : (
                    sortedMessages?.map((item, index) => (
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
                  <div className="py-2 px-2 bottom-0 border-t-2 w-full flex justify-between items-center">
                    <Input
                      multiline={true}
                      rows={1}
                      disabled={!chatroom}
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
                    <div className="mx-1" />
                    <div
                      className="flex bg-SECONDARY_COLOR rounded-full p-2 transition duration-300 ease-in-out hover:shadow-lg"
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
            ) : (
              <div className="flex h-full justify-center items-center">
                <label className="text-3xl text-PRIMARY_COLOR font-bold">
                  Select a user to chat with
                </label>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messaging;
