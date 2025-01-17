import React, { useMemo, useRef, useState } from "react";
import PageHeader from "../../components/Headers/PageHeader";
import DateDropDown from "../../components/DateDropDown";
import DualDatePicker from "../../components/DatePicker/DualDatePicker";
import themeStyles from "../../styles/theme.styles";
import { Card } from "@material-tailwind/react";
import { useListPeople } from "../../apolloql/people";
import { PuffLoader } from "react-spinners";
import Table from "../../components/Table";
import InputFieldWhite from "../../components/InputWhite";
import DropDownPlain from "../../components/DropdownPlain";
import { useListInvoices } from "../../apolloql/invoices";

import IconButton from "../../components/Button/IconButton";
import theme from "../../styles/theme.styles";
import TimecardDetailsModal from "../../components/Drawers/TimecardDetailsModal";
import CreateInvoiceModal from "../../components/Drawers/CreateInvoiceModal";
import { useAuth } from "../../context";
import { ADMIN, FACILITY } from "../../constants/userTypes";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceDrawer from "../../components/Drawers/InvoiceDrawer";
import { useListFacilities } from "../../apolloql/facilities";

function Invoices({ onBackClick }) {
  const { type, myFacility } = useAuth();
  const [searchInvoiceNumber, setSearchInvoiceNumber] = useState(null);
  const [searchMaxAmount, setSearchMaxAmount] = useState(null);
  const [searchMinAmount, setSearchMinAmount] = useState(null);
  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedInvoice, setSelectedInvoice] = useState();
  const [isOpenInvoiceModal, setIsOpenInvoiceModal] = useState(false);

  function openInvoiceModal() {
    setIsOpenInvoiceModal(true);
  }

  function onCloseInvoiceModal() {
    setIsOpenInvoiceModal(false);
  }

  const { facilities, loading, error } = useListFacilities();
  const itemsPerPage = 21; // adjust this as needed
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(null);

  const [open, setOpen] = useState(false);
  const [isDownloadEngaged, setIsDownloadEngaged] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const modalContentRef = useRef(null);
  const downloadPDF = async (invoice) => {
    if (!selectedInvoice) {
      setSelectedInvoice(invoice);
      setIsDownloadEngaged(true);
    }

    openInvoiceModal();

    setTimeout(async () => {
      const pdf = new jsPDF("portrait", "pt", "a4");
      const canvas = await html2canvas(modalContentRef.current);
      const img = canvas.toDataURL("image/png");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate the scaling factor to fit the image within the PDF page
      const scale = Math.min(
        pdfWidth / canvas.width,
        pdfHeight / canvas.height
      );

      const imgWidth = canvas.width * scale;
      const imgHeight = canvas.height * scale;

      const topMargin = (pdfHeight - imgHeight) / 2; // Center the image vertically
      const leftMargin = (pdfWidth - imgWidth) / 2; // Center the image horizontally

      pdf.addImage(img, "PNG", leftMargin, topMargin, imgWidth, imgHeight);
      pdf.save("invoice-details.pdf");

      onCloseInvoiceModal();
      setSelectedInvoice(null);
      setIsDownloadEngaged(false);
    }, 500);
  };

  const { invoices, loading: loadingInvoices } = useListInvoices(
    type === FACILITY ? myFacility?.id : null,
    searchInvoiceNumber,
    searchMinAmount,
    searchMaxAmount,
    startDate,
    endDate
  );

  const filteredInvoices = useMemo(() => {
    // return invoices?.map((obj) => {
    //   return {
    //     ...obj,
    //     facilityName: facilities?.find(
    //       (facility) => facility?.id === obj?.receiverID
    //     )?.facilityName,
    //   };
    // });

    // First, map over the invoices to attach the facilityName
    const invoicesWithFacilityName = invoices?.map((obj) => {
      return {
        ...obj,
        facilityName: facilities?.find(
          (facility) => facility?.id === obj?.receiverID
        )?.facilityName,
      };
    });

    // Now, sort the mapped invoices by surrogateID
    return invoicesWithFacilityName?.sort((a, b) => {
      return b.surrogateID - a.surrogateID;
    });
  }, [invoices, facilities]);

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

  const TABLE_HEAD = [
    "",
    "Invoice No.",
    "Facility",
    "Created On",
    "Due Date",
    "Amount",
    "",
  ];

  return (
    <div className="flex flex-col min-h-max px-3 pb-3 h-full">
      <CreateInvoiceModal open={open} onClose={onClose} />
      <InvoiceDrawer
        modalContentRef={modalContentRef}
        invoice={selectedInvoice}
        open={isOpenInvoiceModal}
        onClose={onCloseInvoiceModal}
        downloadPDF={downloadPDF}
        isDownload={isDownloadEngaged}
      />
      <div className="flex flex-col  h-full">
        <div className="flex py-1 justify-between">
          <div className="flex items-center gap-2 justify-between w-full ">
            <PageHeader text={"Invoices"} />

            {type === ADMIN && (
              <div>
                <IconButton
                  color={theme.SECONDARY_COLOR}
                  text={"+ADD INVOICE"}
                  onClick={() => {
                    onOpen();
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <Card className="w-full p-3 flex flex-col justify-between bg-white h-full">
          {/* <div className="flex justify-between items-center"> */}

          <div className="flex items-center gap-5">
            <InputFieldWhite
              width={"250px"}
              placeholder={"Search by Invoice Number"}
              value={searchInvoiceNumber}
              setValue={(val) => {
                setSearchInvoiceNumber(val);
              }}
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
              <InputFieldWhite
                placeholder={"Min"}
                value={searchMinAmount}
                setValue={(val) => {
                  setSearchMinAmount(val);
                }}
              />
            </div>
            <div className="h-full flex flex-row gap-1 items-center justify-center">
              <InputFieldWhite
                placeholder={"Max"}
                value={searchMaxAmount}
                setValue={(val) => {
                  setSearchMaxAmount(val);
                }}
              />
            </div>
          </div>
          {loadingInvoices ? (
            <div className="h-40 w-full flex justify-center items-center">
              <PuffLoader
                color={themeStyles.PRIMARY_LIGHT_COLOR}
                loading={loadingInvoices}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <Table
              disableFilter
              data={filteredInvoices || []}
              config={"invoice"}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
              // createPageNumbers={createPageNumbers}
              TABLE_HEAD={TABLE_HEAD}
              editAction={() => setIsEdit(true)}
              disableEdit={false}
              disableHeader={true}
              // setSelectedPeople={setSelectedPeople}
              padding={"p-0"}
              disableAvatar={true}
              setSelectedInvoice={setSelectedInvoice}
              openInvoiceModal={openInvoiceModal}
              downloadAction={downloadPDF}
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

export default Invoices;
