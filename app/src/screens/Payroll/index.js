import React, { useState, useEffect } from "react";

import PageHeader from "../../components/Headers/PageHeader";
import InfoTitle from "../../components/Headers/InfoTitle";
import InfoSubTitle from "../../components/Headers/InfoSubTitle";

import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context";
import RadioButton from "../../components/Button/RadioButton";
import { ScaleHover } from "../../styles/animations";
import { useUpdatePeople } from "../../apolloql/people";
import { ErrorToast, SuccessToast } from "../../services/micro";

import { Auth, API, graphqlOperation } from "aws-amplify";
import Button from "../../components/Button";

const getPeopleMinimal = /* GraphQL */ `
  query GetPeople($id: ID!) {
    getPeople(id: $id) {
      id
      payrollCycle
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

function Reports() {
  const [latestPeopleData, setLatestPeopleData] = useState(null);

  const { user } = useAuth();

  const { updatePeopleQuery } = useUpdatePeople();

  const updatePayrollCycle = async (latestPeopleData) => {
    if (!latestPeopleData) ErrorToast("People data not loaded yet.");

    const userData = (
      await API.graphql(
        graphqlOperation(getPeopleMinimal, { id: user.attributes.sub })
      )
    )?.data?.getPeople;
    const updatedPeople = {
      id: userData.id,
      payrollCycle: payrollCycle,
      _version: userData._version,
    };

    try {
      await updatePeopleQuery(updatedPeople);
      SuccessToast("User updated successfully");
    } catch (error) {
      console.error("Error updating people: ", error);

      ErrorToast("Error updating user");
    }
  };

  const [payrollCycle, setPayrollCycle] = useState(null); // State to hold the user's selection

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = (
          await API.graphql(
            graphqlOperation(getPeopleMinimal, { id: user.attributes.sub })
          )
        )?.data?.getPeople;
        setPayrollCycle(userData?.payrollCycle);
        setLatestPeopleData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user?.attributes?.sub]);

  return (
    <div className="flex flex-col min-h-max px-3 pb-3">
      <Toaster />
      <div className="flex flex-col">
        <div className="flex py-1 justify-between">
          <div className="flex items-center">
            <PageHeader text={"Payroll"} />
          </div>
        </div>
      </div>

      <div className="h-full bg-white flex-grow mt-2 p-3 rounded-lg item-start justify-between">
        <div
          className="flex flex-row items-center rounded-lg p-4 mb-10"
          style={{
            backgroundColor: "rgba(255, 175, 50, 0.2)",
          }}
        >
          <label className="text-sm mr-1">
            {"To access to your payroll please click on the below link"}
          </label>
          <a
            className={`text-xs font-bold text-PRIMARY_COLOR ${ScaleHover}`}
            href="https://online.adp.com/signin/v1/?APPID=Pin4NAS&productId=80e309c3-709e-bae1-e053-3505430b5495&returnURL=https://login.adp.com&callingAppId=landing&TARGET=-SM-https://login.adp.com/ee/getProducts?event=Next&userSelected=anActiveEmployee&transId=7A3-921-56Z9G6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login to ADP
          </a>
        </div>
        <div className="flex flex-col text-left">
          {/* <label>{"Payroll cycle"}</label> */}
          <InfoTitle text={"Payroll cycle"} />
          <div className="flex flex-row items-center mt-2">
            <RadioButton
              checked={payrollCycle === "Daily"}
              onChange={() => setPayrollCycle("Daily")}
            />
            <InfoSubTitle text={"Daily"} />
            <div className="mx-1" />
            <RadioButton
              checked={payrollCycle === "Weekly"}
              onChange={() => setPayrollCycle("Weekly")}
            />
            <InfoSubTitle text={"Weekly"} />
          </div>
        </div>

        <div className="flex flex-row text-left mt-2 space-x-2 w-2/3">
          <Button
            children={"SAVE CHANGES"}
            onClick={() => updatePayrollCycle(latestPeopleData)}
          />
          <Button
            children={"RESET"}
            onClick={() => {
              if (latestPeopleData) {
                setPayrollCycle(latestPeopleData?.payrollCycle);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Reports;
