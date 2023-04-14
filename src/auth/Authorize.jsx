import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../_supabase/supabaseInitialize";

const AuthContext=createContext()

export function useAuthContext(){
    return useContext(AuthContext)
}

const Authorize = ({ children}) => {
    const [currentUser,setCurrentUser]=useState()
    const [session, setSession] = useState(null)
    const [loading,setLoading]=useState(false)
    
    
    // with supabase
    function signUpWithEmail(email,password){
        return supabase.auth.signUp({email,password})
    }
    function signInWithEmail(email,password) {
        return  supabase.auth.signInWithPassword({email,password,})
    }
    // sign in anonymous cannot be implemented as of now.

    function signInWithGoogle() {
        return supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            queryParams: {
              redirect_to:"http://localhost:3030/dashboard"
            },
          },
        })
    }
    function forgotPassword(email){ 
        return supabase.auth.resetPasswordForEmail(email,{
            redirectTo:"http://localhost:3030/login/password/update"
        })
    }
    function signOut() {
        return supabase.auth.signOut()
    }
    function updatePassword(newPassword){
        return supabase.auth.updateUser({ password: newPassword })
    }
    

    // supabase method
    useEffect(() => {
        const { data: { subscription },} = supabase.auth.onAuthStateChange((_event, session) => {
          console.log(_event);
          if(_event==="SIGNED_IN"){
            setCurrentUser(session.user)
          }
          if(_event==="USER_UPDATED"){
            setCurrentUser(session.user)
          }
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
        forgotPassword,
        updatePassword
    }
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};

export  {Authorize};
