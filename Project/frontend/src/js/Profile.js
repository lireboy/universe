import {React, useState} from 'react';
import profilepic from '../img/profilepicture.png';
import axios from "axios";
import Button from 'react-bootstrap/Button'

let mimeType = 'image/jpg';


const Profile = (props) => {

  const [info, setInfo] = useState(props.activeUser.info);
  const [username, setUsername] = useState(props.activeUser.name);
  const [img, setImg] = useState(props.activeUser.img);

  function formPreventDefault(e) {
    e.preventDefault();
    console.log("trying to edit user");
    axios.patch("http://localhost:8080/user/" + props.activeUser.userId, {
      headers: {
        'content-type': 'application/json',
      },
      "info": info,
      "name": username,
      "img": img
    })
      .then(res => {
        console.log(res.data);
        props.activeUser.info = info;
        props.activeUser.name = username;
        props.activeUser.img = img;
      })
      .catch(err => {
        console.log(err);
      })
  }

  let recentlyPlayedSteam = [];

  for(let game of props.activeUser.games){
    for(let rec of props.activeUser.recentlyPlayedSteam){
      if(game.appid === rec.appid.toString()){
        game.playtime_2weeks = rec.playtime_2weeks;
        game.playtime_forever = rec.playtime_forever;
        recentlyPlayedSteam.push(game);
      }
    }
  }

  const handleImageChange = (e) =>  {
    const selected = e.target.files[0];
    const allowed_types = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];
    if(selected && allowed_types.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      }
      reader.readAsDataURL(selected);
    } else {
      console.log("file not supported");
    }
  }

  return(
    <div className="profile_overview">
      <div className="profile">
      <div className="left">
        <div className="profile-picture" style={{background: img ? `url("${img}") no-repeat center/cover` : "#131313"}}>
          {!img && (
            <>
            <img className="profile-picture" id="profile_user_Picture" src={img} alt="" />  
            </>       
          )}
          {/* <img className="profile-picture" id="profile_user_Picture" src={profilepic} alt="" />
           */}
           </div>
        </div>
        <form onSubmit={formPreventDefault} className="profile-right">
          <input type="text" className="big" name="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
          <p className="medium">Info:</p>
          <textarea rows="8" className="info" type="text" name="info" value={info} onChange={(e) => setInfo(e.target.value)}>
          </textarea>
          <div className="buttonPos">
          <label for ="fileupload" className="fileupload">Select Image</label>
          <input type="file" id="fileupload" onChange={handleImageChange} />
          <Button variant="success" type="submit" >Update</Button>
          </div>
        </form>
        
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