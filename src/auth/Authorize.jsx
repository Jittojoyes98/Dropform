import React, { createContext, useContext, useEffect, useState } from "react";
import { auth,provider } from "../_firebase/firebaseInitialize";
import { signInWithPopup,sendPasswordResetEmail,signInWithEmailAndPassword,createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext=createContext()

export function useAuth(){
    return useContext(AuthContext)
}

const Authorize = ({ children}) => {
    const [currentUser,setCurrentUser]=useState()
    
    const signup=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
        // switch (error.code) {
        //     case 'auth/email-already-in-use':
        //         console.log(`Email address ${this.state.email} already in use.`);
        //         break;
        //     case 'auth/invalid-email':
        //         console.log(`Email address ${this.state.email} is invalid.`);
        //         break;
        //     case 'auth/operation-not-allowed':
        //         console.log(`Error during sign up.`);
        //         break;
        //     case 'auth/weak-password':
        //         console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
        //         break;
        //     default:
        //         console.log(error.message);
        //         break;
        // }
    }
    const login=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const resetPassword=(email)=>{
        return sendPasswordResetEmail(auth,email)
    }
    const signUpWithGoogle=()=>{
        return signInWithPopup(auth,provider)
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
        login,
        resetPassword,
        signUpWithGoogle,
    }
  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};

export  {Authorize};
