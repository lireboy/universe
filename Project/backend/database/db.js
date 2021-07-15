var mongoose = require('mongoose');
const config = require('config');

let _db;

const connectionString = "mongodb+srv://universe:einhorn@cluster0.ydslo.mongodb.net/UniverseDB";

function initDB(callback) {
    if (_db) {
        if (callback) {
            return callback(null, _db);

        } else {
            return _db;
        }
    } else {
        mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        _db = mongoose.connection;

        _db.on('error', console.error.bind(console, 'connection error'));
        _db.once('open', function () {
            console.log("Connected to database " + connectionString + "ind DB.js: " + _db);
            callback(null, _db);
        })
    }

}

function getDb() {
    return _db;

}
module.exports = {
    getDb,
    initDB
};