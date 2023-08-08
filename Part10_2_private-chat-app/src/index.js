const path = require('path');
const crypto = require('crypto');

const express = require('express');
const app = express();

const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

const { saveMessages, fetchMessages } = require('./utils/messages');

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));
app.use(express.json());


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hoyeon:1234@express-cluster.rez6pg8.mongodb.net/')
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(err));

const randomId = () => crypto.randomBytes(8).toString('hex');

app.post('/session', (req, res) => {
    const data = {
        username: req.body.username,
        userID: randomId(),
    }
    res.send(data);
});


io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    const userID = socket.handshake.auth.userID;

    if(!username) {
        return next(new Error('Invalid username'));
    }

    socket.username = username;
    socket.id = userID;
    next();
});

let users = [];
io.on('connection', async socket => {
    let userData = {
        username: socket.username,
        userID: socket.id
    };
    users.push(userData);
    io.emit('users-data', {users});
    
    // 클라이언트에서 보내온 메시지
    socket.on('message-to-server', (payload) => {
        io.to(payload.to).emit('message-to-client', payload);
        saveMessages(payload);
    });

    // 데이터베이스에서 메시지 가져오기
    socket.on('fetch-messages', ({ receiver }) => {
        fetchMessages(io, socket.id, receiver);
    });

    // 유저가 방에서 나갔을 때
    socket.on('disconnect', (data) => {
        users = users.filter(user => user.userID!== socket.id);
        io.emit('users-data', { users });
        io.emit('user-away', socket.id);
    });
});



const port = 4001;
server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});