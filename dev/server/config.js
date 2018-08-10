const literals = require('./literals/panel');
const NavBarService = require('./services/navbar.service');
const WatchService = require('./services/business/watch.service');
const ColorsService = require('./services/business/color.services');
const MaterialsService = require('./services/business/material.services');


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
        bannerLand: {
            path: '/bannerland',
            view: 'bannerLand'
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
                },
                view: 'admin/navigation.hbs',
            },
            watch: {
                display: literals.titles.watch,
                path: 'relojes',
                services: {
                    read: [WatchService.read, ColorsService.read, MaterialsService.read]
                },
                view: 'admin/watch.hbs',
            }
        }
    }
};
