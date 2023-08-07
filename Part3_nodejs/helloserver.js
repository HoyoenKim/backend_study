const http = require('http');
const port = 3000;
const targetObject = {
    a: "a",
    b: "b",
}

// server는 event emitter 를 기반으로 만들어짐.
const server = http.createServer((req, res) => {
    if(req.method === 'POST' && req.url === '/home') {
        req.on('data', (data) => {
            console.log(data);
            const stringfiedData = data.toString();
            console.log(stringfiedData);
            const sourceObject = JSON.parse(data.toString());
            Object.assign(targetObject, sourceObject);
        })
    }
    else {
        if(req.url === '/home') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(targetObject));
        }
        else if(req.url === '/about') {
            res.setHeader('Content', 'text/html');
            res.write('<html>');
            res.write('<body>');
            res.write('<h1>about</h1>');
            res.write('</body>');
            res.write('</html>');
        }
        else {
            res.statusCode = 404;
            res.end();
        }
    }    
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});