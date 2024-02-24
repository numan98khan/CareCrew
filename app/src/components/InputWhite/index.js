import React from "react";
import { MainHover, ShadowHover } from "../../styles/animations";
import theme from "../../styles/theme.styles";

const InputFieldWhite = ({
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
  width,
}) => {
  const InputComponent = multiline ? "textarea" : "input";

  const commonProps = {
    className: `w-full py-3 px-4 text-xs leading-tight focus:outline-none focus:shadow-outline ${
      multiline && "h-auto"
    } ${isCentered ? "text-center" : ""}`,
    id,
    placeholder,
    value,
    onChange: (e) => {
      if (isNumeric) {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === "" || re.test(e.target.value)) {
          setValue(e.target.value);
        }
      } else {
        setValue(e.target.value);
      }
    },
    style: {
      backgroundColor: color ? color : "white",
      border: "1px solid #EDEDED",
      borderRadius: "5px",
    },
    disabled,
  };

  return (
    <div
      style={{ width: width ? width : "initial" }}
      className="relative w-full"
    >
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

export default InputFieldWhite;
