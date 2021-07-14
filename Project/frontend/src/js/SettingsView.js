import { useState } from "react";
import {getGameManifests} from "./showAllGames";
import Button from "react-bootstrap/Button"
import { getRecentlyPlayedSteam } from "./showAllGames";
const axios = require("axios");


const Settings = (props) => {

    const [steampath, setSteampath] = useState(props.activeUser.steampath);
    const [originpath, setOriginpath] = useState(props.activeUser.originpath);
    const [steamID, setSteamID] = useState(props.activeUser.steamID);

    function formPreventDefault(e){ 
        e.preventDefault();
        console.log("trying to edit user");
        axios.patch("http://https://bya8kf7trc.execute-api.us-east-1.amazonaws.com/user/" + props.activeUser.userId, {
            headers: {
                'content-type': 'application/json',
              },    
            "steampath": steampath,
            "originpath": originpath,
            "steamID": steamID
        })
        .then(() => {
            props.activeUser.steampath = steampath;
            props.activeUser.originpath = originpath;
            props.activeUser.games = getGameManifests(steampath);
            props.activeUser.steamID = steamID;
            props.activeUser.recentlyPlayedSteam = getRecentlyPlayedSteam(props.activeUser.steamID);
        })
        .catch(err => {
            console.log(err);
        })
    }


    return(
      <div className="settings_overview">
          <form className="settings-container" onSubmit={formPreventDefault}>
            <h1 id="settings-title">Settings</h1>
            <div className="settings-row">
                <p className="path">Steampath:</p>
                <input placeholder="C:\\Program Files (x86)\\Steam"  type="text" name="steampath" value={steampath} onChange={(e) => setSteampath(e.target.value)} />
            </div>
            <div className="settings-row">
                <p className="path">Originpath:</p>
                <input placeholder="C:\\Program Files (x86)\\Origin Games"  type="text" name="originpath" value={originpath} onChange={(e) => setOriginpath(e.target.value)} />
            </div>
            <div className="settings-row">
                <p className="path">SteamID:</p>
                <input placeholder="https://steamcommunity.com/id/JohnDoe/"  type="text" name="steamID" value={steamID} onChange={(e) => setSteamID(e.target.value)} />
            </div>
            <Button variant="success" id="settings-submit" type="submit">Save Settings</Button>
          </form>
      </div>
    )
    
}

export default Settings;