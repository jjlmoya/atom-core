(function () {
    "use strict";
    var locators = {
            container: 'og-banner-fold',
            action: 'og-banner-fold-badge',
            event: 'bannerFold'
        },
        toggleParent = function () {
            $zh.dom.applyFirst(document.getElementsByClassName('og-banner-fold'), function (element) {
                if (element.classList.contains('is-active')) {
                    $zh.tracking.trackEvent('fold', 'click', locators.event, 0);
                } else {
                    $zh.tracking.trackEvent('unfold', 'click', locators.event, 1);
                }
                element.classList.toggle('is-active');
            });
        },
        bindToggleToBadge = function (element) {
            element.addEventListener('click', function () {

                toggleParent();
            });
        },
        bindEventToBadge = function () {
            var elements = document.getElementsByClassName(locators.action);
            if (elements.length > 0) {
                for (var i = 0; i < elements.length; i++) {
                    bindToggleToBadge(elements[i]);
                }
            }
        },
        init = function () {
            bindEventToBadge();
        };
    document.addEventListener('components::' + locators.event, function () {
        init();
    });
    init();
})();