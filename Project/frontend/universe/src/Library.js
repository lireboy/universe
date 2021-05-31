import './css/Library.css';

let games = [
  {
    id: 1,
    title: "Ori",
    img: require("./img/ori.jpg").default
  },
  {
    id: 2,
    title: "Witcher 3",
    img: require("./img/witcher3.jpg").default
  },
  {
    id: 3,
    title: "Minecraft",
    img: require("./img/minecraft.jpg").default
  }
];

const Library = () => {
  return(
    <div>
      <ul id="gameList">
        {games.map((game) => {
          return <li key={game.id} onClick={showGameDetails(game)}>
            {game.title}
          </li>
        })}
      </ul>

      <div>
        <p id="gameName"></p>
      </div>
    </div>
  );
}

function showGameDetails(game){
  
}

export default Library;