import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../auth";
import ProfileDropdown from "../_ui/ProfileDropdown/ProfileDropdown";
import { useFormDetails } from "../_services/FormDetailService";
import { SvgAssets } from "../_helpers/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = ({ layout }) => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const [dropName, setDropName] = useState("My Dropform");
  const data = useFormDetails((state) => state.data);

  useEffect(() => {
    if (data) {
      setDropName(data[0].form_name);
    }
  }, [data]);

  const handlePath = (path) => {
    navigate(`/${path}`);
  };

  const handleDropName = (e) => {
    setDropName(e.target.value);
  };

  const headerType = layout === "login" || layout === "signup";
  const isDashboard = layout === "dashboard";
  const isHome = layout === "home";
  const selectPath = layout === "login" ? "signup" : "login";
  const src = `https://ui-avatars.com/api/?background=a0a0ff&color=ffffff&name=${(
    currentUser?.user_metadata?.full_name || "Anonymous Anonymous"
  ).replace(" ", "+")}`;

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
    const userDetails =
      currentUser?.user_metadata?.full_name?.toUpperCase() ||
      "Anonymous Anonymous".toUpperCase();

    return (
      <Tooltip open={open && openDrop} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <div className="user-menu">
            <ProfileDropdown
              userDetails={userDetails}
              src={src}
              email={currentUser?.email}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          </div>
        </TooltipTrigger>
        {currentUser ? (
          <TooltipContent
            side="bottom"
            className="bg-black px-[11px] py-[11px] text-sm text-white"
          >
            <div className="tooltip-title">
              <p className="tooltip-name">{userDetails}</p>
              <p className="tooltip-email">{currentUser?.email}</p>
            </div>
          </TooltipContent>
        ) : null}
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
              <Input
                value={dropName}
                className="dropform-name-input h-8 w-auto"
                onChange={handleDropName}
              />
            </span>
          </div>
          <div>options</div>
          <div className="auth-content">
            <div className="centre-div ">
              <div>
                <Button className="secondary-button">Preview</Button>
              </div>
              <div>
                <Button className="secondary-button">Publish</Button>
              </div>
            </div>

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
          variant="outline"
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
      return (
        <>
          <img
            src={SvgAssets.dropformLogo}
            alt="Dropform Logo"
            className="dropform-svg"
            style={{ width: "30px", height: "30px" }}
          />
          <a
            href="/"
            className="logo-text-light margin-rl-fix full-height centre-div"
          >
            Dropform
          </a>
        </>
      );
    } else {
      return (
        <div className="logo-button-wrapper">
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
          variant="outline"
          className="primary-button"
          onClick={() => handlePath("login")}
        >
          Log in
        </Button>
        <Button
          className="secondary-button redirect-button"
          onClick={() => handlePath("signup")}
        >
          Sign Up
        </Button>
      </>
    );
  };

  const handleHeaderContent = () => {
    if (headerType) {
      return <LoginSignUp />;
    } else {
      return HeaderChoose();
    }
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
        <div className="centre-div">{headerType ? "" : LogoChoose()}</div>
        <div className="auth-content">{handleHeaderContent()}</div>
      </div>
    </div>
  );
};

export { Header };
