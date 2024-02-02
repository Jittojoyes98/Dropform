import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import dropDownSvg from "../../assets/dropdown.svg";
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    deleteForms(formData.id);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    handleClose();
  }, []);

  // console.log("HERE", item?.order_id, "====", selectedItem);

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
      {
        <>
          <Box
            className="form-details-dropdown"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <span>
              <img
                src={dropDownSvg}
                alt="select"
                className="rotated-dropdown"
              />
            </span>
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </>
      }
    </div>
  );
};

export default SortableItems;
