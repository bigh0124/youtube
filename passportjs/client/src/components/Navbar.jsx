import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user }) => {
  const logout = async () => {
    // await axios.post("http://localhost:5000/auth/logout");
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          John App
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img src={user.photos[0].value} alt="" className="avatar" />
          </li>
          <li className="listItem">{user.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
