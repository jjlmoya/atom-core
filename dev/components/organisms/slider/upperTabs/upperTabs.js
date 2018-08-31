(function () {
    var locators = {
            container: 'og-slider-upper-tabs',
            tab: 'og-slider-upper-tabs-navigation-tab',
            scrollable: 'og-slider-upper-tabs-list-content',
            element: 'og-slider-upper-tabs-list-content-element',

            //JS INJECTION
            tabsContainer: 'og_slider_upper_tabs_list',
            sliderContainer: 'og_slider_upper_tabs_container',
            extract: '.s-tour-details .m-timeline__item'
        },
        model = {
            component: 'upperTabs',
            position: 0,
            screenElements: 1,
            //JSINECTION
            elements: []
        },

        /**
         *JS Injection
         */

        renderSliderContent = function (content, modifier) {
            return '<li class="og-slider-upper-tabs-list-content-element ' + modifier + ' ">' + content + '</li>';
        },

        renderTabs = function (text, index, modifier) {
            var isActive = index === 0 ? 'is-active ' : '';
            return '<button ' +
                'class="og-slider-upper-tabs-navigation-tab button ' + isActive + modifier + ' "' +
                'data-position="' + index + '"' + '>' + text + '</button>';
        },
        centerTabElement = function (bundle, element) {
            $zh.dom.applyAll(bundle.getElementsByClassName(locators.tabsContainer), function (scrollable) {
                scrollable.scrollBy({
                    top: 0,
                    left: -window.innerHeight / 2 + (element.getBoundingClientRect().left + element.getBoundingClientRect().width * 3),
                    behavior: "smooth"
                });
            });
        },
        setActiveTab = function (bundle, element) {
            removeActiveElements(bundle);
            if (element) {
                element.classList.add('is-active');
                centerTabElement(bundle, element);
            }
        },
        removeActiveElements = function (bundle) {
            var elements = bundle.querySelectorAll('.' + locators.tab + '.is-active');
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove('is-active');
            }
        },
        bindTabsEvents = function () {
            $zh.dom.on('.' + locators.tab, 'click', function (element) {
                var position = element.dataset.position,
                    scrollable = element.closest('.' + locators.container).getElementsByClassName(locators.scrollable)[0],
                    sliders = scrollable.querySelectorAll('.' + locators.element);
                $zh.tracking.trackEvent('Change Tab', 'click', model.component, position + 1);
                scrollable.scrollBy({
                    top: 0,
                    left: sliders[position].getBoundingClientRect().left - scrollable.getBoundingClientRect().left,
                    behavior: "smooth"
                });
                model.position = position;
            });
        },
        bindScrollEvents = function () {
            $zh.dom.on('.' + locators.scrollable, 'scroll', function (scrollable, event) {
                var adjustment = model.position === 1 || model.position === 0 || $zh.utils.isMobile() ? 0 : 0.4;
                var elementPosition = Math.round((scrollable.scrollLeft / model.elementWidth) + adjustment);
                if (elementPosition !== model.position) {
                    $zh.tracking.trackEvent('Scroll Slider', 'scroll', model.component, elementPosition + 1);
                    model.position = elementPosition;
                    var parentContainer = scrollable.closest('.' + locators.container);
                    setActiveTab(parentContainer, parentContainer.querySelectorAll('.' + locators.tab)[model.position]);
                }
                event.stopPropagation();
            });
        },

        getElementsPerPage = function () {
            $zh.dom.applyAll(document.getElementsByClassName(locators.container), function (container) {
                model.screenElements = container.dataset.size || 1;
                if ($zh.utils.isMobile()) {
                    model.screenElements = 1;
                }
                $zh.dom.applyAll(document.getElementsByClassName(locators.element), function (element) {
                    element.style.minWidth = Math.floor(100 / model.screenElements) + '%';
                });
            });
        },

        getElementWidth = function () {
            $zh.dom.applyAll(document.getElementsByClassName(locators.element), function (slider) {
                model.elementWidth = slider.getBoundingClientRect().width;
            });
        },
        extractData = function () {
            model.elements = document.querySelectorAll(locators.extract);
        },
        renderElements = function () {
            var content = '',
                menu = '';
            for (var i = 0; i < model.elements.length; i++) {
                content += renderSliderContent(model.elements[i].innerHTML, '');
                menu += renderTabs(model.elements[i].innerText.split(':')[0], i, '');
            }

            var tabsContainer = document.getElementsByClassName(locators.tabsContainer)[0];
            var sliderContainer = document.getElementsByClassName(locators.sliderContainer)[0];
            tabsContainer.innerHTML = menu;
            sliderContainer.innerHTML = content;
        },
        injectionSinglePage = function () {
            extractData();
            renderElements();
        },

        init = function () {
            //injectionSinglePage();
            getElementsPerPage();
            getElementWidth();
            bindTabsEvents();
            bindScrollEvents();
        };
    init();
})();