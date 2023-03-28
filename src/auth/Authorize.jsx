import React, { createContext, useState } from "react";
import { auth } from "../_firebase/firebaseInitialize";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const AuthContext=createContext()

const Authorize = ({ children}) => {
    const [currentUser,setCurrentUser]=useState()
    
    const signup=(email,password)=>{
        return auth.createUserWithEmailAndPassword(email,password)
    }

    useEffect(() => {
        auth.onAuthStateChanged((user)=>{
            setCurrentUser(user)
        })
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
