const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

require('dotenv').config()


const { DATABASE_URL, PORT } = require('./config');
const newsRouter = require('./routers/newsRouter');
const settingsRouter = require('./routers/settingsRouter');
const userRouter = require('./routers/usersRouter');
//const playerPostsRouter = require('./routers/playerPostsRouter')
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');


mongoose.Promise = global.Promise;
const app = express();

app.use(morgan('common'));
app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.send(204);
    }
    next();
});

passport.use(localStrategy);

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/public/about.html");
});
app.get("/forums", (req, res) => {
    res.sendFile(__dirname + "/public/forums.html");
});
app.get("/news", (req, res) => {
    res.sendFile(__dirname + "/public/news.html");
})
app.get("/settings", (req, res) => {
    res.sendFile(__dirname + "/public/pro-settings.html");
});
app.get("/login-page", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})

app.use('/news', newsRouter);
app.use('/pro-settings', settingsRouter);
//app.use('/player-posts', playerPostsRouter);
app.use('/api/users', userRouter);
app.use('api/login', userRouter);

let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}
if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}
module.exports = { app, runServer, closeServer };