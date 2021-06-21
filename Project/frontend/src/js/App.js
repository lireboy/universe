import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header"
import SteamLibrary from "./SteamLibrary"
import Profile from "./Profile"
import LoginView from "./LoginView"
import RegisterView from "./RegisterView"

import '../css/App.css';
import wallpaper from "../img/wallpaper.jpg";

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Switch>
              <Route exact path="/SteamLibrary">
                <SteamLibrary />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/LoginView">
                <LoginView/>
              </Route>
              <Route exact path="/RegisterView">
                <RegisterView/>
              </Route>
            </Switch>
          </div>
          <img id="background" src={wallpaper} />
        </div>
      </Router>
  );
}


export default App;
