import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../auth";
import { supabase } from "../_supabase/supabaseInitialize";
import ProfileDropdown from "../_ui/ProfileDropdown/ProfileDropdown";
//  in material ui import the correct class name via the @mui/material/Button way or else it will slow things down.

const Header = ({ layout }) => {
  const { currentUser } = useAuthContext();
  //  we will take data from the walk through and store it somewhere.
  const navigate = useNavigate();
  const [dropName, setDropName] = useState("My Dropform");

  const handlePath = (path) => {
    navigate(`/${path}`);
  };

  const handleDropName = (e) => {
    setDropName(e.target.value);
  };

  const handleOragnisation = async () => {
    const { data, error } = await supabase.rpc("create_form_function", {
      created_user_id: "Short",
      name: "Guy",
    });
  };

  const headerType = layout === "login" || layout === "signup";
  const isDashboard = layout === "dashboard";
  const isHome = layout === "home";
  const selectPath = layout === "login" ? "signup" : "login";
  const src = `https://ui-avatars.com/api/?background=a0a0ff&color=ffffff&name=${currentUser?.user_metadata.full_name.replace(
    " ",
    "+"
  )}`;

  const ProfileIcon = () => {
    const [open, setOpen] = React.useState(false);
    const [openDrop, setOpenDrop] = React.useState(true);

    const handleClose = (event) => {
      if (event.type == "click") {
        setOpenDrop(false);
      }
      setOpen(false);
    };

    const handleOpen = (event) => {
      if (event.type == "click") {
        setOpenDrop(true);
        setOpen(false);
      } else if (!open) {
        setOpen(true);
      }
    };

    return (
      <Tooltip
        open={open && openDrop}
        onClose={handleClose}
        onOpen={handleOpen}
        disableFocusListener={true}
        title={
          currentUser ? (
            <div className="tooltip-title">
              <p className="tooltip-name">
                {currentUser.user_metadata.full_name.toUpperCase()}
              </p>
              <p className="tooltip-email">{currentUser.user_metadata.email}</p>
            </div>
          ) : (
            <></>
          )
        }
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "common.black",
              "& .MuiTooltip-arrow": {
                color: "common.black",
              },
              padding: "11px",
              fontSize: "14px",
            },
          },
        }}
        arrow
      >
        <div className="user-menu">
          <ProfileDropdown
            src={src}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
        </div>
      </Tooltip>
    );
  };

  if (layout === "editor") {
    return (
      <div className="header-wrapper-dashboard">
        <div className="header-content header-content-full">
          <div className="logo">
            <span className="editor-links">
              <Link to={"/dashboard"}>My workspace</Link>
              {"/"}
              {/* <input type='text' value="My Drpform"/> */}
              <TextField
                variant="outlined"
                size="small"
                value={dropName}
                className="dropform-name-input"
                onChange={handleDropName}
              />
            </span>
          </div>
          <div>options</div>
          <div className="auth-content">
            <ProfileIcon />
          </div>
        </div>
      </div>
    );
  }

  const LoginSignUp = () => {
    return (
      <>
        <span style={{ paddingRight: "5px" }} className="common-text-light">
          {layout === "login"
            ? "Don't have an account yet?"
            : "Already have an Account?"}
        </span>
        <Button
          variant="outlined"
          className="tertiary-button"
          onClick={() => handlePath(selectPath)}
        >
          {layout === "login" ? "Sign up" : "Log in"}
        </Button>
        {layout == "signup" ? (
          <></>
        ) : (
          <a style={{ paddingLeft: "5px" }} className="common-text-light">
            Need help?
          </a>
        )}
      </>
    );
  };
  const LogoChoose = () => {
    if (layout === "home") {
      return "Dropform";
    } else {
      return (
        <div className="logo-button-wrapper" onClick={handleOragnisation}>
          {currentUser ? (
            <>
              <div className="logo-button">
                <span>{currentUser.email[0].toUpperCase()}</span>
              </div>
              <p>{currentUser.email.split("@")[0]}</p>
            </>
          ) : (
            <></>
          )}
        </div>
      );
    }
  };

  const HeaderChoose = () => {
    if (layout === "dashboard") {
      return <ProfileIcon />;
    }
    return (
      <>
        <Button
          variant="outlined"
          className="primary-button"
          onClick={() => handlePath("login")}
        >
          Log in
        </Button>
        <Button
          variant="contained"
          className="secondary-button redirect-button"
          onClick={() => handlePath("signup")}
        >
          Sign Up
        </Button>
      </>
    );
  };

  return (
    <div
      className={classNames(
        { "header-wrapper-fixed": isHome, "header-wrapper-block": !isHome },
        {
          "header-wrapper-credentials": headerType,
          "header-wrapper-home": !headerType && layout !== "dashboard",
        },
        { "header-wrapper-dashboard": layout === "dashboard" }
      )}
    >
      <div
        className={classNames("header-content", {
          "header-content-fixed": !isDashboard,
          "header-content-full": isDashboard,
        })}
      >
        <div className="logo">{headerType ? "" : LogoChoose()}</div>
        {/* <div></div> */}
        <div className="auth-content">
          {headerType ? <LoginSignUp /> : HeaderChoose()}
        </div>
      </div>
    </div>
  );
};

export { Header };
