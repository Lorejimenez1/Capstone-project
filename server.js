const express = require('express');
const app = express();

app.use(express.static('public'));

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
});

if (require.main === module) {
    app.listen(process.env.PORT || 8080, function() {
        console.info(`App listening on ${this.address().port}`);
    });
}

module.exports = app;
