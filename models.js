const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const authorSchema = mongoose.Schema({
    firstName: 'string',
    lastName: 'string',
    userName: {
        type: 'string',
        unique: true
    }
});

const newsSchema = mongoose.Schema ({
    title: 'string',
    url: 'string',
    imageURL: 'string',
    source: 'string'
})

const proSettingsSchema = mongoose.Schema ({
    player: 'string',
    mouse: 'string',
    sensitivity: {type: Number, requires: true},
    dpi: {type: Number, requires: true},
    ads: {type: Number, requires: true},
    ScopeSensitivity:  {type: Number, requires: true},
    keyboard: 'string'
});

const playersPostSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    text: {type: String, requires: true},
    created: {type: Date, default: Date.now}
});

playersPostSchema.virtual('authorName').get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
});

playersPostSchema.pre('find', function(next) {
    this.populate('author');
    next();
});

playersPostSchema.pre('findOne', function(next) {
    this.populate('author');
    next();
});


playersPostSchema.methods.serialize = function() {
    return {
        id: this._id,
        author: this.authorName,
        text: this.text
    };
};

proSettingsSchema.methods.serialize = function () {
    return {
        player: this.player,
        mouse: this.mouse,
        sensitivity: this.sensitivity,
        dpi: this.dpi,
        ads: this.ads,
        ScopeSensitivity:  this.ScopeSensitivity,
        keyboard: this.keyboard
    };

};

const News = mongoose.model('News', newsSchema);
const Author = mongoose.model('Author', authorSchema);
const PlayerPost = mongoose.model('PlayerPost', playersPostSchema);
const Settings = mongoose.model('Settings', proSettingsSchema);

module.exports = {Author, PlayerPost, Settings, News };