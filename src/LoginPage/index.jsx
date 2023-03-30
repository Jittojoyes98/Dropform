import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

const LoginPage = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, currentUser } = useAuth()
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
        

        <button disabled={loading} type="submit">Login</button>
      </form>
      <div>OR</div>
      <button>Sign in with google</button>
    </div>
  )
};

export default LoginPage;
