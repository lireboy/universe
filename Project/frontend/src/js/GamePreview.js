import '../css/GamePreview.css';

const GamePreview = ({games}) => {

    return ( 
          <div id="gamePreview" className="scroll">
            {games.map((game) => (
                <div className="game-preview" key={game.id}>
                  <img className="gamePic" src={game.img}/>
                </div>
            ))}
        </div>
     );
}
 
export default GamePreview;