import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";


const InputType = ({src,type}) => {
  
  return (
      <Box className="question-type">
        <Stack direction="column" spacing={2} alignItems="flex-start">
          <Typography>Type</Typography>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={src} alt={`${type}Icon`} />
                </InputAdornment>
              ),
            }}
            sx={{input: {textAlign: "center"}}}
            value={type}
            size="small"
            className="input-text-question-field question-type-input"
            disabled
          />
        </Stack>
      </Box>
  );
};

export default InputType;
