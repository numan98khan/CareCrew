import React, { useState, useEffect } from "react";

import PageHeader from "../../components/Headers/PageHeader";
import Button from "../../components/Button";

import { ErrorToast, SuccessToast } from "../../services/micro";

import DropDown from "../../components/DropDown";
import Input from "../../components/Input";

import { useListReasons } from "../../apolloql/reasons";

import { useCreateSupport } from "../../apolloql/support";
import { useAuth } from "../../context";
import { ADMIN, EMPLOYEE, FACILITY } from "../../constants/userTypes";

function Support() {
  // const navigate = useNavigate();
  const { personalData, type, myFacility } = useAuth();

  const { loading, error, reasons } = useListReasons();

  const { createTicket } = useCreateSupport();

  const [reaason, setReason] = useState(null);

  const [support, setSupport] = useState({
    details: "",
    reasonID: "",
  });

  // Update a single key in the people object
  const setSupportKey = (key) => (newValue) =>
    setSupport((prevSupport) => ({ ...prevSupport, [key]: newValue }));

  const publishSupport = async () => {
    if (!isValidForm()) {
      return;
    }

    try {
      await createTicket(
        support,
        personalData?.firstName + " " + personalData?.lastName,
        type === ADMIN
          ? "InstaCare"
          : type === FACILITY
          ? myFacility?.facilityName
          : type === EMPLOYEE
          ? personalData?.firstName + " " + personalData?.lastName
          : null
      );
      SuccessToast("Support ticket created");

      // Reset
      setSupport({
        details: "",
        reasonID: "",
      });
    } catch (error) {
      console.error(error);
      ErrorToast(
        "An error occurred while creating/updating the support ticket"
      );
    }
  };

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const publishAnonymousSupport = async () => {
    if (!isValidForm()) {
      return;
    }
    try {
      await createTicket(
        support,
        firstName + " " + lastName + ` (${email})`,
        type === ADMIN
          ? "InstaCare"
          : type === FACILITY
          ? myFacility?.facilityName
          : type === EMPLOYEE
          ? personalData?.firstName + " " + personalData?.lastName
          : "External"
      );
      SuccessToast("Support ticket created");

      // Reset the form fields
      setSupport({
        details: "",
        reasonID: "",
      });
      setFirstName(null);
      setLastName(null);
      setEmail(null);
    } catch (error) {
      console.error(error);
      ErrorToast(
        "An error occurred while creating/updating the support ticket"
      );
    }
  };

  const isValidForm = () => {
    if (type) {
      // For authenticated users
      if (!support.details.trim() || !support.reasonID) {
        ErrorToast("Please fill in all required fields");
        return false;
      }
    } else {
      // For anonymous users
      if (
        !support.details.trim() ||
        !support.reasonID ||
        !firstName ||
        !lastName ||
        !email
      ) {
        ErrorToast("Please fill in all required fields");
        return false;
      }
      // Add email format validation, if needed
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!email.match(emailRegex)) {
        ErrorToast("Please provide a valid email");
        return false;
      }
    }
    return true;
  };

  return (
    <div className="flex flex-col min-h-max px-3 pb-3">
      {type ? (
        <div className="flex flex-col">
          <div className="flex py-1 justify-between">
            <div className="flex items-center">
              <PageHeader text={"Support"} />
            </div>
          </div>

          <div className="h-full bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between">
            <div className="flex flex-col p-4 space-y-4 h-full justify-between">
              {/* First Row */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="text-xs text-start font-bold">
                    {"Reason"}
                  </label>
                  <div className="my-1" />
                  <DropDown
                    placeholder={"Select Reason"}
                    value={support?.reasonID || null}
                    setValue={setSupportKey("reasonID")}
                    options={reasons.map((obj) => obj.id)}
                    labels={reasons.map((obj) => obj.reason)}
                    label={
                      reasons.find((obj) => obj.id === support?.reasonID)
                        ?.reason
                    }
                  />
                </div>
              </div>
              {/* Second Row */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="text-xs text-start font-bold">Notes</label>

                  <div className="my-1" />
                  <Input
                    multiline
                    placeholder={"Notes"}
                    value={support.details}
                    setValue={setSupportKey("details")}
                  />
                  {/* <textarea className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2"></textarea> */}
                </div>
              </div>
              {/* Third Row */}
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col">
                  <Button
                    children={"SUBMIT"}
                    onClick={() => {
                      publishSupport();
                    }}
                  />
                  {/* <textarea className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2"></textarea> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between">
          <div className="flex flex-col p-4 space-y-4 h-full justify-between">
            {/* First Row */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">
                  {"Reason"}
                </label>
                <div className="my-1" />
                <DropDown
                  placeholder={"Select Reason"}
                  value={support?.reasonID}
                  setValue={setSupportKey("reasonID")}
                  options={reasons.map((obj) => obj.id)}
                  labels={reasons.map((obj) => obj.reason)}
                  label={
                    reasons.find((obj) => obj.id === support?.reasonID)?.reason
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">
                  Your Name
                </label>

                <div className="my-1" />
                <div className="flex flex-row">
                  <Input
                    placeholder={"First Name"}
                    value={firstName}
                    setValue={setFirstName}
                  />
                  <div className="mx-1" />
                  <Input
                    placeholder={"Last Name"}
                    value={lastName}
                    setValue={setLastName}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">
                  Your E-mail
                </label>

                <div className="my-1" />
                <Input
                  // multiline
                  placeholder={"Email"}
                  value={email}
                  setValue={setEmail}
                />
                {/* <textarea className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2"></textarea> */}
              </div>
            </div>
            {/* Second Row */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-xs text-start font-bold">Notes</label>

                <div className="my-1" />
                <Input
                  multiline
                  placeholder={"Notes"}
                  value={support.details}
                  setValue={setSupportKey("details")}
                />
                {/* <textarea className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2"></textarea> */}
              </div>
            </div>
            {/* Third Row */}
            <div className="grid grid-cols-4 gap-2">
              <div className="flex flex-col">
                <Button
                  children={"SUBMIT"}
                  onClick={() => {
                    publishAnonymousSupport();
                  }}
                />
                {/* <textarea className="rounded-full bg-TEXT_FIELD_BACKGROUND p-2"></textarea> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;
