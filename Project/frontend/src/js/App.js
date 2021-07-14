import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";

import Header from "./Header"
import SteamLibrary from "./SteamLibrary"
import UbisoftLibrary from "./UbisoftLibrary"
import Profile from "./Profile"
import LoginView from "./LoginView"
import Settings from "./SettingsView"

import wallpaper from "../img/wallpaper.jpg";
import { useState } from "react";

const App = (props) => {

  const[activeTab, setActiveTab] = useState("news");
  const[activeUser, setActiveUser] = useState(null);
  const[activeSettings, setActiveSettings] = useState("");
  let history = useHistory();

  if(activeUser){
    return (
      <Router>
        <div className="App">
          <Header activeUser={activeUser} activeTab={activeTab} setActiveTab={setActiveTab} setActiveUser={setActiveUser} history={history}></Header>
          <div id="content">
            <Switch>
              <Route exact path="/SteamLibrary">
                <SteamLibrary activeUser={activeUser}/>
              </Route>
              <Route exact path="/UbisoftLibrary">
                <UbisoftLibrary activeUser={activeUser}/>
              </Route>
              <Route exact path="/profile">
                <Profile activeUser={activeUser} setActiveTab={setActiveTab}></Profile>
              </Route>
              <Route exact path="/settings">
                <Settings activeUser={activeUser}></Settings>
              </Route>

            </Switch>
          </div>
          <div id="background"/>
        </div>
      </Router>
    );
  }
  else{
    return (
      <div className="App">
        <LoginView setActiveUser={setActiveUser}></LoginView>
        <img id="background" src={wallpaper} alt="" />
      </div>
    );  
  }
}


export default App;
