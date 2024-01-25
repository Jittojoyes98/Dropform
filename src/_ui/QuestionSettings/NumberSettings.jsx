import React from "react";
import Box from "@mui/material/Box";
import InputType from "./InputType";
import Number from "../../../assets/number-icon.svg";

const NumberSettings = ({
  required = false,
  maxnumber,
  minnumber,
  type = "number",
}) => {
  return (
    <Box>
      <InputType src={Number} type={type} />
    </Box>
  );
};

export default NumberSettings;
