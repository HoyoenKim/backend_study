const path = require('path');
const config = require('config');
const serverConfig = config.get('server');
require('dotenv').config();

const express = require('express'); 
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();
const port = serverConfig.port;

const cookieEncryptionKey = process.env.COOKIE_ENCRYPTION_KEY;
app.use(cookieSession({
    name: 'cookie-session-name',
    keys: [cookieEncryptionKey],
}));

app.use(express.json());
// <form> handle
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
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
})

const dbUsername = encodeURIComponent(process.env.MONGO_USERNAME);
const dbPassword = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbCluster = process.env.MONGO_CLUSTER_NAME;
mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}`)
.then(() => {console.log('Connected to MongoDB');})
.catch(err => console.log(err));

const mainRouter = require('./routes/main.router');
const usersRouter = require('./routes/users.router');
app.use('/', mainRouter);
app.use('/auth', usersRouter);

app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});