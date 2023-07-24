import React, { useEffect, useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { editorStore } from "./EditorStore";
import useClickAway from "../_hooks/useClickAway";
import Input from "../Input/Input";
import classNames from "classnames";
import InputQuestion from "../_ui/InputQuestion/InputQuestion";

// animation : https://web.dev/learn/css/animations/
// resizing : https://www.pluralsight.com/guides/render-window-resize-react

const Playground = ({ components, editorRef }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
    data: {
      id: "droppable",
    },
  });
  const style = {
    color: isOver ? "white" : undefined,
    backgroundColor: isOver ? "rgb(55, 95, 207)" : "white",
  };

  const selectedItem = editorStore((state) => state.selectedItem);
  const openPropertiesClicking = editorStore(
    (state) => state.openPropertiesClicking
  );
  const closeProperties = editorStore((state) => state.closeProperties);

  const [scale, setScale] = useState(1);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [changedHeight, setChangedHeight] = useState(748);
  const isDropped = editorStore((state) => state.isDropped);
  let { ref: inputRef } = useClickAway(closeProperties, editorRef);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  useEffect(() => {
    let scaled = Math.min(width / 1024, height / 748, 1);
    setScale(scaled);
    setChangedHeight(() => {
      if (Math.min(height, 748) === 748) {
        return 848;
      }
      return Math.min(height, 748);
    });
  }, [height, width]);

  return (
    <div className="editor-design" ref={editorRef}>
      <div className="editor-space-wrapper">
        <div
          className="editor-space"
          style={{
            transform: `scale(${scale})`,
            height: `${changedHeight - 100}px`,
          }}
        >
          <div className="editor-drop-wrapper">
            {components && components.length > 0 ? (
              components.map((component, index) => {
                return (
                  <Input
                    key={index}
                    inputRef={inputRef}
                    component={component}
                    heading={component.type}
                    select={selectedItem && selectedItem === index + 1}
                    handleClick={() => openPropertiesClicking(index + 1)}
                  />
                );
              })
            ) : (
              <></>
            )}
            <div
              ref={setNodeRef}
              className={classNames("editor-drop", {
                "editor-drop-onover-wrapper": isOver,
              })}
            >
              <div
                className={classNames({
                  "editor-drop-onover": isOver,
                })}
              >
                Drag new inputs to your form
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
