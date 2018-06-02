var $ = $ || require('jquery'),
    RouterMenu = require('../components/routerMenu'),
    Footer = require('../components/footer'),
    Header = require('../components/header'),
    _ = require('lodash');


module.exports = {
    pageSettings: {
        genericComponents: [Footer, Header],
        locator: 'home',
        model: {
            /*DEFAULT VALUES*/
            currentPage: 'home',
            scheduledPosts: 20,
            socialMedia: [
                {
                    name: 'twitter',
                    isEnabled: false
                }, {
                    name: 'facebook',
                    isEnabled: true
                }]
        },
    },

    init: function (onSuccess) {
        onSuccess(this.pageSettings.locator, this.pageSettings.model);
        _.forEach(this.pageSettings.genericComponents, function (components) {
            components.show();
        });

    },
    hide: function (onSuccess) {
        onSuccess(this.pageSettings.locator);
        _.forEach(this.pageSettings.genericComponents, function (components) {
            components.hide();
        });
    }
};