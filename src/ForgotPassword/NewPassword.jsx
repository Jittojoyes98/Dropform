import React, { useEffect } from "react";
import { useAuthContext } from "../auth";
import { supabase } from "../_supabase/supabaseInitialize";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
    const { updatePassword } = useAuthContext()
    const navigate=useNavigate()
    const handleForm=async(e)=>{
        e.preventDefault()
        try {
            const { data, error } = await updatePassword(e.target.uname.value)
            console.log(data);
            console.log("Password was updated !!");
            navigate("/dashboard")
        } catch (error) {
            alert("There was an error updating your password.")
        }
    }
    
    return (
        <div>
            <form onSubmit={handleForm}>
                <div>
                    <h1>Your new password</h1>
                    <label for="uname"><b>Password</b></label>
                    <input type="text" placeholder="Enter password" name="uname" required />
                </div>
                <button type="submit">Change</button>
            </form>
        </div>
    )
};

export default NewPassword;
