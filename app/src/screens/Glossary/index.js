import React, { useState } from "react";

import theme from "../../styles/theme.styles";
import IconButton from "../../components/Button/IconButton";
import Button from "../../components/Button/IconButton";
import FilterButton from "../../components/Button/FilterButton";
import Check from "../../components/Check";
import ColoredTag from "../../components/ColoredTag";
import DateDropDown from "../../components/DateDropDown";
import PageHeader from "../../components/Headers/PageHeader";
import IconIndicator from "../../components/IconIndicator";
import InfoCard from "../../components/InfoCards";
import Input from "../../components/Input";
import NavTab from "../../components/NavTab";
import PageNav from "../../components/PageNav";
import ShiftCard from "../../components/ShiftCard";
import TableRow from "../../components/TableRow";
import RadioButton from "../../components/Button/RadioButton";
// import SideMenu from "../../components/SideMenu";
import SideModal from "../../components/SideModal";
import SummaryCard from "../../components/SummaryCard";
import WhosOn from "../../components/WhosOn";
import NurseSummary from "../PeopleDetails/NurseSummary";
import CalenderIcon from "../..//assets/icons/summaryIcons/open";

const Login = () => {
  return (
    <div className="flex-col w-full justify-between flex-grow">
      <div className="w-1/4 m-2">
        <Button text={"Dummy"} />
      </div>
      <div className="w-1/4 m-2">
        <Check value={false} />
        <Check value={true} />
      </div>
      <div className="w-1/4 m-2">
        {" "}
        <ColoredTag title={"LPN"} />
      </div>
      <div className="w-1/4 m-2">
        <DateDropDown text={"18th March 2023"} />
      </div>
      <div className="w-1/4 m-2">
        <PageHeader text={"Page header"} />
      </div>
      <div className="w-1/4 m-2">
        <IconIndicator />
      </div>
      <div className="w-1/4 m-2">
        <InfoCard title={"News"} />
      </div>
      <div className="w-1/4 m-2">
        <Input />
      </div>
      <div className="w-1/4 m-2">
        <NavTab title={"Open Shifts"} amount={24} isActive={true} />
      </div>
      <div className="w-1/4 m-2">
        <PageNav text={1} isSelected={true} />
      </div>
      <div className="w-1/4 m-2">
        <ShiftCard
          numOfPositions={1}
          facility={"Elevate Care"}
          shiftTiming={"7:00AM - 3:00PM"}
          type={"LPN"}
          isAssigned={false}
          isIncentive={true}
          isGuarantee={true}
          isLate={true}
          isCallOff={true}
          isSelected={true}
          // isSelected={false}
        />
      </div>
      {/* <div className="w-1/4 m-2">
        <SideModal
          // setIsOpen={setIsOpen}
          isOpen={true}
        >
          <h1 className="text-xl font-bold mb-4">Filter options:</h1>
          <p className="mb-2">Option 1</p>
          <p className="mb-2">Option 2</p>
        </SideModal>
      </div> */}
      <div className="w-1/4 m-2">
        <SummaryCard
          text={"item.label"}
          points={"80"}
          gradient={true}
          icon={<CalenderIcon />}
        />
      </div>
      <div className="w-1/4 m-2">
        <WhosOn />
      </div>
      <div className="w-1/4 m-2">
        <FilterButton text="Filter" />
      </div>
      <div className="w-1/4 m-2">
        <TableRow
          name="John"
          status="Active"
          id="001"
          profile="CNA"
          points="01"
          email="maureen.b@outlook.com"
          classes="p-4 border-b border-blue-gray-50"
        />
      </div>
      <div className="w-1/4" m-2>
        <NurseSummary />
      </div>
      <div className="w-1/4 m-2">
        <RadioButton children="Yes" />
        <RadioButton children="No" />
      </div>
      <IconButton color={theme.SECONDARY_COLOR} text={"+ADD SHIFT"} />
    </div>
  );
};

export default Login;
