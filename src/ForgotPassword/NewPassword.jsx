import React from "react";
import { useAuthContext } from "../auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NewPassword = () => {
  const { updatePassword } = useAuthContext();
  const navigate = useNavigate();
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(e.target.uname.value);
      navigate("/dashboard");
    } catch (error) {
      alert("There was an error updating your password.");
    }
  };

  return (
    <div className="centre-div auth-height">
      <form onSubmit={handleForm} className="flex w-64 flex-col gap-3">
        <h1 className="login-title">Your new password</h1>
        <div className="flex flex-col gap-2">
          <Label htmlFor="uname">Password</Label>
          <Input
            id="uname"
            type="password"
            placeholder="Enter password"
            name="uname"
            className="credential-field"
            required
          />
        </div>
        <Button type="submit" className="secondary-button auth-button">
          Change
        </Button>
      </form>
    </div>
  );
};

export default NewPassword;
