import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth"
import { auth } from "../_firebase/firebaseInitialize";

const SignupPage = () => {
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const { signup, currentUser, signUpWithGoogle } = useAuth()
  const navigate=useNavigate()
  const handleForm=async(e)=>{
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await signup(e.target.uname.value, e.target.psw.value)
      navigate("/dashboard")
    } catch (error) {
      setError("Cannot create user")
    }
    setLoading(false)
  }
  const handleGoogle=async(e)=>{
    try {
      await signUpWithGoogle()
      // console.log(user);
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

        <button disabled={loading} type="submit">Login</button>
        
      </form>
      <div>OR</div>
      <button onClick={handleGoogle}>Sign up with google</button>
    </div>
  )
};

export default SignupPage;
