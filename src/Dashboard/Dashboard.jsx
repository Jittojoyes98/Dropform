import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { Navigate } from "react-router-dom";
import { collection,doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../_firebase/firebaseInitialize";

const Dashboard = () => {
    const { logout, currentUser, setCurrentUser,loading,setLoading } = useAuth()
    const [pending,setPending]=useState(false)
    const [data,setData]=useState(null)

    const handleLogout=async()=>{
        try {
            await logout()
            setCurrentUser()
        } catch (error) {
            console.log("There was an error");
        }
    }
    // if there is no current user put on loading state
    const fetchData=async()=>{
      setPending(true)
      try {
        const querySnapshot =await  getDocs(collection(db, "user"));
        querySnapshot.forEach(async(docEach)=>{
          const forms=docEach.data().forms
          
          const docRef = doc(db, "form", "ChuNGvP0rIC7vetpwmve");
          const docSnap = await getDoc(docRef);
          console.log(docRef,"1");
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
          let newDocSnap
          forms.forEach(async(form)=>{
            newDocSnap=form
          })
          console.log(newDocSnap,"Main");

          newDocSnap = await getDoc(newDocSnap);
          console.log(newDocSnap,"2");
          
        })
        // if(querySnapshot.exists()){
        //   console.log("data exist",querySnapshot.data());
        // }
      } catch (error) {
        console.log("There was an error",error.message);
      }
      setPending(false)
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
