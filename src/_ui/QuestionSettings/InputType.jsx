import React from "react";
import { Input } from "@/components/ui/input";

const InputType = ({ src, type }) => {
  return (
    <div className="question-type">
      <div className="flex flex-col items-start gap-2">
        <p>Type</p>
        <div className="relative w-full">
          <img
            src={src}
            alt={`${type}Icon`}
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2"
          />
          <Input
            value={type}
            className="input-text-question-field question-type-input text-center pl-9"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default InputType;
