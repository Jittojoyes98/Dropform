import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

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
      navigate("/dashboard")
    } catch (error) {
      console.log("Error occured");
    }
  }
  return (
    <div>
      <form onSubmit={handleForm}>
        <div>
          {currentUser && currentUser.email}
          <label for="uname"><b>Email</b></label>
          <input type="email" placeholder="Enter Email" name="uname" required />
        </div>

        <div>
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />
        </div>
        <div>
          <Link to="password/request">Forgot Password</Link>
        </div>
        

        <button disabled={loading}  type="submit">Login</button>
      </form>
      <div>OR</div>
      <button onClick={handleGoogle}>Sign in with google</button>
      <div>
        <button onClick={handleAnonymous}>Sign in Anonymously</button>
      </div>
    </div>
  )
};

export default LoginPage;
