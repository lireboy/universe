var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "games"

    }],
    image: String
})
const User = mongoose.model("User", UserSchema);
module.exports = User;
