import '../css/Library.css';
import {useState} from "react";

let mimeType = 'image/jpg';

const Library = props => {


  let games = typeof props.activeUser.ubisoftGames === "undefined" ? [] : props.activeUser.ubisoftGames;

  return(
    <div>
      <div id="libraryOverview">
        {games.map((game) => (
            <figure className={`game_preview`} key={game.title}>
              <img className="gamePic" src={`data:${mimeType};base64,${game.thumb_image}`} alt={game.title}/>
              <p className="gameTitle">{game.title}</p>
            </figure>
          ))}
      </div>
    </div>
  )
}

export default Library;