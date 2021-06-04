import './css/Header.css';

import {Link} from "react-router-dom";

import logo from './img/logo.png';
import settings from "./img/settings.png";
import help from "./img/help.png";

const Header = () => {

    return ( 
      <header>
        <ul id="headerNav">
          <Link className="clickable" to="/library">Bibliothek</Link>
          <Link className="clickable" to="/news">News</Link>
          <Link className="clickable" to="/social">Social Club</Link>
          <Link className="clickable" to="/profile">Profil</Link>
        </ul>

        
        <div id="profileNav">
          <p id="userName">Willem DF</p>
          <img id="userPicture" src={logo} alt="Profile Picture"/>
        </div>
      </header>
    );
}
 
export default Header;