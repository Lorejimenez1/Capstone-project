'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var authorSchema = mongoose.Schema({
    epicGamesID: {
        type: 'string',

    }
});



var playerPostSchema = mongoose.Schema({
    title: 'string',
    content: 'string',
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },

});

playerPostSchema.pre('find', function(next) {
    this.populate('author');
    next();
});

playerPostSchema.pre('findOne', function(next) {
    this.populate('author');
    next();
});

playerPostSchema.virtual('authorName').get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
});

playerPostSchema.methods.serialize = function() {
    return {
        id: this._id,
        author: this. epicGamesID,
        content: this.content,


    };
};

var Author = mongoose.model('Author', authorSchema);
const PlayerPost = mongoose.model('PlayerPost', playerPostSchema);

module.exports = {Author, BlogPost};