import React from "react";
import { useAuthContext } from "../auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPassword = () => {
  const { forgotPassword } = useAuthContext();
  const navigate = useNavigate();
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await forgotPassword(e.target.uname.value);
      if (!error && data) {
        navigate("/login");
      }
      if (error) {
        // form error
      }
    } catch (error) {
      console.log("there was an unexpected error");
    }
  };
  return (
    <div className="centre-div auth-height">
      <form onSubmit={handleForm} className="flex w-64 flex-col gap-3">
        <h1 className="login-title">Forgot password?</h1>
        <div className="flex flex-col gap-2">
          <Label htmlFor="uname">Email</Label>
          <Input
            id="uname"
            type="email"
            placeholder="Enter Email"
            name="uname"
            className="credential-field"
            required
          />
        </div>
        <Button type="submit" className="secondary-button auth-button">
          Send Instructions
        </Button>
      </form>
    </div>
  );
};

export { ForgotPassword };
