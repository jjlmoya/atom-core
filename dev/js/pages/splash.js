module.exports = {
    pageSettings: {
        locator: 'splash_screen',
        model: {
            currentPage: 'splash'
        }
    },
    init: function (onSuccess) {
        onSuccess(this.pageSettings.locator, this.pageSettings.model);
    },
    hide: function (onSuccess) {
        onSuccess(this.pageSettings.locator);
    }
};