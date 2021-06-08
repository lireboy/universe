var userService = require('../user/userService')
var jwt = require("jsonwebtoken");
var config = require("config");
//const axios = require('axios');


function createSessionToken(props, callback) {
    console.log("AuthenticationService: create Token");

    if (!props) {
        console.log("Error: have no json body");
        callback("JSON-Body missing", null, null);
        return;
    }
    userService.findUserBy(props.userID, function (error, user) {
        if (user) {
            console.log("Found user, check the password")

            user.comparePassword(props.password, function (err, isMatch) {
                if (err) {
                    console.log("Password is invalid!");
                    callback(err, null);

                } else {
                    console.log("Password is correct!, Create token.");

                    var issueAt = new Date().getTime();
                    var expirationTime = config.get('session.timeout');
                    var expiresAt = issueAt + (expirationTime * 1000);
                    var privateKey = config.get('session.tokenKey');
                    let token = jwt.sign({
                        "user": user.userID
                    }, privateKey, {
                        expiresIn: expiresAt,
                        algorithm: 'HS256'
                    });

                    console.log("Token created: " + token);
                    callback(null, token, user);
                }
            })
        }
    })
}

function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        var privateKey = config.get('session.tokenKey');
        jwt.verify(token, privateKey, {
            algorithm: "HS256"
        }, (err, user) => {
            if (err) {
                res.status(500).json({
                    error: "Not Authorized"
                });
                return;
            }
            return next();
        });
    } else {
        res.status(500).json({
            error: "Not Authorized"
        });
        return;
    }
}

module.exports = {
    createSessionToken,
    isAuthenticated
}