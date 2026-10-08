import React from "react";
import { forwardRef } from "react";
import { useDndStore } from "./EditorStore";

const CoreOverlay = forwardRef(({ children, ...props }, ref) => {
  const activeId = useDndStore((state) => state.activeId);
  return (
    <div className="overlay-wrapper" ref={ref} {...props}>
      <div>
        <p>{activeId}</p>
      </div>
    </div>
  );
});

export default CoreOverlay;
