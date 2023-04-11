import React, { createContext, useContext, useEffect, useState } from "react";
import { auth,provider,persistedAuth } from "../_firebase/firebaseInitialize";
import { signInAnonymously,signInWithPopup,sendPasswordResetEmail,signInWithEmailAndPassword,createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { supabase } from "../_supabase/supabaseInitialize";

const AuthContext=createContext()

export function useAuth(){
    return useContext(AuthContext)
}

const Authorize = ({ children}) => {
    const [currentUser,setCurrentUser]=useState()
    const [session, setSession] = useState(null)
    const [loading,setLoading]=useState(false)
    
    
    // with supabase
    async function signUpWithEmail(email,password){
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })
        console.log(data,error,"SIGN UP DATA");
    }
    async function signInWithEmail(email,password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        console.log(data,error);

    }
    // sign in anonymous cannot be implemented as of now.

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        })
        console.log(data,error,"SIGN UP DATA");
    }
    async function forgotPassword(email){ 
        const { data, error } = await supabase.auth.resetPasswordForEmail(email,{
            redirectTo:"http://localhost:3030/login/password/update"
        })
        if(data){
            console.log("Success");
        }else{
            console.log("Falilure");
        }
    }
    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }
    

    // supabase method
    useEffect(() => {
        const getCurrentSession=async()=>{
            const {data: { session }}=await supabase.auth.getSession()
            setSession(session)
        }
        getCurrentSession()
        // this can be used in protected routes
  
        const { data: { subscription },} = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        console.log("No supabase user");
    }
    else {
        console.log(session,"SESSION");
        console.log("Supabase user exist");
    }

    

    const value={
        currentUser,
        setCurrentUser,
        setLoading,
        loading,
        signUpWithEmail,
        signInWithEmail,
        signOut,
        signInWithGoogle,
        forgotPassword
    }
  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};

export  {Authorize};
