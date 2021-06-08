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
        userId,
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
            userId,
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
            userId: searchUserID
        });
        query.exec(function (err, user) {
            if (err) {
                console.log("Did not find user for userId: " + searchUserID);
                return callback("Did not find user for userId: " + searchUserID, null);
            } else {
                if (user) {
                    console.log(`Found userId: ${searchUserID}`);
                    callback(null, user);
                } else {
                    if ('admin' == searchUserID) {
                        console.log("Do not have admin account yet. Create if with default password");
                        var adminUser = new User();
                        adminUser.userId = "admin"
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
                        console.log("Could not find user for UserId: " + searchUserID);
                        callback(null, user);
                    }
                }
            }
        })
    }
}

async function deleteUser(props, callback) {
    if (props) {
        console.log(props);
        await Post.deleteOne({
            _id: props
        });
        callback(null, "User has been deleted");
    } else {
        console.log("A user with this id could not been found!");
        callback(err, null);
    }
}

async function editUser(params, props, callback) {
    if (props && params) {
        console.log(props + params);
        var user = await User.findOne({
            _id: params
        });
        if (props.email) {
            user.email = props.email;
            console.log("Email changed!");
        }
        if (props.name) {
            user.name = props.name;
            console.log("Name changed!");
        }
        if (props.image) {
            user.image = props.image;
            console.log("Image changed!");
        }
        if (props.password) {
            user.password = props.password;
            console.log("Password changed!");
        }


        await user.save();
        console.log("All changes have been saved!")
        callback(null, user);

    } else {
        console.log("NO Json-Body found!");
        callback(err, null);
    }
}


module.exports = {
    findUserBy,
    getUsers,
    createUser,
    deleteUser,
    editUser
}