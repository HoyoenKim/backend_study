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
    },
    username: {
        type: String,
        require: true,
        trim: true,
    },
    firstName: {
        type: String,
        default: 'First Name',
    },
    lastName: {
        type: String,
        default: 'Last Name',
    },
    bio: {
        type: String,
        default: 'No data',
    },
    hometown: {
        type: String,
        default: 'No data',
    },
    workspace: {
        type: String,
        default: 'No data',
    },
    education: {
        type: String,
        default: 'No data',
    },
    contact: {
        type: String,
        default: 'No data',
    },
    friends: [
        {type: String}
    ],
    friendsRequests: [
        {type: String}
    ],
}, { timestamps: true });

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