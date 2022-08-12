import React from "react";
import Google from "../img/google.png";
import Github from "../img/github.png";
import Facebook from "../img/facebook.png";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="Google" className="icon" />
            Google
          </div>
          <div className="loginButton facebook">
            <img src={Facebook} alt="Facebook" className="icon" />
            Facebook
          </div>
          <div className="loginButton github">
            <img src={Github} alt="Github" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line"></div>
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button className="submit">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
