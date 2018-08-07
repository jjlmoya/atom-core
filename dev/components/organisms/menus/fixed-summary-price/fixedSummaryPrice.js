(function () {
    "use strict";
    var locators = {
            container: 'og-fixed-summary-price',
            wrapper: 'og-fixed-summary-price-wrapper',
            infoButton: 'og-fixed-summary-price-fold',
            hiddenContent: 'og-fixed-summary-price-unfold',
            CTAButton: 'og-fixed-summary-price-button',
            contentToCopy: 'content-to-copy',
            event: 'fixedSummaryPrice'
        },

        addListenerToElement = function (element, event, action) {
            element.addEventListener(event, function (e) {
                action(element.target);
            });
        },
        bindEventToElement = function (locator, event, action) {
            var elements = document.getElementsByClassName(locator);
            if (elements.length > 0) {
                for (var i = 0; i < elements.length; i++) {
                    addListenerToElement(elements[i], event, action);
                }
            }
        },
        actionToElement = function (element, action) {
            var elementTarget = element;
            if (elementTarget.length > 0) {
                action(elementTarget[0]);
            }
        },
        callToAction = function () {
            //TODO: REDO in EVERY-PROJECT
        },
        hideBlock = function () {
            actionToElement(document.getElementsByClassName(locators.contentToCopy), function (content) {
                actionToElement(document.getElementsByClassName(locators.hiddenContent), function (target) {
                    target.innerHTML += content.innerHTML;
                    content.innerHTML = '';
                });
            });
        },
        unfoldContent = function () {
            actionToElement(document.getElementsByClassName(locators.container), function (e) {
                e.classList.toggle('is-active');
                if (e.classList.contains('is-active')) {
                    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
                } else {
                    document.getElementsByTagName('body')[0].style.overflow = 'auto';
                }
            });
        },
        bindCTAButton = function () {
            bindEventToElement(locators.CTAButton, 'click', function () {
                callToAction();
            });

        },
        bindInfoButton = function () {
            bindEventToElement(locators.infoButton, 'click', function () {
                unfoldContent();
            });
        },
        init = function () {
            bindCTAButton();
            bindInfoButton();
            hideBlock();
        };
    document.addEventListener('components::' + locators.event, function () {
        init();
    });
    init();
})();