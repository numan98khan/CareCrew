import React, { useState, useMemo, useEffect } from "react";
import Modal from "react-modal";
import { PuffLoader } from "react-spinners";

import DownChevron from "../../assets/icons/downChevron";
import Input from "../../components/Input";
import DropDown from "../../components/DropDown";
import RadioButton from "../../components/Button/RadioButton";
import Button from "../../components/Button/index";
import MinimalPeopleRow from "../../components/MinimalPeopleRow";

import { useListPeople } from "../../apolloql/people";
import { useListTemplates } from "../../apolloql/templates";
import { useListFacilities } from "../../apolloql/facilities";
import { useAuth } from "../../context";

import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";
import themeStyles from "../../styles/theme.styles";
import { draftRichToText } from "../../services/micro";
import { SuccessToast, ErrorToast } from "../../services/micro";
import { sendBulkMessages } from "../../services/messaging";

Modal.setAppElement("#root");

const RECEIVER_TYPES = ["CareCrew", "Facility", "Employee", "All People"];
const MESSAGE_TYPES = ["Email", "Text", "Both"];

/**
 * Utility function to get joined names by IDs.
 */
function getNames(peopleIds, people) {
  const selectedPeople = people.filter((p) => peopleIds.includes(p.id));
  const namesString = selectedPeople
    .map((p) => `${p.firstName} ${p.lastName}`)
    .join(", ");
  return namesString;
}

/**
 * Facility selection UI
 */
