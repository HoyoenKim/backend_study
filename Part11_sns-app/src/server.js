const path = require('path');
const config = require('config');
const serverConfig = config.get('server');
require('dotenv').config();
const flash = require('connect-flash');

const express = require('express'); 
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
const port = serverConfig.port;

//middleware
const cookieEncryptionKey = process.env.COOKIE_ENCRYPTION_KEY;
app.use(cookieSession({
    name: 'cookie-session-name',
    keys: [cookieEncryptionKey],
}));

// register regenerate & save after the cookieSession middleware initialization
app.use(function(request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next();
});

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use(express.json());
// <form> handle
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const dbUsername = encodeURIComponent(process.env.MONGO_USERNAME);
const dbPassword = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbCluster = process.env.MONGO_CLUSTER_NAME;
mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}`)
.then(() => {console.log('Connected to MongoDB');})
.catch(err => console.log(err));

const commentsRouter = require('./routes/comments.router');
const friendsRouter = require('./routes/friends.router');
const likesRouter = require('./routes/likes.router');
const mainRouter = require('./routes/main.router');
const postsRouter = require('./routes/posts.router');
const profileRouter = require('./routes/profile.router');
const usersRouter = require('./routes/users.router');

app.get('/send', (req, res) => {
    req.flash('post success', '포스트가 생성되었습니다.')
    res.send('message send page');
});

app.get('/receive', (req, res) => {
    res.send(req.flash('post success')[0]);
});

app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.currentUser = req.user;
    next();
});

app.use('/', mainRouter);
app.use('/auth', usersRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/comments', commentsRouter);
app.use('/profile/:id', profileRouter);
app.use('/friends', friendsRouter);
app.use(likesRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || 'Internal server error');
});

app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});