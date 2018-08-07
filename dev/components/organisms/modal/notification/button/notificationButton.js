(function () {
    "use strict";
    var locators = {
            container: 'og-notification-button',
            button: 'og-notification-actionable',
            close: 'og-notification-close'
        },
        model = {
            event: 'notificationButton',
            category: 'notification-button'
        },
        sendTracking = function (settings) {
            var ga = window.ga || false;
            if (ga) {
                ga('send', 'event', settings);
            }
        },
        analytics = {
            close: function () {
                sendTracking({
                    eventCategory: model.category,
                    eventAction: 'click',
                    eventLabel: 'close'
                });
            },
            link: function () {
                sendTracking({eventCategory: model.category, eventAction: 'click', eventLabel: 'link'});
            },
        },
        closeAction =  function (e) {
            analytics.close();
            e.target.parentNode.parentNode.classList.remove('is-active');
        },
        bindCloseButton = function () {
            var closeButtons = document.getElementsByClassName(locators.close);
            for (var i = 0; i < closeButtons.length; i++) {
                closeButtons[i].addEventListener('click', closeAction);
            }
        },
        doSomething = function () {
            analytics.link();
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