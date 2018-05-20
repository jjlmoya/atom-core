var SocialLinking = SocialLinking || {};
SocialLinking.Router = (function () {
    var locators = {
            splash: 'splash_screen',
            home: 'home'
        },
        model = { /*DEFAULT VALUES*/
            currentPage: 'splash',
            scheduledPosts: 20
        },
        pages = {
            splash: {
                show: function () {
                    show('splash_screen');
                },
                hide: function () {
                    hide('splash_screen');
                }
            },
            home: {
                show: function () {
                    show(locators.home);
                    toggleHeader(true);
                    toggleFooter(true);
                },
                hide: function () {
                    hide(locators.home);
                }
            },
        },
        hide = function (page) {
            $('#' + page).hide();
            $('body').removeClass(page);
        },
        show = function (page) {
            var $page = $('#' + page);
            model.currentPage = page;
            $page.show();
            if ($page.data('template')) {
                SocialLinking.Render.renderElement($page, model);
            }
            $('body').addClass(page);
        },
        toggleFooter = function (status) {
            var $header = $('footer');
            if(status) {
                $header.show();
            } else {
                $header.hide();
            }
        },
        toggleHeader= function (status) {
            var $header = $('header');
            if(status) {
                $header.show();
            } else {
                $header.hide();
            }
        };
    return {
        Home:{
            show: pages.home.show,
            hide: pages.home.hide
        },
        Splash: {
            show: pages.splash.show,
            hide: pages.splash.hide
        }
    };
})();