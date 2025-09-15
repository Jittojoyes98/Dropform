import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { circularProgressClasses } from "@mui/material/CircularProgress";

function CircularProgressLoader(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#d2ddec" : "#308fe8",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          top: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export { CircularProgressLoader };