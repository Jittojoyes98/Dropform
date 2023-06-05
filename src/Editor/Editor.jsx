import React, { useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  MeasuringStrategy,
} from "@dnd-kit/core";
import Playground from "./Playground";
import Widget from "./Widgets";
import Overlay from "./Overlay";
import SortableItems from "./SortableItems";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { editorStore, useDndStore } from "./EditorStore";
import InputSettings from "./InputSettings";

const Editor = () => {
  const openPropertiesDropping = editorStore(
    (state) => state.openPropertiesDropping
  );
  const setActiveIdOnStart = useDndStore((state) => state.setActiveIdOnStart);
  const setActiveIdOnEnd = useDndStore((state) => state.setActiveIdOnEnd);

  const selectedItem = editorStore((state) => state.selectedItem);
  const itemSelected = editorStore((state) => state.itemSelected);
  const [components, setComponents] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [languages, setLanguages] = useState(["python", "javascript", "java"]);

  const divs = [
    {
      id: 1,
      heading: "Text",
      svgIcon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.75 3C2.75 2.73478 2.85536 2.48043 3.04289 2.29289C3.23043 2.10536 3.48478 2 3.75 2H16.25C16.5152 2 16.7696 2.10536 16.9571 2.29289C17.1446 2.48043 17.25 2.73478 17.25 3V5C17.25 5.26522 17.1446 5.51957 16.9571 5.70711C16.7696 5.89464 16.5152 6 16.25 6C15.9848 6 15.7304 5.89464 15.5429 5.70711C15.3554 5.51957 15.25 5.26522 15.25 5V4H11V16H12C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18H8C7.73478 18 7.48043 17.8946 7.29289 17.7071C7.10536 17.5196 7 17.2652 7 17C7 16.7348 7.10536 16.4804 7.29289 16.2929C7.48043 16.1054 7.73478 16 8 16H9V4H4.75V5C4.75 5.26522 4.64464 5.51957 4.45711 5.70711C4.26957 5.89464 4.01522 6 3.75 6C3.48478 6 3.23043 5.89464 3.04289 5.70711C2.85536 5.51957 2.75 5.26522 2.75 5V3Z"
            fill="#61656F"
          />
        </svg>
      ),
    },
    {
      id: 2,
      heading: "Number",
      svgIcon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.997 2.63211C13.4143 2.21705 12.7143 1.99758 11.9985 2.00579H10V3.61117H11.9985C12.4915 3.56937 12.931 3.91948 13.0006 4.40844V15.5919C12.9337 16.0831 12.4934 16.4359 11.9985 16.3944H10V17.9998H11.9985C12.7135 18.0073 13.4124 17.79 13.997 17.3791C14.5831 17.7871 15.2813 18.0039 15.9959 17.9998H18V16.3944H16.0011C15.5062 16.4359 15.066 16.0831 14.999 15.5919V4.40271C15.0685 3.91338 15.5081 3.56364 16.0011 3.60544H17.9996V2.00006H16.0011C15.2835 1.99595 14.5823 2.21691 13.997 2.6316V2.63211Z"
            fill="#61656F"
          />
          <path
            d="M8 16H2V11.2857C2 10.8689 2.15804 10.4692 2.43934 10.1745C2.72064 9.87985 3.10218 9.71429 3.5 9.71429H6.5V6.57143H2V5H6.5C6.89782 5 7.27936 5.16556 7.56066 5.46026C7.84196 5.75496 8 6.15466 8 6.57143V9.71429C8 10.1311 7.84196 10.5308 7.56066 10.8255C7.27936 11.1202 6.89782 11.2857 6.5 11.2857H3.5V14.4286H8V16Z"
            fill="#61656F"
          />
        </svg>
      ),
    },
  ];

  const handleDragStart = (event) => {
    setDragging(true);
    console.log("ACTIVE", event);
    setActiveIdOnStart(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    let id = active.id;
    setActiveIdOnEnd();

    if (over) {
      const droppedDiv = divs.filter((div) => div.id === id);
      openPropertiesDropping(components.length + 1);
      setComponents((components) => [...components, droppedDiv[0]]);
    }
    setDragging(false);
  };
  const handleDragStartLeft = () => {};
  const handleDragSortableEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setLanguages((language) => {
        const activeIndex = language.indexOf(active.id);
        const overIndex = language.indexOf(over.id);
        console.log(
          arrayMove(language, activeIndex, overIndex),
          "THE CHANGED ARRAY"
        );
        return arrayMove(language, activeIndex, overIndex);
      });
    }
  };
  const measuringConfig = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };
  const editorRef = useRef(null);
  return (
    <div className="editor-wrapper">
      <div className="editor-main">
        <div className="editor-order">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragSortableEnd}
            // measuring={measuringConfig}
          >
            <SortableContext
              items={languages}
              strategy={verticalListSortingStrategy}
            >
              {languages.map((lan, index) => (
                <SortableItems key={lan} id={lan} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <Playground
            setComponents={setComponents}
            components={components}
            divs={divs}
            editorRef={editorRef}
          />
          <div className="editor-sidebar">
            <div className="widget-wrapper">
              {itemSelected ? (
                <InputSettings />
              ) : (
                <>
                  <span style={{ width: "100%" }}>Commonly used</span>
                  {divs.map((div, index) => {
                    return (
                      <Widget
                        key={div.heading}
                        id={div.id}
                        heading={div.heading}
                        svgIcon={div.svgIcon}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
          {editorRef.current ? (
            createPortal(
              <DragOverlay
                dropAnimation={null}
                modifiers={[restrictToWindowEdges]}
                zIndex={2}
              >
                {dragging ? <Overlay /> : null}
              </DragOverlay>,
              editorRef.current
            )
          ) : (
            <></>
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default Editor;
