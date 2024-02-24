import React, { useState, useEffect } from "react";
import DropDown from "../../components/DropDown";
import { useAdmin } from "../../context";
import Input from "../../components/Input";
import RadioButton from "../../components/Button/RadioButton";
import DatePickerCustom from "../../components/DatePicker";

import { UniqueTypeNamesRule } from "graphql";
import { useListFacilities } from "../../apolloql/facilities";
import { useGetBillingByID, useUpdateBilling } from "../../apolloql/billing";
import Button from "../../components/Button";

function Billing() {
  // const { facilities } = useAdmin();
  const [billingID, setBillingID] = useState(null);

  const { facilities } = useListFacilities();
  const { billing: billingObj, loading } = useGetBillingByID(billingID);
  useEffect(() => {
    setBilling(billingObj);
  }, [billingObj, billingID, loading]);

  const [billing, setBilling] = useState(billingObj);

  const { updateBillingMutation } = useUpdateBilling();

  const handleUpdateBilling = async () => {
    // billingObj
    // try {
    //   const { data } = await updateBillingMutation({
    //     variables: {
    //       input: billing,
    //     },
    //   });
    //   // handle post-update actions (e.g., confirmation messages) here
    // } catch (error) {
    //   console.error("Error updating billing:", error);
    //   // handle error actions (e.g., error messages) here
    // }
  };

  const setBillingKey = (key) => (newValue) =>
    setBilling((prevPeople) => ({ ...prevPeople, [key]: newValue }));

  //   allowOvertime: false,
  // maxBillingMonthly: 25000,
  // hourlyRate: "40",
  // weekendHourlyRate: 45,
  // holidayHourlyRate: 50,
  // maxMonthlyIncentive: 1000,
  // maxHourlyIncentive: 30,
  // maxFixedIncentive: 100,
  // invoiceDelivery: "EMAIL", // Assuming the enum value is "EMAIL"
  // invoiceFrequency: "MONTHLY", // Assuming the enum value is "MONTHLY"
  // topUpPercentage: "30",
  return (
    <div className="p-4">
      {/* First Row */}
      <div className="grid grid-cols-4 gap-4 pb-10">
        <DropDown
          placeholder={"Facilities"}
          value={billing?.facilityID}
          setValue={(selectedFacilityID) => {
            // Here, I'm assuming that the selectedFacilityID corresponds to the billingID.
            // Adjust this logic if the mapping between facilityID and billingID is different.
            setBillingID(
              facilities?.find((obj) => obj.id === selectedFacilityID).Billing
                ?.id
            ); // Update billingID
            setBillingKey("facilityID")(selectedFacilityID); // Update facilityID in the billing state
          }}
          options={facilities?.map((obj) => obj.id)}
          labels={facilities?.map((obj) => obj.facilityName)}
        />
      </div>
      {/* First Row */}
      <div className="grid grid-cols-1 gap-4 pb-10 w-2/3">
        <div className="flex flex-row">
          <div className="flex flex-col w-full mx-1">
            <label className="text-xs text-start font-bold">
              {"Max Billing Monthly"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.maxBillingMonthly}
              setValue={setBillingKey("maxBillingMonthly")}
            />
          </div>
          <div className="flex flex-col w-full  mx-1">
            <label className="text-xs text-start font-bold">
              {"Hourly Rate"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.hourlyRate}
              setValue={setBillingKey("hourlyRate")}
            />
          </div>
          <div className="flex flex-col w-full  mx-1">
            <label className="text-xs text-start font-bold">
              {"Weekend Hourly Rates"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.weekendHourlyRate}
              setValue={setBillingKey("weekendHourlyRate")}
            />
          </div>
          <div className="flex flex-col w-full  mx-1">
            <label className="text-xs text-start font-bold">
              {"Holiday Hourly Rates"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.holidayHourlyRate}
              setValue={setBillingKey("holidayHourlyRate")}
            />
          </div>
          <div className="flex flex-col w-full  mx-1">
            <label className="text-xs text-start font-bold">
              {"Top Up Percentage"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.topUpPercentage}
              setValue={setBillingKey("topUpPercentage")}
            />
          </div>
        </div>
      </div>
      {/* Second Row */}
      <div className="grid grid-cols-1 gap-4 w-2/3 pb-10">
        <div className="flex flex-row">
          <div className="flex flex-col w-full mx-1">
            <label className="text-xs text-start font-bold">
              {"Max Monthly Incentive"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.maxMonthlyIncentive}
              setValue={setBillingKey("maxMonthlyIncentive")}
            />
          </div>
          <div className="flex flex-col w-full mx-1">
            <label className="text-xs text-start font-bold">
              {"Max Monthly Incentive (Per Hour)"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.maxHourlyIncentive}
              setValue={setBillingKey("maxHourlyIncentive")}
            />
          </div>
          <div className="flex flex-col w-full mx-1">
            <label className="text-xs text-start font-bold">
              {"Max Monthly Incentive (Fixed)"}
            </label>
            <div className="my-1" />
            <Input
              placeholder={""}
              value={billing?.maxFixedIncentive}
              setValue={setBillingKey("maxFixedIncentive")}
            />
          </div>
        </div>
      </div>
      {/* Third Row */}
      <div className="grid grid-cols-1 gap-4 w-2/3 pb-10">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <label className="text-xs text-start font-bold">
              Allow Overtime?
            </label>
            <div className="flex space-x-4 ml-2.5 items-center my-1">
              <RadioButton
                children="Yes"
                checked={billing?.allowOvertime}
                onChange={() => {
                  setBillingKey("allowOvertime")(true);
                }}
              />
              <RadioButton
                children="No"
                checked={!billing?.allowOvertime}
                onChange={() => {
                  setBillingKey("allowOvertime")(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Fourth Row */}
      <div className="grid grid-cols-1 gap-4 w-full pb-10">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <label className="text-xs text-start font-bold">
              Invoice Delivery
            </label>
            <div className="flex space-x-4 ml-2.5 items-center my-1">
              <RadioButton
                children="Email"
                checked={billing?.invoiceDelivery === "Email"}
                onChange={() => {
                  setBillingKey("invoiceDelivery")("Email");
                }}
              />
              <RadioButton
                children="Mail"
                checked={billing?.invoiceDelivery === "Mail"}
                onChange={() => {
                  setBillingKey("invoiceDelivery")("Mail");
                }}
              />
              <RadioButton
                children="Both"
                checked={billing?.invoiceDelivery === "Both"}
                onChange={() => {
                  setBillingKey("invoiceDelivery")("Both");
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fifth Row */}
      <div className="grid grid-cols-1 gap-4 pb-10">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <label className="text-xs text-start font-bold">
                Invoice Statement
              </label>
              <div className="flex space-x-4 ml-2.5 items-center my-1">
                <RadioButton
                  children="Daily"
                  checked={billing?.invoiceFrequency === "Daily"}
                  onChange={() => {
                    setBillingKey("invoiceFrequency")("Daily");
                  }}
                />
                <RadioButton
                  children="Weekly"
                  checked={billing?.invoiceFrequency === "Weekly"}
                  onChange={() => {
                    setBillingKey("invoiceFrequency")("Weekly");
                  }}
                />
                <RadioButton
                  children="Monthly"
                  checked={billing?.invoiceFrequency === "Monthly"}
                  onChange={() => {
                    setBillingKey("invoiceFrequency")("Monthly");
                  }}
                />
                {/* <RadioButton
                  children="Custom"
                  checked={billing?.invoiceFrequency === "Custom"}
                  onChange={() => {
                    setBillingKey("invoiceFrequency")("Custom");
                  }}
                /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <label className="text-xs text-start font-bold">
                Invoice Frequency Delivery
              </label>
              <div className="flex space-x-4 ml-2.5 items-center my-1">
                <RadioButton
                  children="Daily"
                  checked={billing?.invoiceFrequencyDelivery === "Daily"}
                  onChange={() => {
                    setBillingKey("invoiceFrequencyDelivery")("Daily");
                  }}
                />
                <RadioButton
                  children="Weekly"
                  checked={billing?.invoiceFrequencyDelivery === "Weekly"}
                  onChange={() => {
                    setBillingKey("invoiceFrequencyDelivery")("Weekly");
                  }}
                />
                <RadioButton
                  children="Monthly"
                  checked={billing?.invoiceFrequencyDelivery === "Monthly"}
                  onChange={() => {
                    setBillingKey("invoiceFrequencyDelivery")("Monthly");
                  }}
                />
                <RadioButton
                  children="Custom"
                  checked={billing?.invoiceFrequencyDelivery === "Custom"}
                  onChange={() => {
                    setBillingKey("invoiceFrequencyDelivery")("Custom");
                  }}
                />
              </div>
              {/* <div className="flex flex-row justify-between my-2">
                <div className="flex flex-col w-full">
                  <label className="text-xs text-start font-bold">
                    {"Select Start Date"}
                  </label>

                  <div className="my-1" />

                  <DatePickerCustom
                    date={billing?.startDate}
                    onChange={setBillingKey("startDate")}
                    // onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-xs text-start font-bold">
                    {"Select End Date"}
                  </label>
                  <div className="my-1" />

                  <DatePickerCustom
                    date={billing?.endDate}
                    onChange={setBillingKey("endDate")}
                    // onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Button
        // className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleUpdateBilling}
      >
        Update Billing
      </Button>
    </div>
  );
}

export default Billing;
