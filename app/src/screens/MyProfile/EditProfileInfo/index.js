import React, { useState, useEffect } from "react";
import Toggle from "../../../components/ToggleSwitch";

import InfoTitle from "../../../components/Headers/InfoTitle";
import InfoSubTitle from "../../../components/Headers/InfoSubTitle";
import InfoData from "../../../components/Headers/InfoData";
import InfoBox from "../../../components/InfoCards/InfoBox";
import Button from "../../../components/Button";
import ChangePasswordModal from "../../../components/Modals/ChangePassword";
import ChangeNotificationsModal from "../ChangeNotificationsModal";
import { userTimezone } from "../../../apolloql/timezone";

const EditProfileInfo = ({ user, refetch, isMyProfile }) => {
  let subtitle;

  const [open, setIsOpen] = React.useState(false);

  const [isTextNotifications, setIsTextNotifications] = React.useState(false);
  const [isEmailNotifications, setIsEmailNotifications] = React.useState(false);
  const [isAppNotifications, setIsAppNotifications] = React.useState(false);

  useEffect(() => {
    const permissions = user?.permissions
      ? JSON.parse(user?.permissions)
      : null;

    if (permissions) {
      setIsTextNotifications(
        permissions?.notifications.find((obj) => obj?.name === "Text Message")
          .isSelected
      );
      setIsEmailNotifications(
        permissions?.notifications.find((obj) => obj?.name === "Email")
          .isSelected
      );
      setIsAppNotifications(
        permissions?.notifications.find(
          (obj) => obj?.name === "In App Notifications"
        ).isSelected
      );
    }
  }, [user]);

  function openModal() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  const [openNotification, setIsOpenNotification] = React.useState(false);

  function openModalNotification() {
    setIsOpenNotification(true);
  }

  function onCloseNotification() {
    setIsOpenNotification(false);
  }

  return (
    <div className="min-h-max px-3 mt-3 pb-3 bg-white">
      {/* {showChangePasswordModal && <ChangePasswordModal />} */}
      {/* <ChangePasswordModal open={open} onCl /> */}
      {/* TODO: needs a fix ask Hamza */}
      <ChangePasswordModal open={open} onClose={onClose} />
      <ChangeNotificationsModal
        refetch={refetch}
        user={user}
        open={openNotification}
        onClose={onCloseNotification}
      />
      <div className="flex flex-row ">
        <div className="flex flex-col text-left w-1/3 align  p-4">
          <InfoTitle text={"Account Information"} />

          <div className="flex flex-wrap">
            <InfoBox>
              <InfoSubTitle text={"First Name"} />
              <InfoData text={user?.firstName} />
            </InfoBox>
            <InfoBox>
              <InfoSubTitle text={"Last Name"} />
              <InfoData text={user?.lastName} />
            </InfoBox>
            <div className="flex flex-col">
              <InfoBox>
                <InfoSubTitle text={"Email"} />
                <InfoData text={user?.email} />
              </InfoBox>

              <InfoBox>
                <InfoSubTitle text={"Phone"} />
                <InfoData text={user?.phoneNumber} />
              </InfoBox>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-left w-1/3 align  p-4">
          <InfoTitle text={"Address"} />

          <div className="flex flex-wrap">
            <InfoBox>
              <InfoSubTitle text={"Country"} />
              <InfoData text={user?.country} />
            </InfoBox>
            <InfoBox>
              <InfoSubTitle text={"City"} />
              <InfoData text={user?.city} />
            </InfoBox>
            <InfoBox>
              {" "}
              <InfoSubTitle text={"State"} />
              <InfoData text={user?.state} />
            </InfoBox>
            <InfoBox>
              {" "}
              <InfoSubTitle text={"Zip"} />
              <InfoData text={user?.zip} />
            </InfoBox>
          </div>
        </div>
        <div className="flex flex-col text-left w-1/3 align  p-4">
          <InfoTitle text={"General"} />

          <div className="flex flex-col">
            <InfoBox>
              <InfoSubTitle text={"Time Zone"} />
              <InfoData text={userTimezone} />
            </InfoBox>
            <InfoBox>
              <InfoSubTitle text={"Language"} />
              <InfoData text={user?.language} />
            </InfoBox>
          </div>
        </div>
      </div>
      <div className="my-2" />
      {isMyProfile ? (
        <div className="flex flex-row ">
          <div className="flex flex-col text-left w-1/3 align gap-3 p-4">
            <InfoTitle text={"Security"} />

            <div className="flex flex-row gap-5 items-center">
              {/* <div className="flex flex-col gap-0">
              <p style={{ fontSize: "14px" }}>Account Password</p>
            </div> */}
              <div className="flex flex-col gap-5">
                <Button
                  // onClick={() => setShowChangePasswordModal(true)}
                  onClick={openModal}
                  children={"CHANGE PASSWORD"}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {isMyProfile ? (
        <div className="flex flex-row ">
          <div className="flex flex-col text-left w-1/3 align gap-3 p-4">
            <InfoTitle text={"Notifications"} />

            <div className="flex flex-row gap-5 items-center">
              <div className="flex flex-col w-1/2 gap-0  space-y-2">
                <p className="text-xxs text-gray-500">
                  {`* Enabling notifications on CareCrew keeps you promptly
                  informed about shift assignments, schedule changes, and
                  security alerts. Stay updated and empowered for a smoother
                  work experience.`.replace("CareCrew", "CareCrew")}
                </p>
                <div className="flex flex-row justify-between">
                  <p className="text-xs">Text Message</p>
                  <p
                    className={`text-xs font-semibold text-${
                      isTextNotifications ? "green" : "red-500"
                    }`}
                  >
                    {isTextNotifications ? "Enabled" : "Disabled"}
                  </p>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-xs">Email</p>
                  <p
                    className={`text-xs font-semibold text-${
                      isEmailNotifications ? "green" : "red-500"
                    }`}
                  >
                    {isEmailNotifications ? "Enabled" : "Disabled"}
                  </p>
                </div>
                {/* <div className="flex flex-row justify-between">
                <p className="text-xs">In-App Message</p>
                <p
                  className={`text-xs font-semibold text-${
                    isAppNotifications ? "green" : "red-500"
                  }`}
                >
                  {isAppNotifications ? "Enabled" : "Disabled"}
                </p>
              </div> */}
              </div>
              <div className="flex flex-col gap-5 self-end">
                <Button
                  // onClick={() => setShowChangePasswordModal(true)}
                  onClick={openModalNotification}
                  children={"CHANGE"}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditProfileInfo;
