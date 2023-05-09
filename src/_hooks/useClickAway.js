import { useState,useEffect,useRef } from "react";
import React from "react";

const useClickAway = (setAway) => {
    const ref=useRef(null)
    const handleClickOutside=(event)=>{
        if(ref.current && !ref.current.contains(event.target)){
            setAway(false)
        }

    }
    useEffect(()=>{
        document.addEventListener("click",handleClickOutside,true)
        return ()=>{
            document.removeEventListener("click",handleClickOutside,true)
        }
    },[])
    return {ref}
};

export default useClickAway;
