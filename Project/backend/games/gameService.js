const Game = require("./gameModel");


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

module.exports = {
    findGameBy,
    getGames,
    createGame
}