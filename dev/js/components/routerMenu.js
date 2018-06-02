var $ = $ || require('jquery'),
    Router = require('../Router');
module.exports = {
    locators: {
        routerMenu: '.router-menu',
        routerButton: '.router-button'
    },
    addListeners: function () {
        $(this.locators.routerMenu).off('click', this.locators.routerButton);
        $(this.locators.routerMenu).on('click', this.locators.routerButton, function () {
            SocialLinking.Router.changePage($(this).data('page'));
        });
    },
    init: function (page) {
        this.addListeners();
        $(this.locators.routerButton + '[data-page="' + page + '"]').addClass('is-active');
    }
};
