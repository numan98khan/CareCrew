import React, { useState, useEffect, useRef, useMemo } from "react";
import Modal from "react-modal";
import DownChevron from "../../assets/icons/downChevron";
import Input from "../../components/Input";
import DropDown from "../../components/DropDown";
import RadioButton from "../../components/Button/RadioButton";
import Button from "../../components/Button/index";
import themeStyles from "../../styles/theme.styles";

import { useListPeople } from "../../apolloql/people";
import { useListTemplates } from "../../apolloql/templates";
import { useListFacilities } from "../../apolloql/facilities";

import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";
import MinimalPeopleRow from "../../components/MinimalPeopleRow";

import { draftRichToText } from "../../services/micro";

import { SuccessToast, ErrorToast } from "../../services/micro";

import { sendBulkMessages } from "../../services/messaging";
import { PuffLoader } from "react-spinners";
import { useAuth } from "../../context";

Modal.setAppElement("#root");

const ReceiverType = ["CareCrew", "Facility", "Employee", "All People"];
const MessageType = ["Email", "Text", "Both"];

function getNames(peopleIds, people) {
  // Filter the people list by ids
  const selectedPeople = people.filter((person) =>
    peopleIds.includes(person.id)
  );

  // Map the filtered people to an array of first name and last name
  const names = selectedPeople.map(
    (person) => `${person.firstName} ${person.lastName}`
  );

  // Join the names array into a string with commas
  const namesString = names.join(", ");

  return namesString;
}

