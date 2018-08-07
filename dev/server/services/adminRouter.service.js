exports.navigation = {
    get: function (next) {
        next({
            navAdmin:
                [{
                    name: 'General',
                    icon: '',
                    order: 0,
                    tabs: [
                        {
                            name: 'Navegación',
                            icon: '',
                            path: '/admin/navegacion',
                            order: 0,

                        }, {
                            name: 'Ejemplo',
                            icon: '',
                            path: '/admin/abc',
                            order: 1
                        }
                    ]
                }, {
                    name: 'Producto',
                    icon: '',
                    order: 0,
                    tabs: [
                        {
                            name: 'Relojes',
                            view: 'watch',
                            icon: '',
                            path: '/admin/relojes',
                            order: 0,

                        }, {
                            name: 'Correas',
                            icon: '',
                            path: '/admin/correas',
                            order: 1
                        }
                    ]
                }]
        });
    },
    set: function (navPage, next) {
    }
};


