import React from "react";
// import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const PublicRoute = (props) => {
  // const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  if (token) return <Redirect to="/" />;
  return <Route {...props} />;
};

export default PublicRoute;
