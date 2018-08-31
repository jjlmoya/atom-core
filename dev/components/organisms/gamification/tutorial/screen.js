(function () {
    var locators = {
            container: 'og-gamification-screen',
            highlight: 'og-gamification-screen-element',
            wrapper: 'og-gamification-screen-wrapper',
            activeClass: 'is-active',
            event: 'tutorialScreen'
        },
        model = {
            targetElement: false
        },
        settings = {
            TIME_DELAY: 1000,
            DISSAPPEAR_TIME: 2000
        },
        smoothScroll = function (element) {
            var distanceToTop = function (el) {
                return Math.floor(el.getBoundingClientRect().top - 300);
            };
            var targetAnchor = element;
            if (!targetAnchor) return;
            var originalTop = distanceToTop(targetAnchor);
            window.scrollBy({top: originalTop, left: 0, behavior: "smooth"});
            var checkIfDone = setInterval(function () {
                var atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
                if (distanceToTop(targetAnchor) === 0 || atBottom) {
                    targetAnchor.tabIndex = "-1";
                    targetAnchor.focus();
                    clearInterval(checkIfDone);
                }
            }, 100);
        },
        getInitData = function (element) {
            return {
                target: element.dataset.target,
                exclude: element.dataset.exclude
            };
        },
        centerInScreen = function (element) {
            smoothScroll(element);
        },

        pushElementToTopLayer = function (element) {
            element.classList.add(locators.highlight);
        },
        addLayer = function (e) {
            e.classList.add(locators.activeClass);
        },
        removeLayer = function (e) {
            e.classList.remove(locators.activeClass);
            e.innerHTML = '';
        },
        hide = function () {
            $zh.dom.applyFirst(document.getElementsByClassName(locators.container), function (element) {
                if (element) {
                    removeLayer(element);
                }
                if (model.targetElement) {
                    model.targetElement.classList.remove(locators.highlight);
                }
            });
        },
        setPosition = function (highlight) {
            var width = highlight.getBoundingClientRect().x - 100 + highlight.getBoundingClientRect().width / 2;
            $zh.dom.applyFirst(document.getElementsByClassName(locators.wrapper), function (element) {
                element.position = 'fixed';
                element.style.left = width + 'px';
                element.style.top = "235px";
            });
        },
        init = function () {
            var classData;
            $zh.dom.applyFirst(document.getElementsByClassName(locators.container), function (element) {
                classData = getInitData(element);
                $zh.dom.applyFirst(document.querySelectorAll(classData.target), function (highlightElement) {
                    model.targetElement = highlightElement;
                    addLayer(element);
                    centerInScreen(highlightElement);
                    setPosition(highlightElement);
                    pushElementToTopLayer(highlightElement);
                    setTimeout(hide, settings.DISSAPPEAR_TIME);
                });
            });
        };
    setTimeout(init, settings.TIME_DELAY);
})();
