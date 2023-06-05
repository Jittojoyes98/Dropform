import React from "react";
import { forwardRef } from "react";
import { dndStore } from "./EditorStore";

const CoreOverlay = forwardRef (({children, ...props}, ref) => {
  const activeId = dndStore((state) => state.activeId)

  return <div style={{ backgroundColor: "red", width: "fit-content" }} ref={ref} {...props}>{activeId}</div>;
});

export default CoreOverlay;
