import React from "react";
import { useAuth } from "../auth";

const ForgotPassword = () => {
  const { resetPassword,forgotPassword } = useAuth()
  const handleForm=async(e)=>{
      e.preventDefault()
      try {
          await forgotPassword(e.target.uname.value)
      } catch (error) {
          
      }
  }
  return (
    <div>
        <form onSubmit={handleForm}>
            <div>
                <h1>Forgot password ?</h1>
                <label for="uname"><b>Email</b></label>
                  <input type="email" placeholder="Enter Email" name="uname" required />
            </div>
            <button type="submit">Send Instructions</button>
        </form>
    </div>
  )
};

export  {ForgotPassword};
