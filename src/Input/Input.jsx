import React from "react";
import Box from "@mui/material/Box";
import classNames from "classnames";
import { useIconMapper } from "../_hooks/useIconMapper";

const Input = ({ heading, select, handleClick, inputRef, component }) => {
  console.log(component.type);

  const [hover, setHover] = React.useState(false);

  const handleOnHover = React.useCallback(() => {
    setHover(true);
  }, []);
  const handleOnAway = React.useCallback(() => {
    setHover(false);
  }, []);
  const iconComponents = useIconMapper({ isActive: select || hover });

  //   iconComponents[0].component.props.isActive = select || hover;
  return (
    <Box
      ref={inputRef}
      onClick={handleClick}
      className={classNames(
        "input-text-wrapper",
        {
          "selected-input": select || hover,
        },
        { "unselected-input": !(select || hover) }
      )}
      onMouseOver={handleOnHover}
      onMouseLeave={handleOnAway}
    >
      {iconComponents[component.type]}
    </Box>
  );
};

export default Input;
