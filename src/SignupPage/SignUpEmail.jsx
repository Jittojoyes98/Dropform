import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { Button, InputAdornment, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import eyeLineCross from "../../assets/download-eye.svg"
import eyeLine from "../../assets/download-eye-text.svg"



const signupSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("This field cannot be left blank"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number")
    .required("This field cannot be left blank"),
});

const SignUpEmail = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [show,setShow]=useState(true)
  const { signup, currentUser, setCurrentUser, signUpWithGoogle,signUpWithEmail } = useAuth()
  const navigate = useNavigate()
  const handleForm = async (email, password) => {
    try {
      setError("")
      setLoading(true)
      await signUpWithEmail(email, password)
      navigate("/dashboard")
    } catch (error) {
      setError("Registration denied,Please see if this email already exist")
      // use firebase error for more verification
    }
    setLoading(false)
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values);
      handleForm(values.email, values.password)
    },
  });
  const HandleFormError = () => {
    return (
      <p className="validation-error">{formik.errors.email}</p>
    )
  }
  const handleErrorBox = () => {
    return (
      <div className="error-box-wrapper">
        <div className="error-span"></div>
        <div className="error-box">
          <p>{error}</p>
        </div>
      </div>
    )
  }
  const handleHide=()=>{
    setShow(!show)
  }
  return (
    <div className="centre-div">
      <div>
        <span className="centre-div">
          <a href="/">
            {/* image will be used here now just the Name */}
            Dropform
          </a>
        </span>
        <div className="login-form-wrapper">
          <div className="signup-email-wrapper">
            <h2 className="login-title align-center">Get better data with conversational forms, surveys, quizzes & more.</h2>
            <div className="centre-div">
              <div className="fix-width ">
                <form onSubmit={formik.handleSubmit}>
                  <div className="error-infobox">
                    {error ? handleErrorBox() : <></>}
                  </div>
                  <div>
                    <div className="label-wrapper">
                      <label for="email">Email</label>
                    </div>
                    <TextField
                      size="small"
                      className="credential-field-inactive"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      name="email"
                      placeholder="bruce@wayne.com"
                      variant="outlined"
                    />
                    {(formik.touched.email && Boolean(formik.errors.email)) ? HandleFormError() : <></>}
                  </div>
                  <div>
                    <div className="label-wrapper">
                      <label for="password">Password</label>
                    </div>
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {show ? (
                              <img src={eyeLine} className="icon-password" onClick={handleHide} />
                            ) : (
                              <img
                                src={eyeLineCross}
                                  className="icon-password"
                                onClick={handleHide}
                              />
                            )}
                          </InputAdornment>
                        ),
                      }}
                      size="small"
                      className="credential-field-inactive"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      type={show ? "text": "password"}
                      name="password"
                      placeholder="Atleast 8 characters"
                      variant="outlined"
                    />
                    {(formik.touched.password && Boolean(formik.errors.password)) ? <p className="validation-error">{formik.errors.password}</p> : <></>}
                  </div>


                  <div style={{ marginBottom: "25px", paddingTop: "5px" }}>
                    {/* <Link to="password/request" className="forgot-link small-text-light">Forgot Password?</Link> */}
                  </div>
                  <Button disabled={loading}  style={{ marginBottom: "25px" }} variant='contained' type="submit" className='secondary-button auth-button'>Create my free account</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUpEmail;
