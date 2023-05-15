import {useCallback, useEffect,useRef } from "react";
import { editorStore } from "../Editor/EditorStore";

// https://www.joshwcomeau.com/react/usememo-and-usecallback/
// https://www.joshwcomeau.com/react/why-react-re-renders/
// When a component re-renders, it tries to re-render all descendants, regardless of whether they're being passed a particular state variable through props or not.

const useClickAway = (setAway) => {
    const ref=useRef(null)
    const isDropped = editorStore((state)=>state.isDropped)
    const changeDrop = editorStore((state)=>state.changeDrop)

    let firstUpdate=true
    const handleClickOutside =(event) => {
        console.log(firstUpdate);
        if (firstUpdate) {
            firstUpdate=false;
            return;
        }
        
        if (ref.current && !ref.current.contains(event.target)) {
            setAway(false)
            console.log("SET AWAY", event.target);
        }
        
    }

    useEffect(()=>{
        if(isDropped){
            document.addEventListener("click",handleClickOutside,true);
            changeDrop()
        }
        return ()=>{
            document.removeEventListener("click",handleClickOutside,true)
        }
    },[isDropped])
    return {ref}
};

export default useClickAway;
