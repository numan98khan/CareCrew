import React from "react";

const Toggle = ({ label, isChecked, onToggle }) => {
  const handleToggle = (e) => {
    if (onToggle) {
      onToggle(e.target.checked);
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer mx-2">
      {label && <span className="mr-3">{label}</span>}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className="sr-only peer"
      />
      <div className="w-[36px] h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green"></div>
    </label>
  );
};

export default Toggle;

// import React, { useState } from "react";

// const Toggle = ({ label, isChecked, onToggle }) => {
//   const [initialChecked, setIsChecked] = useState(isChecked);

//   const toggle = () => {
//     if (onToggle) {
//       const newCheckedState = !initialChecked;
//       setIsChecked(newCheckedState);

//       onToggle(newCheckedState);
//     }
//   };

//   return (
//     <label className="flex items-center cursor-pointer">
//       <div className="relative">
//         <input
//           type="checkbox"
//           className="sr-only"
//           checked={initialChecked}
//           onChange={toggle}
//         />
//         <div
//           className={`w-9 h-4 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors ${
//             initialChecked ? "bg-green" : ""
//           }`}
//         />
//         <div
//           className={`absolute top-0.5 left-0.5 h-3 w-3 bg-white rounded-full transform transition-transform ${
//             initialChecked ? "translate-x-5" : ""
//           }`}
//         />
//       </div>
//       <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
//         {label}
//       </span>
//     </label>
//   );
// };

// export default Toggle;
