import {React, useState} from 'react';
import profilepic from '../img/profilepicture.png';
import axios from "axios";

let mimeType = 'image/jpg';


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

  let recentlyPlayedSteam = [];

  for(let game of props.activeUser.games){
    for(let rec of props.activeUser.recentlyPlayedSteam){
      console.log(game.appid + " + " + rec.appid);
      if(game.appid === rec.appid.toString()){
        game.playtime_2weeks = rec.playtime_2weeks;
        game.playtime_forever = rec.playtime_forever;
        recentlyPlayedSteam.push(game);
      }
    }
  }

  return(
    <div className="profile_overview">
      <div className="profile">
        <div className="left">
            <img className="profile-picture" id="profile_user_Picture" src={profilepic} alt=""/> 
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
      <div id ="recentlyPlayed">
        <p id="recent">Recently Played:</p>
        <ul id="gameList">
          {recentlyPlayedSteam.map((game) => {
            return <li className="profile_game_container" key={game.appid}>
              <img src={`data:${mimeType};base64,${game.icon}`} alt=""/>
              <div className="profile_game_info">
                <p className="profile_game_title">{game.title}</p>
                <div className="profile_game_specific">
                  <p className="profile_game_gametime">{convertPlaytime(game.playtime_2weeks)} in den letzten 2 Wochen</p>
                  <p className="profile_game_lastplayed">{convertPlaytime(game.playtime_forever)} insgesamt</p>
                </div>
              </div>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
    
}

function convertPlaytime(playtimeInMins){
  if(playtimeInMins === 1)
    return playtimeInMins + " Minute";
  else{
    if(playtimeInMins > 120){
      playtimeInMins = Math.round(playtimeInMins / 60);
      if(playtimeInMins === 1)
        return playtimeInMins + " Stunde";
      else 
        return playtimeInMins + " Stunden";
    }
    else
      return playtimeInMins + " Minuten";
  }
}

export default Profile;