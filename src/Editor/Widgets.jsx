import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect } from "react";
import { initEditorWalkThrough } from "../_helpers/walkThrough";

const Widget = ({ id, heading, svgIcon }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: {
        id: id,
        type: heading,
      },
    });
  const style = {
    transform: CSS.Translate.toString(CSS.Transform.None),
    height: "72px",
    width: "72px",
  };

  useEffect(() => {
    initEditorWalkThrough();
  }, []);

  return (
    <div
      ref={setNodeRef}
      className={`widget-element widget-${heading}`}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div>
        <div>{svgIcon}</div>
        <p>{heading}</p>
      </div>
    </div>
  );
};

export default Widget;
