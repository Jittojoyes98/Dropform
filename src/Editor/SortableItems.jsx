import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { editorStore } from "./EditorStore";

// function animateLayoutChanges(args) {
//   const { isSorting, wasDragging } = args;

//   console.log(isSorting, wasDragging, "HERE");
//   if (isSorting) {
//     return defaultAnimateLayoutChanges(args);
//   }

//   return true;
// }

const SortableItems = ({ id, selectedItem, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      // animateLayoutChanges,
      id: id,
    });

  const openPropertiesClicking = editorStore(
    (state) => state.openPropertiesClicking
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    cursor: "grabbing",
    minHeight: "56px",
  };

  console.log("Here you goo :🚀 debugging this  ",id,"----");
  return (
    <div
      className={
        selectedItem && id.order_id == selectedItem
          ? "sortable change"
          : "sortable"
      }
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <p>{id.question_name}</p>
    </div>
  );
};

export default SortableItems;
