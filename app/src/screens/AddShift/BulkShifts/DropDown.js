import React, { useState, useRef, useEffect } from "react";

import DownChevron from "../../../assets/icons/downChevron";

import { MainHover, ShadowHover } from "../../../styles/animations";
import themeStyles from "../../../styles/theme.styles";

const DropDown = ({
  placeholder,
  value,
  setValue,
  options,
  labels,

  disabled = false,
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

  const openOpenModal = (event) => {
    if (disabled) return; // Prevent opening if disabled
    if (buttonRef.current && buttonRef.current.contains(event.target)) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  };

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
      className={`relative rounded w-full px-1 border text-xs text-greycus bg-white flex items-center justify-between ${ShadowHover} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`} // Apply different styles if disabled
      ref={buttonRef}
      onClick={openOpenModal}
    >
      {value ? (
        <label className="text-xxs font-bold text-PRIMARY_COLOR">{value}</label>
      ) : (
        <label className="text-xxs font-semibold">{placeholder}</label>
      )}

      <DownChevron size={8} />

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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
