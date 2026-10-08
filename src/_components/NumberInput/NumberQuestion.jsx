import React from "react";
import { Input } from "@/components/ui/input";

const ariaLabel = { "aria-label": "description" };

const NumberQuestion = () => {
  return (
    <>
      <div>
        <div>
          <Input
            placeholder="Description (optional)"
            className="input-text-question-field input-text-question-description border-0 bg-[#ededf5] shadow-none"
          />
        </div>
      </div>
      <div className="input-text-answer-field-div">
        <div className="input-text-answer-field-wr">
          <Input
            className="input-text-answer-field border-0 shadow-none"
            placeholder="Type your answer here..."
            {...ariaLabel}
            disabled
          />
        </div>
      </div>
    </>
  );
};

export default NumberQuestion;
