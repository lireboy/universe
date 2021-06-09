const Game = require("./gameModel");
//const User = require("../user/userModel");
const userService = require('../user/userService');


async function createGame(props, callback) {
    const {
        gameId,
        title,
        info,
        image
    } = props;
    const doesExist = await Game.findOne({
        gameId: gameId
    })
    console.log("checking for existent games");
    if (doesExist) {
        console.log("gameId already exists" + err);
        callback(err, null);
    } else {
        var game = new Game({
            gameId,
            title,
            info,
            image
        });
        const savedGame = await game.save();
        callback(null, savedGame);
    }
}

function getGames(callback) {
    Game.find(function (err, games) {
        if (err) {
            console.log("Fehler bei Suche: " + err)
            return callback(err, null)
        } else {
            console.log("Alles super");
            return callback(null, games);
        }
    })
}

function findGameBy(searchGameId, callback) {
    console.log("UserService: find user by ID: " + searchGameId);

    if (!searchGameId) {
        callback("UserID is missing");
    } else {
        var query = Game.findOne({
            gameId: searchGameId
        });
        query.exec(function (err, game) {
            if (err) {
                console.log("Did not find game for gameId: " + searchGameId);
                return callback("Did not find game for gameId: " + searchGameId, null);
            } else {
                console.log(`Found gameId: ${searchGameId}`);
                callback(null, game);
            }
        })
    }
}

async function addGameToUser(params,props,callback){
    if(props && params){
        console.log("Adding game: " + params + " to user: " + props.userId);
        var game = await Game.findOne({
            _id: params
        });
        userService.findUserBy(props.userId, (err, user) =>{
            console.log("Tryingto find User for the game " + props.userId);
            if(err){
                callback(err,null);
            }else{
                console.log("User found!");
                user.games.push(game);
                console.log("Game pushed to User's game list");
                user.save(function(err){
                    if(err){
                        console.log("Could not save game to user");
                        return;
                    } else {
                        console.log("saved game to user");
                        callback(null,game);
                    }
                });
   
            }
        });
        
    }
}

module.exports = {
    findGameBy,
    getGames,
    createGame,
    addGameToUser
}