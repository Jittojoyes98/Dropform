import React from "react";
import { useAuthContext } from "../auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { forgotPassword } = useAuthContext();
  const navigate = useNavigate();
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await forgotPassword(e.target.uname.value);
      if (!error && data) {
        // show toast or something
        navigate("/login");
      }
      if (error) {
        // form error
      }
    } catch (error) {
      console.log("there was an unexpected error");
      // form error
    }
  };
  return (
    <div>
      <form onSubmit={handleForm}>
        <div>
          <h1>Forgot password ?</h1>
          <label for="uname">
            <b>Email</b>
          </label>
          <input type="email" placeholder="Enter Email" name="uname" required />
        </div>
        <button type="submit">Send Instructions</button>
      </form>
    </div>
  );
};

export { ForgotPassword };
