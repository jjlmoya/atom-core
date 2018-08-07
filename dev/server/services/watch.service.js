var Watch = require('../model/watch.model');
exports.create = function (req, next) {
    let watch = new Watch(
        {
            gender: req.body.gender,
            price: req.body.price
        }
    );
    watch.save(function (err) {
        if (err) {
          console.log('Fail saving to BD')
        }
        next();
    })
};

exports.read = function () {
    return new Promise(function (resolve, reject) {
            Watch.find((err, result) => {
                if (err) reject(err);
                resolve({watchList: result});
            });
        }
    );
};