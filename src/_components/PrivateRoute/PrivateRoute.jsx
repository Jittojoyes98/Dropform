import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../auth";
import { supabase } from "../../_supabase/supabaseInitialize";

export const PrivateRoute = () => {
  const { currentUser, setCurrentUser } = useAuthContext();
  const navigate = useNavigate();
  let user;

  async function readSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    // setSession(session)
    user = session?.user;

    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/login");
    }
  }
  useEffect(() => {
    if (!currentUser) {
      readSession();
    }
  }, [currentUser]);

  return <Outlet />;
};
