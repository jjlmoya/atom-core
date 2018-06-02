var $ = $ || require('jquery');
module.exports = {
    locators: {
        id: '#footer'
    },
    show: function () {
        $(this.locators.id).show();
    },
    hide: function () {
        $(this.locators.id).hide();
    }
};