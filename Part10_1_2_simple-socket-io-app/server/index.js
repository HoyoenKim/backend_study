const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: '*' }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message1', (message) => {
        io.emit('message2', `${socket.id.substr(0,2)} sad ${message}`);
    });
});

const port = 8080;
http.listen(port, () => {
    console.log(`listening on *:${port}`);
});