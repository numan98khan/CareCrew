import React, { useState, useEffect } from "react";
import IconButton from "../../components/Button/IconButton";
import theme from "../../styles/theme.styles";

import PageHeader from "../../components/Headers/PageHeader";
// import NavTab from "../../components/NavTab";

import SummaryCard from "../../components/SummaryCard";
// import { Card, IconButton, Typography } from "@material-tailwind/react";
import { Card, Typography } from "@material-tailwind/react";

// import ShiftCard from "../../components/ShiftCard";
import PageNav from "../../components/PageNav";
// import FilterButton from "../../components/Button/FilterButton";
import TableRow from "../../components/TableRow";
// import IconIndicator from "../../components/IconIndicator";
import Table from "../../components/Table";

// import FilterIcon from "../../assets/icons/indicators/filter";
import TrashIcon from "../../assets/icons/delete";
import FilterButton from "../../components/Button/FilterButton";
import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../context";

import { LIST_PEOPLE } from "../../apolloql/queries";
import { useQuery, gql } from "@apollo/client";

const TABLE_HEAD = [
  "",
  "Name",
  "ID",
  "Status",
  "Profile",
  "Points",
  "Email",
  "Action",
];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Maureen Biologist",
    id: "001",
    status: "Active",
    profile: "CNA",
    points: "01",
    email: "maureen.b@outlook.com",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Maureen Biologist",
    id: "001",
    status: "Active",
    profile: "CNA",
    points: "01",
    email: "maureen.b@outlook.com",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Maureen Biologist",
    id: "001",
    status: "Active",
    profile: "CNA",
    points: "01",
    email: "maureen.b@outlook.com",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Maureen Biologist",
    id: "001",
    status: "Active",
    profile: "CNA",
    points: "01",
    email: "maureen.b@outlook.com",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Maureen Biologist",
    id: "001",
    status: "Active",
    profile: "CNA",
    points: "01",
    email: "maureen.b@outlook.com",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "Maureen Biologist",
    id: "001",
    status: "Active",
    profile: "CNA",
    points: "01",
    email: "maureen.b@outlook.com",
  },
];

const FacilityMembers = ({ people }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // adjust this as needed
  const totalPages = Math.ceil(TABLE_ROWS.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = TABLE_ROWS.slice(startIndex, endIndex);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    <div className="h-full flex-grow flex flex-col min-h-full px-3 pb-3">
      <div className="flex flex-col mx-2">
        <div className="flex py-1 justify-start">
          <div className="flex flex-row items-center justify-between w-full"></div>
        </div>
      </div>

      <Table
        disableHeader
        data={people}
        config={"facility_members"}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        createPageNumbers={createPageNumbers}
        TABLE_HEAD={["", "Name", "ID", "Email", "Phone Number"]}
        // TABLE_HEAD={TABLE_HEAD}
        itemOnClick={(e) => {
          e.preventDefault(); // Prevent default anchor tag behavior
          navigate("/peopleDetails", { state: { amount: 7 } });
        }}
      />
    </div>
  );
};

export default FacilityMembers;
