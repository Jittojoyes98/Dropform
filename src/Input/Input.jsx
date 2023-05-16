import classNames from "classnames";
import React from "react";

const Input = ({ heading, select, handleClick, inputRef}) => {

    const [hover,setHover]=React.useState(false)

    const handleOnHover=React.useCallback(()=>{
        setHover(true)
    },[])
    const handleOnAway=React.useCallback(()=>{
        setHover(false)
    },[])

    return (
        <p ref={inputRef}  onClick={handleClick} className={classNames("input", { "selected-input": select })} onMouseOver={handleOnHover} onMouseLeave={handleOnAway}>
            {heading}
        </p>
    )
};

export default Input;
