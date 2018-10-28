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
        callToAction = function () {
            //TODO: REDO in EVERY-PROJECT
        },
        hideBlock = function () {
            $zh.dom.applyFirst(document.getElementsByClassName(locators.contentToCopy), function (content) {
                $zh.dom.applyFirst(document.getElementsByClassName(locators.hiddenContent), function (target) {
                    target.innerHTML += content.innerHTML;
                    content.innerHTML = '';
                });
            });
        },
        unfoldContent = function () {
            $zh.dom.applyFirst(document.getElementsByClassName(locators.container), function (e) {
                e.classList.toggle('is-active');
                if (e.classList.contains('is-active')) {
                    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
                } else {
                    document.getElementsByTagName('body')[0].style.overflow = 'auto';
                }
            });
        },
        bindCTAButton = function () {
            $zh.dom.on(locators.CTAButton, 'click', function () {
                $zh.tracking.trackEvent('CTA fixedSummaryPrice', 'click', locators.event);
                callToAction();
            });

        },
        bindInfoButton = function () {
            $zh.dom.on(locators.infoButton, 'click', function () {
                $zh.tracking.trackEvent('INFO', 'click', locators.event);
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