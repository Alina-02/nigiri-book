import React from "react";

interface Props {
  type: ButtonType;
  text?: string;
}

export enum ButtonType {
  primary = "Primary",
  secondary = "Secondary",
}

const Button = (props: Props) => {
  const { type, text } = props;
  return (
    <button
      className="p-2 rounded-lg"
      style={{
        color: type === ButtonType.primary ? "#FFFFFF" : "#000000",
        backgroundColor: type === ButtonType.primary ? "#967f68" : "#FFFFFF",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
