import React, { useState, useEffect } from "react";
// import { signOut } from "../../components/AppBar";
import { ScaleHover } from "../../styles/animations";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

async function signOut() {
  try {
    console.log("Signing out.");
    await Auth.signOut();

    // Clear the local storage cache
    localStorage.clear();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

function AdminHoldScreen() {
  const Header = ({ text }) => (
    <label className="text-SECONDARY_COLOR text-2xl font-bold">{text}</label>
  );
  const SubHeader = ({ text }) => (
    <label className="text-SECONDARY_COLOR text-xl font-bold">{text}</label>
  );
  const Information = ({ text }) => (
    <label className="text-white">{text}</label>
  );

  return (
    <div className="flex flex-col h-screen p-3 items-center bg-PRIMARY_COLOR">
      <div className="absolute right-3">
        <div
          onClick={() => signOut()}
          className={`p-2 bg-SECONDARY_COLOR text-PRIMARY_COLOR text-bold ${ScaleHover} rounded-lg`}
        >
          <text>Sign Out</text>
        </div>
      </div>

      <div className="flex flex-col h-full w-[50%] p-10 border-2 border-white space-y-3 rounded-3xl">
        <label className="text-SECONDARY_COLOR text-3xl font-bold">
          Attention!
        </label>

        {/* <Information text={"Last updated: September 12, 2023"} /> */}
        <Header text={"Notice"} />

        <Information
          text={`Your account has been currently placed under admin hold`}
        />

        <Header text={"Contact Us"} />
        <Information text={"For any questions, please contact us at:"} />
        <div className="flex flex-row space-y-1 items-center">
          <Information text={"1. Email: numan98khan@gmail.com"} />

          {/* <Information text={"2. Phone number: "} /> */}
        </div>
      </div>
    </div>
  );
}

export default AdminHoldScreen;
