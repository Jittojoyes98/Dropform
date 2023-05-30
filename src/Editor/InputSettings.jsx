import React from "react";
import { editorStore } from "./EditorStore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const InputSettings = () => {
  const closeSettings = editorStore((state) => state.closeSettings);

  const selectedItem = editorStore((state) => state.selectedItem);
  const [tabIndex, setTabIndex] = React.useState(1);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-header">
        <h3>{selectedItem}</h3>
        <div onClick={closeSettings}>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="close-svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.99931 10.9751L15.0242 16.0014L16 15.027L10.9737 10.0007L16 4.97577L15.0256 4L9.99931 9.0263L4.97439 4L4 4.97577L9.02492 10.0007L4 15.0256L4.97439 16.0014L9.99931 10.9751Z"
              fill="#8092AC"
            ></path>
          </svg>
        </div>
      </div>

      <div>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="settings-tab"
          >
            <Tab value={1} label="one" />
            <Tab value={2} label="two" />
            <Tab value={3} label="three" />
          </Tabs>

          <Box sx={{ padding: 2 }}>
            {tabIndex === 1 && (
              <Box>
                <Typography>The first tab</Typography>
              </Box>
            )}
            {tabIndex === 2 && (
              <Box>
                <Typography>The second tab</Typography>
              </Box>
            )}
            {tabIndex === 3 && (
              <Box>
                <Typography>The third tab</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default InputSettings;
