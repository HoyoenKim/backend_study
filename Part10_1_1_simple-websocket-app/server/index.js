const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 7071 });

wss.on('connection', function connection(ws) {
    ws.send('connection established');

    ws.on('message', (messagefromclient) => {
        const message = JSON.parse(messagefromclient);
        console.log(message);
    });
});