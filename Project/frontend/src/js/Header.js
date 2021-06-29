import '../css/Header.css';

import { Link } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown'

import logo from '../img/logo.png';

import React from 'react';

const Header = (props) => {
  let activeUser = props["activeUser"];

  if(activeUser)
    return(
      <header>
        <ul id="headerNav" className={`${props["activeUser"] === null ? "header hidden" : null}`}>
            <NavDropdown title="Bibliothek" id="nav" className="nav-dropdown">
              <NavDropdown.Item className="dropdown-item">
                <Link className={`clickable ${props["activeTab"] === "steamlibrary" ? "active" : null}`} to="/steamlibrary" onClick={() => props.setActiveTab("steamlibrary")}>Steam</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Link className={`clickable ${props["activeTab"] === "news" ? "active" : null}`} to="/news" onClick={() => props.setActiveTab("news")}>News</Link>
            <Link className={`clickable ${props["activeTab"] === "social" ? "active" : null}`} to="/social" onClick={() => props.setActiveTab("social")}>Social</Link>
            <button style={{color: "black"}} onClick={() => props.setActiveUser(null)}>Logout</button>
          </ul>



          <div className="right">
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