import React from "react";
import { forwardRef } from "react";
import { useDndStore } from "./EditorStore";

const CoreOverlay = forwardRef(({ children, ...props }, ref) => {
  const activeId = useDndStore((state) => state.activeId);

  return (
    <div
      style={{ backgroundColor: "red", width: "fit-content" }}
      ref={ref}
      {...props}
    >
      {activeId}
    </div>
  );
});

export default CoreOverlay;
