import React, { useEffect, useRef, useState } from "react";
import {useDroppable} from '@dnd-kit/core';
import { editorStore } from "./EditorStore";
import useClickAway from "../_hooks/useClickAway";
import Input from "../Input/Input";

// animation : https://web.dev/learn/css/animations/
// resizing : https://www.pluralsight.com/guides/render-window-resize-react

const Playground = ({components,editorRef}) => {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
        data:{
            id:"droppable"
        },
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    
    const selectedItem = editorStore((state)=>state.selectedItem)
    const openPropertiesClicking = editorStore((state)=>state.openPropertiesClicking)
    const closeProperties = editorStore((state) => state.closeProperties)
    



    const [scale, setScale] = useState(1);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const isDropped = editorStore((state)=>state.isDropped)

    let { ref: inputRef } = useClickAway(closeProperties,editorRef)


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
                        components.map((component,index)=>{
                            return (
                                <Input key={index}  inputRef={inputRef} heading={component.heading}  select={selectedItem && (selectedItem === index + 1)} handleClick={() => openPropertiesClicking(index + 1)} />
                            )
                        })
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

export default Playground;
