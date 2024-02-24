import React, { useState } from "react";
import Modal from "react-modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { ErrorToast, SuccessToast } from "../../../services/micro";
import { Auth } from "aws-amplify";

function ChangePasswordModal({ open, onClose, afterOpenModal }) {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

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

  const handleChangePassword = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      console.log(
        "🚀 ~ file: index.js:35 ~ handleChangePassword ~ currentUser:",
        currentUser
      );

      await Auth.changePassword(currentUser, oldPassword, newPassword);

      // alert("Password changed successfully");
      SuccessToast("Password changed successfully");
      // You might want to navigate the user to another page here
    } catch (error) {
      console.log("Error changing password: ", error);
      ErrorToast(error.message);
      // ErrorToast("Please enter a valid password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      // alert("New password and Confirm password must match");
      ErrorToast("New password and Confirm password must match");
      return;
    }

    if (!oldPassword) {
      ErrorToast("Old password cannot be empty");
      return;
    }

    if (!newPassword) {
      ErrorToast("New password cannot be empty");
      return;
    }

    if (!confirmPassword) {
      ErrorToast("New confirm password cannot be empty");
      return;
    }

    handleChangePassword();
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
            Change Password
          </p>
          <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
            <Input
              placeholder={"Old Password"}
              value={oldPassword}
              setValue={setOldPassword}
            />
            <Input
              placeholder={"New Password"}
              value={newPassword}
              setValue={setNewPassword}
            />
            <Input
              placeholder={"Confirm Password"}
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
            <Button children={"UPDATE"} onClick={handleSubmit} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ChangePasswordModal;
