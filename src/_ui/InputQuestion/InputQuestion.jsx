import React from "react";
import Box from "@mui/material/Box"
import  Container  from "@mui/material/Container";
import  Typography  from "@mui/material/Typography";

const InputQuestion = () => {
  return (
  <Box className="input-text-wrapper">
    <Box className="input-text-question">
        <Container>
          <Typography>1</Typography>
        </Container>
        <Container>


        </Container>
        <Container className="input-text-handle-content">
          <Typography>Text 1</Typography>
        </Container>
    </Box>
    
    
  </Box>
  )
};

export default InputQuestion;
