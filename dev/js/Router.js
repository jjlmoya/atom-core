window.$ = $ || require('jquery');
var Render = require('./Render'),
    $ = require('jquery'),
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
    onRouterClick: function (instance) {
        document.addEventListener('menu::switchPage', function (e) {
            instance.renderPage(e.detail.page);
        }, false);
    },
    hide: function (page) {
        $('#' + page).hide();
    },
    show: function (page, model) {
        var $page = $('#' + page);
        $page.show();
        if ($page.data('template')) {
            Render.renderElement($page, model);
        } else {
            $(document).trigger('loadComponents::refresh');
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
        if (page !== currentPage && page) {
            Pages[currentPage].hide(this.hide);
            Pages[page].init(this.show, this.model);
        }
    }
};