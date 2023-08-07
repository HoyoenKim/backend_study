const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

// req.body
app.use(express.json());
// req.cookies
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('hi');
});

const accessTokenScretText = 'superSecret';
const refreshTokenScretText = 'supersuperSecret';

let refreshTokens = [];
app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = {
        name: username,
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || accessTokenScretText;
    const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN || '30s';
    const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: accessTokenExpiresIn });

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || refreshTokenScretText;
    const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN || '1d';
    const refreshToken = jwt.sign(user, refreshTokenSecret, { expiresIn: refreshTokenExpiresIn });
    refreshTokens.push(refreshToken);

    res.cookie('jwt', refreshToken, {
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
        accessToken: accessToken,
    });

    return accessToken;
});

app.get('/refresh', (req, res) => {
    const cookies = req.cookies;
    if(cookies?.jwt == null) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || refreshTokenScretText;
    jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || accessTokenScretText;
        const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN || '30s';

        // user 는 토큰을 생성할 때 저장한 정보!
        const accessToken = jwt.sign({name: user.username}, accessTokenSecret, { expiresIn: accessTokenExpiresIn });
        res.json({
            accessToken: accessToken,
        });
    });
});

const posts = [
    {
        username : 'John',
        title: 'Post 1',
    }, 
    {
        username : 'Han',
        title: 'Post 2',
    }
]

app.get('/posts', authMiddelware, (req, res) => {
    res.json(posts);
})

function authMiddelware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.ACCESS_TOKEN_SECRET || 'superSecret';

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        // next middelware, can use user
        req.user = user;
        next();
    });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));