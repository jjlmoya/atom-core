var app = {

    locators: {},
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        this.init();
        var post = new Post();
    },
    init: function () {
        SocialLinking.Router.Splash.hide();
        SocialLinking.Router.Home.show();
    },
};

app.initialize();