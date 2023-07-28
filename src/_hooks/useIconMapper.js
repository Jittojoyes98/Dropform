import React from "react";
import InputQuestion from "../_ui/InputQuestion/InputQuestion";
import NumberQuestion from "../_components/NumberInput/NumberQuestion";

export const useIconMapper = ({ isActive }) => {
  return {
    text: (props) => <InputQuestion isActive={isActive} {...props} />,
    number: (props) => <NumberQuestion {...props} />,
  };
};