const MessageModal = ({
  isOpen,
  reqClose,
  sendInAppBulkMessages,
  isAddGroup,
  addPersonToChatRoom,
  chatroomID,
}) => {
  const [facility, setFacility] = useState(null);
  const [receiver, setReceiver] = useState(ReceiverType[2]);
  const handleReceiverChange = (e) => {
    // if (e === ReceiverType[1]) {
    //   // setReceiver(e);
    //   setFacilityModalOpen(true);
    // }
    setSelectedFacility([]);
    setSelectedPeople([]);
    setReceiverLabel(null);
    setReceiver(e);
  };

  const { user } = useAuth();

  const [receiverLabel, setReceiverLabel] = useState(null);

  const [isSending, setIsSending] = useState(false);

  const [textMessage, setTextMessage] = useState(null);
  const [emailMessage, setEmailMessage] = useState(null);

  const [messageType, setMessageType] = useState(MessageType[0]);
  const [subject, setSubject] = useState(null);

  const [receiverModalOpen, setReceiverModalOpen] = useState(false);
  const [facilityModalOpen, setFacilityModalOpen] = useState(false);

  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState([]);

  const { people } = useListPeople();
  const { templates } = useListTemplates();
  const { facilities } = useListFacilities();

  const receiverFacilites = useMemo(() => {
    return facilities?.filter((person) => {
      return true;
    });
  }, [facilities, facility]);

  const receiverPeople = useMemo(() => {
    return people.filter((person) => {
      if (user?.attributes?.sub === person.id) return false;
      // Replace this condition with your actual filter condition
      if (receiver === ReceiverType[0]) {
        return person.type === ADMIN;
      } else if (receiver === ReceiverType[1]) {
        // TODO check if this person is in facility people
        // const facilityToLookUp = facilities.find((item) => (item.id === selectedFacility))
        // const selectedFacilityIds = ["id1", "id2", "id3"];  // your selected facility ids here
        let peopleIds = [];

        facilities.forEach((facility) => {
          if (
            selectedFacility.includes(facility.id) &&
            facility.FacilityPeople
          ) {
            const ids = facility.FacilityPeople.items.map(
              (person) => person.peopleId
            );
            peopleIds = [...peopleIds, ...ids];
          }
        });

        console.log(
          "SELECTOR",
          people,
          selectedFacility,
          selectedPeople,
          peopleIds
        );
        // return person.type === FACILITY;
        return peopleIds.includes(person.id) && person.type === FACILITY;
      } else if (receiver === ReceiverType[2]) {
        return person.type === EMPLOYEE;
      } else if (receiver === ReceiverType[3]) {
        return true;
      }
    });
  }, [people, receiver]);

  useMemo(() => {
    if (selectedTemplate !== null) {
      setSubject(
        templates?.find((obj) => obj.id === selectedTemplate)?.subject
      );
      // setMessage(
      //   draftRichToText(
      //     templates?.find((obj) => obj.id === selectedTemplate)?.body
      //   )
      // );
      setTextMessage(
        draftRichToText(
          templates?.find((obj) => obj.id === selectedTemplate)?.body
        )
      );
      setEmailMessage(
        draftRichToText(
          templates?.find((obj) => obj.id === selectedTemplate)?.body
        )
      );
    }
  }, [selectedTemplate]);

  const closeReceiverModal = () => {
    setFacilityModalOpen(false);
    setReceiverModalOpen(false);
  };

  const openReceiverModal = () => {
    // updatePosition();
    // console.log(receiverModalOpen, facilityModalOpen);

    setSelectedFacility([]);
    setSelectedPeople([]);
    setReceiverLabel(null);
    if (receiver === ReceiverType[1]) {
      setFacilityModalOpen(true);
    }
    setReceiverModalOpen(true);
  };
  const addGroupBulk = async () => {
    for (const person of selectedPeople) {
      try {
        await addPersonToChatRoom(chatroomID, person);
        SuccessToast(`Person added to the chat room: ${person}`);
      } catch (error) {
        console.error(`Failed to add ${person} to the chat room: ${error}`);
        // You might want to show an error toast here
        ErrorToast(`Failed to add ${person} to the chat room`);
      }
    }
    try {
      SuccessToast("All selected people have been added to the chat room");
    } catch (error) {
      console.error(`Failed to show success toast: ${error}`);
      // Handle the error as needed
    }
  };

  const sendBulk = async () => {
    if (!selectedPeople?.length) {
      ErrorToast("Select receivers.");
      return;
    }

    if (!subject) {
      ErrorToast("Subject is empty.");
      return;
    }

    if (!(textMessage || emailMessage)) {
      ErrorToast("There is no message.");
      return;
    }

    // SuccessToast("Validation successfully");
    // return;
    setIsSending(true);

    // TODO need to connect this with bulk send API

    // Function to check if a given notification type is selected
    const hasPermission = (person, type) => {
      try {
        const permissions = JSON.parse(person.permissions);
        // console.log(
        //   "🚀 ~ file: ComposeModal.js:198 ~ hasPermission ~ permissions:",
        //   permissions
        // );
        return (
          permissions.notifications &&
          Array.isArray(permissions.notifications) &&
          permissions.notifications.some(
            (notification) =>
              notification.name === type && notification.isSelected
          )
        );
      } catch (e) {
        console.error("Error parsing permissions", e);
        return false;
      }
    };

    const peopleWithPermissions = people.filter((person) =>
      selectedPeople.includes(person.id)
    );
    console.log(
      "🚀 ~ file: ComposeModal.js:215 ~ sendBulk ~ peopleWithPermissions:",
      peopleWithPermissions
    );

    const emailList = peopleWithPermissions
      .filter((person) => hasPermission(person, "Email"))
      .map((i) => i.email);

    const phoneNumberList = peopleWithPermissions
      .filter((person) => hasPermission(person, "Text Message"))
      .map((i) => i.phoneNumber);

    const appUserIds = peopleWithPermissions
      .filter((person) => hasPermission(person, "In App Notifications"))
      .map((i) => i.id);

    // Old payload logic
    // const payload = {
    //   email: {
    //     message: emailMessage,
    //     emails:
    //       messageType === MessageType[2]
    //         ? emailList
    //         : messageType === MessageType[0]
    //         ? emailList
    //         : [],
    //   },
    //   text: {
    //     message: textMessage,
    //     phoneNumbers:
    //       messageType === MessageType[2]
    //         ? phoneNumberList
    //         : messageType === MessageType[1]
    //         ? phoneNumberList
    //         : [],
    //   },
    //   app: {
    //     message: textMessage ? textMessage : emailMessage,
    //     userIds: appUserIds,
    //   },
    // };

    const payload = {
      email: {
        subject: subject,
        message: textMessage,
        emails:
          messageType === MessageType[2]
            ? emailList
            : messageType === MessageType[0]
            ? emailList
            : [],
      },
      text: {
        message: textMessage,
        phoneNumbers:
          messageType === MessageType[2]
            ? phoneNumberList
            : messageType === MessageType[1]
            ? phoneNumberList
            : [],
      },
      app: {
        message: textMessage,
        userIds: appUserIds,
      },
    };

    // // messageType
    // console.log(
    //   "🚀 ~ file: ComposeModal.js:252 ~ sendBulk ~ messageType:",
    //   messageType
    // );
    console.log("sendBulk", payload);

    // Uncomment the below lines to call the respective APIs
    await sendBulkMessages(payload);
    // await sendInAppBulkMessages(
    //   peopleWithPermissions,
    //   messageType === MessageType[0]
    //     ? emailMessage
    //     : messageType === MessageType[1]
    //     ? textMessage
    //     : textMessage,
    //   messageType === MessageType[2] ? "Email/Text" : messageType
    // );

    await sendInAppBulkMessages(
      peopleWithPermissions,
      textMessage,
      messageType === MessageType[2] ? "Email/Text" : messageType
    );

    SuccessToast("Message(s) sent successfully.");

    setSelectedPeople([]);
    setSelectedTemplate(null);
    setSelectedFacility([]);
    setReceiverLabel(null);

    setTextMessage("");
    setEmailMessage("");

    setMessageType(MessageType[0]);
    setSubject("");

    setIsSending(false);
  };

  const renderMain = () => (
    <div className="flex flex-col flex-1 h-full justify-between">
      <div className="bg-SECONDARY_COLOR w-14 h-1 top-0 self-center absolute" />
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-bold">Send Message</label>

        <DropDown
          placeholder={"Select Receiver Type"}
          value={receiver}
          setValue={handleReceiverChange}
          options={ReceiverType}
        />

        <div onClick={openReceiverModal}>
          <DropDown
            placeholder={"Sending to"}
            value={receiverLabel || null}
            // setValue={setValue}
            // options={options}
          />
        </div>

        <DropDown
          placeholder={"Select Quick Message"}
          setValue={setSelectedTemplate}
          value={selectedTemplate}
          options={templates?.map((obj) => obj.id)}
          labels={templates?.map((obj) => obj.subject)}
        />

        {/* {renderInput("Subject")} */}
        <Input
          placeholder={"Subject"}
          value={subject}
          setValue={setSubject}
          // multiline={multiline}
        />
        <div className="my-1" />
        <div className="flex p-3 space-x-2">
          {MessageType.map((type, index) => (
            <RadioButton
              key={index}
              checked={messageType === type}
              onChange={() => setMessageType(type)}
            >
              {type}
            </RadioButton>
          ))}
        </div>

        {/* {renderInput("Message", message, setMessage, true)} */}
        {messageType === MessageType[1] || messageType === MessageType[2] ? (
          <>
            <label className="text-xs text-greycus">Text Message</label>
            <Input
              placeholder={"Message"}
              value={textMessage}
              setValue={setTextMessage}
              multiline={true}
            />
          </>
        ) : null}
        {messageType === MessageType[0] || messageType === MessageType[2] ? (
          <>
            <label className="text-xs text-greycus">E-mail Message</label>
            <Input
              placeholder={"Message"}
              // value={emailMessage}
              // setValue={setEmailMessage}

              value={textMessage}
              setValue={setTextMessage}
              multiline={true}
            />
          </>
        ) : null}
      </div>
      <div className="flex space-x-2">
        <Button onClick={sendBulk}>SEND</Button>

        {/* <div className="mx-1" /> */}
        <Button color={themeStyles.GRAY} onClick={reqClose}>
          CANCEL
        </Button>
      </div>
    </div>
  );

  const renderAddMember = () => (
    <div className="flex flex-col flex-1 h-full justify-between">
      <div className="bg-SECONDARY_COLOR w-14 h-1 top-0 self-center absolute" />
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-bold">Add Members</label>

        <DropDown
          placeholder={"Select Receiver Type"}
          value={receiver}
          setValue={handleReceiverChange}
          options={ReceiverType}
        />
      </div>
      <div className="flex space-x-2">
        <Button onClick={openReceiverModal}>NEXT</Button>

        {/* <div className="mx-1" /> */}
        <Button color={themeStyles.GRAY} onClick={reqClose}>
          CANCEL
        </Button>
      </div>
    </div>
  );

  const renderReceiver = () => (
    <div className="flex flex-col flex-1 h-full justify-between">
      <div className="bg-SECONDARY_COLOR w-14 h-1 top-0 self-center absolute" />
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-bold">{receiver} Employees</label>
        <label className="text-xs">
          Please select the person to whom you want to send message.
        </label>
        <div className="my-2" />
        <div>
          {receiverPeople.map((person, index) => {
            console.log(
              "LOOPER",
              person,
              selectedPeople,
              selectedPeople?.includes(person.id)
            );
            return (
              <div className="py-1">
                <MinimalPeopleRow
                  key={index}
                  imgSrc={person.profilePicture}
                  name={person.firstName + " " + person.lastName}
                  role={person.role}
                  initChecked={
                    selectedPeople === []
                      ? false
                      : selectedPeople?.includes(person.id)
                  }
                  onClick={() => {
                    if (selectedPeople.includes(person.id)) {
                      setSelectedPeople(
                        selectedPeople.filter((p) => p !== person.id)
                      );
                    } else {
                      setSelectedPeople([...selectedPeople, person.id]);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex space-x-2">
        {/* <Button>DONE</Button> */}
        <Button
          onClick={() => {
            if (isAddGroup) {
              console.log("addPersonToChatRoom", selectedPeople);
              addGroupBulk();
            } else {
              console.log(
                "selectedPeople",
                selectedPeople,
                getNames(selectedPeople, people)
              );

              setReceiverLabel(getNames(selectedPeople, people));
            }
            setReceiverModalOpen(false);
          }}
        >
          {isAddGroup ? "ADD" : "DONE"}
        </Button>

        {/* <div className="mx-1" /> */}
        <Button
          color={themeStyles.GRAY}
          onClick={() => {
            // setFacilityModalOpen(false);
            closeReceiverModal();
          }}
        >
          CANCEL
        </Button>
      </div>
    </div>
  );

  const renderFacilities = () => (
    <div className="flex flex-col flex-1 h-full justify-between">
      <div className="bg-SECONDARY_COLOR w-14 h-1 top-0 self-center absolute" />
      <div className="flex flex-col space-y-2">
        <label className="text-xl font-bold">Facility</label>
        <label className="text-xs">
          Please select the facility to whom you want to send message.
        </label>
        <div className="my-2" />
        <div>
          {receiverFacilites.map((facility, index) => (
            <div>
              <MinimalPeopleRow
                key={index}
                isSquaredImg={true}
                imgSrc={facility.imgSrc}
                name={facility.facilityName}
                // role={person.role}
                initChecked={selectedFacility?.includes(facility.id)}
                onClick={() => {
                  if (selectedFacility.includes(facility.id)) {
                    setSelectedFacility(
                      selectedFacility.filter((f) => f !== facility.id)
                    );
                  } else {
                    setSelectedFacility([...selectedFacility, facility.id]);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          onClick={() => {
            setSelectedPeople([]);
            console.log("NEXT", selectedPeople, receiverPeople);
            setFacilityModalOpen(false);
          }}
        >
          NEXT
        </Button>

        {/* <div className="mx-1" /> */}
        <Button color={themeStyles.GRAY} onClick={closeReceiverModal}>
          CANCEL
        </Button>
      </div>
    </div>
  );

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
          justifyContent: "space-between",
          display: "flex", // Add this line
          flexDirection: "column", // Add this line
        },
      }}
    >
      {isSending ? (
        // <div className="w-full  justify-center items-center bg-slate-300">
        <div className="flex flex-row flex-1 h-full justify-between items-center ">
          <div className="flex flex-col justify-center items-center w-full ">
            <PuffLoader
              loading={isSending}
              color={themeStyles?.SECONDARY_COLOR}
            />
          </div>
        </div>
      ) : isAddGroup ? (
        receiverModalOpen ? (
          facilityModalOpen ? (
            renderFacilities()
          ) : (
            renderReceiver()
          )
        ) : (
          renderAddMember()
        )
      ) : receiverModalOpen ? (
        facilityModalOpen ? (
          renderFacilities()
        ) : (
          renderReceiver()
        )
      ) : (
        renderMain()
      )}
    </Modal>
  );
};

export default MessageModal;
