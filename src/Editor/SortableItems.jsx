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

const SortableItems = ({ id, selectedItem, item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      // animateLayoutChanges,
      id: id,
      data: {
        item,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    minHeight: "56px",
  };

  const openPropertiesClicking = editorStore(
    (state) => state.openPropertiesClicking
  );

  // console.log("HERE", item?.order_id, "====", selectedItem);

  return (
    <div
      onClick={() => openPropertiesClicking(item.order_id)}
      className={
        selectedItem && item?.order_id == selectedItem
          ? "sortable change"
          : "sortable"
      }
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <p>{item.question_name}</p>
    </div>
  );
};

export default SortableItems;
