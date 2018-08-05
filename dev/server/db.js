var MongoClient = require('mongodb').MongoClient;
var Config = require('./config');

var state = {
    db: null
};

exports.connect = function (url, done) {
    if (state.db) return done();
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db) {
        if (err) return done(err);
        state.db = db.db(Config.db().dbName);
        done();
    })
};

exports.get = function () {
    return state.db;
};
exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null;
            state.mode = null;
            done(err);
        })
    }
};