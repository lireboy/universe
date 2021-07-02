import '../css/Library.css';
import {useState} from "react";
import {ReactComponent as DownloadSVG} from "../img/svg/download.svg";
import {ReactComponent as PlaySVG} from "../img/svg/play.svg";
const SteamAPI = require("steamapi");

let mimeType = 'image/jpg';

const Library = props => {

  const [currentGame, setCurrentGame] = useState(null);

  let games = typeof props.activeUser.games === "undefined" ? [] : props.activeUser.games;

  return(
    <div>
      <div id="libraryOverview">
        {games.map((game) => (
            <figure className={`game_preview`} key={game.title} onClick={() => setCurrentGame(game)}>
              <img className="gamePic" src={`data:${mimeType};base64,${game.poster}`} alt={game.title}/>
              <p className="gameTitle">{game.title}</p>
            </figure>
          ))}
      </div>

      {currentGame? GameDetailView([currentGame, setCurrentGame]):null}
    </div>
  )
}

function GameDetailView([currentGame, setCurrentGame]){

  //TODO Im Backend infos generieren und zurück ins Frontend Array übergeben
  const steam = new SteamAPI("BFDEDB9F8EE644344D9CDCD8E8F28CD4");

  steam.getGameDetails(currentGame.appid).then(data => {
    console.log(data);
  });

  console.log(currentGame.appid);

  return(
    <div className="game-detail-view">
      <div className={`game_detail ${currentGame.installed?"installed":"notinstalled"}`}>
        <img className="game_detail_pic" src={`data:${mimeType};base64,${currentGame.banner}`} alt={currentGame.title}/>
        <div className="game_detail_info">
          <p className="game_detail_title">{currentGame.title}</p>
          <p className="game_detail_description">{currentGame.description}</p>
        </div>
        
        <nav className="button_nav">
          <button className="play" onClick={() => startGame(currentGame.appid)}>Spielen</button>
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