(function () {
    var locators = {
            container: 'og-fx-layer-bubble-container',
            mask: 'l-mask-full-screen',
            active: 'is-active',
            button: 'og-fx-layer-bubble-container-button',
            folded: 'm-fixed-phone-help__button',
            component: 'fx-layer-bubble',
            close: 'og-fx-layer-bubble-close',
            localStorageKey: 'c2cPopup'
        },
        model = {
            MIN_DAYS_TO_SHOW: 5,
            SECONDS_WAITING: 10 * 1000,
            clicks: 0,
            toManyClicks: false,
            isUserWaiting: false
        },

        getLastPage = function () {
            try {
                var visitedPages = JSON.parse(localStorage.ABTastyData).VisitedPages;
                return visitedPages[visitedPages.length - 2].url;
            } catch (e) {
                return "";
            }
        },
        isLastPageCheckout = function () {
            return getLastPage().indexOf('disponibilidad') >= 0;
        },
        isUserWaiting = function () {
            return model.isUserWaiting;
        },
        hasUserClickToMuch = function () {
            return model.toManyClicks;
        },
        toggleActive = function (e, force) {
            if (force) {
                e.classList.remove(locators.active);
            } else {
                e.classList.toggle(locators.active);
            }
        },
        toggleComponent = function (force) {
            $zh.dom.applyFirst(document.getElementsByClassName(locators.container), function (e) {
                toggleActive(e, force);
            });
            $zh.dom.applyFirst(document.getElementsByClassName(locators.mask), function (e) {
                toggleActive(e, force);
            });
        },
        isUserConfused = function () {
            return isLastPageCheckout() || isUserWaiting() || hasUserClickToMuch();
        },
        bindButtonAction = function () {
            $zh.dom.on('.' + locators.button, 'click', function () {
                var foldedElement = document.getElementsByClassName(locators.folded);
                if (foldedElement.length > 0) {
                    foldedElement[0].click();
                }
                toggleComponent(true);
            });
        },
        showBubbleLayer = function () {
            var today = new Date(),
                storedDate = new Date(localStorage.getItem(locators.localStorageKey)),
                timeDiff = Math.abs(storedDate.getTime() - today.getTime()),
                diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));


            if (diffDays >= model.MIN_DAYS_TO_SHOW && (isUserConfused())) {
                localStorage.setItem(locators.localStorageKey, today.toDateString());
                toggleComponent();
                bindButtonAction();
            }
        },
        createPersonalizedEvent = function () {
            document.addEventListener("components::" + locators.component, function () {
                showBubbleLayer();
            });
        },
        bindClose = function () {
            $zh.dom.on('.' + locators.close, 'click', function () {
                toggleComponent(true);
            });
        },
        bindExitIntent = function () {
            document.addEventListener("mouseleave", function () {
                showBubbleLayer();
            }, false);
        },
        bindWaitPage = function () {
            setTimeout(function () {
                model.isUserWaiting = true;
                showBubbleLayer();
            }, model.SECONDS_WAITING);
        },
        bindToManyClicks = function () {
            $zh.dom.on('body', 'click', function (el, e) {
                model.clicks++;
                if (model.clicks === 20) {
                    model.toManyClicks = true;
                    showBubbleLayer();
                    e.stopPropagation();
                }
            });
        },
        bindConfusedActions = function () {
            //bindExitIntent();
            bindWaitPage();
            bindToManyClicks();
        },
        preRender = function () {
            var wrapper = document.createElement('div');
            var image = "https://bv-dam.s3.amazonaws.com/dam/photos/30/68/8a/50/e072c51c8c8efc712353fb8f8cecb8a84913412b41e7dbcefea65d10.jpg";
            wrapper.innerHTML = '<div class="l-mask-full-screen l-mask-full-screen--center ml-card-flip">' +
                '<div class="og-fx-layer-bubble-container u-text--center a-call a-call--secondary ml-card-container">' +
                ' <div class="og-fx-layer-bubble-close u-text--bold">' +
                '            X' +
                ' </div>' +
                '<div class="ml-card-face ml-card-face-front"> ' +
                ' <div class="og-fx-layer-bubble-container-inner">' +
                ' <img class="og-fx-layer-bubble-container-image avatar avatar--rounded avatar--medium" src="' + image + '" alt="" width="135"> ' +
                ' <div class="og-fx-layer-bubble-container-title u-text--bold">' +
                ' <div>¿Podemos ayudarte?</div>' +
                ' <div>Te llamamos enseguida</div>' +
                '</div>' +
                '<div class="og-fx-layer-bubble-container-description"> Te llamamos de manera gratuita para un trato personal y de calidad. </div>' +
                ' <div class="og-fx-layer-bubble-container-claim u-text--bold"> ¡Déjate asesorar por un profesional! </div>' +
                '  <div class="og-fx-layer-bubble-container-button button button--secondary button--secondary--glow button--xl u-text--bold"> Llámame </div>' +
                ' </div>' +
                '</div>' +
                '<div class="ml-card-face ml-card-face-back">' +
                ' <div class="og-c2c-form og-step-form ">' +
                '  <div class="og-fx-layer-bubble-container-scrollable ">' +
                '   <div class="og-step-form-element u-overflow-scroll" data-position="1"></div>' +
                '    <div class="og-step-form-element" data-position="2" data-last="true"></div>' +
                '    </div>' +
                '   </div>' +
                '  </div>' +
                ' </div>' +
                '</div>';
            document.body.appendChild(wrapper);
        },
        init = function () {
            //preRender();
            createPersonalizedEvent();
            bindConfusedActions();
            bindClose();
            setTimeout(showBubbleLayer, 4000);
        };
    init();
})();
