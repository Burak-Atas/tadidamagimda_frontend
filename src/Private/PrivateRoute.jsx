import React from "react";
import { Navigate } from "react-router-dom";
import AuthServices from "../Services/AuthServices";
const PrivateRoute = ({ children }) => {
  const auth = new AuthServices(); 
  const isAuthenticated = auth.CurrentUser();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
