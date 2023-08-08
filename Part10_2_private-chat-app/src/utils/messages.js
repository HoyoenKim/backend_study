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
    })
    .then((res) => {
        console.log('message created successfully');
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports = {
    saveMessages
}