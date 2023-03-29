import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth"
const SignupPage = () => {
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const { signup, currentUser } = useAuth()
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
  return (
    <div>
      <form onSubmit={handleForm}>
        <div>
          {currentUser && currentUser.email}
          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required />
        </div>

        <div>
          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />
        </div>

        <button disabled={loading} type="submit">Login</button>
      </form>
    </div>
  )
};

export default SignupPage;
