import React, { useState } from "react";
import { SuccessToast, ErrorToast } from "../../services/micro";
import { useFacilityOperations } from "../AddFacility/hooks";
// import { useFacilityOperations } from "../../hooks/useFacilityOperations";

const BulkAddUsersModal = ({ open, onClose, refetchPeople, facilityId }) => {
  const { createAdhocUsers } = useFacilityOperations();

  const [bulkUsers, setBulkUsers] = useState([
    { firstName: "", lastName: "", email: "" },
  ]);
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  // const isEmailValid = (email) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);

  function isEmailValid(val) {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
      return "Invalid Email";
    } else {
      return true;
    }
  }

  const handleAddRow = () => {
    setBulkUsers((prev) => [
      ...prev,
      { firstName: "", lastName: "", email: "" },
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
    console.log("bulkUsers", bulkUsers);
    const newErrors = {};
    bulkUsers.forEach((user, index) => {
      if (!user.firstName || !user.lastName || !user.email) {
        newErrors[index] = "All fields (first, last, email) are required.";
      } else if (!isEmailValid(user.email)) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow max-w-xl w-full mx-4 relative">
        {!showConfirmation ? (
          <>
            <h2 className="text-xl font-bold mb-4">Bulk Add Users</h2>
            <div className="flex flex-col space-y-4">
              {bulkUsers.map((user, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="First Name"
                      className={`border border-gray-300 p-2 rounded w-1/3 ${
                        errors[index] ? "border-red-500" : ""
                      }`}
                      value={user.firstName}
                      onChange={(e) =>
                        handleChange(index, "firstName", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className={`border border-gray-300 p-2 rounded w-1/3 ${
                        errors[index] ? "border-red-500" : ""
                      }`}
                      value={user.lastName}
                      onChange={(e) =>
                        handleChange(index, "lastName", e.target.value)
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className={`border border-gray-300 p-2 rounded w-1/3 ${
                        errors[index] ? "border-red-500" : ""
                      }`}
                      value={user.email}
                      onChange={(e) =>
                        handleChange(index, "email", e.target.value)
                      }
                    />
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
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleSaveClick}
              >
                Save
              </button>
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
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setShowConfirmation(false)}
              >
                Back
              </button>
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleConfirmCreate}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkAddUsersModal;
