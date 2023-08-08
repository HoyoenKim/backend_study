const messageModel = require('../models/messages.model');
const getToken = (sender, receiver) => {
    const key = [sender, receiver].sort().join('_');
    return key;
}   

const saveMessages = async ({ from, to, message, time }) => {
    const token = getToken(from, to);
    const data = {
        from, message, time
    }
    messageModel.updateOne({ userToken: token}, {
        $push: { message: data }
    }, (err, res) => {
        if(err) console.log(err);
        console.log('message created successfully');
    })
}

module.exports = {
    saveMessages
}