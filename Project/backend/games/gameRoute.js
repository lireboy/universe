var express = require('express');
var router = express.Router();
var gameService = require("./gameService");


router.get('/', isAuthenticated, function (req, res, next) {
    gameService.getGames(function (err, result) {
        if (result) {
            res.send(Object.values(result));

        } else {
            res.send("Es gab Probleme");
        }

    })


})
router.get("/find", isAuthenticated, async function (req, res, next) {
    console.log("Trying to find game by Id");
    gameService.findGameBy(req.body, function (err, user) {
        if (user) {
            console.log("Found game by Id");
            res.send(user);
        } else {
            console.log("Something went wrong: " + err);
            res.send('Could not find game');
        }
    })
})

router.post('/createGame', async function (req, res, next) {
    console.log("Wants to create a game");
    gameService.createGame(req.body, function (err, user) {
        console.log(req.body);
        if (user) {
            console.log("Game created:" + user);
            res.send(user);

        } else {
            console.log("something went wrong" + err);
            res.send('could not create game');
        }
    });
})

module.exports = router;