import React from "react";

const headerContent = ({ headerType }) => {
  if (headerType) {
    return <LoginSignUp />;
  } else {
    return HeaderChoose();
  }
};

const MemoizedHandleHeaderContent = React.memo(headerContent);

export default MemoizedHandleHeaderContent;
