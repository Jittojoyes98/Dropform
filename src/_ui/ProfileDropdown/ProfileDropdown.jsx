import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ProfileDropdown({ src, handleClose, handleOpen }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    handleClose(event);
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = (event) => {
    handleOpen(event);
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div className="user-logo" onClick={handleClick} aria-describedby={id}>
        <img src={src} className="user-logo-image" />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </>
  );
}
