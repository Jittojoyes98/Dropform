import React from "react";
import InputType from "./InputType";
import Text from "../../../assets/text-icon.svg";
import AntSwitch from "../Switch/Switch";
import { useQuestionPropertyServices } from "../../_services/QuestionService";
import { useQuestionProperties } from "./SettingsStore";

const TextSettings = (currentQuestionProperties) => {
  const { type = "text" } = currentQuestionProperties;

  const updateQuestionPropertiesService = useQuestionPropertyServices(
    (state) => state.updateQuestionPropertiesService
  );

  const [updateQuestionProperties] = useQuestionProperties((state) => {
    return [state.updateQuestionProperties];
  });

  const handleChange = async (event) => {
    const updatedProperties = {
      ...currentQuestionProperties,
      [event.target.name]: event.target.checked,
    };
    updateQuestionProperties(updatedProperties);

    const isUpdated = await updateQuestionPropertiesService(updatedProperties);
    if (!isUpdated) {
      updateQuestionProperties({
        ...currentQuestionProperties,
        [event.target.name]: !event.target.checked,
      });
    }
  };

  return (
    <div>
      <InputType src={Text} type={type} />
      <div className="question-properties-wrapper flex flex-col items-start gap-2">
        <p className="question-properties-header">Settings</p>
        <div className="question-properties">
          <div className="flex flex-row items-center justify-between gap-2">
            <p>Required</p>
            <AntSwitch
              name="required"
              checked={currentQuestionProperties.required}
              onChange={handleChange}
              aria-label="text required"
            />
          </div>
        </div>
        <div className="question-properties">
          <div className="flex flex-row items-center justify-between gap-2">
            <p>Max characters</p>
            <AntSwitch
              checked={currentQuestionProperties.is_max_char}
              onChange={handleChange}
              name="is_max_char"
              aria-label="maximum character required"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSettings;
