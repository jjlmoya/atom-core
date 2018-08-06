const literals = require('./literals/panel');


exports.db = function () {
    return {
        dbName: 'mocking',
        protocol: 'mongodb://',
        url: 'localhost:27017'
    }
};

exports.server = function () {
    return {
        port: 3125
    }
};

exports.router = function () {
    return {
        home: {
            path: '/',
            view: 'home'
        },
        modal: {
            path: '/modal',
            view: 'modal'
        },
        admin: {
            path: '/admin',
            view: 'admin/admin.hbs',
            navigation: {
                display: literals.titles.navigation,
                path: 'navegacion',
                services: [require('./services/navPages').service.get],
                view: 'admin/navigation.hbs',
            },
            watch: {
                display: literals.titles.watch,
                path: 'relojes',
                services: [],
                view: 'admin/watch.hbs',
            }
        },
    }
};
