import { useState } from "react";
import {getGameManifests} from "./showAllGames";
const axios = require("axios");


const Settings = (props) => {

    const [steampath, setSteampath] = useState(props.activeUser.steampath);
    const [originpath, setOriginpath] = useState(props.activeUser.originpath);

    function formPreventDefault(e){ 
        e.preventDefault();
        console.log("trying to edit user");
        axios.patch("http://localhost:8080/user/" + props.activeUser.userId, {
            headers: {
                'content-type': 'application/json',
              },    
            "steampath": steampath,
            "originpath": originpath
        })
        .then(res => {
            console.log(res.data);
            props.activeUser.steampath = steampath;
            props.activeUser.originpath = originpath;
            props.activeUser.games = getGameManifests(steampath);
        })
        .catch(err => {
            console.log(err);
        })
    }


    return(
      <div className="settings_overview">
          <form className="settings-container" onSubmit={formPreventDefault}>
            <div className="title">
                Settings
            </div>
            <div className="settings">
                <div className="settings-row">
                    <div className="path">
                        Steampath:
                    </div>
                    <input placeholder="C:\\Program Files (x86)\\Steam"  type="text" name="name" value={steampath} onChange={(e) => setSteampath(e.target.value)} />
                </div>
                <div className="settings-row">
                    <div className="path">
                        Originpath:
                    </div>
                    <input placeholder="C:\\Program Files (x86)\\Origin Games"  type="text" name="name" value={originpath} onChange={(e) => setOriginpath(e.target.value)} />
                </div>
            </div>
            <button className="submit" type="submit" value="Save Settings">Save Settings</button>
          </form>
      </div>
    )
    
}

export default Settings;