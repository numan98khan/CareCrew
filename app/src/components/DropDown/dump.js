import React, { useState, useRef, useEffect } from "react";
import theme from "../../styles/theme.styles";

import DownChevron from "../../assets/icons/downChevron";
import Input from "../Input";

import { MainHover, ShadowHover } from "../../styles/animations";

const DropDown = ({ placeholder, value, setValue, options, labels, label }) => {
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

  const openOpenModal = (event) => {
    if (buttonRef.current && buttonRef.current.contains(event.target)) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  };

  // const handleSelectItem = (item) => {
  //   setValue(item);
  //   setIsOpen(false);
  //   closeOpenModal();

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

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       // modalRef.current &&
  //       // !modalRef.current.contains(event.target) //&&
  //       // !buttonRef.current.contains(event.target) //&&
  //       // Add this line to exclude the input field from triggering the close function
  //       // !inputRef.current.contains(event.target)
  //       // isOpen &&
  //       modalRef.current &&
  //       // !modalRef.current.contains(event.target) &&
  //       !buttonRef.current.contains(event.target)
  //     ) {
  //       closeOpenModal();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [modalRef, buttonRef, inputRef]); // Add inputRef here

  return (
    <div
      className={`relative rounded-full w-full py-3 px-4 text-xs text-gray-700 bg-PRIMARY_NEUTRAL_COLOR flex justify-between ${ShadowHover}`}
      ref={buttonRef}
      onClick={openOpenModal}
    >
      {label ? (
        <label className="text-black font-semibold ">{label}</label>
      ) : value ? (
        <label className="text-black font-semibold ">
          {labels ? labels[options.indexOf(value)] : value}
        </label>
      ) : (
        <label className="text-grey font-semibold ">{placeholder}</label>
      )}

      <DownChevron size={8} />

      {isOpen && options && (
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
