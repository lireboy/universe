import '../css/profile.css';
import React from 'react';
import profilepic from '../img/profilepicture.png';
import settings from '../img/svg/settings.svg';
import { Link } from "react-router-dom";
import { useState } from "react";
const axios = require("axios");


let games = [
  {
    id: 1,
    title: "Ori",
    hours: "5 Std.",
    img: require("../img/ori.jpg").default
  },
  {
    id: 2,
    title: "Witcher 3",
    hours: "20 Std.",
    img: require("../img/witcher3.jpg").default
  },
  {
    id: 3,
    title: "Minecraft",
    hours: "138 Std.",
    img: require("../img/minecraft.jpg").default
  },
  {
    id: 4,
    title: "Ori",
    hours: "5 Std.",
    img: require("../img/ori.jpg").default
  },
  {
    id: 5,
    title: "Witcher 3",
    hours: "20 Std.",
    img: require("../img/witcher3.jpg").default
  },
  {
    id: 6,
    title: "Minecraft",
    hours: "138 Std.",
    img: require("../img/minecraft.jpg").default
  }
];

const Profile = (props) => {
  const [info, setInfo] = useState(props.activeUser.info);

  function formPreventDefault(e) {
    e.preventDefault();
    console.log("trying to edit user");
    axios.patch("http://localhost:8080/user/" + props.activeUser.userId, {
      headers: {
        'content-type': 'application/json',
      },
      "info": info
    })
      .then(res => {
        console.log(res.data);
        props.activeUser.info = info;
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="profile_overview">
      <div className="profile">
        <div className="left">
          <img className="profile-picture" id="profile_user_Picture" src={profilepic} alt="" />
          <Link className="icon-settings" to="/settings" onClick={() => props.setActiveTab("settings")}>
            <img className={`icon-settings ${props["activeTab"] === "settings" ? "active" : null}`} src={settings} alt="" />
          </Link>
        </div>
        <div className="right">
          <p className="big">{props.activeUser.name}</p>
          <p className="medium">Info:</p>
          <form onSubmit={formPreventDefault}>
          <input id="info" placeholder="Default Text" type="text" name="name" value={info} onChange={(e) => setInfo(e.target.value)} />
          </form>
          <p className="small">{props.activeUser.email}</p>
        </div>
      </div>
      <div id="recentlyPlayed">
        <p id="recent">Recently Played:</p>
        <ul id="gameList">
          {games.map((game) => {
            return <li className="profile_game_container" key={game.id}>
              <img src={game.img} alt="" />
              <div className="profile_game_info">
                <p className="profile_game_title">{game.title}</p>
                <div className="profile_game_specific">
                  <p className="profile_game_gametime">{game.hours} ingesamt</p>
                  <p className="profile_game_lastplayed">Zuletzt gespielt am 13. Mai</p>
                </div>
              </div>
            </li>
          })}
        </ul>
      </div>
    </div>
  )

}

export default Profile;