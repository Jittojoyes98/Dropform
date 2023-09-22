import React from "react";
import Button from "@mui/material/Button";

const CreateButton = ({ handleOpenCreate }) => {
  return (
    <Button
      variant="contained"
      className="dashboard-create secondary-button"
      style={{ padding: "6px 12px" }}
      onClick={handleOpenCreate}
    >
      <span className="plus-svg">
        <svg
          class="SVGInline-svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 6c0-1.10457.89543-2 2-2h8c0 1.10457-.89543 2-2 2H0z"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6 0v8c0 1.10457-.89543 2-2 2V2c0-1.104569.89543-2 2-2z"
          ></path>
        </svg>
      </span>
      Create dropform
    </Button>
  );
};

export default CreateButton;
