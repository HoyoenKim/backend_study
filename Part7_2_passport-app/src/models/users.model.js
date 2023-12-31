const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        unqiue: true,
    },
    password: {
        type: String,
        minLength: 5,
    },
    googleId: {
        type: String,
        unqiue: true,
        sparse: true,
    },
    kakaoId: {
        type: String,
        unqiue: true,
        sparse: true,
    }
})

userSchema.methods.comparePassword = async function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if(err) return cb(err);
        cb(null, isMatch);
    }); 
}

const saltRounds = 10;
userSchema.pre('save', function (next) {
    let user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;