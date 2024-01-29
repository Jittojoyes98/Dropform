import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../auth";

const SignupPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, currentUser, setCurrentUser, signInWithGoogle } =
    useAuthContext();
  const navigate = useNavigate();

  const handleGoogle = async (e) => {
    try {
      const { data, error } = await signInWithGoogle();
      if (!error && data) {
        console.log("Google sign in success");
      }
    } catch (error) {
      console.log("Error occured");
    }
  };

  return (
    <div className="centre-div auth-height">
      <div className="auth-form-wrapper">
        {/* add a wrapper div here */}
        <span className="centre-div">
          <a href="/">
            {/* image will be used here now just the Name */}
            Dropform
          </a>
        </span>
        <div className="login-form-wrapper">
          <div className="signup-email-wrapper">
            <h2 className="login-title align-center">
              Get better data with conversational forms, surveys, quizzes &
              more.
            </h2>
            <div className="centre-div">
              <div className="fix-width ">
                <div>
                  <Button
                    className="tertiary-button social-button"
                    variant="outlined"
                    onClick={handleGoogle}
                  >
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
                    Sign up with Google
                  </Button>
                </div>
                <div>
                  <Button
                    style={{ marginBottom: "5px" }}
                    className="tertiary-button social-button"
                    variant="outlined"
                    onClick={() => navigate("/login")}
                  >
                    <svg
                      height="32"
                      width="32"
                      viewBox="0 0 32 32"
                      fit=""
                      className="centre-div"
                      focusable="false"
                    >
                      {/* <rect width="32" height="32" rx="6" fill="white"></rect> */}
                      <path
                        transform="translate(2, 4)"
                        d="M10 11c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4m0-9C7.79 2 6 3.79 6 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 10.9c2.97 0 6.1 1.46 6.1 2.1v1.1H3.9V15c0-.64 3.13-2.1 6.1-2.1m0-9a2.1 2.1 0 110 4.2 2.1 2.1 0 010-4.2"
                        fillOpacity=".54"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                    Log in Anonymously
                  </Button>
                </div>
                <div className="centre-div margin-fix">
                  <span className="or-text">OR</span>
                </div>
                <Button
                  variant="outlined"
                  className="secondary-button auth-button redirect-button"
                  onClick={() => navigate("email")}
                >
                  Sign up with email
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* <form onSubmit={handleForm}>
          <div>
            <label for="uname"><b>Email</b></label>
            <input type="email" placeholder="Enter Email" name="uname" required />
          </div>

          <div>
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required />
          </div>

          <button disabled={loading} type="submit">Login</button>
          
        </form> */}
      </div>
    </div>
  );
};

export default SignupPage;
