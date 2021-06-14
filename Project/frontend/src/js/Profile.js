import '../css/profile.css';
import profilepic from '../img/profilepicture.png';

let games = [
  {
    id: 1,
    title: "Ori",
    hours: "5 Std.",
    img: require("../img/ori.jpg").default
  },
  {
    id: 2,
    title: "Witcher 3",
    hours: "20 Std.",
    img: require("../img/witcher3.jpg").default
  },
  {
    id: 3,
    title: "Minecraft",
    hours: "138 Std.",
    img: require("../img/minecraft.jpg").default
  },
  {
    id: 4,
    title: "Ori",
    hours: "5 Std.",
    img: require("../img/ori.jpg").default
  },
  {
    id: 5,
    title: "Witcher 3",
    hours: "20 Std.",
    img: require("../img/witcher3.jpg").default
  },
  {
    id: 6,
    title: "Minecraft",
    hours: "138 Std.",
    img: require("../img/minecraft.jpg").default
  }
];

const profile = () => {
    return(
      <div className="profile_overview">
        <div id ="profile">
            <p id="userName">Willem</p>             
            <p id="info">Info:</p>
            <p id="infoText">Hier könnte ihr Text stehen.</p> 
            <img id="profile_user_Picture" src={profilepic} alt="Profile Picture"/>        
        </div>
        <div id ="recentlyPlayed">
          <p id="recent">Recently Played:</p>
          <ul id="gameList">
            {games.map((game) => {
              return <li className="profile_game_container" key={game.id}>
                <img src={game.img}/>
                <div className="profile_game_info">
                  <p className="profile_game_title">{game.title}</p>
                  <div className="profile_game_specific">
                    <p className="profile_game_gametime">{game.hours} ingesamt</p>
                    <p className="profile_game_lastplayed">Zuletzt gespielt am 13. Mai</p>
                  </div>
                </div>
              </li>
            })}
          </ul>
        </div>
      </div>
    )
    
}

export default profile;