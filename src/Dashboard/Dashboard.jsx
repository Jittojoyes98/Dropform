import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const { logout, currentUser, setCurrentUser,loading,setLoading } = useAuth()

    const handleLogout=async()=>{
        try {
            await logout()
            setCurrentUser()
        } catch (error) {
            console.log("There was an error");
        }
    }
    // if there is no current user put on loading state
    useEffect(()=>{
      // will be fetching the api here
    },[])
    if (loading){
      return (
        <div>Loading</div>
      )
    }
    return (
      <>
        <h1>Hii {currentUser && currentUser.user?.displayName}</h1>
        <button type="submit" onClick={handleLogout}>Log out</button>
        <div>Dashboard</div>
      </>
  )
};

export {Dashboard};
