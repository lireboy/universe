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

import arrowBack from "../img/svg/arrow_back.svg";
import arrowForward from "../img/svg/arrow_forward.svg";


const Header = (props) => {
  const [darkMode, setDarkMode] = useState(true);
  let activeUser = props["activeUser"];
  
  console.log(props.history.location);

  if (activeUser)
    return(
      <div>
        <Navbar fixed="top" className={darkMode ? "dark-mode" : "light-mode"} variant={darkMode ? "dark" : "light"}>
          <Nav className="mr-auto centered">
            <nav className="arrowNav">
              <img id="arrowBack" src={arrowBack} onClick={() => console.log(props.history.goBack())}></img>
              <img id="arrowForward" src={arrowForward} onClick={() => props.history.goForward()}></img>
            </nav>
            <Nav.Link className={props.history.location === "/SteamLibrary"?"active":"inactive"} as={Link} to="/SteamLibrary">Steam</Nav.Link>
            <Nav.Link className={props.history.location === "/UbisoftLibrary"?"active":"inactive"} as={Link} to="/UbisoftLibrary">Ubisoft</Nav.Link>
          </Nav>
          <NavDropdown className="ms-auto" title={
            <div className="nav-dropdown navdropdown-header">
              <p className={props.history.location === "/Profile"?"active":"inactive"}>{props.activeUser.userId}</p>
              <img className={`header_picture ${props["activeTab"] === "/Profile" ? "active_picture" : null}`} src={logo} alt="" />
            </div>
          }>
      	    <NavDropdown.Item className={props.history.location === "/Profile"?"active":"inactive"} as={Link} to="/Profile">Show Profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
            <Switch className="switch-color" onChange={() => setDarkMode(!darkMode)} checked={darkMode} uncheckedIcon={false} checkedIcon={true}></Switch>
            <NavDropdown.Divider/>
            <NavDropdown.Item onClick={() => props.setActiveUser(null)}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar>
      </div>
      
    )

//<Link className="header-clickable" to="/SteamLibrary" onClick={() => handleHistoryPush("steamlibrary")}>Steam</Link>

    // return (
    //   <header className={darkMode ? "dark-mode" : "light-mode"}>
    //     <ul id="headerNav" className={`${props["activeUser"] === null ? "header hidden" : null}`}>
    //       <Link className={`clickable ${props["activeTab"] === "steamlibrary" ? "active" : null}`} to="/SteamLibrary" onClick={() => handleHistoryPush("steamlibrary")}>Steam</Link>
    //       <Link className={`clickable ${props["activeTab"] === "ubisoftlibrary" ? "active" : null}`} to="/UbisoftLibrary" onClick={() => handleHistoryPush("ubisoftlibrary")}>Ubisoft</Link>
    //       <button style={{ color: "black" }} onClick={() => props.setActiveUser(null)}>Logout</button>
    //     </ul>

    //     <div className="right">
    //       <Switch className="switch-color" onChange={() => setDarkMode(!darkMode)} checked={darkMode} uncheckedIcon={false} checkedIcon={true}></Switch>
    //       <Link className="header_profile_nav" to="/profile" onClick={() => handleHistoryPush("profile")}>
    //         <p className={`header_username clickable ${props["activeTab"] === "profile" ? "active" : null}`}>{props.activeUser.userId}</p>
    //         <img className={`header_picture ${props["activeTab"] === "profile" ? "active_picture" : null}`} src={logo} alt="" />
    //       </Link>
    //     </div>
    //   </header>
    // )
  return null;
}

export default Header;