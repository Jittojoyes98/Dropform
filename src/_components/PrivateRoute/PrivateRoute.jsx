import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";
import { firebaseConfig } from "../../_firebase/firebaseInitialize";

export const PrivateRoute = () => {
  const { currentUser,setCurrentUser } = useAuth();
  let user;
  const navigate=useNavigate()
  // private route setting  and getting user
  function readSession() {
    user = JSON.parse(window.sessionStorage.getItem(
      `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
    ));
    // When receiving data from a web server, the data is always a string. so parse
    
    if (user){
      if (user?.isAnonymous) {
        user.displayName = "Anonymous"
      }
      setCurrentUser(user)
    }else{
        navigate("/login")
    }
  }
  useEffect(() => {
    if(!currentUser){
      readSession()
    }
  }, [])
  
  return (
      <Outlet/>
  );
};
