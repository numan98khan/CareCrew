import React, { useState } from "react";

import PageHeader from "../../components/Headers/PageHeader";
import NavTab from "../../components/NavTab";

// import SummaryCard from "../../components/SummaryCard";
import { Card, Typography } from "@material-tailwind/react";

// import ShiftCard from "../../components/ShiftCard";
import PageNav from "../../components/PageNav";
import FilterButton from "../../components/Button/FilterButton";
import TableRow from "../../components/TableRow";
import BackButton from "../../components/Button/BackButton";
import NurseSummary from "../../screens/PeopleDetails/NurseSummary";
import NurseAccountInfo from "../../screens/PeopleDetails/NurseAccountInfo";
import NurseReviews from "../../screens/PeopleDetails/NurseReviews";
import NurseDocuments from "../../screens/PeopleDetails/NurseDocuments";
import NurseChecklists from "../../screens/PeopleDetails/NurseChecklists";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { ADMIN } from "../../constants/userTypes";

const peopleExample = null;

const PeopleDetails = ({ people, type, PersonReviews = 5 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onBackClickHandler = () => {
    navigate(-1);
  };

  // const { type } = useAuth();

  const navTabs =
    type === ADMIN
      ? [
          { title: "Account Info", amount: 0, isActive: true },
          { title: "Checklists", amount: 0, isActive: false },
          { title: "Reviews", amount: location.state.amount, isActive: false },
          { title: "Documents", amount: 0, isActive: false },
        ]
      : [
          { title: "Account Info", amount: 0, isActive: true },
          { title: "Reviews", amount: location.state.amount, isActive: false },
        ];
  const [currentTab, setCurrentTab] = useState("Account Info");
  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
  };

  let tabContent;
  if (currentTab === "Account Info") {
    tabContent = <NurseAccountInfo />;
  } else if (currentTab === "Checklists") {
    tabContent = <NurseChecklists />;
  } else if (currentTab === "Reviews") {
    tabContent = <NurseReviews amount={PersonReviews} />;
  } else if (currentTab === "Documents") {
    tabContent = <NurseDocuments />;
  }

  return (
    <div className="flex flex-col min-h-full px-3 pb-3">
      <div className="flex flex-col">
        <div className="flex flex-row py-1 justify-start space-x-4 items-center mb-2 mt-2">
          <BackButton onClick={onBackClickHandler} />
          <PageHeader text={"People"} />
        </div>
      </div>
      {/* pass required props for each nurse */}
      <NurseSummary />
      {/*Navigation Tabs*/}
      <div>
        <div className="flex flex-col">
          <div className="w-full h-10 bg-white flex">
            {navTabs.map((tab, index) => (
              <NavTab
                key={index}
                title={tab.title}
                amount={tab.title === "Reviews" ? tab.amount : ""}
                // isActive={tab.isActive}
                isActive={currentTab === tab.title}
                onClick={() => handleTabChange(tab.title)}
              />
            ))}
          </div>
          <div>{tabContent}</div>
        </div>
      </div>
    </div>
  );
};

export default PeopleDetails;
