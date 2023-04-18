import { useDraggable } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';
import React from "react";

const CoreEditorStyles = ({id,heading}) => {
    const {attributes, listeners, setNodeRef, transform,isDragging}=useDraggable({
        id:id,
        data:{
            id:id
        }
    })
    const style={
        transform: CSS.Translate.toString(CSS.Transform.None),
        color: isDragging ? "red":undefined
    }

    return (
        <div ref={setNodeRef} className="change">
            <p  style={style} {...listeners} {...attributes} >{heading}</p>
        </div>
    )
};

export default CoreEditorStyles;
