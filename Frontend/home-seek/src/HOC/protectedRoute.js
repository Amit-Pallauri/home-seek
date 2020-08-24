import React from "react";
import { Redirect } from "react-router-dom";

const withProtected = (ProtectedComponent) => {
  return (...args) => {
    return !localStorage.getItem('user') ? <Redirect to="/signIn" /> : <ProtectedComponent args/>;
  };
};

export default withProtected;