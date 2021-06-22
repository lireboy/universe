import '../css/Header.css';

import { Link } from "react-router-dom";
import { useState } from "react";
import NavDropdown from 'react-bootstrap/NavDropdown'

import logo from '../img/logo.png';
import settings from "../img/settings.png";
import help from "../img/help.png";

import React from 'react';

const Header = () => {

  const [activeTab, setActiveTab] = useState(null);

  return (
    <header>
      <ul id="headerNav">
        <NavDropdown title="Bibliothek" id="nav" className="nav-dropdown">
          <NavDropdown.Item className="dropdown-item">
            <Link className={`clickable ${activeTab == "steamlibrary" ? "active" : null}`} to="/steamlibrary" onClick={() => setActiveTab("steamlibrary")}>Steam</Link>
          </NavDropdown.Item>
        </NavDropdown>
        <Link className={`clickable ${activeTab == "news" ? "active" : null}`} to="/news" onClick={() => setActiveTab("news")}>News</Link>
        <Link className={`clickable ${activeTab == "social" ? "active" : null}`} to="/social" onClick={() => setActiveTab("social")}>Social</Link>
        <Link className={`clickable ${activeTab == "loginview" ? "active" : null}`} to="/loginview" onClick={() => setActiveTab("loginview")}>Login</Link>
        <Link className={`clickable ${activeTab == "registerview" ? "active" : null}`} to="/registerview" onClick={() => setActiveTab("registerview")}>Register</Link>
      </ul>



      <div className="right">
        <Link className="header_profile_nav" to="/profile" onClick={() => setActiveTab("profile")}>
          <p className={`header_username clickable ${activeTab == "profile" ? "active" : null}`}>Willem DF</p>
          <img className={`header_picture ${activeTab == "profile" ? "active_picture" : null}`} src={logo} alt="Profile Picture" />
        </Link>
      </div>

    </header>
  );
}

export default Header;