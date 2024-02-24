import React, { useState, useRef } from "react";

import FileIcon from "../../assets/icons/file";

import Image from "../../assets/icons/image";
import Camera from "../../assets/icons/camera";
import Toggle from "../../components/ToggleSwitch";
import InfoTitle from "../../components/Headers/InfoTitle";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import Button from "../../components/Button/index";
import InfoSubTitle from "../../components/Headers/InfoSubTitle";

import { countries } from "../../constants/countries";

import { MainHover, ScaleHover } from "../../styles/animations";
import { FACILITY_EMPLOYEE_TYPES } from "../../constants/userTypes";

export const ImageUploader = ({
  handleDivClick,
  imagePlaceholder,
  disableCamera = false,
}) => {
  return (
    <div
      className="flex flex-col w-full h-full rounded-lg border-blue-300 border-dotted border bg-PRIMARY_NEUTRAL_COLOR"
      style={{
        paddingTop: imagePlaceholder ? "0%" : "15%",
        paddingBottom: imagePlaceholder ? "0%" : "15%",
      }}
    >
      {imagePlaceholder ? (
        <img
          onClick={handleDivClick}
          className={`flex-1 ${MainHover}
                    ${true ? "rounded" : "rounded-full"}
                    `}
          src={
            imagePlaceholder
              ? imagePlaceholder
              : "https://randomuser.me/api/portraits/men/20.jpg"
          }
          alt="User avatar"
        />
      ) : (
        <>
          <div className="text-xxs text-grey">
            {"Drop here or Upload cover image"}
          </div>
          <div className="my-2" />
          <div className="flex w-full items-center justify-center">
            <div
              className={`${ScaleHover} py-4 flex flex-col justify-center items-center w-1/4 h-full rounded-3xl border-2 border-blue-300 border-dotted`}
              onClick={handleDivClick}
            >
              <div className="flex flex-col items-center">
                <Image />
                <span className="mt-1">Open Gallery</span>
              </div>
            </div>
            {!disableCamera && (
              <>
                <div className="mx-1" />
                <div
                  className={`${ScaleHover} py-4 flex flex-col justify-center items-center w-1/4 h-full rounded-3xl border-2 border-blue-300 border-dotted`}
                >
                  <div className="flex flex-col items-center">
                    <Camera />
                    <span className="mt-1">Camera</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export const BasicInformationForm = ({
  facility,
  setFacilityKey,
  // fileRef,
  setFileRef,
}) => {
  // console.log("🚀 ~ file: forms.js:78 ~ facility:", facility);
  const fileInput = useRef(null);
  const [filePlaceholder, setFilePlaceholder] = useState(
    facility?.documents?.key
  );
  // const [fileRef, setFileRef] = useState(null);

  const handleDivClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileRef(file);
    if (file) {
      console.log("🚀 ~ file: forms.js:90 ~ handleFileChange ~ file:", file);
      const reader = new FileReader();
      reader.onloadend = function () {
        setFilePlaceholder(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="flex mb-2">
        <InfoTitle text={"Basic Information"} />
      </div>
      <div className="flex flex-row ">
        <div className="flex flex-col w-full ">
          <div className="flex flex-row">
            <Input
              placeholder={"Facility Name"}
              value={facility.facilityName}
              setValue={setFacilityKey("facilityName")}
            />
          </div>

          {/* <div className="my-1" />
          <div className="flex flex-row">
            <Input
              placeholder={"Facility Email"}
              value={facility.email}
              setValue={setFacilityKey("email")}
            />
          </div> */}

          <div className="my-1" />

          <div className="flex flex-row">
            <Input
              placeholder={"About Facility"}
              multiline
              value={facility.aboutFacility}
              setValue={setFacilityKey("aboutFacility")}
            />
          </div>

          <div className="flex flex-row space-x-1">
            <Input
              placeholder={"Facility Guide"}
              value={filePlaceholder}
              // onClick={handleDivClick}
              disabled
            />
            <input
              type="file"
              ref={fileInput}
              style={{ display: "none" }}
              onChange={handleFileChange}
              // accept="image/*" // Add this line
            />
            <div
              onClick={handleDivClick}
              className={`flex felx-col bg-PRIMARY_LIGHT_COLOR rounded-full items-center justify-center ${ScaleHover}`}
            >
              <FileIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddressForm = ({
  facility,
  setFacilityKey,
  setArrayFacilityKey,
}) => {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex mb-2">
        <InfoTitle text={"Address"} />
      </div>
      <div className="flex flex-row ">
        <div className="flex flex-col w-1/2 ">
          <Input
            placeholder={"Street Address"}
            value={facility.streetAddress}
            setValue={setFacilityKey("streetAddress")}
          />
          <div className="my-1" />

          <div className="flex flex-row space-x-2">
            <Input
              placeholder={"State"}
              value={facility.state}
              setValue={setFacilityKey("state")}
            />
            <Input
              placeholder={"City"}
              value={facility.city}
              setValue={setFacilityKey("city")}
            />
          </div>
          <div className="my-1" />

          <div className="flex flex-row space-x-2">
            <Input
              placeholder={"Latitude"}
              value={facility?.lat}
              setValue={setFacilityKey("lat")}
              // type="number"
            />
            <Input
              placeholder={"Longtitude"}
              value={facility?.lng}
              setValue={setFacilityKey("lng")}
              // type="number"
            />
          </div>
        </div>

        <div className="mx-1" />

        <div className="flex flex-col w-1/2">
          {/* {" "} */}
          <div className="flex flex-row">
            <DropDown
              placeholder={"Country"}
              value={facility.country}
              setValue={setFacilityKey("country")}
              options={countries.map((item) => item.label)}
            />
          </div>

          <div className="my-1" />

          <div className="flex flex-row">
            <Input
              placeholder={"Zip"}
              value={facility.zip}
              setValue={setFacilityKey("zip")}
              type="number"
            />
            {/* <div className="mx-1" />
            <Input
              placeholder={"Floor Number"}
              value={facility.floors[0].floorNumber}
              setValue={setArrayFacilityKey("floors", 0, "floorNumber")}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// export const ContactInfoForm = ({
//   facility,
//   setArrayFacilityKey,
//   addContact,
// }) => {
//   return (
//     <div className="flex flex-col w-full ">
//       <div className="flex mb-2">
//         <InfoTitle text={"Contact Info"} />
//       </div>
//       {facility.contacts.map((contact, index) => {
//         return (
//           <div className="flex flex-row my-1 " key={index}>
//             <div className="flex flex-col w-1/2 ">
//               <div className="flex flex-row">
//                 <Input
//                   placeholder={"Contact First Name"}
//                   value={facility.contacts[index].firstName}
//                   setValue={setArrayFacilityKey("contacts", index, "firstName")}
//                 />
//                 <Input
//                   placeholder={"Contact Last Name"}
//                   value={facility.contacts[index].lastName}
//                   setValue={setArrayFacilityKey("contacts", index, "lastName")}
//                 />
//               </div>

//               <div className="my-1" />
//               <div className="flex flex-row">
//                 <DropDown
//                   placeholder={"Position"}
//                   value={facility.contacts[index].position}
//                   setValue={setArrayFacilityKey("contacts", index, "position")}
//                   options={["Employee", "General Manager"]}
//                 />
//               </div>
//             </div>

//             <div className="mx-1" />

//             <div className="flex flex-col w-1/2">
//               <div className="flex flex-row">
//                 <Input
//                   placeholder={"Contact Person Phone"}
//                   value={facility.contacts[index].phone}
//                   setValue={setArrayFacilityKey("contacts", index, "phone")}
//                 />
//               </div>
//               <div className="my-1" />

//               <div className="flex flex-row">
//                 <Input
//                   placeholder={"Email"}
//                   value={facility.contacts[index].email}
//                   setValue={setArrayFacilityKey("contacts", index, "email")}
//                 />
//               </div>
//             </div>
//           </div>
//         );
//       })}

//       <div
//         onClick={addContact}
//         className={`text-left text-PRIMARY_COLOR text-xs font-bold p-2 mt-2 w-full ${MainHover}`}
//       >
//         + Add More Contact Info
//       </div>
//     </div>
//   );
// };

export const ContactInfoForm = ({
  facility,
  setArrayFacilityKey,
  addContact,
  deleteContact, // New prop for deleting a contact
  isEdit,
  isSuperAdmin,
}) => {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex mb-2">
        <InfoTitle text={"Contact Info"} />
      </div>
      {facility.contacts.map((contact, index) => {
        return (
          <div className="flex flex-row my-1 " key={index}>
            <div className="flex flex-col w-1/2 ">
              <div className="flex flex-row">
                <Input
                  placeholder={"Contact First Name"}
                  value={facility.contacts[index].firstName}
                  setValue={setArrayFacilityKey("contacts", index, "firstName")}
                />
                <Input
                  placeholder={"Contact Last Name"}
                  value={facility.contacts[index].lastName}
                  setValue={setArrayFacilityKey("contacts", index, "lastName")}
                />
              </div>

              <div className="my-1" />
              <div className="flex flex-row">
                <DropDown
                  placeholder={"Position"}
                  value={facility.contacts[index].position}
                  setValue={setArrayFacilityKey("contacts", index, "position")}
                  options={FACILITY_EMPLOYEE_TYPES}
                  disabled={index === 0}
                />
              </div>
            </div>

            <div className="mx-1" />

            <div className="flex flex-col w-1/2">
              <div className="flex flex-row">
                <Input
                  placeholder={"Contact Person Phone"}
                  value={facility.contacts[index].phone}
                  setValue={setArrayFacilityKey("contacts", index, "phone")}
                />
              </div>
              <div className="my-1" />

              <div className="flex flex-row">
                <Input
                  placeholder={"Email"}
                  value={facility.contacts[index].email}
                  setValue={setArrayFacilityKey("contacts", index, "email")}
                />
              </div>
            </div>

            {/* Delete Button */}

            {isSuperAdmin && index !== 0 && (
              <button
                onClick={() => deleteContact(contact?.email)}
                className={`ml-2 p-1 text-red-500 hover:bg-red-100 rounded`}
              >
                Delete
              </button>
            )}
          </div>
        );
      })}

      <div
        onClick={addContact}
        className={`text-left text-PRIMARY_COLOR text-xs font-bold p-2 mt-2 w-full ${MainHover}`}
      >
        + Add User
      </div>
    </div>
  );
};

export const PermissionsTab = ({ permissions, togglePermission }) => {
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

      {/* Permissions form disabled by default as AWS compliance demands it */}
      {/* <div className="w-full">
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
      </div> */}
    </div>
  );
};
