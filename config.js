'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL ||
    'mongodb://localhost/fortniteDB';
exports.PORT = process.env.PORT || 8080;