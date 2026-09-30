import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateFormStore } from "../_services/CreateFormService";
import dropDownSvg from "../../assets/dropdown.svg";

const DashboardCard = ({ formData }) => {
  const [deleteForms] = useCreateFormStore((state) => {
    return [state.deleteForms, state.error];
  });

  const handleDelete = () => {
    deleteForms(formData.id);
  };

  return (
    <div className="form-card">
      <Link className="form-card-link" to={`/${formData.id}/edit`}>
        <div className="form-name">
          <p title={formData.form_name} data-toggle="tooltip">
            {formData.form_name}
          </p>
        </div>
      </Link>
      <div className="form-details-wrapper">
        <div className="form-details">
          <div>no responses</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="form-details-dropdown border-0 bg-transparent p-0"
                id="basic-button"
                aria-haspopup="true"
              >
                <img src={dropDownSvg} alt="select" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" id="form-action-menu">
              <DropdownMenuItem asChild>
                <Link to={`/${formData.id}/results`}>Results</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
