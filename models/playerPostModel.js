'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var playerPostSchema = mongoose.Schema({
    content: 'string',
    username: 'string',

});

playerPostSchema.methods.serialize = function() {
    return {
        id: this._id,
        username: this.username,
        content: this.content,


    };
};

const PlayerPost = mongoose.model('PlayerPost', playerPostSchema);

module.exports = {PlayerPost};