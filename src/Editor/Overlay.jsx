import React from "react";
import { forwardRef } from "react";

const CoreOverlay = forwardRef (({children, ...props}, ref) => {
  return <div style={{backgroundColor:"red"}} ref={ref} {...props}>CoreOverlay</div>;
});

export default CoreOverlay;
