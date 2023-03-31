import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth"
import { auth } from "../_firebase/firebaseInitialize";

const SignupPage = () => {
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const { signup, currentUser,setCurrentUser, signUpWithGoogle } = useAuth()
  const navigate=useNavigate()
  
  const handleForm=async(e)=>{
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await signup(e.target.uname.value, e.target.psw.value)
    } catch (error) {
      setError("Cannot create user")
    }
    setLoading(false)
  }
  const handleGoogle=async(e)=>{
    try {
      await signUpWithGoogle()
    } catch (error) {
      console.log("Error occured");
    }
  }
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    }
    else {
      console.log(currentUser);
      if (currentUser) {
        if (currentUser.user.metadata.creationTime !== currentUser.user.metadata.lastSignInTime) {
          console.log("WE ARE GOING TO LOGIN");
          setCurrentUser()
          navigate("/login")
        } else {
          console.log("WE ARE GOING TO DASHBOARD");
          navigate("/dashboard")
        }
      }
    }
  }, [currentUser,setCurrentUser]);
  // check if setCurrentUser is needed or not 
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
      <div>
        <Link to="/login">Would yo like to sign in Anonymously</Link>
      </div>
      
    </div>
  )
};

export default SignupPage;
