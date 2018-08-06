const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {Settings} = require('../models/settingsModel')

router.get('/pro-settings', (req, res) => {
    Settings.find()
        .then(players => {
            res.json(players.map(player => player.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went terribly wrong' });
        });
});

router.post('/pro-settings', (req, res) => {
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
module.exports = router;