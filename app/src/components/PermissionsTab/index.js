import React, { useState } from "react";
import theme from "../../styles/theme.styles";
import CheckIcon from "../../assets/icons/check";

import InfoTitle from "../../components/Headers/InfoTitle";
import InfoSubTitle from "../../components/Headers/InfoSubTitle";
// import InfoBox from "../InfoCards/InfoBox";
import Toggle from "../ToggleSwitch";

const PermissionsTab = ({ id, text, isSelected, onClick, disabled, color }) => {
  const [permissions, setPermissions] = useState({
    access: [
      { name: "Dashboard", isSelected: false },
      { name: "Messaging", isSelected: false },
      { name: "My Availability", isSelected: false },
      { name: "Facilities", isSelected: false },
      { name: "Schedule", isSelected: false },
      { name: "Payroll", isSelected: false },
      { name: "Timecards", isSelected: false },
      { name: "Support", isSelected: false },
    ],
    permissions: [
      { name: "Clock In Shifts", isSelected: false },
      { name: "Messaging", isSelected: false },
      { name: "Clock Out Shifts", isSelected: false },
      { name: "Download Timecard", isSelected: false },
      { name: "Cancel Shifts", isSelected: false },
      { name: "Report an Issue", isSelected: false },
      { name: "Signature", isSelected: false },
      { name: "Accepting Shifts", isSelected: false },
    ],
    notifications: [
      { name: "Text Message", isSelected: false },
      { name: "Email", isSelected: false },
      { name: "In App Notifications", isSelected: false },
    ],
  });

  const togglePermission = (section, index) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      newPermissions[section][index].isSelected =
        !newPermissions[section][index].isSelected;
      return newPermissions;
    });
  };
  return (
    <div className="flex flex-col items-center w-full ">
      <div className="w-full">
        <div className="flex">
          <InfoTitle text={"Access"} />
        </div>
        <div className="my-2" />
        <div className="flex flex-wrap">
          {permissions?.access.map((item, index) => (
            <div className="flex justify-between mb-2 w-1/2" key={index}>
              <InfoSubTitle text={item?.name} />
              <Toggle
                isChecked={item.isSelected}
                onToggle={() => togglePermission("access", index)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="my-2" />

      <div className="w-full">
        <div className="flex">
          <InfoTitle text={"Permissions"} />
        </div>
        <div className="my-2" />
        <div className="flex flex-wrap">
          {permissions?.permissions.map((item, index) => (
            <div className="flex justify-between mb-2 w-1/2" key={index}>
              <InfoSubTitle text={item?.name} />
              <Toggle
                isChecked={item.isSelected}
                onToggle={() => togglePermission("permissions", index)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="my-2" />

      <div className="w-full">
        <div className="flex">
          <InfoTitle text={"Notifications"} />
        </div>
        <div className="my-2" />
        <div className="flex flex-wrap">
          {permissions?.notifications.map((item, index) => (
            <div className="flex justify-between mb-2 w-1/2" key={index}>
              <InfoSubTitle text={item?.name} />
              <Toggle
                isChecked={item.isSelected}
                onToggle={() => togglePermission("notifications", index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermissionsTab;
