import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../_firebase/firebaseInitialize";
// import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const AuthContext=createContext()

export function useAuth(){
    return useContext(AuthContext)
}

const Authorize = ({ children}) => {
    const [currentUser,setCurrentUser]=useState()
    
    const signup=(email,password)=>{
        return auth.createUserWithEmailAndPassword(email,password)
    }

    useEffect(() => {
        const unsubscribe=auth.onAuthStateChanged((user)=>{
            setCurrentUser(user)
        })
        return unsubscribe
    }, []);

    const value={
        currentUser,
        signup,
    }
  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};

export  {Authorize};
