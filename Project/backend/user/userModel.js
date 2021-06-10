var mongoose = require('mongoose');
var bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true

    },
    name: {
        type:String,
        default: "Anon"
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
        ref: "Game"

    }],
    image: String,
    info: {
        type: String,
        default: "Default text"
    }
})
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next()
    };
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword
        next();
    })
}, function (err) {
    next(err);
})

UserSchema.methods.comparePassword = function (candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err){
            return next(err);
        
      } else {
            next(null, isMatch);
        };
    })
}
const User = mongoose.model("User", UserSchema);
module.exports = User;