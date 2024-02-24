import React, { useState } from "react";
import Toggle from "../../components/ToggleSwitch";

// import InfoTitle from "../../components";
import themeStyles from "../../styles/theme.styles";

import ClipboardIcon from "../../assets/icons/clipboardIcon";

import InfoTitle from "../../components/Headers/InfoTitle";
import InfoSubTitle from "../../components/Headers/InfoSubTitle";
import InfoData from "../../components/Headers/InfoData";
import InfoBox from "../../components/InfoCards/InfoBox";
import Button from "../../components/Button";
import { useAuth } from "../../context";
import { EMPLOYEE } from "../../constants/userTypes";
import { useNavigate } from "react-router-dom";
import RequestsModal from "./RequestsModal";
import Avatar from "../../components/Avatar";
import CopyToClipboard from "react-copy-to-clipboard";
import { SuccessToast } from "../../services/micro";

const FacilityDetails = ({ facility, editAction }) => {
  // console.log(
  //   "🚀 ~ file: FacilityDetails.js:17 ~ FacilityDetails ~ facility:",
  //   facility

  // );

  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000); // Reset the "copied" state after 3 seconds
    SuccessToast("ID Copied.");
  };

  const { type } = useAuth();
  const navigate = useNavigate();

  const [requestsModalIsOpen, setRequestsModalIsOpen] = useState(false);
  const openModal = () => {
    setRequestsModalIsOpen(true);
  };

  const closeModal = () => {
    setRequestsModalIsOpen(false);
  };
  // console.log(facility);
  const [isEmailNotifications, setIsEmailNotifications] = useState(true);
  return (
    <div className="min-h-max p-4 mt-3 pb-3 bg-white flex">
      <div className="flex w-full items-start" style={{ width: "45%" }}>
        <Avatar isSquared={true} isCover={true} alt={facility?.facilityName} />
      </div>
      <div className="mx-3" />
      <div style={{ width: "55%" }}>
        <div className="flex flex-col h-full justify-between">
          <div className="flex">
            <label className="text-lg font-bold">{facility.facilityName}</label>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="flex mr-1 font-normal items-center text-xs text-PRIMARY_COLOR">
              Facility ID:{" "}
              <span className="ml-2" style={{ fontWeight: "bolder" }}>
                {" "}
                {facility?.id}
              </span>
            </div>
            <CopyToClipboard text={facility?.id} onCopy={handleCopy}>
              <div className="cursor-pointer">
                <ClipboardIcon />
              </div>
            </CopyToClipboard>
          </div>
          <div className="my-1" />
          <div className="flex">
            <label className="text-xs text-left leading-5">
              {facility.aboutFacility}
            </label>
          </div>
          <div className="my-1" />
          <div>
            <div className="flex flex-col text-left align  ">
              <InfoTitle text={"Address"} />

              <div className="flex flex-wrap">
                <InfoBox isDynamic>
                  <InfoSubTitle text={"Country"} />
                  <InfoData text={facility?.country} />
                </InfoBox>
                <InfoBox isDynamic>
                  <InfoSubTitle text={"Street Address"} />
                  <InfoData text={facility?.streetAddress} />
                </InfoBox>
                <InfoBox isDynamic>
                  <InfoSubTitle text={"City"} />
                  <InfoData text={facility?.city} />
                </InfoBox>
                <InfoBox isDynamic>
                  {" "}
                  <InfoSubTitle text={"State"} />
                  <InfoData text={facility?.state} />
                </InfoBox>
                <InfoBox isDynamic>
                  {" "}
                  <InfoSubTitle text={"Zip"} />
                  <InfoData text={facility?.zip} />
                </InfoBox>
              </div>
            </div>

            <div className="my-1" />

            <div className="flex flex-col text-left align ">
              <InfoTitle text={"Contact Info"} />

              <div className="flex">
                <InfoBox isDynamic>
                  <InfoSubTitle text={"First Name"} />
                  <InfoData text={facility.contacts[0].firstName} />
                </InfoBox>
                <InfoBox isDynamic>
                  <InfoSubTitle text={"Last Name"} />
                  <InfoData text={facility.contacts[0].lastName} />
                </InfoBox>

                <InfoBox isDynamic>
                  <InfoSubTitle text={"Email"} />
                  <InfoData text={facility.contacts[0]?.email} />
                </InfoBox>

                <InfoBox isDynamic>
                  <InfoSubTitle text={"Phone"} />
                  <InfoData text={facility.contacts[0].phone} />
                </InfoBox>
              </div>
            </div>
          </div>

          <div className="my-3" />
          <div className="flex ">
            <div className="flex flex-row text-left align space-x-2 ">
              {type === EMPLOYEE ? (
                <>
                  <Button children={"REQUEST"} onClick={openModal} />
                </>
              ) : (
                <>
                  <Button children={"EDIT"} onClick={editAction} />
                </>
              )}
              <Button
                children={"MESSAGE"}
                onClick={() => {
                  navigate("/messaging", {
                    state: facility?.FacilityPeople?.items[0]?.people,
                  });
                }}
              />
              {/* <Button children={"CANCEL"} color={themeStyles.GRAY} /> */}
            </div>
            {/* <InfoTitle text={"General"} />

            <div className="flex flex-wrap">
              <InfoBox isDynamic>
                <InfoSubTitle text={"Time Zone"} />
                <InfoData text={"people?.timezone"} />
              </InfoBox>
              <InfoBox isDynamic>
                <InfoSubTitle text={"Language"} />
                <InfoData text={"people?.language"} />
              </InfoBox>
            </div> */}
          </div>
        </div>
      </div>
      <RequestsModal
        facility={facility}
        focalPerson={facility?.FacilityPeople?.items[0]?.people}
        modalIsOpen={requestsModalIsOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default FacilityDetails;
