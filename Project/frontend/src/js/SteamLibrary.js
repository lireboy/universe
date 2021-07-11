import {useState} from "react";
let steam = require("steam-provider");

let mimeType = 'image/jpg';

const Library = props => {

  const [currentGame, setCurrentGame] = useState(null);

  let games = typeof props.activeUser.games === "undefined" ? [] : props.activeUser.games;
  for(let i = 0; i < games.length; i++){
    if(games[i].title === "Steamworks Common Redistributables"){
      games = games.splice(i, 1);
    }
  }

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
  var provider = new steam.SteamProvider();
 
  provider.detail(currentGame.appid).then(result => {
      console.log(result)
  });

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