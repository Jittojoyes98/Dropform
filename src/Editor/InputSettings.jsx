import React, { useState } from "react";
import { editorStore } from "./EditorStore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { useQuestions } from "../_services/QuestionService";
import { Input, InputAdornment, Stack } from "@mui/material";
import useSettingsMapper from "../_hooks/useSettingsMapper";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "rgb(38, 38, 39)",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgb(137, 137, 137)",
    "&.Mui-selected": {
      color: "rgb(38, 38, 39)",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

const InputSettings = ({ currentInput }) => {
  // console.log(questionName);
  // issue with selcting the last question on clicking from one question to another.
  console.log(currentInput, "THE CURRENT QUESTION");
  const [updateQuestionName] = useQuestions((state) => {
    return [state.updateQuestionName];
  });
  const closeSettings = editorStore((state) => state.closeSettings);

  const selectedItem = editorStore((state) => state.selectedItem);
  const [tabIndex, setTabIndex] = React.useState(1);

  const handleChange = React.useCallback((event, newValue) => {
    setTabIndex(newValue);
  }, []);
  let currentInputName = currentInput?.question_name;
  const [inputName, setInputName] = useState(currentInput?.question_name);
  const inputRef = React.useRef(currentInput?.question_name);

  const handleNameChange = React.useCallback((e) => {
    setInputName(e.target.value);
    inputRef.current = e.target.value;
  }, []);

  React.useEffect(() => {
    setInputName(currentInput?.question_name);
    inputRef.current = currentInput?.question_name;
  }, [currentInput]);

  const handleClickAway = React.useCallback(() => {
    if (inputName && inputName != currentInputName) {
      updateQuestionName(currentInput.id, inputName);
    } else {
      setInputName(currentInputName);
    }
  }, [inputName]);

  console.log(currentInput);

  const QuestionSettings = useSettingsMapper()[currentInput.type];

  return (
    <div className="settings-wrapper">
      <div className="settings-header">
        <ClickAwayListener onClickAway={handleClickAway}>
          <TextField
            value={inputRef.current}
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            className="input-text-question-field"
            sx={{ marginRight: "10px" }}
            // InputProps={{
            //   disableUnderline: true,
            // }}
            onChange={handleNameChange}
          />
        </ClickAwayListener>
        {/* <p>{questionName}</p> */}
        <div onClick={closeSettings} className="settings-close">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="close-svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.99931 10.9751L15.0242 16.0014L16 15.027L10.9737 10.0007L16 4.97577L15.0256 4L9.99931 9.0263L4.97439 4L4 4.97577L9.02492 10.0007L4 15.0256L4.97439 16.0014L9.99931 10.9751Z"
              fill="#8092AC"
            ></path>
          </svg>
        </div>
      </div>

      <div>
        <Box sx={{ width: "100%" }}>
          <StyledTabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="settings-tab"
            className="input-settings-tab"
          >
            <StyledTab value={1} label="Question" />
            <StyledTab value={2} label="Styles" />
            <StyledTab value={3} label="three" />
          </StyledTabs>

          <Box className="settings-tab-wrapper">
            {tabIndex === 1 && QuestionSettings({})}
            {tabIndex === 2 && (
              <Box>
                <Typography>The second tab</Typography>
              </Box>
            )}
            {tabIndex === 3 && (
              <Box>
                <Typography>The third tab</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default InputSettings;
