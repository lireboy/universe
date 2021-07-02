import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header"
import SteamLibrary from "./SteamLibrary"
import Profile from "./Profile"
import LoginView from "./LoginView"
import RegisterView from "./RegisterView"
import Settings from "./SettingsView"

import '../css/App.css';
import wallpaper from "../img/wallpaper.jpg";
import { Component } from "react";

class App extends Component {

  constructor() {
    super();
    this.state = {
        activeTab: "news",
        activeUser: null,
        activeSettings: ""
    };
    this.setActiveTab = tabname => {
      this.setState({
        activeTab: tabname
      });
    }
    this.setActiveUser = user => {
      this.setState({
        activeUser: user
      });
      this.setActiveSettings = settingsName => {
        this.setState({
          activeSettings: settingsName
        });
      }  
    }
  }

  render(){

    let activeUser = this.state.activeUser;
    if(activeUser){
      return (
        <Router>
          <div className="App">
            <div className="content">
              <Header activeUser={this.state.activeUser} activeTab={this.state.activeTab} setActiveTab={this.setActiveTab} setActiveUser={this.setActiveUser}></Header>
              <Switch>
                <Route exact path="/SteamLibrary">
                  <SteamLibrary activeUser={this.state.activeUser}/>
                </Route>
                <Route exact path="/profile">
                  <Profile activeUser={this.state.activeUser} setActiveTab={this.setActiveTab}></Profile>
                </Route>
                <Route exact path="/settings">
                  <Settings activeUser={this.state.activeUser}></Settings>
                </Route>

              </Switch>
            </div>
            <img id="background" src={wallpaper} alt="" />
          </div>
        </Router>
      );
    }
    else{
      return (
        <div className="App">
          <LoginView setActiveUser={this.setActiveUser}></LoginView>
          <img id="background" src={wallpaper} alt="" />
        </div>
      );  
    }
  }
}


export default App;
