import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import Slide from "./Slide";
import "./login.scss";

function Login() {
  return (
    <>
      <div className="d-sm-none">
        <Signin />
      </div>
      <div className="main">
        <div className="back">
          <div className="signup">
            <Signup />
          </div>
          <div className="signin">
            <Signin />
          </div>
        </div>
        <Slide />
      </div>
    </>
  );
}

export default Login;
