import './css/Library.css';
import {useState} from "react";
import {ReactComponent as DownloadSVG} from "./img/svg/download.svg";
import {ReactComponent as PlaySVG} from "./img/svg/play.svg";

let games = [
  {
    id: 1,
    title: "Ori",
    description: "Ori and the Blind Forest is a 2D Metroidvania; a platform game with an emphasis on exploration, collecting items and upgrades, and backtracking to previously inaccessible areas. The player controls Ori, a white guardian spirit, and Sein, who is the light and eyes of the Spirit Tree.",
    img: require("./img/ori.jpg").default,
    installed: true
  },
  {
    id: 2,
    title: "Witcher 3",
    description: "The Witcher 3: Wild Hunt is an action role-playing game with a third-person perspective. Players control Geralt of Rivia, a monster slayer known as a Witcher. Geralt walks, runs, rolls and dodges, and (for the first time in the series) jumps, climbs and swims.",
    img: require("./img/witcher3.jpg").default,
    installed: false
  },
  {
    id: 3,
    title: "Minecraft",
    description: "Minecraft is a video game in which players create and break apart various kinds of blocks in three-dimensional worlds. The game's two main modes are Survival and Creative. In Survival, players must find their own building supplies and food. They also interact with blocklike mobs, or moving creatures.",
    img: require("./img/minecraft.jpg").default,
    installed: true
  },
  {
    id: 4,
    title: "Ori",
    description: "Ori and the Blind Forest is a 2D Metroidvania; a platform game with an emphasis on exploration, collecting items and upgrades, and backtracking to previously inaccessible areas. The player controls Ori, a white guardian spirit, and Sein, who is the light and eyes of the Spirit Tree.",
    img: require("./img/ori.jpg").default,
    installed: true
  },
  {
    id: 5,
    title: "Witcher 3",
    description: "The Witcher 3: Wild Hunt is an action role-playing game with a third-person perspective. Players control Geralt of Rivia, a monster slayer known as a Witcher. Geralt walks, runs, rolls and dodges, and (for the first time in the series) jumps, climbs and swims.",
    img: require("./img/witcher3.jpg").default,
    installed: false
  },
  {
    id: 6,
    title: "Minecraft",
    description: "Minecraft is a video game in which players create and break apart various kinds of blocks in three-dimensional worlds. The game's two main modes are Survival and Creative. In Survival, players must find their own building supplies and food. They also interact with blocklike mobs, or moving creatures.",
    img: require("./img/minecraft.jpg").default,
    installed: true
  },
  {
    id: 7,
    title: "Ori",
    description: "Ori and the Blind Forest is a 2D Metroidvania; a platform game with an emphasis on exploration, collecting items and upgrades, and backtracking to previously inaccessible areas. The player controls Ori, a white guardian spirit, and Sein, who is the light and eyes of the Spirit Tree.",
    img: require("./img/ori.jpg").default,
    installed: true
  },
  {
    id: 8,
    title: "Witcher 3",
    description: "The Witcher 3: Wild Hunt is an action role-playing game with a third-person perspective. Players control Geralt of Rivia, a monster slayer known as a Witcher. Geralt walks, runs, rolls and dodges, and (for the first time in the series) jumps, climbs and swims.",
    img: require("./img/witcher3.jpg").default,
    installed: false
  },
  {
    id: 9,
    title: "Minecraft",
    description: "Minecraft is a video game in which players create and break apart various kinds of blocks in three-dimensional worlds. The game's two main modes are Survival and Creative. In Survival, players must find their own building supplies and food. They also interact with blocklike mobs, or moving creatures.",
    img: require("./img/minecraft.jpg").default,
    installed: true
  }
];


const Library = () => {

  const [currentGame, setCurrentGame] = useState(null);
  
  return(
    <div>
      <div id="libraryOverview">
        {games.map((game) => (
            <figure className={`game_preview ${game.installed?"installed":"notinstalled"}`} key={game.id} onClick={() => (setCurrentGame({game}))}>
              <img className="gamePic" src={game.img} alt={game.title}/>
              <p className="gameTitle">{game.title}</p>
              <div className="download">
                <DownloadSVG/>
                <p>Installieren</p>
              </div>
            </figure>
          ))}

            { currentGame?
              GameDetailView([currentGame, setCurrentGame])
              : null
            }
          
      </div>
    </div>
  );
}

function GameDetailView([currentGame, setCurrentGame]){
  return(
    <div>
      <div className={`game_detail ${currentGame.game.installed?"installed":"notinstalled"}`}>
        <img className="game_detail_pic" src={currentGame.game.img} alt={currentGame.game.title}/>
        <div className="game_detail_info">
          <p className="game_detail_title">{currentGame.game.title}</p>
          <p className="game_detail_description">{currentGame.game.description}</p>
        </div>
        
        <nav className="button_nav">
          <button className="button play">Spielen</button>
          <button className="button install">Installieren</button>
          <button className="button back">Zurück</button>
        </nav>
      </div>
      <div className="game_detail_background" onClick={() => setCurrentGame(null)}/>
    </div>
  )
}

export default Library;