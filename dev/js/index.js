var $ = require('jquery'),
    Router = require('./Router'),
    Render = require('./Render'),
    _ = require('lodash'),
    Components = [
        require('./components/itemNavigation')
    ],
    i18n = require('./i18n'),
    Post = require('./model/Post');
var app = {
    locators: {},
    firstPage: 'settings',
    initialize: function () {
        if (window.debug) {
            this.init();
        }
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        this.init();
    },
    addHelpers: function () {
        require('./helpers/equals');
    },
    goHome: function () {
        var e = document.querySelector('[data-page="' + this.firstPage + '"]');
        if (e) {
            e.click();
        }
    },
    init: function () {
        i18n.getCMS();
        this.addHelpers();
        var that = this;
        $(document).ready(function () {
            Render.renderTemplatesByElement($('body'), Router.model);
            Router.addListeners();
            _.forEach(Components, function (component) {
                component.init();
            });
            $(document).on('components::menu-fusion', function (e) {
                that.goHome();
            });
        });
        var post = new Post();
        post.withContent("12").withCharacters(12);
    },
};

app.initialize();