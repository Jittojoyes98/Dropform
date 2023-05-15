import classNames from "classnames";
import React, { useRef } from "react";
import useClickAway from "../_hooks/useClickAway";

const Input = ({ heading, select, handleClick, closeProperties}) => {

    
    const { ref: inputRef } = useClickAway(closeProperties, select)


    return (
        <p ref={inputRef}  onClick={handleClick} className={classNames("input", { "selected-input": select })}>
            {heading}
        </p>
    )
};

export default Input;
