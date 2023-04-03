import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@mui/material";

const loginSchema = yup.object({
  email: yup
    .string("Enter your email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .required("Password is required"),
});


const LoginPage = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, currentUser, signUpWithGoogle, signInOutsider} = useAuth()
  const navigate = useNavigate()
  const handleForm = async (e) => {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(e.target.uname.value, e.target.psw.value)
      navigate("/dashboard")
    } catch (error) {
      setError("Cannot create user")
    }
    setLoading(false)
  }
  const handleGoogle = async () => {
    try {
      await signUpWithGoogle()
      navigate("/dashboard")
    } catch (error) {
      console.log("Error occured");
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
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
          <div>
            <h2 className="login-title align-center">Hello, who’s this?</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="api-error-toast"></div>
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
                  // error={formik.touched.username && Boolean(formik.errors.username)}
                  // helperText={formik.touched.username && formik.errors.username}
                />

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
                // error={formik.touched.username && Boolean(formik.errors.username)}
                // helperText={formik.touched.username && formik.errors.username}
                />

              </div>

              
              <div>
                <Link to="password/request">Forgot Password</Link>
              </div>
              

              <button disabled={loading}  type="submit">Login</button>
            </form>
          </div>
          <div>OR</div>
          <button onClick={handleGoogle}>Sign in with google</button>
          <div>
            <button onClick={handleAnonymous}>Sign in Anonymously</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;
