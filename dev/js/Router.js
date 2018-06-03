var $ = $ || require('jquery'),
    Listeners = require('./Listeners'),
    Render = require('./Render'),
    _ = require('lodash'),
    Pages = {
        home: require('./pages/home'),
        splash: require('./pages/splash'),
        settings: require('./pages/settings'),
    };
module.exports = {
    locators: {
        page: '#page'
    },
    model: {
        NavPages: [{
            page: 'home',
            display: 'Inicio'
        }, {
            page: 'settings',
            display: 'Configuración'
        }]
    },
    onRouterClick: function (instance) {
        document.addEventListener('menu::switchPage', function (e) {
            console.log(instance);
            instance.renderPage(e.detail.page);
        }, false);
    },
    hide: function (page) {
        $('#' + page).hide();
    },
    show: function (page, model) {
        var $page = $('#' + page);
        $page.show();
        Listeners.addListeners();
        if ($page.data('template')) {
            console.log(model);
            console.log(this);
            Render.renderElement($page, model);
        } else {
            $(document).trigger('templates::loaded');
        }
        $('#page').data('page', page);


    },
    addListeners: function () {
        this.onRouterClick(this);
    },
    getCurrentPage: function () {
        return $('#page').data('page');
    },
    renderPage: function (page) {
        var currentPage = this.getCurrentPage();
        console.log(currentPage);
        if (page !== currentPage && page) {
            Pages[currentPage].hide(this.hide);
            Pages[page].init(this.show, this.model);
        }
    }
};