const NavBarService = require('./services/navbar.service');
const WatchService = require('./services/watchBusiness/watch.service');
const WatchDependencies = WatchService.dependences;
const ImagaeService = require('./services/image.services');

const ComponentService = require('./services/devBusiness/component.services');


exports.db = function () {
    return {
        dbName: 'mocking',
        protocol: 'mongodb://',
        url: 'localhost:27017/'
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
        slider: {
            path: '/slider',
            view: 'slider'
        },
        components: {
            path: '/componentes',
            view: 'pages/components/components.hbs',
            services: {
                read: [NavBarService.read, ComponentService.read],
                readBySlug: ComponentService.readBySlug,
                readByID: ComponentService.readById
            },
            component: {
                view: 'pages/components/component.hbs'
            }
        },
        bannerLand: {
            path: '/bannerland',
            view: 'bannerLand'
        },
        tetra: {
            path: '/tetra',
            view: 'tetra'
        },
        admin: {
            path: '/admin',
            view: 'admin/admin.hbs',
            navigation: {
                path: 'navegacion',
                services: {
                    read: [NavBarService.read],
                    readByID: NavBarService.readById
                },
                view: 'admin/navigation.hbs',
            },
            image: {
                path: 'imagen',
                view: 'admin/image.hbs',
                services: {
                    read: [],
                    readByID: ImagaeService.readById
                }
            },
            watch: {
                path: 'relojes',
                services: {
                    read: [WatchService.read,
                        WatchDependencies.ColorsService.read,
                        WatchDependencies.MaterialsService.read,
                        WatchDependencies.CrownService.read,
                        WatchDependencies.BackCaseServices.read,
                        WatchDependencies.CoatingServices.read,
                        WatchDependencies.BrandService.read,
                        WatchDependencies.GenderService.read,
                        WatchDependencies.IlluminationService.read,
                        WatchDependencies.MechanismService.read,
                        WatchDependencies.DisplayService.read,
                        WatchDependencies.TimeFormatService.read,
                        WatchDependencies.TimeNumbersService.read,
                        WatchDependencies.WatchHandService.read,
                        WatchDependencies.CalendarService.read,
                        WatchDependencies.ClosureService.read
                    ]
                },
                view: 'admin/watch.hbs',
            },
            component: {
                path: 'componentes',
                services: {
                    read: [ComponentService.read],
                    readByID: ComponentService.readById
                },
                view: 'admin/components.hbs',
            }
        }
    }
};
