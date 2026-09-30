import React from "react";
import { Button } from "@/components/ui/button";

const CreateButton = ({ handleOpenCreate }) => {
  return (
    <Button
      className="dashboard-create secondary-button h-auto px-3 py-1.5"
      onClick={handleOpenCreate}
    >
      <span className="plus-svg">
        <svg
          className="SVGInline-svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 6c0-1.10457.89543-2 2-2h8c0 1.10457-.89543 2-2 2H0z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 0v8c0 1.10457-.89543 2-2 2V2c0-1.104569.89543-2 2-2z"
          />
        </svg>
      </span>
      Create dropform
    </Button>
  );
};

export default CreateButton;
