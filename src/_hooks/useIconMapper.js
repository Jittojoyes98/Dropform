import React from "react";
import InputQuestion from "../_ui/InputQuestion/InputQuestion";
import NumberQuestion from "../_components/NumberInput/NumberQuestion";

export const useIconMapper = ({ isActive }) => {
  return {
    text: <InputQuestion isActive={isActive} />,
    number: <NumberQuestion />,
  };
};
