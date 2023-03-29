import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../_firebase/firebaseInitialize";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext=createContext()

export function useAuth(){
    return useContext(AuthContext)
}

const Authorize = ({ children}) => {
    const [currentUser,setCurrentUser]=useState()
    
    const signup=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const login=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout=()=>{
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
        })
        return unsubscribe
    }, []);

    const value={
        currentUser,
        setCurrentUser,
        signup,
        logout,
        login
    }
  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};

export  {Authorize};
