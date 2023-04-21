import React, { useState } from "react";
import { DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import EditorDesign from "./EditorDesign";
import EditorStyles from "./EditorStyles";
import { DndContext, DragOverlay, closestCenter, MeasuringStrategy } from "@dnd-kit/core";
import CoreEditorDesign from "./CoreEditorDesign";
import CoreEditorStyles from "./CoreEditorStyles";
import CoreOverlay from "./CoreOverlay";
import SortableItems from "./SortableItems";
import { arrayMove,SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

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
    const [languages,setLanguages]=useState(["python","javascript","java"])
    const handleDragStartLeft=()=>{

    }
    const handleDragEndLeft=(event)=>{
        const {active,over}=event
        console.log("ACTIVE IS",active);
        console.log("OVER IS", over);

        if(active.id !==over.id){
            setLanguages((language)=>{
                const activeIndex = language.indexOf(active.id)
                const overIndex = language.indexOf(over.id)
                console.log(arrayMove(language, activeIndex, overIndex),"THE CHANGED ARRAY");
                return arrayMove(language, activeIndex, overIndex)
            })
        }
    }
    const measuringConfig = {
        droppable: {
            strategy: MeasuringStrategy.Always,
        }
    };
    return (
    <div className="editor-wrapper">
        <div className="editor-main">
            <div className="editor-order">
                    <DndContext 
                        collisionDetection={closestCenter} 
                        onDragEnd={handleDragEndLeft}
                        // measuring={measuringConfig}
                    >
                        <SortableContext
                            items={languages}
                            strategy={verticalListSortingStrategy}                  
                        >
                            {
                                languages.map((lan,index)=>(<SortableItems  key={lan} id={lan}/>))
                            }
                        </SortableContext>
                    </DndContext>
            </div>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <CoreEditorDesign setComponents={setComponents} components={components} divs={divs}/>
                <div className="editor-styles">
                {
                    divs.map((div,index)=> {
                        return (
                            <CoreEditorStyles key={div.heading} id={div.id} heading={div.heading}/>
                        )
                    })
                }
                </div>
                <DragOverlay dropAnimation={null}>
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
