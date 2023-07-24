import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import closeSvg from "../../../assets/close.svg";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuthContext } from "../../auth";
import { useCreateFormStore } from "../../_services/CreateFormService";
import { useNavigate } from "react-router-dom";

const formNameSchema = yup.object({
  formName: yup
    .string("Enter your Name")
    .required("Please enter your Name")
    .min(3, "Atleast 3 charecter required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  padding: 4,
};

const CreateForm = ({ open, handleClose }) => {
  const { currentUser } = useAuthContext();
  const createForm = useCreateFormStore((state) => state.createForm);

  const formik = useFormik({
    initialValues: {
      formName: "",
    },
    validationSchema: formNameSchema,
    onSubmit: (values) => {
      createForm(values, currentUser.id);
      handleClose();
    },
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-generateform-title"
      aria-describedby="modal-generateform-description"
    >
      <Box className="create-form-modal">
        <Box className="create-form-modal-closewrapper">
          <img src={closeSvg} onClick={handleClose} />
        </Box>
        <Container className="create-form-modal-header">
          <Typography id="modal-generateform-title" variant="h6" component="h2">
            Create a new Dropform
          </Typography>
          <Box className="create-form-modal-name-wr">
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="form-name">Give it a name</label>
              <TextField
                fullWidth
                id="form-name"
                placeholder="Please enter the text"
                size="small"
                margin="normal"
                className="credential-field"
                variant="outlined"
                name="formName"
                value={formik.values.formName}
                onChange={formik.handleChange}
                error={
                  formik.touched.formName && Boolean(formik.errors.formName)
                }
                helperText={formik.touched.formName && formik.errors.formName}
              />
              <Box
                className="create-form-modal-closewrapper"
                sx={{ paddingTop: "16px" }}
              >
                <Button
                  type="submit"
                  className="dashboard-create secondary-button"
                >
                  Continue
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
};

export default CreateForm;