function FacilitySelection({
  facilities,
  selectedFacilityIds,
  onSelectFacilities,
  onClose,
}) {
  return (
    <div className="flex flex-col flex-1 h-full justify-between">
      <div className="bg-SECONDARY_COLOR w-14 h-1 top-0 self-center absolute" />
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-bold">Facility</label>
        <label className="text-xs">
          Please select the facility to whom you want to send a message.
        </label>
        <div className="my-2" />
        <div>
          {facilities.map((facility, index) => (
            <MinimalPeopleRow
              key={index}
              isSquaredImg={true}
              imgSrc={facility.imgSrc}
              name={facility.facilityName}
              initChecked={selectedFacilityIds.includes(facility.id)}
              onClick={() => {
                if (selectedFacilityIds.includes(facility.id)) {
                  onSelectFacilities(
                    selectedFacilityIds.filter((id) => id !== facility.id)
                  );
                } else {
                  onSelectFacilities([...selectedFacilityIds, facility.id]);
                }
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex space-x-2">
        <Button onClick={onClose}>NEXT</Button>
        <Button color={themeStyles.GRAY} onClick={() => onClose(true)}>
          CANCEL
        </Button>
      </div>
    </div>
  );
}

/**
 * People (Receiver) selection UI
 */
function ReceiverSelection({
  title = "Employees",
  people,
  selectedPeopleIds,
  onSelectPeople,
  onDone,
  onClose,
  isAddGroup = false,
}) {
  return (
    <div className="flex flex-col flex-1 h-full justify-between">
      <div className="bg-SECONDARY_COLOR w-14 h-1 top-0 self-center absolute" />
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-bold">{title}</label>
        <label className="text-xs">
          Please select the person to whom you want to send a message.
        </label>
        <div className="my-2" />
        <div>
          {people.map((person, index) => (
            <div className="py-1" key={index}>
              <MinimalPeopleRow
                imgSrc={person.profilePicture}
                name={`${person.firstName} ${person.lastName}`}
                role={person.role}
                initChecked={selectedPeopleIds.includes(person.id)}
                onClick={() => {
                  if (selectedPeopleIds.includes(person.id)) {
                    onSelectPeople(
                      selectedPeopleIds.filter((p) => p !== person.id)
                    );
                  } else {
                    onSelectPeople([...selectedPeopleIds, person.id]);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-2">
        <Button onClick={onDone}>{isAddGroup ? "ADD" : "DONE"}</Button>
        <Button color={themeStyles.GRAY} onClick={onClose}>
          CANCEL
        </Button>
      </div>
    </div>
  );
}

/**
 * Main UI for sending bulk messages (subject, body, etc.)
 */
function SendMessageForm({
  receiver,
  receiverLabel,
  onOpenReceiverModal,
  templates,
  selectedTemplate,
  setSelectedTemplate,
  subject,
  setSubject,
  messageType,
  setMessageType,
  textMessage,
  setTextMessage,
  emailMessage,
  setEmailMessage,
  onSend,
  onCancel,
}) {
  return (
    <div className="flex flex-col flex-1 h-full justify-between">
      <div className="bg-SECONDARY_COLOR w-14 h-1 top-0 self-center absolute" />
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-bold">Send Message</label>

        <DropDown
          placeholder="Select Receiver Type"
          value={receiver}
          setValue={() => {}}
          options={RECEIVER_TYPES}
          disabled
        />

        <div onClick={onOpenReceiverModal}>
          <DropDown placeholder="Sending to" value={receiverLabel || null} />
        </div>

        <DropDown
          placeholder="Select Quick Message"
          setValue={setSelectedTemplate}
          value={selectedTemplate}
          options={templates?.map((obj) => obj.id)}
          labels={templates?.map((obj) => obj.subject)}
        />

        <Input placeholder="Subject" value={subject} setValue={setSubject} />

        {/* <div className="flex p-3 space-x-2">
          {MESSAGE_TYPES.map((type, index) => (
            <RadioButton
              key={index}
              checked={messageType === type}
              onChange={() => setMessageType(type)}
            >
              {type}
            </RadioButton>
          ))}
        </div> */}

        {/* Show text message area if "Text" or "Both" is selected */}
        {(messageType === MESSAGE_TYPES[1] ||
          messageType === MESSAGE_TYPES[2]) && (
          <>
            <label className="text-xs text-greycus">Text Message</label>
            <Input
              placeholder="Message"
              value={textMessage}
              setValue={setTextMessage}
              multiline
            />
          </>
        )}

        {/* Show email message area if "Email" or "Both" is selected */}
        {(messageType === MESSAGE_TYPES[0] ||
          messageType === MESSAGE_TYPES[2]) && (
          <>
            <label className="text-xs text-greycus">E-mail Message</label>
            <Input
              placeholder="Message"
              value={emailMessage}
              setValue={setEmailMessage}
              multiline
            />
          </>
        )}
      </div>

      <div className="flex space-x-2">
        <Button onClick={onSend}>SEND</Button>
        <Button color={themeStyles.GRAY} onClick={onCancel}>
          CANCEL
        </Button>
      </div>
    </div>
  );
}

/**
 * Main Modal Component
 */
function MessageModal({
  isOpen,
  reqClose,
  sendInAppBulkMessages,
  isAddGroup,
  addPersonToChatRoom,
  chatroomID,
}) {
  const [receiver, setReceiver] = useState(RECEIVER_TYPES[2]); // Default: Employee
  const [receiverLabel, setReceiverLabel] = useState(null);

  const [receiverModalOpen, setReceiverModalOpen] = useState(false);
  const [facilityModalOpen, setFacilityModalOpen] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const [selectedPeopleIds, setSelectedPeopleIds] = useState([]);
  const [selectedFacilityIds, setSelectedFacilityIds] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [textMessage, setTextMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [messageType, setMessageType] = useState(MESSAGE_TYPES[0]); // Default: Email

  const { user } = useAuth();
  const { people } = useListPeople();
  const { templates } = useListTemplates();
  const { facilities } = useListFacilities();

  // Filter logic for facilities
  const receiverFacilities = useMemo(() => {
    return facilities || [];
  }, [facilities]);

  // Filter logic for people
  const receiverPeople = useMemo(() => {
    if (!people) return [];

    return people.filter((person) => {
      // Exclude current user
      if (user?.attributes?.sub === person.id) return false;

      switch (receiver) {
        case "CareCrew":
          return person.type === ADMIN;
        case "Facility":
          // Collect all person IDs from selected facilities
          let facilityPersonIds = [];
          facilities?.forEach((f) => {
            if (selectedFacilityIds.includes(f.id) && f.FacilityPeople) {
              const ids = f.FacilityPeople.items.map((fp) => fp.peopleId);
              facilityPersonIds = [...facilityPersonIds, ...ids];
            }
          });
          return (
            facilityPersonIds.includes(person.id) && person.type === FACILITY
          );
        case "Employee":
          return person.type === EMPLOYEE;
        case "All People":
          return true;
        default:
          return false;
      }
    });
  }, [people, facilities, receiver, selectedFacilityIds, user]);

  // On template change, populate the subject and messages from the template
  useEffect(() => {
    if (selectedTemplate) {
      const templateObj = templates?.find((obj) => obj.id === selectedTemplate);
      setSubject(templateObj?.subject || "");
      const textBody = draftRichToText(templateObj?.body || "");
      setTextMessage(textBody);
      setEmailMessage(textBody);
    }
  }, [selectedTemplate, templates]);

  const closeReceiverModal = () => {
    setReceiverModalOpen(false);
    setFacilityModalOpen(false);
  };

  const openReceiverModal = () => {
    setSelectedFacilityIds([]);
    setSelectedPeopleIds([]);
    setReceiverLabel(null);

    if (receiver === "Facility") {
      setFacilityModalOpen(true);
    }
    setReceiverModalOpen(true);
  };

  /**
   * Adding a group of people to a chat room
   */
  const addGroupBulk = async () => {
    for (const personId of selectedPeopleIds) {
      try {
        await addPersonToChatRoom(chatroomID, personId);
        SuccessToast(`Person added to the chat room: ${personId}`);
      } catch (error) {
        ErrorToast(`Failed to add ${personId} to the chat room`);
      }
    }
    SuccessToast("All selected people have been added to the chat room");
  };

  /**
   * Sending bulk messages
   */
  const sendBulk = async () => {
    if (!selectedPeopleIds?.length) {
      ErrorToast("Select at least one receiver.");
      return;
    }
    if (!subject) {
      ErrorToast("Subject is empty.");
      return;
    }
    if (!textMessage && !emailMessage) {
      ErrorToast("There is no message content.");
      return;
    }

    setIsSending(true);

    // Filter to only selected people
    const peopleWithPermissions = people.filter((p) =>
      selectedPeopleIds.includes(p.id)
    );

    /**
     * Check if the user has selected a permission type for notifications
     */
    const hasPermission = (person, type) => {
      try {
        const permissions = JSON.parse(person.permissions);
        return (
          permissions.notifications &&
          Array.isArray(permissions.notifications) &&
          permissions.notifications.some(
            (notif) => notif.name === type && notif.isSelected
          )
        );
      } catch (e) {
        console.error("Error parsing permissions", e);
        return false;
      }
    };

    const emailList = peopleWithPermissions
      .filter((p) => hasPermission(p, "Email"))
      .map((p) => p.email);

    const phoneNumberList = peopleWithPermissions
      .filter((p) => hasPermission(p, "Text Message"))
      .map((p) => p.phoneNumber);

    const appUserIds = peopleWithPermissions
      .filter((p) => hasPermission(p, "In App Notifications"))
      .map((p) => p.id);

    // Construct the payload
    const payload = {
      email: {
        subject,
        message: emailMessage,
        emails:
          messageType === "Both" || messageType === "Email" ? emailList : [],
      },
      text: {
        message: textMessage,
        phoneNumbers:
          messageType === "Both" || messageType === "Text"
            ? phoneNumberList
            : [],
      },
      app: {
        message: textMessage || emailMessage,
        userIds: appUserIds,
      },
    };

    // Send out the messages
    await sendBulkMessages(payload);
    await sendInAppBulkMessages(
      peopleWithPermissions,
      textMessage || emailMessage,
      messageType === "Both" ? "Email/Text" : messageType
    );

    SuccessToast("Message(s) sent successfully.");

    // Reset states
    setSelectedPeopleIds([]);
    setSelectedTemplate(null);
    setSelectedFacilityIds([]);
    setReceiverLabel(null);
    setTextMessage("");
    setEmailMessage("");
    setSubject("");
    setMessageType(MESSAGE_TYPES[0]);
    setIsSending(false);
  };

  /**
   * MAIN RENDER LOGIC
   */
  const renderModalContent = () => {
    // Show loader
    if (isSending) {
      return (
        <div className="flex flex-row flex-1 h-full justify-between items-center ">
          <div className="flex flex-col justify-center items-center w-full ">
            <PuffLoader
              loading={isSending}
              color={themeStyles.SECONDARY_COLOR}
            />
          </div>
        </div>
      );
    }

    // If adding group and either facility or receiver selection is open
    if (isAddGroup) {
      if (receiverModalOpen) {
        if (facilityModalOpen) {
          return (
            <FacilitySelection
              facilities={receiverFacilities}
              selectedFacilityIds={selectedFacilityIds}
              onSelectFacilities={setSelectedFacilityIds}
              onClose={(isCancel) => {
                if (isCancel) closeReceiverModal();
                else setFacilityModalOpen(false);
              }}
            />
          );
        }
        // else: receiver modal
        return (
          <ReceiverSelection
            title={`${receiver} Employees`}
            people={receiverPeople}
            selectedPeopleIds={selectedPeopleIds}
            onSelectPeople={setSelectedPeopleIds}
            isAddGroup
            onDone={async () => {
              await addGroupBulk();
              closeReceiverModal();
            }}
            onClose={closeReceiverModal}
          />
        );
      }
      // Show the initial "Add Members" screen
      return (
        <div className="flex flex-col flex-1 h-full justify-between">
          <div className="bg-SECONDARY_COLOR w-14 h-1 top-0 self-center absolute" />
          <div className="flex flex-col space-y-2">
            <label className="text-xl font-bold">Add Members</label>
            <DropDown
              placeholder="Select Receiver Type"
              value={receiver}
              setValue={(val) => setReceiver(val)}
              options={RECEIVER_TYPES}
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={openReceiverModal}>NEXT</Button>
            <Button color={themeStyles.GRAY} onClick={reqClose}>
              CANCEL
            </Button>
          </div>
        </div>
      );
    }

    // If NOT adding group => sending messages flow
    if (receiverModalOpen) {
      if (facilityModalOpen) {
        return (
          <FacilitySelection
            facilities={receiverFacilities}
            selectedFacilityIds={selectedFacilityIds}
            onSelectFacilities={setSelectedFacilityIds}
            onClose={(isCancel) => {
              if (isCancel) closeReceiverModal();
              else setFacilityModalOpen(false);
            }}
          />
        );
      }
      // else: receiver modal
      return (
        <ReceiverSelection
          title={`${receiver} Employees`}
          people={receiverPeople}
          selectedPeopleIds={selectedPeopleIds}
          onSelectPeople={setSelectedPeopleIds}
          onDone={() => {
            setReceiverLabel(getNames(selectedPeopleIds, people));
            closeReceiverModal();
          }}
          onClose={closeReceiverModal}
        />
      );
    }

    // If no modals are open, show the main send message form
    return (
      <SendMessageForm
        receiver={receiver}
        receiverLabel={receiverLabel}
        onOpenReceiverModal={openReceiverModal}
        templates={templates}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        subject={subject}
        setSubject={setSubject}
        messageType={messageType}
        setMessageType={setMessageType}
        textMessage={textMessage}
        setTextMessage={setTextMessage}
        emailMessage={emailMessage}
        setEmailMessage={setEmailMessage}
        onSend={sendBulk}
        onCancel={reqClose}
      />
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={reqClose}
      contentLabel="User Options Modal"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.2)" },
        content: {
          bottom: 0,
          right: 0,
          top: "auto",
          left: "auto",
          border: 10,
          boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
          padding: 14,
          minHeight: "85%",
          width: "320px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      {renderModalContent()}
    </Modal>
  );
}

export default MessageModal;
