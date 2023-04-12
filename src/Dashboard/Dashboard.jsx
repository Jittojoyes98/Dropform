import React, { useEffect, useState } from "react";
import { useAuthContext } from "../auth";
import { Navigate } from "react-router-dom";
import { collection,doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../_firebase/firebaseInitialize";

const Dashboard = () => {
    const { logout, currentUser, setCurrentUser,loading,setLoading,signOut } = useAuthContext()
    const [pending,setPending]=useState(false)
    const [data,setData]=useState(null)

    const handleLogout=async()=>{
      try {
        await signOut()
        setCurrentUser()
      } catch (error) {
        console.log("There was an error");
      }
    }
    // if there is no current user put on loading state
    const fetchData=async()=>{
      console.log("HEEY");
    }
    useEffect(()=>{
      // will be fetching the api here
      fetchData()
    },[])
    if (pending){
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
