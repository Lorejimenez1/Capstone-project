const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');

const cookieParser = require('cookie-parser');
const session = require('express-session');


 require('./auth/passport')(passport);

const package = require('./package.json');
const { DATABASE_URL, PORT } = require('./config');
const newsRouter = require('./routers/newsRouter');
const settingsRouter = require('./routers/settingsRouter');
const userRouter = require('./routers/usersRouter');
const playerPostsRouter = require('./routers/playerPostsRouter')



mongoose.Promise = global.Promise;
const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(bodyParser());
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.send(204);
    }
    next();
});
app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

app.set('views', __dirname + '/Public');
app.engine('html', require('ejs').renderFile);

app.use(session({ secret: 'ilovefortnitetoken'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use(express.static('Public'));

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/Public/index.html");
});
app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/Public/about.html");
});
app.get("/forums", isLoggedIn, (req, res) => {

    res.render("forums.html", {
        user: req.user // get the user out of session and pass to template
    });
});
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/Public/signup.html");
})
app.get("/settings", (req, res) => {
    res.sendFile(__dirname + "/Public/pro-settings.html");
});
app.get("/login-page", (req, res) => {
    res.sendFile(__dirname + "/Public/login.html")
})

app.get('/profile', (req, res) => {
    res.render('profile.ejs', {
        user: req.user // get the user out of session and pass to template
    });

})
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

app.use('/news-posts', newsRouter);
app.use('/pro-settings', settingsRouter);
app.use('/player-posts', playerPostsRouter);
app.use('/api/users', userRouter);
app.use('api/login', userRouter);

app.use('*', (req,res)=> {
    res.send('user not found. Please sign up or re-sign in.');
});
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
module.exports = { app, runServer, closeServer, passport };