import '../css/Header.css';

import { Link } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown'

import logo from '../img/logo.png';

import React from 'react';
import { useState } from "react";

const Header = (props) => {
  const [darkMode, setDarkMode] = useState(false)
  let activeUser = props["activeUser"];

  if (activeUser)
    return (
      <header className={darkMode ? "dark-mode" : "light-mode"}>
        <ul id="headerNav" className={`${props["activeUser"] === null ? "header hidden" : null}`}>
          <Link className={`clickable ${props["activeTab"] === "steamlibrary" ? "active" : null}`} to="/SteamLibrary" onClick={() => props.setActiveTab("steamlibrary")}>Steam</Link>
          <Link className={`clickable ${props["activeTab"] === "ubisoftlibrary" ? "active" : null}`} to="/UbisoftLibrary" onClick={() => props.setActiveTab("ubisoftlibrary")}>Ubisoft</Link>
          <button type="button" class="logout" onClick={() => props.setActiveUser(null)}>Logout</button>
        </ul>



        <div className="right">
              <span style={{ color: darkMode ? "grey" : "yellow" }}></span>
              <div className="switch-checkbox">
                <label className="switch">
                  <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
                  <span className="slider round"> </span>
                </label>
              </div>
              <span style={{ color: darkMode ? "#c96dfd" : "grey" }}></span>
          <Link className="header_profile_nav" to="/profile" onClick={() => props.setActiveTab("profile")}>
            <p className={`header_username clickable ${props["activeTab"] === "profile" ? "active" : null}`}>{props.activeUser.userId}</p>
            <img className={`header_picture ${props["activeTab"] === "profile" ? "active_picture" : null}`} src={logo} alt="" />
          </Link>
        </div>
      </header>
    )
  return null;
}

export default Header;