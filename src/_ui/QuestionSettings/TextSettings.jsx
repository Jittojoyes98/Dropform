import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputType from "./InputType";
import Text from "../../../assets/text-icon.svg";
import AntSwitch from "../Switch/Switch";
import { useQuestionPropertyServices } from "../../_services/QuestionService";
import { useQuestionProperties } from "./SettingsStore";

const TextSettings = (currentQuestionProperties) => {
  const {
  required = false,
  is_max_char = false,
  max_char = "",
  type = "text",
  actual_question
  } =currentQuestionProperties;
  
  const updateQuestionPropertiesService = useQuestionPropertyServices((state) => state.updateQuestionPropertiesService);

  const [updateQuestionProperties] = useQuestionProperties((state) => {
    return [state.updateQuestionProperties];
  });

  const handleChange = async(event) => {
    const updatedProperties={...currentQuestionProperties, [event.target.name]: event.target.checked }
    updateQuestionProperties(updatedProperties)

    const isUpdated = await updateQuestionPropertiesService(updatedProperties)
    if(!isUpdated){
      updateQuestionProperties({...currentQuestionProperties, [event.target.name]: !event.target.checked })
    }
  };
  
  return (
    <Box>
      <InputType src={Text} type={type} />
      <Stack
        direction="column"
        spacing={2}
        alignItems="flex-start"
        className="question-properties-wrapper"
      >
        <Typography className="question-properties-header">Settings</Typography>
        <Box className="question-properties">
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography>Required</Typography>
            <AntSwitch
              name="required"
              checked={currentQuestionProperties.required}
              onChange={handleChange}
              inputProps={{ "aria-label": "text required" }}
            />
          </Stack>
        </Box>
        {/* convert to map in future */}
        <Box className="question-properties">
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography>Max characters</Typography>
            <AntSwitch
              checked={currentQuestionProperties.is_max_char}
              onChange={handleChange}
              name="is_max_char"
              inputProps={{ "aria-label": "maximum character required" }}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default TextSettings;
