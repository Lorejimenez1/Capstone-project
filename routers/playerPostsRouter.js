const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PlayerPost} = require('../models/playerPostModel')

router.get('/', (req, res) => {
        PlayerPost
        .find().sort({_id: -1})
        .then(posts => {
            res.json(posts.map(post => post.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went terribly wrong' });
        });
});
router.post('/', (req, res) => {
    const requiredFields = ['username', 'content'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    PlayerPost
        .create({
            username: req.body.username,
            content: req.body.content,
        })
        .then(
            post => res.status(201).json(post.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'});
        });
});
router.delete('/:id', (req, res) => {
    PlayerPost.findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted  post with id \`"${req.params.id}"\``);
            res.status(204).end();
        });
});


module.exports = router;