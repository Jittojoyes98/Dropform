import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";

const ariaLabel = { "aria-label": "description" };

const NumberQuestion = () => {
  return (
    <>
      <Box>
        <Container>
          <TextField
            variant="filled"
            placeholder="Description (optional)"
            className="input-text-question-field  input-text-question-description"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Container>
      </Box>
      <Box className="input-text-answer-field-div">
        <Container className="input-text-answer-field-wr">
          <Input
            className="input-text-answer-field "
            placeholder="Type your answer here..."
            inputProps={ariaLabel}
            disabled={true}
          />
        </Container>
      </Box>
    </>
  );
};

export default NumberQuestion;
