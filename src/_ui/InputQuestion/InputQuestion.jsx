import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import deleteSVG from "../../../assets/delete.svg";
import { useQuestions } from "../../_services/QuestionService";
import InputCommon from "../../Input/InputCommon";

const ariaLabel = { "aria-label": "description" };

const InputQuestion = ({
  isActive,
  questionNumber,
  questionName,
  questionId,
}) => {
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

export default InputQuestion;
