const db = require('../db');
const COLLECTION = 'navElements';
exports.service = {
    get: function (next) {
        db.get().collection(COLLECTION).find().toArray((err, result) => {
            next({
                navPages: result
            });
        });
    },
    set: function (navPage, next) {
        db.get().collection(COLLECTION).save(navPage, next);
    }
};


