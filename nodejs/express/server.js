const express = require('express');
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const PORT = 4000;
const path = require('path');

const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
// localhost:4000/index.html
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    const startTime = Date.now();
    console.log(`start: ${req.method} ${req.url}`);
    next();
    const diffTime = Date.now() - startTime;
    console.log(`end: ${req.method} ${req.baseUrl}${req.url} Time: ${diffTime} ms`);
});
app.get('/', (req, res) => {
    res.render('index', {
        imageTitle: 'It is a forest 2',
    });
});
app.use('/users', usersRouter);
app.use('/posts', postsRouter);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});