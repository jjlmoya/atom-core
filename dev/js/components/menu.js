var $ = $ || require('jquery');
module.exports = {
    locators: {
        id: '#menu'
    },
    show: function () {
        $(this.locators.id).show();
    },
    hide: function () {
        $(this.locators.id).hide();
    }
};
