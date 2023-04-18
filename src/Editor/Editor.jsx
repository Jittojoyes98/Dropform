import React, { useState } from "react";
import { DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import EditorDesign from "./EditorDesign";
import EditorStyles from "./EditorStyles";
import { DndContext,DragOverlay } from "@dnd-kit/core";
import CoreEditorDesign from "./CoreEditorDesign";
import CoreEditorStyles from "./CoreEditorStyles";
import CoreOverlay from "./CoreOverlay";
const Editor = () => {
    const divs=[
        {
            id:1,
            heading:"First"
        },
        {
            id:2,
            heading:"Second"
        },
        {
            id:3,
            heading:"Third"
        },
    ]
    const [components,setComponents]=useState([])
    const [dragging,setDragging]=useState(false)

    const handleDragStart=(event)=>{
        console.log(event,"dragging started");
        setDragging(true)
    }
    const handleDragEnd=(event)=>{
        const {active, over} = event;
        console.log(active, over,"dragging ended");
        let id=active.id
        const droppedDiv=divs.filter((div)=>div.id===id)
        setComponents(components=>[...components,droppedDiv[0]])
        setDragging(false)
    }
    return (
    <div className="editor-wrapper">
        <div className="editor-main">
            <div className="editor-order">
                <p>Left sidebar</p>
            </div>
            {/* <DndProvider backend={HTML5Backend}>
                <EditorDesign setComponents={setComponents} components={components} divs={divs}/>
                <div className="editor-styles">
                {
                    divs.map((div)=> {
                        return (
                            <EditorStyles id={div.id} heading={div.heading}/>
                        )
                    })
                }
                </div>
                
            </DndProvider> */}
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <CoreEditorDesign setComponents={setComponents} components={components} divs={divs}/>
                <div className="editor-styles">
                {
                    divs.map((div)=> {
                        return (
                            <CoreEditorStyles id={div.id} heading={div.heading}/>
                        )
                    })
                }
                </div>
                <DragOverlay>
                    {
                        dragging ? <CoreOverlay/> :null
                    }
                </DragOverlay>
            </DndContext>
        </div>
    </div>
  );
};

export default Editor;
