import React, { useEffect } from "react";
import {useDroppable} from '@dnd-kit/core';

const CoreEditorDesign = ({components}) => {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
        data:{
            id:"droppable"
        },
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    // let animationId;

    // function animate(){
    //     animationId=requestAnimationFrame(animate)
    // }

    // useEffect(() => {
    //     animate();
    //     console.log(animationId);
    //     return () => cancelAnimationFrame(animationId)
    // }, []);
    
    return (
        <div className="editor-design">
            <div className="editor-space-wrapper">
                <div className="editor-space" ref={setNodeRef} style={style}>
                    <div className="editor-drop">
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
