const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const newsSchema = mongoose.Schema ({
    title: 'string',
    url: 'string',
    imageURL: 'string',
    source: 'string'
})

const News = mongoose.model('News', newsSchema);
module.exports = {News};