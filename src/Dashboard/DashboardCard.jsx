import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const DashboardCard = () => {
  return (
    <Box className="form-card">
      <Link className="form-card-link" to={"/editor"}>
        <div className="form-name">
          <p>My Dropform</p>
        </div>
        {/* {responses ? <div> 1 response</div> : <div> response</div>} */}
      </Link>
    </Box>
  );
};

export default DashboardCard;
