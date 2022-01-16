import React from "react";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = (props) => {
  const token = localStorage.getItem("stackshop_token");
  if (token) return <Route {...props} />;
  return <Redirect to="/signin" />;
};

export default PrivateRoute;
