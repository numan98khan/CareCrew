import React, { useState, useEffect } from "react";

function PrivacyScreen() {
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
    <div className="flex flex-col h-full p-3 items-center bg-PRIMARY_COLOR">
      <div className="flex flex-col h-full w-[50%] p-10 border-2 border-white space-y-3 rounded-3xl">
        <label className="text-SECONDARY_COLOR text-3xl font-bold">
          Privacy Policy for CareCrew Nursing
        </label>

        <Information text={"Last updated: September 12, 2023"} />
        <Header text={"Introduction"} />

        <Information
          text={`Welcome to the privacy policy for CareCrew Nursing ("we", "us", or "our"). This policy describes how we collect, use, and disclose your personal information when you use our mobile application for shift booking and management ("App").`}
        />

        <Header text={"Information We Collect"} />
        <SubHeader text={"Personal Information"} />
        <Information
          text={
            "When you register for an account, we may collect personal information such as:"
          }
        />

        <div className="flex flex-col space-y-1">
          <Information text={"1. Name"} />
          <Information text={"2. Email address"} />
          <Information text={"3. Phone number"} />
        </div>

        <SubHeader text={"Location Information"} />
        <Information
          text={
            "We collect location data to ensure that nurses are at the designated facility when clocking into a shift."
          }
        />

        <SubHeader text={"Notification Preferences"} />
        <Information
          text={
            "We may send notifications via email, phone, or in-app messages, but only if you explicitly opt in to receive these notifications."
          }
        />

        <Header text={"How We Use Your Information"} />
        <Information
          text={
            "We use the information we collect for various purposes, including:"
          }
        />
        <div className="flex flex-col space-y-1">
          <Information text={"1. To provide and maintain our App"} />
          <Information text={"2. To verify your location for shift clock-in"} />
          <Information
            text={
              "3. To communicate with you, if you've opted in to receive notifications"
            }
          />
          <Information text={"4. To improve user experience"} />
        </div>

        <Header text={"How We Share Your Information"} />
        <Information
          text={
            "We may share your information with third parties under the following circumstances:"
          }
        />
        <div className="flex flex-col space-y-1">
          <Information text={"1. With your consent"} />
          <Information text={"2. To comply with legal obligations"} />
          <Information text={"3. To protect and defend our rights"} />
        </div>

        <Header text={"Security"} />
        <Information
          text={
            "We take reasonable measures to protect your information, but we cannot guarantee its absolute security."
          }
        />

        <Header text={"Children's Privacy"} />
        <Information
          text={
            "Our App is not intended for use by children under the age of 13."
          }
        />

        <Header text={"Changes to This Privacy Policy"} />
        <Information
          text={
            "We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy within the App."
          }
        />

        <Header text={"Contact Us"} />
        <Information
          text={
            "For any questions about this privacy policy, please contact us at:"
          }
        />
        <div className="flex flex-row space-y-1 items-center">
          <Information text={"1. Email: numan98khan@gmail.com"} />
        </div>
      </div>
    </div>
  );
}

export default PrivacyScreen;
