import React, { createContext, useContext, useEffect, useState } from "react";
import { auth,provider,persistedAuth } from "../_firebase/firebaseInitialize";
import { signInAnonymously,signInWithPopup,sendPasswordResetEmail,signInWithEmailAndPassword,createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


const AuthContext=createContext()

export function useAuth(){
    return useContext(AuthContext)
}

const Authorize = ({ children}) => {
    const [currentUser,setCurrentUser]=useState()
    const [signUpMethod,setSignUpMethod]=useState(true)
    const [loading,setLoading]=useState(false)
    
    const signup=(email,password)=>{
        setSignUpMethod(true)
        return createUserWithEmailAndPassword(auth,email,password)
        
    }
    const login=(email,password)=>{
        setSignUpMethod(false)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const resetPassword=(email)=>{
        return sendPasswordResetEmail(auth,email)
    }
    const signUpWithGoogle=()=>{
        setSignUpMethod(true)
        return signInWithPopup(auth,provider)
    }
    
    const logout=()=>{
        return signOut(auth)
    }
    const signInOutsider=()=>{
        return signInAnonymously(auth)
    }

    useEffect(() => {
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            // const { isNewUser } = getAdditionalUserInfo(user) 
            if (user?.isAnonymous){
                user.displayName="Anonymous"
            }
            if(user){
                setCurrentUser(prevState => {
                    return { ...prevState, user }
                })
            }else{
                console.log("No user logged in");
            }
        })
        return unsubscribe
    }, []);
    

    const value={
        currentUser,
        setCurrentUser,
        signup,
        logout,
        login,
        resetPassword,
        signUpWithGoogle,
        setSignUpMethod,
        signInOutsider,
        setLoading,
        loading,
    }
  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};

export  {Authorize};
