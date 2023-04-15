import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../auth";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";

const loginSchema = yup.object({
  email: yup
    .string("Enter your email")
    .required("Please enter your email address"),
  password: yup
    .string("Enter your password")
    .required("Please enter your password"),
});


const LoginPage = () => {
  const [error, setError] = useState()
  // const [loading, setLoading] = useState(false)
  const { login, currentUser,signInWithEmail,signInWithGoogle, signInOutsider,loading,setLoading} = useAuthContext()
  const navigate = useNavigate()
  const handleForm = async (email,password) => {
    try {
      setError("")
      setLoading(true)
      const {data, error}= await signInWithEmail(email, password)
      if(!error && data){
        navigate("/dashboard")
      }
      if(error){
        if(error.message=="Invalid login credentials"){
          setError(
            <>
              Your login info is not right. Try again, or&nbsp;
              <Link to="password/request" className="forgot-link small-text-light">reset your password</Link>&nbsp;reset your password.
              if it slipped your mind.
            </>
          )
        }else{
          setError("There was an unsupported response from server.")
        }
      }
    } catch (error) {
      setError("There was an unsupported response from server.")
    }
    setLoading(false)
  }
  const handleGoogle =  async() => {
    try {
      const {data , error}= await signInWithGoogle()
      if(!error && data){
        console.log("Google sign in success");
      }
      if(error){
        console.log("There was an error");
      }
    } catch (error) {
      setError("There was an unsupported response from server.")
    }
  }
  const handleAnonymous=async()=>{
    try {
      await signInOutsider()
      console.log("WE ARE MOVING TO DASHBOARD");
      navigate("/dashboard")
    } catch (error) {
      console.log("Error occured");
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
      handleForm(values.email,values.password)
    },
  });
  const HandleFormError=()=>{
    if(!error){
      setError("We found some errors. Please review the form and make corrections.")
    }
    return(
      <p className="validation-error">{formik.errors.email}</p>
    )
  }
  const handleErrorBox=()=>{
    return(
      <div className="error-box-wrapper">
        <div className="error-span"></div>
        <div className="error-box">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="centre-div auth-height">
      <div className="auth-form-wrapper">
        <span className="centre-div">
          <a href="/">
            {/* image will be used here now just the Name */}
            Dropform
          </a>
        </span>
        <div className="login-form-wrapper">
          <div>
            <h2 className="login-title align-center">Hello, who’s this?</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="error-infobox">
                {error ? handleErrorBox():<></>}
              </div>
              <div>
                <div className="label-wrapper">
                  <label for="email">Email</label>
                </div>
                <TextField
                  size="small"
                  className="credential-field"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                  placeholder="bruce@wayne.com"
                  variant="outlined"
                />
                {(formik.touched.email && Boolean(formik.errors.email)) ? HandleFormError():<></>}
              </div>
              <div>
                <div className="label-wrapper">
                  <label for="password">Password</label>
                </div>
                <TextField
                  size="small"
                  className="credential-field"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                  name="password"
                  placeholder="Atleast 8 characters"
                  variant="outlined"
                />
                {(formik.touched.password && Boolean(formik.errors.password)) ? <p className="validation-error">{formik.errors.password}</p> : <></>}
              </div>

              
              <div style={{marginBottom:"25px",paddingTop:"5px"}}>
                <Link to="password/request" className="forgot-link small-text-light">Forgot Password?</Link>
              </div>
              <Button disabled={loading} style={{marginBottom:"25px"}} variant='contained' type="submit" className='secondary-button auth-button'>Log in to Dropform</Button>
            </form>
          </div>
          <div className="or-wrapper">
            <span className="or-text">OR</span>
          </div>
          <div>
            <Button className="tertiary-button social-button" variant="outlined" onClick={handleGoogle}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="6" fill="white"></rect>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.5991 16.2271C25.5991 15.5179 25.5355 14.836 25.4173 14.1814H15.998V18.05H21.3805C21.1486 19.3002 20.444 20.3594 19.3848 21.0685V23.5779H22.617C24.5081 21.8368 25.5991 19.2729 25.5991 16.2271Z"
                  fill="#4285F4"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9999 26.0008C18.7002 26.0008 20.9641 25.1053 22.6188 23.5778L19.3866 21.0684C18.4911 21.6685 17.3455 22.0231 15.9999 22.0231C13.395 22.0231 11.1902 20.2638 10.4038 17.8999H7.0625V20.4911C8.70814 23.7597 12.0903 26.0008 15.9999 26.0008Z"
                  fill="#34A853"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.4031 17.9002C10.2031 17.3001 10.0894 16.6591 10.0894 16C10.0894 15.3408 10.2031 14.6998 10.4031 14.0997V11.5085H7.0618C6.38445 12.8587 5.99805 14.3861 5.99805 16C5.99805 17.6138 6.38445 19.1412 7.0618 20.4914L10.4031 17.9002Z"
                  fill="#FBBC05"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9999 9.9765C17.4682 9.9765 18.7866 10.4811 19.823 11.4721L22.6915 8.60362C20.9595 6.9898 18.6956 5.99878 15.9999 5.99878C12.0903 5.99878 8.70814 8.23994 7.0625 11.5085L10.4038 14.0997C11.1902 11.7358 13.395 9.9765 15.9999 9.9765Z"
                  fill="#EA4335"
                ></path>
                </svg>
              Log in with Google</Button>
          </div>
          <div>
            <Button disabled={loading} style={{marginBottom:"5px"}} className="tertiary-button social-button" variant="outlined" onClick={handleAnonymous}>
              <svg height="32" width="32" viewBox="0 0 32 32" fit="" className="centre-div" focusable="false">
                {/* <rect width="32" height="32" rx="6" fill="white"></rect> */}
                <path transform="translate(2, 4)" d="M10 11c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4m0-9C7.79 2 6 3.79 6 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 10.9c2.97 0 6.1 1.46 6.1 2.1v1.1H3.9V15c0-.64 3.13-2.1 6.1-2.1m0-9a2.1 2.1 0 110 4.2 2.1 2.1 0 010-4.2" fill-opacity=".54" fill-rule="evenodd">
                </path></svg>
              Log in Anonymously</Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;
