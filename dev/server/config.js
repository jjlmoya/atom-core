exports.db = function () {
    return {
        dbName: 'mocking',
        protocol: 'mongodb://',
        url: 'localhost:27017'
    }
};

exports.server = function () {
    return {
        port: 3125
    }
};

exports.router = function () {
    return {
        //veiw - path
        "home": '/'
    }
}
