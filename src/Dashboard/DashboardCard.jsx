import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useFormDetails } from "../_services/FormDetailService";
import dropDownSvg from "../../assets/dropdown.svg";
import { useCreateFormStore } from "../_services/CreateFormService";

const DashboardCard = ({ formData }) => {
  const currentFormDetails = useFormDetails(
    (state) => state.currentFormDetails
  );
  const [deleteForms] = useCreateFormStore((state) => {
    return [state.deleteForms];
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    deleteForms(formData.id);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      </Link>
      <Box className="form-details-wrapper">
        <Box className="form-details">
          <Box>no responses</Box>
          <Box
            className="form-details-dropdown"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <img src={dropDownSvg} alt="select" />
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Box>
      </Box>
      {/* {responses ? <div> 1 response</div> : <div> response</div>} */}
    </Box>
  );
};

export default DashboardCard;
