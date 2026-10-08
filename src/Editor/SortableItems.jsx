import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dropDownSvg from "../../assets/dropdown.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { editorStore } from "./EditorStore";

const SortableItems = ({ id, selectedItem, item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
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

  const [isHovered, setIsHovered] = React.useState(false);

  const openPropertiesClicking = editorStore(
    (state) => state.openPropertiesClicking
  );
  const handleHoverOver = React.useCallback(() => {
    setIsHovered(true);
  }, []);
  const handleHoverLeave = React.useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      onClick={() => openPropertiesClicking(item.order_id)}
      onMouseOver={handleHoverOver}
      onMouseLeave={handleHoverLeave}
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
      {isHovered ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="form-details-dropdown border-0 bg-transparent p-0"
              id="basic-button"
              aria-haspopup="true"
              onClick={(e) => e.stopPropagation()}
            >
              <span>
                <img
                  src={dropDownSvg}
                  alt="select"
                  className="rotated-dropdown"
                />
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            id="basic-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>My account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  );
};

export default SortableItems;
