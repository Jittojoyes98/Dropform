import React from "react";

const Footer = ({ layout }) => {
  if (layout === "login" || layout == "signup") {
    return <></>;
  }
  return (
    <div className="home-footer-wrapper">
      <div className="home-footer">Footer</div>
    </div>
  );
};

export { Footer };
