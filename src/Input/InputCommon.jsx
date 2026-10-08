import React from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import deleteSVG from "../../assets/delete.svg";

const InputCommon = ({
  handleDelete,
  questionNumber,
  questionName,
  isActive,
}) => {
  return (
    <div className="input-text-question">
      <div className="input-text-question-num">
        <p>{`${questionNumber} ->`}</p>
      </div>
      <div className="input-text-question-field-wr">
        <Input
          placeholder="Type your question here..."
          id="filled-hidden-label-small"
          className="input-text-question-field border-0 bg-[#ededf5] shadow-none"
        />
      </div>
      <div
        className={`input-text-handle-content ${
          isActive
            ? "dispaly-input-text-handle-content"
            : "hide-input-text-handle-content"
        }`}
      >
        <div className="flex flex-row items-center gap-2">
          <div className="input-text-handle-content-name">
            <p data-toggle="tooltip" title={questionName}>
              {questionName}
            </p>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div onClick={handleDelete}>
            <img
              src={deleteSVG}
              alt="delete"
              className="input-text-handle-delete"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputCommon;
