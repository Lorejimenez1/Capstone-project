const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const package = require('./package.json');
const { DATABASE_URL, PORT } = require('./config');
const newsRouter = require('./routers/newsRouter');
const settingsRouter = require('./routers/settingsRouter');
const adminsRouter = require('./routers/adminsRouter');


mongoose.Promise = global.Promise;
const app = express();

app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.json());



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/views/about.html");
});
app.get("/forums", (req, res) => {
    res.sendFile(__dirname + "/views/forums.html");
});
app.get("/news", (req, res) => {
    res.sendFile(__dirname + "/views/news.html");
})
app.get("/settings", (req, res) => {
    res.sendFile(__dirname + "/views/pro-settings.html");
});
app.get("/login", (req, res) => {
    res.sedfile(__dirname + "/views/login.html")
})





app.post('/pro-settings', (req, res) => {
    const requiredFields = ['player', 'mouse', 'sensitivity', 'dpi', 'ads', 'scopeSensitivity', 'keyboard'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    Settings
        .create({
            player: req.body.player,
            mouse: req.body.mouse,
            sensitivity: req.body.sensitivity,
            dpi: req.body.dpi,
            ads: req.body.ads,
            ScopeSensitivity:  req.body.ScopeSensitivity,
            keyboard: req.body.keyboard
        })
        .then(settings => res.status(201).json(settings.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });

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
module.exports = { runServer, app, closeServer };