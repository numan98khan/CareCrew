import React, { useState } from "react";
import Toggle from "../../../components/ToggleSwitch";

import InfoTitle from "../../../components/Headers/InfoTitle";
import InfoSubTitle from "../../../components/Headers/InfoSubTitle";
import InfoData from "../../../components/Headers/InfoData";
import InfoBox from "../../../components/InfoCards/InfoBox";
import { ADMIN } from "../../../constants/userTypes";
import { hasPermission } from "../../../services/micro";

const AccountInfo = ({ people, type }) => {
  const isEmailNotifications = hasPermission(people, "Email");
  const isTextNotifications = hasPermission(people, "Text Message");

  return (
    <>
      {people?.id && (
        <div className="min-h-max px-3 mt-3 pb-3 bg-white">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col text-left w-full md:w-1/3 p-2 md:p-4">
              <InfoTitle text={"Account Information"} />

              <div className="flex flex-wrap">
                <InfoBox>
                  <InfoSubTitle text={"First Name"} />
                  <InfoData text={people.firstName} />
                </InfoBox>
                <InfoBox>
                  <InfoSubTitle text={"Last Name"} />
                  <InfoData text={people.lastName} />
                </InfoBox>

                <InfoBox>
                  <InfoSubTitle text={"Email"} />
                  <InfoData text={people.email} />
                </InfoBox>

                <InfoBox>
                  <InfoSubTitle text={"Phone"} />
                  <InfoData text={people.phoneNumber} />
                </InfoBox>
              </div>
            </div>

            {type === ADMIN && (
              <div className="flex flex-col text-left w-full md:w-1/3 p-2 md:p-4">
                <InfoTitle text={"Address"} />

                <div className="flex flex-wrap">
                  {people?.streetAddress && (
                    <InfoBox>
                      <InfoSubTitle text={"Street Address"} />
                      <InfoData text={people?.streetAddress} />
                    </InfoBox>
                  )}
                  <InfoBox>
                    <InfoSubTitle text={"Country"} />
                    <InfoData text={people?.country} />
                  </InfoBox>
                  <InfoBox>
                    <InfoSubTitle text={"City"} />
                    <InfoData text={people?.city} />
                  </InfoBox>
                  <InfoBox>
                    <InfoSubTitle text={"State"} />
                    <InfoData text={people?.state} />
                  </InfoBox>
                  <InfoBox>
                    <InfoSubTitle text={"Zip"} />
                    <InfoData text={people?.zip} />
                  </InfoBox>
                </div>
              </div>
            )}

            <div className="flex flex-col text-left w-full md:w-1/3 p-2 md:p-4">
              <InfoTitle text={"General"} />

              <div className="flex flex-wrap">
                <InfoBox>
                  <InfoSubTitle text={"Time Zone"} />
                  <InfoData text={people?.timezone} />
                </InfoBox>
                <InfoBox>
                  <InfoSubTitle text={"Language"} />
                  <InfoData text={people?.language} />
                </InfoBox>
              </div>
            </div>
          </div>

          {type === ADMIN && (
            <>
              <div className="my-2" />
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col text-left w-full md:w-1/3 p-2 md:p-4">
                  <InfoTitle text={"Notifications"} />

                  <div className="flex flex-wrap">
                    <div className="flex w-full justify-between py-1">
                      <InfoSubTitle text={"Send Email Notifications"} />
                      <label
                        className={`${
                          isEmailNotifications
                            ? "text-green-500"
                            : "text-red-500"
                        } text-xs font-bold`}
                      >
                        {isEmailNotifications ? "YES" : "NO"}
                      </label>
                    </div>
                    <div className="flex w-full justify-between py-1">
                      <InfoSubTitle text={"Send Text Notification"} />
                      <label
                        className={`${
                          isTextNotifications
                            ? "text-green-500"
                            : "text-red-500"
                        } text-xs font-bold`}
                      >
                        {isTextNotifications ? "YES" : "NO"}
                      </label>
                    </div>
                  </div>

                  <div className="my-2" />
                  <InfoTitle text={"Security"} />

                  <div className="flex flex-wrap">
                    <div className="flex flex-col flex-grow">
                      <InfoSubTitle text={"First Name"} />
                      <InfoData text={people.firstName} />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <InfoSubTitle text={"Last Name"} />
                      <InfoData text={people.lastName} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col text-left w-full md:w-1/3 p-2 md:p-4">
                  <InfoTitle text={"Basic Information"} />

                  <div className="flex flex-wrap">
                    {people.effectiveStartDate && (
                      <InfoBox>
                        <InfoSubTitle text={"Effective Start Date"} />
                        <InfoData text={people.effectiveStartDate} />
                      </InfoBox>
                    )}
                    {people.driverLicenseNumber && (
                      <InfoBox>
                        <InfoSubTitle text={"Driver License Number"} />
                        <InfoData text={people.driverLicenseNumber} />
                      </InfoBox>
                    )}
                    {people.driverLicenseState && (
                      <InfoBox>
                        <InfoSubTitle text={"Driver License State"} />
                        <InfoData text={people.driverLicenseState} />
                      </InfoBox>
                    )}
                    {people.SSN && (
                      <InfoBox>
                        <InfoSubTitle text={"SSN/TaxID"} />
                        <InfoData text={people.SSN} />
                      </InfoBox>
                    )}
                    {people.uniformSize && (
                      <InfoBox>
                        <InfoSubTitle text={"Uniform Size"} />
                        <InfoData text={people.uniformSize} />
                      </InfoBox>
                    )}
                    <div className="flex w-full justify-between py-1">
                      <InfoSubTitle text={"Completed Drug Screening"} />
                      <label className="text-red-500 text-xs font-bold">
                        OFF
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col text-left w-full md:w-1/3 p-2 md:p-4">
                  <InfoTitle text={"Emergency Contact Information"} />

                  <div className="flex flex-wrap">
                    {people.emergencyContactName && (
                      <InfoBox>
                        <InfoSubTitle text={"Emergency Contact Name"} />
                        <InfoData text={people.emergencyContactName} />
                      </InfoBox>
                    )}
                    {people.emergencyContactNumber && (
                      <InfoBox>
                        <InfoSubTitle text={"Emergency Contact Number"} />
                        <InfoData text={people.emergencyContactNumber} />
                      </InfoBox>
                    )}
                    {people.emergencyContactRelationship && (
                      <InfoBox>
                        <InfoSubTitle text={"Emergency Contact Relationship"} />
                        <InfoData text={people.emergencyContactRelationship} />
                      </InfoBox>
                    )}
                    {people.milesToWork && (
                      <InfoBox>
                        <InfoSubTitle
                          text={"How many miles you willing to travel to work?"}
                        />
                        <InfoData text={people.milesToWork} />
                      </InfoBox>
                    )}
                    {people.licenseCode && (
                      <InfoBox>
                        <InfoSubTitle text={"RN/LPN/CNA License Number"} />
                        <InfoData text={people.licenseCode} />
                      </InfoBox>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col text-left w-full md:w-1/3 p-2 md:p-4">
              <InfoTitle text={"Personal Note"} />
              <div className="flex flex-col flex-grow">
                <InfoSubTitle text={"Notes"} />
                <InfoData text={people.personalNote} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountInfo;
