import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import deleteSVG from "../../../assets/delete.svg";

const ariaLabel = { "aria-label": "description" };

const InputQuestion = ({ isActive }) => {
  return (
    <>
      <Box className="input-text-question">
        <Container className="input-text-question-num">
          <Typography>{`1 ->`}</Typography>
        </Container>
        <Container className="input-text-question-field-wr">
          <TextField
            placeholder="Type your question here..."
            id="filled-hidden-label-small"
            variant="filled"
            className="input-text-question-field"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Container>
        {/* reusable part */}
        <Container
          className={`input-text-handle-content ${
            isActive
              ? "dispaly-input-text-handle-content"
              : "hide-input-text-handle-content"
          }`}
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Box className="input-text-handle-content-name">
              <Typography>Text 1</Typography>
            </Box>
            <Box>
              <img
                src={deleteSVG}
                alt="delete"
                className="input-text-handle-delete"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
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
