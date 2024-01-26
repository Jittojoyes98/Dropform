import React from "react";
import TextSettings from "../_ui/QuestionSettings/TextSettings";
import NumberSettings from "../_ui/QuestionSettings/NumberSettings";

const useSettingsMapper = () => {
  return {
    text: (props) => <TextSettings {...props} />,
    number: (props) => <NumberSettings {...props} />,
  };
};

export default useSettingsMapper;
