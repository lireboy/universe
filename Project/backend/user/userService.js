const SteamAPI = require('steamapi');
const steam = new SteamAPI('steam token');
const User = require("./userModel");


/*  spiele vom user laden
    ist user angemeldet? sonst anmeldung
    user anmelden
    abmelden
    bibliothek laden (ownedgames)
        spieldetails
    
 */

async function createUser(props, callback) {
    const {
        userID,
        email,
        password
    } = props;
    const doesExist = await User.findOne({
        email: email
    })
    console.log("checking for existent users");
    if (doesExist) {
        console.log("Email already exists" + err);
        callback(err, null);
    } else {
        var user = new User({
            userID,
            email,
            password
        });
        const savedUser = await user.save();
        callback(null, savedUser);
    }
}

function getUsers(callback) {
    User.find(function (err, users) {
        if (err) {
            console.log("Fehler bei Suche: " + err)
            return callback(err, null)
        } else {
            console.log("Alles super");
            return callback(null, users);
        }
    })
}

function findUserBy(searchUserID, callback) {
    console.log("UserService: find user by ID: " + searchUserID);

    if (!searchUserID) {
        callback("UserID is missing");
    } else {
        var query = User.findOne({
            userID: searchUserID
        });
        query.exec(function (err, user) {
            if (err) {
                console.log("Did not find user for UserID: " + searchUserID);
                return callback("Did not find user for UserID: " + searchUserID, null);
            } else {
                if (user) {
                    console.log(`Found userID: ${searchUserID}`);
                    callback(null, user);
                } else {
                    if ('admin' == searchUserID) {
                        console.log("Do not have admin account yet. Create if with default password");
                        var adminUser = new User();
                        adminUser.userID = "admin"
                        adminUser.password = "123"
                        adminUser.userName = "Default Admin Account"
                        adminUser.isAdministrator = true

                        adminUser.save(function (err) {
                            if (err) {
                                console.log("Could not create default admin account: " + err);
                                callback("Could not create default admin account", null);
                            } else {
                                callback(null, adminUser);
                            }
                        });

                    } else {
                        console.log("Could not find user for UserID: " + searchUserID);
                        callback(null, user);
                    }
                }
            }
        })
    }
}

module.exports = {
    findUserBy,
    getUsers,
    createUser
}