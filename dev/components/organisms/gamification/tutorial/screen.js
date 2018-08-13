(function () {
    var locators = {
            container: 'og-gamification-screen',
            highlight: 'og-gamification-screen-element',
            wrapper: 'og-gamification-screen-wrapper',
            event: 'tutorialScreen'
        },
        settings = {
            TIME_DELAY : 1000,
            DISSAPPEAR_TIME: 2000
        },

        getContainer = function () {
            var elements = document.getElementsByClassName(locators.container);
            if (elements.length > 0) {
                return elements[0];
            }
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

        getHighlightElement = function (classData) {
            var elements = document.querySelectorAll(classData.target);
            if (elements.length > 0) {
                for (var i = 0; i < elements.length; i++) {
                    if (!elements[i].classList.contains(classData.exclude)) {
                        return elements[i];
                    }
                }
            }
        },

        centerInScreen = function (element) {
            smoothScroll(element);
        },

        pushElementToTopLayer = function (element) {
            element.classList.add(locators.highlight);
        },
        addLayer = function (e) {
            e.classList.add('is-active');
        },
        removeLayer = function (e) {
            e.classList.remove('is-active');
            e.innerHTML = '';

        },
        hide = function () {
            var element = getContainer();
            if (element) {
                removeLayer(element);
            }
        },
        setPosition = function (highlight) {

            var width = highlight.getBoundingClientRect().x - 100 + highlight.getBoundingClientRect().width / 2;
            var e = document.getElementsByClassName(locators.wrapper);
            if (e.length > 0) {
                e[0].position = 'fixed';
                e[0].style.left = width + 'px';
                e[0].style.top = "235px";
            }
        },
        init = function () {
            var element = getContainer(),
                classData,
                highlightElement;
            if (element) {
                classData = getInitData(element);
                highlightElement = getHighlightElement(classData);
            }
            if (highlightElement) {
                addLayer(element);
                centerInScreen(highlightElement);
                setPosition(highlightElement);
                pushElementToTopLayer(highlightElement);
                setTimeout(hide, settings.DISSAPPEAR_TIME);
            }
        };
    setTimeout(init, settings.TIME_DELAY);
})();
