import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Button from "../../components/Button";
import InfoSubTitle from "../../components/Headers/InfoSubTitle";
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
    if (permissions && user?.permissions) {
      setPermissions(user?.permissions ? JSON.parse(user?.permissions) : null);
    }
  }, [user, open]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      border: "1px solid white",
      backgroundColor: "white",
      width: "90%", // Adjust for mobile, use percentages for responsiveness
      maxWidth: "500px", // Add a max width for larger screens
      padding: 0,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const { updatePeopleQuery } = useUpdatePeople();

  const handleSubmit = async () => {
    const updatedPermissions = {
      ...permissions,
      notifications: [
        { name: "Text Message", isSelected: isTextNotifications },
        { name: "Email", isSelected: isEmailNotifications },
        { name: "In App Notifications", isSelected: isAppNotifications },
      ],
    };

    const updatedPeople = {
      id: user.id,
      permissions: JSON.stringify(updatedPermissions),
      _version: user._version,
    };

    try {
      await updatePeopleQuery(updatedPeople);
      SuccessToast("Successfully updated notification settings");
      refetch();
      onClose();
    } catch (error) {
      console.error("Error updating people: ", error);
      ErrorToast("Error updating notification settings");
    }
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Notifications Settings Modal"
    >
      <div className="w-full h-full flex flex-col gap-6 items-center justify-center p-4 py-4">
        <p className="text-xl font-bold w-full text-left">
          Notifications Settings
        </p>

        <div className="w-full flex flex-col gap-4 items-center justify-center">
          <div className="w-full flex justify-between items-center">
            <InfoSubTitle text="Text Notifications" />
            <Toggle
              isChecked={isTextNotifications}
              onToggle={() => setIsTextNotifications(!isTextNotifications)}
            />
          </div>

          <div className="w-full flex justify-between items-center">
            <InfoSubTitle text="Email Notifications" />
            <Toggle
              isChecked={isEmailNotifications}
              onToggle={() => setIsEmailNotifications(!isEmailNotifications)}
            />
          </div>

          <Button children="UPDATE" onClick={handleSubmit} />
        </div>
      </div>
    </Modal>
  );
}

export default ChangeNotificationsModal;
