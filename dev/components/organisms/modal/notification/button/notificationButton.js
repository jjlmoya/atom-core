(function () {
    "use strict";
    var locators = {
            container: 'og-notification-button',
            button: 'og-notification-actionable',
            close: 'og-notification-close'
        },
        model = {
            event: 'notificationButton'
        },
        closeAction = function (e) {
            e.target.parentNode.parentNode.classList.remove('is-active');
            $zh.tracking.trackEvent(windo.localStorageKey.href, 'close', model.event);
        },
        bindCloseButton = function () {
            var closeButtons = document.getElementsByClassName(locators.close);
            for (var i = 0; i < closeButtons.length; i++) {
                closeButtons[i].addEventListener('click', closeAction);
            }
        },
        doSomething = function () {
            $zh.tracking.trackEvent(window.location.href, 'click', model.event);
            //TODO: REDEFINE BEHAVIOR
        },
        bindAction = function () {
            var actionButtons = document.getElementsByClassName(locators.button);
            for (var i = 0; i < actionButtons.length; i++) {
                actionButtons[i].addEventListener('click', doSomething);
            }
        },
        bindEvents = function () {
            bindCloseButton();
            bindAction();
        },
        displayButton = function () {
            var buttonsToShow = document.getElementsByClassName(locators.container);
            for (var i = 0; i < buttonsToShow.length; i++) {
                buttonsToShow[i].classList.add('is-active');
            }
        },
        init = function () {
            setTimeout(function () {
                displayButton();
            }, 2000);
            bindEvents();
        };
    document.addEventListener('components::' + model.event, function (e) {
        init();
    });
    init();
})();