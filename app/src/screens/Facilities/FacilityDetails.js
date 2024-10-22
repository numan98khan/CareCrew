import React, { useState } from "react";
import Toggle from "../../components/ToggleSwitch";
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

  const [isEmailNotifications, setIsEmailNotifications] = useState(true);

  return (
    <div className="min-h-max p-4 mt-3 pb-3 bg-white flex lg:flex-row flex-col">
      {/* Avatar section */}
      <div className="w-full lg:w-1/3 flex justify-center lg:justify-start items-start">
        <Avatar isSquared={true} isCover={true} alt={facility?.facilityName} />
      </div>

      {/* Facility details section */}
      <div className="w-full lg:w-2/3 mt-4 lg:mt-0 lg:ml-6">
        <div className="flex flex-col h-full justify-between">
          {/* Facility Name and ID */}
          <div className="flex justify-between">
            <label className="text-lg font-bold">{facility.facilityName}</label>
            <div className="flex items-center">
              <span className="mr-2 text-xs font-bold">Facility ID:</span>
              <span className="text-xs font-bold">{facility?.id}</span>
              <CopyToClipboard text={facility?.id} onCopy={handleCopy}>
                <div className="cursor-pointer ml-2">
                  <ClipboardIcon />
                </div>
              </CopyToClipboard>
            </div>
          </div>

          {/* About Facility */}
          <div className="my-2">
            <label className="text-sm text-left leading-5">
              {facility.aboutFacility}
            </label>
          </div>

          {/* Address Info */}
          <div className="my-2">
            <InfoTitle text={"Address"} />
            <div className="flex flex-wrap gap-4">
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
                <InfoSubTitle text={"State"} />
                <InfoData text={facility?.state} />
              </InfoBox>
              <InfoBox isDynamic>
                <InfoSubTitle text={"Zip"} />
                <InfoData text={facility?.zip} />
              </InfoBox>
            </div>
          </div>

          {/* Contact Info */}
          <div className="my-2">
            <InfoTitle text={"Contact Info"} />
            <div className="flex flex-wrap gap-4">
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

          {/* Action Buttons */}
          <div className="my-4 flex flex-wrap gap-4">
            {type === EMPLOYEE ? (
              <Button children={"REQUEST"} onClick={openModal} />
            ) : (
              <Button children={"EDIT"} onClick={editAction} />
            )}
            <Button
              children={"MESSAGE"}
              onClick={() => {
                navigate("/messaging", {
                  state: facility?.FacilityPeople?.items[0]?.people,
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* Requests Modal */}
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
