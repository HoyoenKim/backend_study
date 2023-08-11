const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentsSchema);