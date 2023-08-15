const path = require('path');
const config = require('config');
const serverConfig = config.get('server');
require('dotenv').config();
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');

const express = require('express'); 
const passport = require('passport');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
const port = serverConfig.port;

//middleware

// cookie session (client에 저장)
/*
const cookieSession = require('cookie-session');
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
*/

// express session (client에 session identifer 저장, server에 session 저장)
const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        // https 사용시 true
        secure: false,
        //maxAge: 1000 * 60 * 60 * 24 * 7
    },
    name: 'shop-app-cookie',
    resave: false,
    saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use(express.json());
// <form> handle
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(methodOverride('_method'));
app.use(fileUpload());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const dbUsername = encodeURIComponent(process.env.MONGO_USERNAME);
const dbPassword = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbCluster = process.env.MONGO_CLUSTER_NAME;
mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}`)
.then(() => {console.log('Connected to MongoDB');})
.catch(err => console.log(err));

const mainRouter = require('./routes/main.router');
const usersRouter = require('./routes/users.router');
const productsRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');
const adminCategoriesRouter = require('./routes/admin-categories.router');
const adminProductsRouter = require('./routes/admin-products.router');

app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.currentUser = req.user;
    res.locals.cart = req.session.cart;
    next();
});


app.use('/', mainRouter);
app.use('/auth', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/admin/categories', adminCategoriesRouter);
app.use('/admin/products', adminProductsRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || 'Internal Server Error');
});

app.listen(port, () => {
    console.log(`listening on port ${port}!`);
});