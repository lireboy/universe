var express = require('express');
const {
    isAuthenticated
} = require('../authentication/authenticationService');
var router = express.Router();
var userService = require("./userService")


router.get('/', isAuthenticated, function (req, res, next) {
    userService.getUsers(function (err, result) {
        //console.log("Result" + result)
        if (result) {
            res.send(Object.values(result));

        } else {
            res.send("Es gab Probleme");
        }

    })


})
router.get("/find", isAuthenticated, async function (req, res, next) {
    console.log("Trying to find User by Id");
    userService.findUserById(req.body, function (err, user) {
        if (user) {
            console.log("Found User by Id");
            res.send(user);
        } else {
            console.log("Something went wrong: " + err);
            res.send('Could not find User');
        }
    })
})



module.exports = router;