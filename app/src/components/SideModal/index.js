import React, { useState } from "react";

const SideModal = ({ children, isOpen, setIsOpen }) => {
  //   const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed z-50">
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-100 p-4 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Close Modal
        </button>
        {children}
      </div>
    </div>
  );
};

export default SideModal;
