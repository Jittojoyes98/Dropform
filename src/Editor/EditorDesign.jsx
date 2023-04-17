import React from "react";
import {useDrop} from "react-dnd"

const EditorDesign = ({setComponents,components,divs}) => {
  const [{isOver},drop]=useDrop(()=>({
    accept:"div",
    drop:(item)=>addImage(item.id),
    collect:(monitor)=>({
      isOver:monitor.isOver()
    })
  }))
  const addImage=(id)=>{
    const droppedDiv=divs.filter((div)=>div.id===id)
    console.log(droppedDiv);
    setComponents(components=>[...components,droppedDiv[0]])
  }
  return (
    <div className="editor-design">
        <div className="editor-space-wrapper">
            <div className="editor-space" ref={drop}>
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

export default EditorDesign;
