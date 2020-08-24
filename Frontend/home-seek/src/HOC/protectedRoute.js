import React from "react";
import { Redirect } from "react-router-dom";

const withProtected = (ProtectedComponent) => {
  return (...args) => {
    return !localStorage.getItem('user').token ? <Redirect to="/signIn" /> : <ProtectedComponent args/>;
  };
};

export default withProtected;