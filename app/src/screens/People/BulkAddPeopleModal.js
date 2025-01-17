import React, { useState } from "react";
import { SuccessToast, ErrorToast } from "../../services/micro";
import { useFacilityOperations } from "../AddFacility/hooks";
// import { useFacilityOperations } from "../../hooks/useFacilityOperations";
// import DropDown from "../components/DropDown";
// import Input from "../components/Input";
// import Button from "../components/Button";

import IconButton from "../../components/Button/IconButton";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";

import Button from "../../components/Button/index";
import themeStyles from "../../styles/theme.styles";
import { Roles } from "../../constants/roles";

// import themeStyles from "../themeStyles";

const BulkAddUsersModal = ({ open, onClose, refetchPeople, facilityId }) => {
  const { createAdhocUsers } = useFacilityOperations();

  const [bulkUsers, setBulkUsers] = useState([
    { firstName: "", lastName: "", email: "", role: "", numOfPositions: "" },
  ]);
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddRow = () => {
    setBulkUsers((prev) => [
      ...prev,
      { firstName: "", lastName: "", email: "", role: "", numOfPositions: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    setBulkUsers((prev) => prev.filter((_, i) => i !== index));
    setErrors((prevErrors) => {
      const { [index]: _, ...rest } = prevErrors;
      return rest;
    });
  };

  const handleChange = (index, field, value) => {
    setBulkUsers((prev) =>
      prev.map((user, i) => (i === index ? { ...user, [field]: value } : user))
    );
    setErrors((prev) => ({ ...prev, [index]: "" }));
  };

  const validateBulkUsers = () => {
    const newErrors = {};
    bulkUsers.forEach((user, index) => {
      if (
        !user.firstName ||
        !user.lastName ||
        !user.email ||
        !user.role ||
        !user.numOfPositions
      ) {
        newErrors[index] =
          "All fields (first, last, email, role, positions) are required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        newErrors[index] = "Please enter a valid email address.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = () => {
    if (validateBulkUsers()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmCreate = async () => {
    try {
      await createAdhocUsers(bulkUsers, facilityId);
      SuccessToast("Successfully added users in bulk");
      refetchPeople();
      onClose();
    } catch (error) {
      console.error("Error creating users in bulk:", error);
      ErrorToast("Failed to add users: " + error.message);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
      onClick={onClose} // Close the modal when clicking the overlay
    >
      <div className="bg-white p-6 rounded-[20px] shadow max-w-4xl w-full mx-4 relative">
        {!showConfirmation ? (
          <>
            <h2 className="text-xl font-bold mb-4">Bulk Add Users</h2>
            <div className="flex flex-col space-y-4">
              {bulkUsers.map((user, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={user.firstName}
                      setValue={(value) =>
                        handleChange(index, "firstName", value)
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={user.lastName}
                      setValue={(value) =>
                        handleChange(index, "lastName", value)
                      }
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={user.email}
                      setValue={(value) => handleChange(index, "email", value)}
                    />

                    <div className="w-[40%]">
                      <DropDown
                        placeholder={"Select Role"}
                        value={user.role} // Ensure this is a string
                        setValue={(value) => handleChange(index, "role", value)} // Pass selected string value
                        options={Roles} // Directly pass the array of roles
                      />
                    </div>

                    {bulkUsers.length > 1 && (
                      <button
                        type="button"
                        className="text-red-600 font-bold px-2"
                        onClick={() => handleRemoveRow(index)}
                      >
                        X
                      </button>
                    )}
                  </div>

                  {errors[index] && (
                    <p className="text-red-500 text-sm">{errors[index]}</p>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="border border-gray-400 px-2 py-1 rounded text-sm text-gray-700 hover:bg-gray-100 self-start"
                onClick={handleAddRow}
              >
                + Add Another
              </button>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                children={"SAVE"}
                onClick={handleSaveClick}
                color={themeStyles.BLUE}
              />
              <Button
                children={"CANCEL"}
                onClick={onClose}
                color={themeStyles.GRAY}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-4">Confirm Creation</h2>
            <p className="mb-6">
              You are about to create {bulkUsers.length} user
              {bulkUsers.length > 1 && "s"}. Proceed?
            </p>
            <div className="flex justify-end space-x-4 w-full">
              <Button
                children={"BACK"}
                onClick={() => setShowConfirmation(false)}
                color={themeStyles.GRAY}
              />
              <Button
                children={"CONFIRM"}
                onClick={handleConfirmCreate}
                color={themeStyles.BLUE}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkAddUsersModal;
