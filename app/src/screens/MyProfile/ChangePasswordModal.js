import React, { useState } from "react";
import { Auth } from "aws-amplify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(currentUser, oldPassword, newPassword);

      alert("Password changed successfully");
      // You might want to navigate the user to another page here
    } catch (error) {
      alert("Error changing password: ", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New password and Confirm password must match");
      return;
    }

    handleChangePassword();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div>
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePassword;
