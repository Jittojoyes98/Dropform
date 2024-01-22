import React from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";
import { Footer } from "./Footer";
import { Header } from "./Header";


const Layout = ({ layout }) => {
  // make use of loader, the full loader (mainly for auth loader)
  const isHome = layout === "home";
  const isDashboard = layout === "dashboard";
  const isEditor = layout === "editor";

  return (
    <div className="main">
      <Header layout={layout} />
      <div
        className={classNames({
          content: isHome,
          "content-dashboard": isDashboard || isEditor,
          "content-other": !isDashboard && !isHome && !isEditor,
        })}
      >
        <Outlet />
      </div>
      {isEditor ? <></> : <Footer layout={layout} />}
    </div>
  );
};

export { Layout };
