import { Link } from "react-router-dom";
import { Image } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import Switch from "react-switch";

import logo from '../img/logo.png';

import React from 'react';
import { useState } from "react";

const Header = (props) => {
  const [darkMode, setDarkMode] = useState(true)
  let activeUser = props["activeUser"];

  if (activeUser)
    return(
      <div>
        <Navbar fixed="top" className={darkMode ? "dark-mode" : "light-mode"} variant={darkMode ? "dark" : "light"}>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/SteamLibrary" onClick={() => props.setActiveTab("steamlibrary")}>Steam</Nav.Link>
            <Nav.Link as={Link} to="/UbisoftLibrary" onClick={() => props.setActiveTab("ubisoftlibrary")}>Ubisoft</Nav.Link>
          </Nav>
          <NavDropdown className="ms-auto" title={
            <div className="nav-dropdown navdropdown-header">
              <p>{props.activeUser.userId}</p>
              <img className={`header_picture ${props["activeTab"] === "profile" ? "active_picture" : null}`} src={logo} alt="" />
            </div>
          }>
      	    <NavDropdown.Item as={Link} to="/profile" onClick={() => props.setActiveTab("profile")}>Show Profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/settings" onClick={() => props.setActiveTab("settings")}>Settings</NavDropdown.Item>
            <Switch className="switch-color" onChange={() => setDarkMode(!darkMode)} checked={darkMode} uncheckedIcon={false} checkedIcon={true}></Switch>
            <NavDropdown.Divider/>
            <NavDropdown.Item onClick={() => props.setActiveUser(null)}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar>
      </div>
      
    )

//<Link className="header-clickable" to="/SteamLibrary" onClick={() => props.setActiveTab("steamlibrary")}>Steam</Link>

    // return (
    //   <header className={darkMode ? "dark-mode" : "light-mode"}>
    //     <ul id="headerNav" className={`${props["activeUser"] === null ? "header hidden" : null}`}>
    //       <Link className={`clickable ${props["activeTab"] === "steamlibrary" ? "active" : null}`} to="/SteamLibrary" onClick={() => props.setActiveTab("steamlibrary")}>Steam</Link>
    //       <Link className={`clickable ${props["activeTab"] === "ubisoftlibrary" ? "active" : null}`} to="/UbisoftLibrary" onClick={() => props.setActiveTab("ubisoftlibrary")}>Ubisoft</Link>
    //       <button style={{ color: "black" }} onClick={() => props.setActiveUser(null)}>Logout</button>
    //     </ul>

    //     <div className="right">
    //       <Switch className="switch-color" onChange={() => setDarkMode(!darkMode)} checked={darkMode} uncheckedIcon={false} checkedIcon={true}></Switch>
    //       <Link className="header_profile_nav" to="/profile" onClick={() => props.setActiveTab("profile")}>
    //         <p className={`header_username clickable ${props["activeTab"] === "profile" ? "active" : null}`}>{props.activeUser.userId}</p>
    //         <img className={`header_picture ${props["activeTab"] === "profile" ? "active_picture" : null}`} src={logo} alt="" />
    //       </Link>
    //     </div>
    //   </header>
    // )
  return null;
}

export default Header;