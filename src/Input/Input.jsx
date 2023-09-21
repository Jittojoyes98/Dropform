import React from "react";
import Box from "@mui/material/Box";
import classNames from "classnames";
import { useIconMapper } from "../_hooks/useIconMapper";
import InputCommon from "./InputCommon";
import { useQuestions } from "../_services/QuestionService";

const Input = ({
  heading,
  select,
  handleClick,
  inputRef,
  component,
  questionNumber,
}) => {
  const [hover, setHover] = React.useState(false);

  const handleOnHover = React.useCallback(() => {
    setHover(true);
  }, []);
  const handleOnAway = React.useCallback(() => {
    setHover(false);
  }, []);
  const iconComponents = useIconMapper({ isActive: select || hover });

  const [deleteQuestion] = useQuestions((state) => {
    return [state.deleteQuestion];
  });

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteQuestion(component.id);
  };

  return (
    <Box
      ref={inputRef}
      onClick={handleClick}
      className={classNames(
        "input-text-wrapper",
        {
          "selected-input": select || hover,
        },
        { "unselected-input": !(select || hover) }
      )}
      onMouseOver={handleOnHover}
      onMouseLeave={handleOnAway}
    >
      <>
        <InputCommon
          questionNumber={questionNumber}
          questionName={component.question_name}
          handleDelete={handleDelete}
          isActive={select || hover}
        />
        {iconComponents[component.type]({
          questionNumber,
          questionName: component.question_name,
          questionId: component.id,
        })}
      </>
    </Box>
  );
};

export default Input;
