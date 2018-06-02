var $ = $ || require('jquery'),
    RouterMenu = require('../components/routerMenu');
module.exports = {
    pageSettings: {
        locator: 'settings',
        model: {
            /*DEFAULT VALUES*/
            currentPage: 'splash'
        }
    },
    init: function (onSuccess) {
        var instance = this;
        onSuccess(this.pageSettings.locator, this.pageSettings.model);
        $('body').on('templateLoaded', function () {
            RouterMenu.init(instance.pageSettings.locator);
        });
    },
    hide: function (onSuccess) {
        onSuccess(this.pageSettings.locator);
        $('body').off('templateLoaded');
    }
};