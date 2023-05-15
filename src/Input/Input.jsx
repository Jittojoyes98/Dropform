import classNames from "classnames";
import React, { useRef } from "react";

const Input = ({ heading, select, handleClick, inputRef}) => {

    

    return (
        <p ref={inputRef}  onClick={handleClick} className={classNames("input", { "selected-input": select })}>
            {heading}
        </p>
    )
};

export default Input;
