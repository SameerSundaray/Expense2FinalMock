import React, { useContext } from "react";
import AuthContext from "../SignupProvider/Signinprovider";
import { Navigate } from "react-router-dom";
import Home from "../Home/Home";

export default function Private() {
  const Authctx = useContext(AuthContext);
  const isLoggedIn = Authctx.isloggedin;

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }
  return <Home />;
}
