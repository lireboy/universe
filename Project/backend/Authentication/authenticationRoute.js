var express = require('express');
var router = express.Router();
var authenticationService = require('./authenticationService');
var userService = require('../user/userService');

router.post('/loginBasic', async function (req, res, next) {
    const base64Credentials = req.headers.authorization.split(' ')[1];
    console.log("Header: " + req.headers.authorization);
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    console.log("Credentials: " + credentials);
    const [userID, password] = credentials.split(':');
    console.log("Username: " + userID + "  Password: " + password);
    const user = await authenticationService.createSessionToken({
        userID,
        password
    }, function (err, token, user) {
        if (err) {
            console.log("Fehler: " + err);

        }
        if (token) {
            res.header("Authorization", "Bearer" + token);

            if (user) {
                const {
                    id,
                    userID,
                    userName,
                    ...partialObject
                } = user;
                const subset = {
                    id,
                    userID,
                    userName
                };
                console.log(JSON.stringify(subset))
                res.send(subset)
            } else {
                console.log("User is null, even though a token has been created. Error: " + err);
                return res.status(401).json({
                    message: 'Invalid Authentication Credentials!'
                });
            }
        }
    });

})

router.post('/login', function (req, res, next) {

    console.log("Want to create token")

    authenticationService.createSessionToken(req.body, function (err, token, user) {
        if (token) {
            res.header("Authorization", "Bearer" + token);

            if (user) {
                const {
                    id,
                    userId,
                    email,
                    ...partialObject
                } = user;
                const subset = {
                    id,
                    userId,
                    email
                };
                console.log(JSON.stringify(subset))
                res.send(subset)
            } else {
                console.log("User is null, even though a token has been created. Error: " + err);
                res.send('Could create token');
            }
        } else {
            console.log("Token has not been created, Error: " + err);
            res.send('Could not create token');
        }
    })

})

router.post('/createUser', async function (req, res, next) {
    console.log("Wants to create a user");
    userService.createUser(req.body, function (err, user) {
        console.log(req.body);
        if (user) {
            console.log("User created:" + user);
            res.send(user);

        } else {
            console.log("something went wrong" + err);
            res.send('could not create User');
        }
    });
})

module.exports = router;