var $ = $ || require('jquery'),
    Footer = require('../components/footer'),
    Header = require('../components/header'),
    Menu = require('../components/menu'),
    PostService = require('../services/post'),
    EntryService = require('../services/entry'),
    _ = require('lodash');


module.exports = {
    pageSettings: {
        genericComponents: [Footer, Header, Menu],
        locator: 'home',
        model: {
            /*DEFAULT VALUES*/
            currentPage: 'home',
            Posts: [],
            articles: [EntryService.getMockPost(), EntryService.getMockPost(), EntryService.getMockPost()]
        },
    },
    init: function (onSuccess) {
        var instance = this;
        PostService.getPosts()
            .always(function (data) {
                instance.pageSettings.model.Posts = data || [];
                onSuccess(instance.pageSettings.locator, instance.pageSettings.model);
                _.forEach(instance.pageSettings.genericComponents, function (components) {
                    components.show();
                });
            });
    },
    hide: function (onSuccess) {
        onSuccess(this.pageSettings.locator);
        _.forEach(this.pageSettings.genericComponents, function (components) {
            components.hide();
        });
    }
};