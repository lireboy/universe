var mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    title: {
        String,
        required: true
    },
    info: String,
    image: String
})
const User = mongoose.model("Game", GameSchema);
module.exports = User;