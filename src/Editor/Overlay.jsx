import React from "react";
import { forwardRef } from "react";
import { useDndStore } from "./EditorStore";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

const CoreOverlay = forwardRef(({ children, ...props }, ref) => {
  const activeId = useDndStore((state) => state.activeId);
  return (
    <Box className="overlay-wrapper" ref={ref} {...props}>
      <Container>
        <Typography>{activeId}</Typography>
      </Container>
    </Box>
  );
});

export default CoreOverlay;
