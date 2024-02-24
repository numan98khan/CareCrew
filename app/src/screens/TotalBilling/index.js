import React, { useState } from "react";
import PageHeader from "../../components/Headers/PageHeader";
import DateDropDown from "../../components/DateDropDown";
import IconButton from "../../components/Button/IconButton";
import DualDatePicker from "../../components/DatePicker/DualDatePicker";
import OptionTab from "../../components/NavTab/OptionTab";
import DeleteIcon from "../../assets/icons/deleteIcon";
import FilterIcon from "../../assets/icons/filter";
import themeStyles from "../../styles/theme.styles";
import { useNavigate } from "react-router-dom";
import { Card } from "@material-tailwind/react";
import { useListPeople } from "../../apolloql/people";
import PageNav from "../../components/PageNav";
import { EMPLOYEE } from "../../constants/userTypes";
import { PuffLoader } from "react-spinners";
import Table from "../../components/Table";
import BackButton from "../../components/Button/BackButton";
import InputFieldWhite from "../../components/InputWhite";
import DropDownPlain from "../../components/DropdownPlain";
import { useListInvoices } from "../../apolloql/invoices";

function TotalBilling({ onBackClick }) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let date = new Date();
  const navigate = useNavigate();
  const { people, loading, error } = useListPeople();
  const itemsPerPage = 21; // adjust this as needed
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(null);

  const { invoices } = useListInvoices();

  const onBackClickHandler = () => {
    // console.log("Going back on facility");
    setSelectedPeople(null);
  };

  const totalPages = Math.ceil(invoices?.length / itemsPerPage);

  const handleDateChange = (startOrEnd, value) => {
    if (startOrEnd === "start") {
      setStartDate(value);
    } else if (startOrEnd === "end") {
      setEndDate(value);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const TABLE_HEAD = ["", "Name", "Due Date", "Amount", "", ""];

  const createPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PageNav
          text={i.toString()}
          isSelected={i === currentPage}
          onClick={() => handlePageChange(i)}
        />
      );
    }
    return pages;
  };

  return (
    <div className="flex flex-col min-h-max px-3 pb-3 h-full">
      <div className="flex flex-col  h-full">
        <div className="flex py-1 justify-between">
          <div className="flex items-center gap-2">
            <PageHeader text={"Invoices"} />
            <div className="mx-1" />
            <div className="">
              <DateDropDown text={"18 March 2023"} />
            </div>
          </div>
        </div>

        <Card className="w-full p-3 flex flex-col justify-between bg-white h-full">
          {/* <div className="flex justify-between items-center"> */}

          <div className="flex items-center gap-5">
            <InputFieldWhite
              width={"250px"}
              placeholder={"Search by Invoice Number"}
            />
            <div className="h-full flex flex-row gap-1 items-center justify-center">
              <div style={{ minWidth: "60px" }} className="flex text-xxs">
                Date Range
              </div>
              <DualDatePicker
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
              />
            </div>

            <div className="h-full flex flex-row gap-1 items-center justify-center">
              <div style={{ minWidth: "80px" }} className="flex text-xxs">
                Amount Range
              </div>
              <DropDownPlain
                options={[]}
                width={"250px"}
                placeholder={"Select Amount Range"}
              />
            </div>
          </div>
          {loading ? (
            <div className="h-40 w-full flex justify-center items-center">
              <PuffLoader
                color={themeStyles.PRIMARY_LIGHT_COLOR}
                loading={loading}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <Table
              disableFilter
              data={invoices || []}
              config={"invoice_facility"}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
              createPageNumbers={createPageNumbers}
              TABLE_HEAD={TABLE_HEAD}
              editAction={() => setIsEdit(true)}
              disableEdit={false}
              disableHeader={true}
              setSelectedPeople={setSelectedPeople}
              padding={"p-0"}
              disableAvatar={true}
              // itemOnClick={(e) => {
              //   e.preventDefault(); // Prevent default anchor tag behavior
              //   navigate("/peopleDetails", { state: { amount: 7 } });
              // }}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

export default TotalBilling;
