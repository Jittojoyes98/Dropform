import React, { useEffect, useRef, useState } from "react";
import {useDroppable} from '@dnd-kit/core';
// resizing : https://www.pluralsight.com/guides/render-window-resize-react

const CoreEditorDesign = ({components,setAnimationId,animationId}) => {
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

    // useEffect(() => {
    //     const handleResize = () => {
    //     const windowWidth = window.innerWidth;
    //     const windowHeight = window.innerHeight;
    //     const newWidth = Math.round(windowWidth * 0.5);
    //     const newHeight = Math.round(windowHeight * 0.5);
    //     const newScale = Math.min(newWidth / width, newHeight / height);
    //     setWidth(newWidth);
    //     setHeight(newHeight);
    //     setScale(newScale);
    //     };

    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //     window.removeEventListener('resize', handleResize);
    //     };
    // }, [width, height]);
    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });
    useEffect(()=>{
        setScale( Math.min( 
            width / 748, 
            height / 1024 
        ))
        console.log("Changing",scale);
    },[height,width])

    
    return (
        <div className="editor-design">
            <div className="editor-space-wrapper">
                <div className="editor-space" style={{transform: `scale(${scale})`}}>
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
