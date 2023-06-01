import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

const Widget = ({ id, heading, svgIcon }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: {
        id: id,
      },
    });
  const style = {
    transform: CSS.Translate.toString(CSS.Transform.None),
    height: "72px",
    width: "72px",
  };

  return (
    <div
      ref={setNodeRef}
      className="widget-element"
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
