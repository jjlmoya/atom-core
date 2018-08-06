const db = require('../db');
const COLLECTION = 'navElements';
exports.service = {
    get: function () {
        return new Promise(function (resolve, reject) {
                db.get().collection(COLLECTION).find().toArray((err, result) => {
                    if (err) reject(err);
                    resolve({
                        navPages: result
                    });
                });
            }
        );

    },
    set: function (navPage, next) {
        db.get().collection(COLLECTION).save(navPage, next);
    }
};


