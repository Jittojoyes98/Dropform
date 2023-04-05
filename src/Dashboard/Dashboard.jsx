import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const [redirectPath, setRedirectPath] = useState(null);
    const { logout, currentUser, setCurrentUser } = useAuth()
    
    const handleLogout=async()=>{
        try {
            await logout()
            setCurrentUser()
        } catch (error) {
            console.log("There was an error");
        }
    }
    // if there is no current user put on loading state

    return (
      <>
        <h1>Hii {currentUser && currentUser.user?.displayName}</h1>
        <button type="submit" onClick={handleLogout}>Log out</button>
        <div>Dashboard</div>
      </>
  )
};

export {Dashboard};
