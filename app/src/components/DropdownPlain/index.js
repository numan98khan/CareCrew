import React, { useState, useRef, useEffect } from "react";
import theme from "../../styles/theme.styles";

import DownChevron from "../../assets/icons/downChevron";
import Input from "../Input";

import { MainHover, ShadowHover } from "../../styles/animations";
import themeStyles from "../../styles/theme.styles";

const DropDownPlain = ({
  placeholder,
  value,
  setValue,
  options,
  labels,
  label,

  disabled = false,
  setIdValue,
  height,
  width,
  border,
  bg,
  paddingX,
  paddingY,
  iconSize,
  placeholderSize,
  shortenValue,
}) => {
  // ... existing code ...

  const handleSelectItem = (index) => {
    const selectedItem = options[index];
    setValue(selectedItem);
    setIsOpen(false);
    // setIsOpen(false);
    closeOpenModal();
  };

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const inputRef = useRef(null);

  const closeOpenModal = () => {
    setIsOpen(false);
  };

  // const openOpenModal = (event) => {
  //   if (buttonRef.current && buttonRef.current.contains(event.target)) {
  //     setIsOpen((prevIsOpen) => !prevIsOpen);
  //   }
  // };

  const openOpenModal = (event) => {
    if (disabled) return; // Prevent opening if disabled
    if (buttonRef.current && buttonRef.current.contains(event.target)) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  };

  // const handleSelectItem = (item) => {
  //   setValue(item);
  //   setIsOpen(false);
  //   closeOpenModal();

  //   console.log("Selecting and closing", isOpen, item, label);
  // };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen && // Check if the modal is open
        modalRef.current &&
        !modalRef.current.contains(event.target) && // Check if the click is outside the modal
        !buttonRef.current.contains(event.target) // Check if the click is not on the button
      ) {
        closeOpenModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, modalRef, buttonRef]); // Add isOpen to the dependency array

  return (
    <div
      className={`relative w-full py-3 px-4 text-xs text-gray-700 bg-white flex justify-between ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`} // Apply different styles if disabled
      // className="relative rounded-full w-full py-2 px-4 text-xs text-gray-700 bg-PRIMARY_NEUTRAL_COLOR flex justify-between transition duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-black/30"
      // className={`relative ${!border && "rounded-full"} w-full ${
      //   paddingX ? paddingX : "px-3"
      // } ${
      //   paddingY ? paddingY : "py-4"
      // } text-xs text-gray-700 flex justify-between ${ShadowHover}`}

      ref={buttonRef}
      onClick={openOpenModal}
      style={{ border: border ? border : "initial", border: '1px solid #EDEDED', borderRadius: '5px', width: width ? width : 'initial'}}
      backgroundColor={bg ? bg : 'white'}
    >
      {label ? (
        <label
          style={{
            fontSize: placeholderSize ? placeholderSize : "13px",
            maxWidth: "80%",
            overflow: "hidden",
          }}
          className="text-black "
        >
          {label && shortenValue ? label?.substring(0, 4) : label}...
        </label>
      ) : value ? (
        <label className="text-black font-semibold ">
          {labels ? labels[options.indexOf(value)] : value}
        </label>
      ) : (
        // <label
        //   style={{
        //     fontSize: placeholderSize ? placeholderSize : "13px",
        //     maxWidth: "80%",
        //     overflow: "hidden",
        //   }}
        //   className="text-black font-semibold "
        // >
        //   {value && shortenValue ? value?.substring(0, 4) + "..." : value}
        // </label>
        <label
          style={{
            fontSize: placeholderSize ? placeholderSize : "13px",
            maxWidth: "80%",
            overflow: "hidden",
          }}
          className="font-semibold text-gray-400"
        >
          {placeholder}
        </label>
      )}

      <DownChevron size={iconSize ? iconSize : 8} />

      {isOpen && !disabled && options && (
        <div
          ref={modalRef}
          className={`fixed overflow-y-auto`}
          // ... other styles ...
          style={{
            position: "absolute",
            zIndex: 10,
            top: "105%",
            right: "0%",
            border: 10,
            borderRadius: 10,
            boxShadow: "0px 4px 16px 0px rgba(196, 196, 196, 0.70)",
            display: "flex",
            flexDirection: "column",
            padding: 10,
            justifyContent: "space-between",
            backgroundColor: "rgba(255, 255, 255, 1.0)",
            maxHeight: "600%",
            // height: 100,
          }}
        >
          {(labels || options).map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectItem(index)}
              className="hover:bg-gray-200 cursor-pointer transition-colors duration-200 ease-in rounded-lg"
            >
              <div style={{ padding: 4 }} className="px-2">
                {value === options[index] ? (
                  <div className="font-bold text-PRIMARY_COLOR">{item}</div>
                ) : (
                  <div className="font-bold text-grey">{item}</div>
                )}

                {/* {value === item?.label ? (
                  <div className="font-bold text-PRIMARY_COLOR">
                    <p style={{ fontSize: placeholderSize && placeholderSize }}>
                      {item?.label}
                    </p>
                  </div>
                ) : (
                  <div className="font-bold text-grey">
                    <p style={{ fontSize: placeholderSize && placeholderSize }}>
                      {item?.label}
                    </p>
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownPlain;
