var express = require('express');
const {isAuthenticated} = require('../Authentication/authenticationService');
var router = express.Router();
var userService = require("./userService")


router.get('/', isAuthenticated, function (req, res, next) {
    userService.getUsers(function (err, result) {
        if (result) {
            res.send(Object.values(result));

        } else {
            res.send("Es gab Probleme");
        }

    })


})

router.get("/find", isAuthenticated, async function (req, res, next) {
    console.log("Trying to find User by Id");
    userService.findUserBy(req.body, function (err, user) {
        if (user) {
            console.log("Found User by Id");
            res.send(user);
        } else {
            console.log("Something went wrong: " + err);
            res.send('Could not find User');
        }
    })
})

router.delete("/", isAuthenticated, async function (req, res, next) {
    console.log("Deleting user");
    userService.deleteUser(req.body._id, function (err, callback) {
        if (err) {
            console.log("User could not be deleted!")
            res.send("User could not be deleted!" + err);
        } else {
            console.log("user deleted!");
            res.status(204).send();
        }
    })
})

router.patch("/:id", isAuthenticated, async function (req, res, next) {
    console.log("Editing user");
    userService.editUser(req.params.id, req.body, function (err, user) {
        if (user) {
            console.log("User edited!");
            res.send(user);
        } else {
            console.log("Something went wrong! " + err);
            res.send("Could not edit user!");
        }
    })
})



module.exports = router;