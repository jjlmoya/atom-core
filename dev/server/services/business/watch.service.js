var Watch = require('../../model/watch.model');
exports.create = function (req, next) {
    let watch = createWatch(req.body);
    watch.save(function (err) {
        if (err) {
            console.log('Fail saving to BD');
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


exports.readById = function (id) {
    return new Promise(function (resolve, reject) {
            Watch.findById(id, (err, result) => {
                if (err) reject(err);
                resolve({editElement: result});
            });
        }
    );
};

exports.update = function (req) {
    return new Promise(function (resolve, reject) {
            Watch.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
                if (err) return reject();
                resolve();
            });
        }
    );

};


exports.delete = function (req) {
    return new Promise(function (resolve, reject) {
            Watch.findByIdAndRemove(req.params.id, function (err) {
                if (err) return reject();
                resolve();
            });
        }
    );
};


let createWatch = function (body) {
    return new Watch(
        {
            gender: body.gender,
            price: body.price
        }
    )
};
