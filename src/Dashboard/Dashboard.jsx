import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { Navigate, Redirect } from "react-router-dom";
import { async } from "@firebase/util";

const Dashboard = () => {
    const [redirectPath, setRedirectPath] = useState(null);
    const { logout, currentUser, setCurrentUser } = useAuth()
    useEffect(() => {
        if (!currentUser) {
            setRedirectPath("/");
        }
    }, [currentUser]);

    if (redirectPath) {
        // now this is the way to redirect
        return <Navigate replace to={redirectPath} />
    }
    const handleLogout=async()=>{
        try {
            await logout()
            setCurrentUser()
        } catch (error) {
            console.log("There was an error");
        }
    }
  return (
      <>
        <button type="submit" onClick={handleLogout}>Log out</button>
        <div>Dashboard</div>
      </>
  )
};

export {Dashboard};
