import React from "react";
import closeSvg from "../../../assets/close.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuthContext } from "../../auth";
import { useCreateFormStore } from "../../_services/CreateFormService";

const formNameSchema = yup.object({
  formName: yup
    .string("Enter your Name")
    .required("Please enter your Name")
    .min(3, "Atleast 3 charecter required"),
});

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
    <Dialog open={open} onOpenChange={(next) => !next && handleClose()}>
      <DialogContent
        showCloseButton={false}
        className="create-form-modal max-w-[400px] border-none p-0"
        aria-describedby="modal-generateform-description"
      >
        <div className="create-form-modal-closewrapper">
          <img src={closeSvg} onClick={handleClose} alt="Close" />
        </div>
        <div className="create-form-modal-header px-6 pb-6">
          <DialogHeader>
            <DialogTitle id="modal-generateform-title">
              Create a new Dropform
            </DialogTitle>
          </DialogHeader>
          <div className="create-form-modal-name-wr">
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="form-name">Give it a name</label>
              <Input
                id="form-name"
                placeholder="Please enter the text"
                className="credential-field mt-2"
                name="formName"
                value={formik.values.formName}
                onChange={formik.handleChange}
                aria-invalid={
                  formik.touched.formName && Boolean(formik.errors.formName)
                }
              />
              {formik.touched.formName && formik.errors.formName ? (
                <p className="validation-error">{formik.errors.formName}</p>
              ) : null}
              <div className="create-form-modal-closewrapper pt-4">
                <Button
                  type="submit"
                  className="dashboard-create secondary-button"
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
