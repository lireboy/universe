import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header"
import Library from "./Library"
import Profile from "./Profile"

import './css/App.css';


import wallpaper from "./img/wallpaper.jpg";


function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <div className="content">
            <Switch>
              <Route exact path="/library">
                <Library />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
            </Switch>
          </div>
          <img id="background" src={wallpaper} />
        </div>
      </Router>
  );
}


export default App;
