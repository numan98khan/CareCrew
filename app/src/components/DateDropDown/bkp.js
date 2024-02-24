import React from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import themeStyles from "../../styles/theme.styles";
// import { BsChevronDown } from "react-icons/bs";

const DateDropDown = ({ date, onChange }) => {
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div
      // className="text-xxs fond-semibold text-gray-800"
      onClick={onClick}
      ref={ref}
    >
      <span
        // className="text-xxs fond-semibold text-gray-800"
        className="text-lg font-bold text-gray-800"
        style={{
          // fontWeight: "600",
          color: "rgba(2, 5, 10, 0.50)",
        }}
      >
        {value}
      </span>
      {/* <BsChevronDown /> */}
    </div>
  ));

  const handleDateChange = (selectedDate) => {
    onChange(selectedDate);
  };

  return (
    <div
      className="relative z-[1000]"
      onHover={(e) => {
        e.stopPropagation();
        // onClick(e);
      }}
    >
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="d MMMM yyyy"
        customInput={<CustomInput />}
      />
    </div>
  );
};

export default DateDropDown;
