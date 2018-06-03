var $ = $ || require('jquery'),
    Router = require('./Router'),
    Render = require('./Render'),
    i18n = require('./i18n');
var app = {
    locators: {},
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
    init: function () {
        i18n.getCMS();
        $(document).ready(function () {
            Render.renderTemplatesByElement($('body'));
            Router.renderPage('home');
            Router.addListeners();
        });
        this.addHelpers();
    },
};

app.initialize();