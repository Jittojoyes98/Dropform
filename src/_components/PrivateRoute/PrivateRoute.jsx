import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth";

export const PrivateRoute = () => {
  const { currentUser } = useAuth()
  if(!currentUser){
    return <Navigate replace to="/login" />
  }
  return (
      <Outlet/>
  );
};
