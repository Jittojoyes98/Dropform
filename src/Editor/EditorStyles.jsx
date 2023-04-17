import React from "react";
import {useDrag} from "react-dnd"

const EditorStyles = ({id,heading}) => {
    const [{isDraggable},drag]=useDrag(()=>({
        type:"div",
        item:{
            id:id
        },
        collect:(monitor)=> ({
            isDraggable:monitor.isDragging()
        })
    }))
    return (
        <p ref={drag} style={{ border : isDraggable ? "5px solid red":"0px" ,cursor:"pointer"}}>{heading}</p>
    )
};

export default EditorStyles;
