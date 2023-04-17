import React, { useState } from "react";
import { DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import EditorDesign from "./EditorDesign";
import EditorStyles from "./EditorStyles";
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
    return (
    <div className="editor-wrapper">
        <div className="editor-main">
            <div className="editor-order">
                <p>Left sidebar</p>
            </div>
            <DndProvider backend={HTML5Backend}>
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
                
            </DndProvider>
        </div>
    </div>
  );
};

export default Editor;
