import React from "react";
import { MainHover, ShadowHover } from "../../styles/animations";
import theme from "../../styles/theme.styles";

const InputField = ({
  id,
  type,
  placeholder,
  value,
  setValue,
  color,
  icons = [],
  disabled,
  multiline = false,
  rows = 5,
  isNumeric = false,
  isCentered = false,
  maxLength, // <- New prop added here
  onKeyPress,
  allowNegative = false,
}) => {
  const InputComponent = multiline ? "textarea" : "input";

  function trimStart(str) {
    return str.replace(/^\s+/, "");
  }

  const commonProps = {
    onKeyPress, // <-- New attribute added here
    className: `${
      multiline ? "rounded-2xl" : "rounded-full"
    } w-full py-3 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline ${
      !disabled ? ShadowHover : "opacity-60"
    } ${multiline && "h-auto"} ${isCentered ? "text-center" : ""}`,
    id,
    placeholder,
    value,
    maxLength, // <- New attribute added here

    onChange: (e) => {
      // const inputValue = trimStart(e.target.value);
      const inputValue = e.target.value;

      if (type === "number" && !allowNegative && parseFloat(inputValue) <= 0) {
        // Do nothing or you could potentially show a warning message here
        return;
      }

      if (inputValue.length > 0 || e.target.value === "") {
        setValue(inputValue);
      }
    },
    style: {
      backgroundColor: color ? color : theme.PRIMARY_NEUTRAL_COLOR,
      paddingRight: icons.length > 0 ? "60px" : "10px", // Adjust this value based on the size and number of icons
    },
    height: multiline ? `${rows * 1.2}em` : "2.5em",
    disabled,
  };

  return (
    <div className="relative w-full">
      {multiline ? (
        <InputComponent {...commonProps} rows={rows} />
      ) : (
        <InputComponent {...commonProps} type={type} />
      )}

      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex">
        {icons.map((Icon, index) => (
          <div className="p-1" onClick={Icon.onClick} key={index}>
            <Icon.component size={7} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputField;
