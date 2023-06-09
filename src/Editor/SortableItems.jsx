import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";


function animateLayoutChanges(args) {
    const { isSorting, wasDragging } = args;

    console.log(isSorting, wasDragging,"HERE");
    if (isSorting) {
        return defaultAnimateLayoutChanges(args);
    }

    return true;
}

const SortableItems = ({id}) => {
    const { attributes, listeners, setNodeRef,transform,transition}=useSortable({
        // animateLayoutChanges,
        id:id    
    })
    const style={
        transform:CSS.Transform.toString(transform),
        transition,
    }
    return (
        <div className="change" ref={setNodeRef} style={style} {...attributes} {...listeners} >
            <p>{id}</p>
        </div>
    )
};

export default SortableItems;
