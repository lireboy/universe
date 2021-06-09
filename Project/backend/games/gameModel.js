var mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    gameId: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    info: String,
    image: String
})
const Game = mongoose.model("Game", GameSchema);
module.exports = Game;