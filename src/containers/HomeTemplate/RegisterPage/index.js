import React from "react";
import LoginPage from "./Signin/index";
import Signup from "./Signup/index";
import { Redirect } from 'react-router-dom';

export default function RegisterPage(props1) {
  let props = props1;
if (localStorage.getItem("User")) {
  return <Redirect to="/"/>
}
  return (
    <div className="loginPage">
      <div className="form-structor">
        <Signup  />
        <LoginPage props={props} />
      </div>
    </div>
  );
}
