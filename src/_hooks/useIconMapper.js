import React from "react";
import InputQuestion from "../_ui/InputQuestion/InputQuestion";

export const useIconMapper = ({ isActive }) => {
  return [{ component: <InputQuestion isActive={isActive} /> }];
};
