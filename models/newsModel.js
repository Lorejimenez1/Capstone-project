const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const storySchema = mongoose.Schema ({
    title: 'string',
    url: 'string',
    imageURL: 'string',
    source: 'string'
})

const News = mongoose.model('News', storySchema);
module.exports = {News};