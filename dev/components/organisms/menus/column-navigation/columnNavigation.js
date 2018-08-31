(function () {
    "use strict";
    var locators = {
            container: 'og-column-navigation--scroll',
            event: 'columnNavigation'
        },
        bindScroll = function () {
            document.addEventListener('scroll', function () {
                $zh.dom.applyAll(document.getElementsByClassName(locators.container),
                    function (e) {
                        console.log(e.dataset.scroll);
                        console.log(window.scrollY);
                        if (e.dataset.scroll && window.scrollY > e.dataset.scroll) {
                            if (!e.classList.contains('is-active')) {
                                e.classList.add('is-active');
                            }
                        } else if (window.scrollY <= e.dataset.scroll) {
                            if (e.classList.contains('is-active')) {
                                e.classList.remove('is-active');
                            }
                        }
                    }
                );
            });
        },
        bindEvents = function () {
            bindScroll();
        },
        init = function () {
            bindEvents();
        };
    init();
})();