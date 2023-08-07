const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const productsRouter = require('./routes/products.router');
const PORT = 4000;
const path = require('path');

const dbUsername = encodeURIComponent("hoyeon");
const dbPassword = encodeURIComponent("1234");
const dbCluster = "express-cluster.rez6pg8.mongodb.net";
mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}`)
.then(() => {console.log('Connected to MongoDB');})
.catch(err => console.log(err));

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
app.use('/products', productsRouter);
app.use('/error', (req, res, next) => {
    // async error는 next안에 넣어야 한다.
    setImmediate(() => { next(new Error('async error handler')); });
});
// error handlers
app.use((err, req, res, next) => {
    res.json({message: err.message});
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});