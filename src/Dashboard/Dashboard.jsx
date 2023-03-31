import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const [redirectPath, setRedirectPath] = useState(null);
    const { logout, currentUser, setCurrentUser } = useAuth()
    // useEffect(() => {
    //     if (!currentUser) {
    //         console.log("WE ARE REDIRECTING TO HOME");
    //         setRedirectPath("/");
    //     }
    // }, [currentUser]);

    // if (redirectPath) {
    //     // now this is the way to redirect
    //     return <Navigate replace to={redirectPath} />
    // }
    // we are not using this because private route will take care of itself.
    const handleLogout=async()=>{
        try {
            await logout()
            setCurrentUser()
        } catch (error) {
            console.log("There was an error");
        }
    }
    console.log(currentUser);

    return (
      <>
        <h1>Hii {currentUser && currentUser.user.displayName}</h1>
        <button type="submit" onClick={handleLogout}>Log out</button>
        <div>Dashboard</div>
      </>
  )
};

export {Dashboard};
