import '../css/Library.css';
import {useState} from "react";
import {ReactComponent as DownloadSVG} from "../img/svg/download.svg";
import {ReactComponent as PlaySVG} from "../img/svg/play.svg";
import {getGameManifests} from "./showAllGames";
import { Component } from 'react';

let mimeType = 'image/jpg';

/* REFERENCE
{
  id: 1,
  title: "Ori",
  description: "Ori and the Blind Forest is a 2D Metroidvania; a platform game with an emphasis on exploration, collecting items and upgrades, and backtracking to previously inaccessible areas. The player controls Ori, a white guardian spirit, and Sein, who is the light and eyes of the Spirit Tree.",
  img: require("./img/ori.jpg").default,
  installed: true
}
*/

class Library extends Component {
  
  constructor(props){
    super(props);
    this.games = getGameManifests(this.props.activeUser.steampath);
    this.state = {
      currentGame: null
    }
  }
  
  render(){
    console.log(this.games)
    //const [currentGame, setCurrentGame] = useState(null);
    return(
      <div>
        <div id="libraryOverview">
          {this.games.map((game) => (
              <figure className={`game_preview`} key={game.title}>
                <img className="gamePic" src={`data:${mimeType};base64,${game.poster}`} alt={game.title}/>
                <p className="gameTitle">{game.title}</p>
              </figure>
            ))}
  
              {/* { currentGame?
                GameDetailView([currentGame, setCurrentGame])
                : null
              } */}
            
        </div>
      </div>
    );
  }
}

function GameDetailView([currentGame, setCurrentGame]){
  return(
    <div className="game-detail-view">
      <div className={`game_detail ${currentGame.game.installed?"installed":"notinstalled"}`}>
        <img className="game_detail_pic" src={`data:${mimeType};base64,${currentGame.game.banner}`} alt={currentGame.game.title}/>
        <div className="game_detail_info">
          <p className="game_detail_title">{currentGame.game.title}</p>
          <p className="game_detail_description">{currentGame.game.description}</p>
        </div>
        
        <nav className="button_nav">
          <button className="play" onClick={() => startGame(currentGame.game.appid)}>Spielen</button>
          <button className="back">Zurück</button>
        </nav>
      </div>
      <div className="game_detail_background" onClick={() => setCurrentGame(null)}/>
    </div>
  )
}

function startGame(appid){
  let startwindow = window.open("steam://rungameid/" + appid);
  startwindow.close();
}

export default Library;