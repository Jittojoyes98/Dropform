import {useCallback, useEffect,useRef } from "react";
import { editorStore } from "../Editor/EditorStore";

// https://www.joshwcomeau.com/react/usememo-and-usecallback/
// https://www.joshwcomeau.com/react/why-react-re-renders/
// When a component re-renders, it tries to re-render all descendants, regardless of whether they're being passed a particular state variable through props or not.

const useClickAway = (setAway) => {
    const ref=useRef(null)
    const isDropped = editorStore((state)=>state.isDropped)
    const changeDrop = editorStore((state)=>state.changeDrop)

    const handleClickOutside =useCallback((event) => {
        if (isDropped) {
            changeDrop()
            return;
        }
        if (ref.current && !ref.current.contains(event.target)) {
            setAway(false)
            console.log("SET AWAY", event.target);
        }
        
    },[isDropped])

    useEffect(()=>{
        document.removeEventListener("click", handleClickOutside)
        document.addEventListener("click",handleClickOutside,true);

        return ()=>{
            document.removeEventListener("click",handleClickOutside,true)
        }
    }, [handleClickOutside])
    
    return {ref}
};

export default useClickAway;
