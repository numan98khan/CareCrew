import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Input from "../../components/Input";
import Button from "../../components/Button";

import InfoSubTitle from "../../components/Headers/InfoSubTitle";
import DatePicker from "../../components/DatePicker";
import Toggle from "../../components/ToggleSwitch";
import { useUpdatePeople } from "../../apolloql/people";
import { ErrorToast, SuccessToast } from "../../services/micro";

function ChangeNotificationsModal({ open, onClose, user, refetch }) {
  const [permissions, setPermissions] = useState(
    user?.permissions ? JSON.parse(user?.permissions) : null
  );

  const [isEmailNotifications, setIsEmailNotifications] = useState(
    permissions?.notifications?.find((obj) => obj?.name === "Email")?.isSelected
  );
  const [isTextNotifications, setIsTextNotifications] = useState(
    permissions?.notifications?.find((obj) => obj?.name === "Text Message")
      ?.isSelected
  );

  const [isAppNotifications, setIsAppNotifications] = useState(
    permissions?.notifications?.find(
      (obj) => obj?.name === "In App Notifications"
    )?.isSelected
  );

  useEffect(() => {
    // console.log(
    //   "🚀 ~ file: ChangeNotificationsModal.js:12 ~ ChangeNotificationsModal ~ people:",
    //   permissions
    // );

    if (permissions && user?.permissions) {
      // setIsEmailNotifications(
      //   JSON.parse(user?.permissions)?.notifications?.find(
      //     (obj) => obj?.name === "Email"
      //   )?.isSelected
      // );

      // setIsTextNotifications(
      //   JSON.parse(user?.permissions)?.notifications?.find(
      //     (obj) => obj?.name === "Text Message"
      //   )?.isSelected
      // );
      // setIsAppNotifications(
      //   JSON.parse(user?.permissions)?.notifications?.find(
      //     (obj) => obj?.name === "In App Notifications"
      //   )?.isSelected
      // );

      setPermissions(user?.permissions ? JSON.parse(user?.permissions) : null);
    }
  }, [user, open]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      // marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      border: "1px solid white",
      backgroundColor: "white",
      // backgroundColor: "black",
      width: "20vw",
      // paddingLeft: "30px",
      padding: 0,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const { updatePeopleQuery } = useUpdatePeople();

  const handleSubmit = async (e) => {
    const updatedPermissions = {
      ...permissions,
      notifications: [
        {
          name: "Text Message",
          isSelected: isTextNotifications,
        },
        {
          name: "Email",
          isSelected: isEmailNotifications,
        },
        {
          name: "In App Notifications",
          isSelected: isAppNotifications,
        },
      ],
    };

    const permissionsString = JSON.stringify(updatedPermissions);
    console.log(
      "🚀 ~ file: ChangeNotificationsModal.js:102 ~ handleSubmit ~ permissionsString:",
      updatedPermissions
    );

    const updatedPeople = {
      id: user.id,
      permissions: permissionsString,
      _version: user._version,
    };

    console.log("updated people with notifications", updatedPeople);

    try {
      await updatePeopleQuery(updatedPeople);
      SuccessToast("Successfully updated notification settings");
      refetch();
    } catch (error) {
      console.error("Error updating people: ", error);
      ErrorToast("Error updating notification settings");
    }
  };

  return (
    <div>
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={customStyles}
        // className="bg-white flex flex-row w-1/2 h-1/2 items-center justify-center"
        contentLabel="Example Modal"
      >
        <div className="w-full h-full flex flex-col gap-6 items-center justify-center p-3 py-4">
          <p
            style={{ fontSize: "24px" }}
            className="text-xl font-bold w-full text-left"
          >
            Notifications Settings
          </p>

          <div className="w-full h-full flex flex-col gap-2 items-center justify-center space-y-2">
            <div className="w-full flex flex-row justify-between ">
              <InfoSubTitle text={"Text Notifications"} />
              <Toggle
                isChecked={isTextNotifications}
                onToggle={() => {
                  console.log(
                    "🚀 ~ file: ChangeNotificationsModal.js:160 ~ ChangeNotificationsModal ~ isTextNotifications:",
                    isTextNotifications
                  );

                  setIsTextNotifications(isTextNotifications ? false : true);
                }}
              />
            </div>
            <div className="w-full flex flex-row justify-between ">
              <InfoSubTitle text={"Email Notifications"} />
              <Toggle
                isChecked={isEmailNotifications}
                onToggle={() => setIsEmailNotifications(!isEmailNotifications)}
              />
            </div>
            {/* <div className="w-full flex flex-row justify-between ">
              <InfoSubTitle text={"In App Notifications"} />
              <Toggle
                isChecked={isAppNotifications}
                onToggle={() => setIsTextNotifications(!isAppNotifications)}
              />
            </div> */}
            <Button children={"UPDATE"} onClick={handleSubmit} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ChangeNotificationsModal;
