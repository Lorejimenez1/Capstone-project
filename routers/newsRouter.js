const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {News} = require('../models/newsModel');

router.get('/', (req, res) => {
    News.find()
        .then(posts => {
            res.json(posts.map(post => {
                return {
                    id: post._id,
                    title: post.title,
                    url: post.url,
                    imageURL: post.imageURL,
                    source: post.source
                };
            }));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went terribly wrong' });
        });
});

//create a new news post
router.post('/', (req, res)=>{
    //store the required properties in an array
    const requiredFields = ['title', 'imageURL', 'url', 'source', ];
    //use for loop to check if all required properties are in the req body
    for(let i=0; i<requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)){
            const message = `Missing ${field} in request body.`;
            //console error the message if at least one is missing
            console.error(message);
            //return with a 400 staus and the error message
            return res.status(400).send(message);
        }
    }
//if all properties are in the request body
    News.create({
        title: req.body.title,
        imageURL: req.body.imageURL,
        url: req.body.url,
        source: req.body.source
    })
        .then(newRest => res.status(201).json(newRest))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });

});
module.exports = router;

