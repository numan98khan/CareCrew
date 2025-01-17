import React, { useState, useEffect, useRef, useMemo } from "react";
import Picker from "emoji-picker-react";
import SendIcon from "../../assets/icons/send";
import { BeatLoader } from "react-spinners";
import PageHeader from "../../components/Headers/PageHeader";
import MessageHeader from "../../components/MessageHead";
import InputField from "../../components/Input";
import Message from "../../components/Message";
import themeStyles from "../../styles/theme.styles";
import theme from "@material-tailwind/react/theme";

import IconButton from "../../components/Button/IconButton";
import { useAuth } from "../../context";

const AssistantChat = () => {
  const { user, personalData, permissions, myFacility } = useAuth();

  // State and Refs
  const [assistantId, setAssistantId] = useState(null);
  const [threadId, setThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("Assistant Chat");
  const [isLoadingChat, setLoadingChat] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiPickerRef = useRef(null);

  const API_BASE_URL = "http://localhost:2024";

  // Memoized sorted messages for display
  const sortedMessages = useMemo(() => {
    return messages.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
  }, [messages]);

  // Initialize Assistant
  const initializeAssistant = async () => {
    console.log(myFacility?.id);

    try {
      // Step 1: Search for Existing Assistant
      const searchResponse = await fetch(`${API_BASE_URL}/assistants/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metadata: {}, // Metadata to filter assistants
          graph_id: "agent", // Graph ID for filtering
          limit: 10,
          offset: 0,
        }),
      });

      // Check if response is OK
      if (!searchResponse.ok) {
        throw new Error(
          `Search request failed with status ${searchResponse.status}`
        );
      }

      const searchData = await searchResponse.json();
      console.log("Search Response Data:", searchData); // Debug log

      // Search for assistant matching the facility ID
      const existingAssistant = searchData.find(
        (assistant) => assistant.assistant_id === myFacility?.id
      );

      if (existingAssistant) {
        console.log("Assistant already exists:", existingAssistant);
        setAssistantId(existingAssistant.assistant_id); // Set existing assistant ID
        return;
      }

      // Step 2: Create Assistant if it Doesn't Exist
      console.log("Assistant does not exist. Creating a new one...");
      const createResponse = await fetch(`${API_BASE_URL}/assistants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assistant_id: myFacility?.id || "", // Use facility ID or leave blank for new creation
          graph_id: "agent", // Specify the graph ID
          config: {}, // Pass an empty config object for now
          metadata: {}, // Include metadata if needed
          if_exists: "raise", // Behavior when assistant already exists
          name: "CareCrew-Facility", // Name of the assistant
        }),
      });

      if (!createResponse.ok) {
        throw new Error("Failed to create assistant");
      }

      const newAssistant = await createResponse.json();
      console.log("Assistant created successfully:", newAssistant);
      setAssistantId(newAssistant.assistant_id); // Update the assistant ID in state
    } catch (error) {
      console.error("Error initializing assistant:", error.message);
    }
  };

  // Start a New Thread
  const startThread = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/threads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          thread_id: "", // Leave empty to let the API generate a new thread ID
          metadata: {}, // Optionally include metadata if required
          if_exists: "raise", // Raise an error if a thread already exists
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create thread. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Thread created successfully:", data);

      // Extract the thread_id and update the state
      setThreadId(data.thread_id);
      setMessages([]); // Clear messages for the new thread
    } catch (error) {
      console.error("Error starting thread:", error.message || error);
    }
  };

  // Handle Sending Messages
  const handleSendMessage = async () => {
    if (!text.trim() || !threadId) return;

    const userMessage = { type: "human", content: text.trim() };
    setMessages((prev) => [...prev, { ...userMessage, timestamp: new Date() }]);

    try {
      const response = await fetch(`${API_BASE_URL}/threads/${threadId}/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assistant_id: myFacility?.id, // Replace with the appropriate assistant ID
          checkpoint: {
            thread_id: threadId, // Include the current thread ID
            checkpoint_ns: "", // Empty string for now
            checkpoint_id: "", // Empty string for now
            checkpoint_map: {}, // Empty object for now
          },
          input: {
            messages: [userMessage], // Pass the user message
          },
          command: {
            update: null,
            resume: null,
            goto: {
              node: "messages", // Node for message handling
              input: { name: "User Name" }, // Optional input data
            },
          },
          metadata: {}, // Empty metadata for now
          config: {
            tags: [""], // Optional tags
            recursion_limit: 1,
            configurable: {},
          },
          webhook: "http://localhost:3003", // Optional webhook URL
          interrupt_before: "*",
          interrupt_after: "*",
          stream_mode: ["values"], // Stream configuration
          stream_subgraphs: false,
          on_disconnect: "cancel",
          feedback_keys: [""],
          multitask_strategy: "reject",
          if_not_exists: "reject",
          after_seconds: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Message response:", data);

      const botMessage = data.outputs?.messages?.find(
        (msg) => msg.type === "ai"
      );
      if (botMessage) {
        setMessages((prev) => [
          ...prev,
          { ...botMessage, timestamp: new Date() },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error.message || error);
    }

    setText(""); // Clear input
  };

  // Load Assistant on Component Mount
  useEffect(() => {
    initializeAssistant();
  }, []);

  // Handle Enter Key Press
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
      <div className="flex flex-col md:flex-row h-full gap-4">
        {/* Sidebar */}
        <div className="flex flex-col w-full md:w-4/12 bg-PRIMARY_COLOR p-4 rounded-lg overflow-y-auto shadow">
          <div className="flex items-center justify-between mb-4">
            <PageHeader text="Chat History" color={"text-WHITE"} />
            <div className="">
              <IconButton
                color={themeStyles?.SECONDARY_COLOR}
                text={"Compose"}
                onClick={startThread}
                className="ml-2"
              />
            </div>
          </div>
          <div className="mt-2 space-y-2">
            {/* Message Headers */}
            {sortedMessages.map((msg, index) => (
              <div className="">
                <MessageHeader
                  key={index}
                  latestMessage={msg.content}
                  latestTime={msg.timestamp}
                  unreadMessages={"0"}
                  darkMode
                  avatarDisabled
                />
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex flex-col w-full md:w-8/12 bg-white rounded-lg shadow">
          {threadId ? (
            <>
              <div className="h-12 py-3 px-4 border-b flex justify-between items-center">
                <span className="text-lg font-semibold">{title}</span>
              </div>
              <div className="flex-grow overflow-y-auto p-4">
                {isLoadingChat ? (
                  <div className="flex justify-center items-center h-full">
                    <BeatLoader color={themeStyles.PRIMARY_LIGHT_COLOR} />
                  </div>
                ) : (
                  sortedMessages.map((msg, index) => (
                    <Message
                      key={index}
                      textMessage={msg.content}
                      time={msg.timestamp}
                      isSender={msg.type === "human"}
                    />
                  ))
                )}
              </div>
              <div className="py-2 px-4 border-t flex items-center gap-2">
                <InputField
                  placeholder="Type a message..."
                  value={text}
                  setValue={setText}
                  onKeyPress={handleKeyPress}
                />
                {showEmojiPicker && (
                  <div ref={emojiPickerRef}>
                    <Picker
                      onEmojiClick={(event, emojiObject) =>
                        setText((prev) => prev + emojiObject.emoji)
                      }
                    />
                  </div>
                )}
                <button
                  className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
                  onClick={handleSendMessage}
                >
                  <SendIcon size={6} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-grow justify-center items-center">
              <span className="text-2xl font-semibold text-gray-500">
                Start a thread to chat with the assistant
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssistantChat;
