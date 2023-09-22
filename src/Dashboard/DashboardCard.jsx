import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useFormDetails } from "../_services/FormDetailService";
import dropDownSvg from "../../assets/dropdown.svg";

const DashboardCard = ({ formData }) => {
  const currentFormDetails = useFormDetails(
    (state) => state.currentFormDetails
  );

  return (
    <Box className="form-card">
      <Link
        className="form-card-link"
        to={`/editor/${formData.id}`}
        // onClick={() => currentFormDetails(formData)}
      >
        <div className="form-name">
          <p>{formData.form_name}</p>
        </div>
        <Box className="form-details-wrapper">
          <Box className="form-details">
            <Box>no responses</Box>
            <Box className="form-details-dropdown">
              <img src={dropDownSvg} alt="select" />
            </Box>
          </Box>
        </Box>
        {/* {responses ? <div> 1 response</div> : <div> response</div>} */}
      </Link>
    </Box>
  );
};

export default DashboardCard;
