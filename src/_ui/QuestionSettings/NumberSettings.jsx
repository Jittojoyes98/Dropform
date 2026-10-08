import React from "react";
import InputType from "./InputType";
import Number from "../../../assets/number-icon.svg";

const NumberSettings = ({ type = "number" }) => {
  return (
    <div>
      <InputType src={Number} type={type} />
    </div>
  );
};

export default NumberSettings;
