const literals = require('./literals/panel');
const NavBarService = require('./services/navbar.service');


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
                services: {
                    read: [NavBarService.read],
                    readByID: NavBarService.readById
                } ,
                view: 'admin/navigation.hbs',
            },
            watch: {
                display: literals.titles.watch,
                path: 'relojes',
                services: [require('./services/watch.service').read],
                view: 'admin/watch.hbs',
            }
        },
    }
};
