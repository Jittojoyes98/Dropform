import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const DashboardCard = ({ formData }) => {
  return (
    <Box className="form-card">
      <Link className="form-card-link" to={`/editor/${formData.id}`}>
        <div className="form-name">
          <p>{formData.form_name}</p>
        </div>
        {/* {responses ? <div> 1 response</div> : <div> response</div>} */}
      </Link>
    </Box>
  );
};

export default DashboardCard;
