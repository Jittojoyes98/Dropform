import React, { useEffect, useRef, useState } from "react";
import {useDroppable} from '@dnd-kit/core';
// resizing : https://www.pluralsight.com/guides/render-window-resize-react

const CoreEditorDesign = ({components,editorRef}) => {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
        data:{
            id:"droppable"
        },
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    const [scale, setScale] = useState(1);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });
    const [changedHeight,setChangedHeight]=useState(748)
    useEffect(()=>{
        let scaled=Math.min( 
            width / 1024, 
            height / 748,1 
        )
        setScale(scaled)
        setChangedHeight(()=>{
            if(Math.min(height,748)===748){
                return 848;
            }
            return Math.min(height,748);
        })
    },[height,width])

    
    return (
        <div className="editor-design" ref={editorRef}>
            <div className="editor-space-wrapper">
                <div className="editor-space" style={{transform: `scale(${scale})`,height:`${changedHeight-100}px` }}>
                    <div className="editor-drop" ref={setNodeRef} >
                    {
                    components.length > 0 ? (
                        components.map((component)=>(<p>{component.heading}</p>))
                    ):
                    <div>
                        We are doing things here
                    </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CoreEditorDesign;
