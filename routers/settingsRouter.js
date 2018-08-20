const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {Settings} = require('../models/settingsModel')

router.get('/', (req, res) => {
    Settings.find()
        .then(players => {
            res.json(players.map(player => player.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went terribly wrong' });
        });
});

router.post('/', (req, res) => {
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
/*
router.put('/:id', (req, res) => {
  if(!(req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['player', 'mouse', 'sensitivity', 'dpi', 'ads', 'ScopeSensitivity', 'keyboard'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Settings
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});
*/
router.put('/:id', (req, res)=>{
    // ensure that the id in the request path and the one in request body match
    if(!(req.params.id === req.body.id)){
        const message = `The request path ID ${req.params.id} and request body ID ${req.body.id} should match.`;
        console.error(message);
        return res.status(400).send(message);
    }
    //we need something to hold what the updated data should be
    const toUpdate = {};
    //properties that client can update
    const canBeUpdated = ['player', 'mouse', 'sensitivity', 'dpi', 'ads', 'ScopeSensitivity', 'keyboard'];
    //loop through the properties that can be updated
    //check if client sent in updated data for those
    for(let i=0; i<canBeUpdated.length;i++){
        const field = canBeUpdated[i];
        //if the property is in the req body and it is not null
        if(field in req.body && req.body.field !== null){
            //start adding the properties to the toUpdate object
            toUpdate[field] = req.body[field];
        }
    }
    //update the database by finding the id first using the id from req
    //then set the data to update
    Settings.findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(()=>{
        return Settings.findById(req.params.id)
            .then(data => res.status(200).json(data));
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(internalMsg);
    });
});

router.delete('/:id', (req, res) => {
  Settings
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted player settings with id \`${req.params.id}\``);
      res.status(204).end();
    });
});

module.exports = router;