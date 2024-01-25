import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputType from "./InputType";
import Text from "../../../assets/text-icon.svg";
import AntSwitch from "../Switch/Switch";

const TextSettings = ({
  required = false,
  isMaxcharacters = false,
  maxcharacters = "",
  type = "text",
}) => {
  const [checked, setChecked] = React.useState(required);
  const handleChange = (event) => {
    console.log(event.target.id);
    setChecked(event.target.checked);
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
              id="required"
              checked={checked}
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
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "text required" }}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default TextSettings;
