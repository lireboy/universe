import '../css/settings.css';
import { useState } from "react";
const axios = require("axios");


const Settings = (props) => {

    const [steampath, setSteampath] = useState("");
    const [originpath, setOriginpath] = useState("");
    return(
      <div className="settings_overview">
          <div className="settings-container">
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

          </div>


      
      </div>
    )
    
}

export default Settings;