import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuthContext } from "../../auth";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function ProfileDropdown({
  src,
  handleClose,
  handleOpen,
  userDetails,
  email,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser, setCurrentUser, signOut } = useAuthContext();

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

  const handleLogout = async () => {
    try {
      await signOut();
      setCurrentUser();
    } catch (error) {
      // show toast
    }
  };

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
        <Box className="dropdown-wrapper">
          <Box>
            <div className="popover-user-logo">
              <img src={src} className="user-logo-image" />
              <Box className="user-details">
                <p>{userDetails}</p>
                <p>{email}</p>
              </Box>
            </div>
          </Box>
          <Box></Box>
          <Box>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
