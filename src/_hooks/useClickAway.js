import {useEffect,useRef } from "react";

const useClickAway = (setAway,select) => {
    const ref=useRef(null)

    let firstUpdate = true;

    const handleClickOutside = (event) => {
        console.log(firstUpdate);
        if (firstUpdate) {
            firstUpdate = false;
        }else if(select){
            console.log("WORKING ON THE");
        } else if (ref.current && !ref.current.contains(event.target)) {
            setAway(false)
            console.log("SET AWAY", event.target);
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
