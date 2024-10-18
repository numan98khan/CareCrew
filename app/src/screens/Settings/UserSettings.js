import React, { useState } from "react";
import StaffCard from "../../components/StaffCard";
import DropDown from "../../components/DropDown";
import ToggleOptions from "../../components/Button/Toggle";
import Toggle from "../../components/ToggleSwitch";
import { useAdmin } from "../../context";
import InfoSubTitle from "../../components/Headers/InfoSubTitle";
import InfoTitle from "../../components/Headers/InfoTitle";

function UserSettings() {
  // const { people } = useAdmin();

  const [settings, setSettings] = useState({
    userType: "CareCrew Staff",
  });

  const togglePermission = (section, index) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      newPermissions[section][index].isSelected =
        !newPermissions[section][index].isSelected;
      return newPermissions;
    });
  };

  // Update a single key in the people object
  const setSettingKey = (key) => (newValue) =>
    setSettings((prevPeople) => ({ ...prevPeople, [key]: newValue }));

  const [permissions, setPermissions] = useState({
    user: "employee",
    access: [
      { name: "Dashboard", isSelected: true },
      { name: "Schedule", isSelected: true },
      { name: "People", isSelected: true },
      { name: "Messaging", isSelected: true },
      { name: "Timecards", isSelected: true },
      { name: "Who's ON", isSelected: true },
      { name: "Total Billing", isSelected: true },
      { name: "Support", isSelected: true },
    ],
    permissions: [
      { name: "Create reminders", isSelected: false },
      { name: "Create Schedule", isSelected: false },
      { name: "Create Timecard", isSelected: false },
      { name: "Process Timecard", isSelected: false },
      { name: "Report Timecard", isSelected: false },
      { name: "Write Review", isSelected: false },
      { name: "Messaging", isSelected: false },
      { name: "Add Points", isSelected: false },
    ],
    notifications: [
      { name: "Text Message", isSelected: false },
      { name: "Email", isSelected: false },
      { name: "In App Notifications", isSelected: true },
    ],
  });

  return (
    <div className="p-4">
      {/* First Row */}
      <div className="grid grid-cols-4 gap-4 pb-10">
        <DropDown
          value={settings.userType}
          setValue={setSettingKey("userType")}
          options={["CareCrew Staff", "Facilities", "Employees"]}
          labels={["CareCrew Staff", "Facilities", "Employees"]}
        />
        <ToggleOptions />
      </div>
      {/* Second Row */}
      <div className="flex">
        <InfoTitle text={"Access"} color="text-black" />
      </div>
      <div className="grid grid-flow-col grid-rows-3 gap-1 pb-10 mt-5">
        {permissions?.access.map((item, index) => (
          <div className="flex justify-between mb-2 w-60" key={index}>
            <InfoSubTitle text={item?.name} />
            <Toggle
              isChecked={item.isSelected}
              onToggle={() => togglePermission("access", index)}
            />
          </div>
        ))}
      </div>

      {/* Third Row */}
      <div className="flex">
        <InfoTitle text={"Permissions"} color="text-black" />
      </div>
      <div className="grid grid-flow-col grid-rows-3 gap-1 mt-5 pb-10">
        {permissions?.permissions.map((item, index) => (
          <div className="flex justify-between mb-2 w-60" key={index}>
            <InfoSubTitle text={item?.name} />
            <Toggle
              isChecked={item.isSelected}
              onToggle={() => togglePermission("access", index)}
            />
          </div>
        ))}
      </div>
      {/* Fourth Row */}
      <div className="flex">
        <InfoTitle text={"Notifications"} color="text-black" />
      </div>
      <div className="grid grid-flow-col grid-rows-3 gap-1 mt-5">
        {permissions?.notifications.map((item, index) => (
          <div className="flex justify-between mb-2 w-60" key={index}>
            <InfoSubTitle text={item?.name} />
            <Toggle
              isChecked={item.isSelected}
              onToggle={() => togglePermission("access", index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSettings;
