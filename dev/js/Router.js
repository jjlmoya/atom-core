var $ = $ || require('jquery'),
    Listeners = require('./Listeners'),
    Render = require('./Render'),
    Pages = {
        home: require('./pages/home'),
        splash: require('./pages/splash'),
        settings: require('./pages/settings'),
    };
module.exports = {
    locators: {
        page: '#page'
    },
    hide: function (page) {
        $('#' + page).hide();
    },
    show: function (page, model) {
        var $page = $('#' + page);
        $page.show();
        Listeners.addListeners();
        if ($page.data('template')) {
            Render.renderElement($page, model);
        } else {
            $(document).trigger('templates::loaded');
        }
        $('#page').attr('data-page', page);


    },
    getCurrentPage: function () {
        return $('#page').data('page');
    },
    renderPage: function (page) {
        var currentPage = this.getCurrentPage();
        if (page !== currentPage && page) {
            Pages[currentPage].hide(this.hide);
            Pages[page].init(this.show);
        }
    }
};