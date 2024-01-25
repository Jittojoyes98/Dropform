import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputType from "./InputType";
import Text from "../../../assets/text-icon.svg";
import AntSwitch from "../Switch/Switch"

const TextSettings = ({ required = false, maxcharacters = "" ,type="text"}) => {
  const [checked, setChecked] = React.useState(required);
  const handleChange = (event) => {
    console.log(event.target);
    setChecked(event.target.checked);
  };
  return (
    <Box>
      <InputType src={Text} type={type}/>
      <Stack direction="column" spacing={2} alignItems="flex-start" >
        <Typography className="question-properties-header">Settings</Typography>
        <Box className="question-properties">
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography>Required</Typography>
            <AntSwitch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "ant design" }}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default TextSettings;
