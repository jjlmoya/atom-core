(function () {
    "use strict";
    var locators = {
            container: 'og-i18n-flag',
            unfold: 'og-i18n-flag--unfold',
            fold: 'og-i18n-flag--fold',
            active: 'is-active',
            option: 'og-i18n-flag--element',
            localStorageKey: 'userLang'
        },
        forceTrigger = function (element, eventName) {
            var event;
            if (document.createEvent) {
                event = document.createEvent('HTMLEvents');
                event.initEvent(eventName, true, true);
                element.dispatchEvent(event);
            } else {
                event = document.createEventObject();
                event.eventType = eventName;
                element.fireEvent('on' + event.eventType, event);
            }
        },
        bindEvents = function (element) {
            element.addEventListener('click', function (e) {
                var target = e.target;
                while (!target.classList.contains(locators.option)) {
                    target = target.parentNode;
                }
                toggleOpen();
                if (!target.classList.contains('is-active')) {
                    removeActive();
                    setActive(target);
                    setLanguage(target.dataset);
                }
            });
        },

        removeActive = function () {
            var elements = document.getElementsByClassName(locators.option);
            for (var i = 0; i < elements.length; ++i) {
                elements[i].classList.remove('is-active');
            }
        },

        setActive = function (element) {
            element.classList.add(locators.active);
        },

        setLanguage = function (data) {
            var combo = document.getElementsByClassName('goog-te-combo')[0];
            combo.value = data.language;
            forceTrigger(combo, 'change');
            localStorage.setItem(locators.localStorageKey, data.language);

        },
        toggleOpen = function () {
            var parent = document.getElementsByClassName(locators.container)[0];
            if (parent.classList.contains(locators.fold)) {
                parent.classList.remove(locators.fold);
                parent.classList.add(locators.unfold);
            } else {
                parent.classList.remove(locators.unfold);
                parent.classList.add(locators.fold);
            }
        },
        intentAsync = function () {
            try {
                new google.translate.TranslateElement({pageLanguage: "es"}, 'google_translate_element');
                async();
            } catch (e) {
                setTimeout(intentAsync, 500);
            }
        },
        async = function () {
            var combo =  document.getElementsByClassName('goog-te-combo')[0];
            if (combo) {
                setTimeout(function () {
                    var language = localStorage.getItem(locators.localStorageKey);
                    if (language) {
                        removeActive();
                        setActive(document.querySelectorAll('.' + locators.option + '[data-language="' + language + '"]')[0]);
                        setLanguage({language: language});
                    }
                }, 500);
            } else {
                async();
            }

        },
        init = function () {
            var elements = document.getElementsByClassName(locators.option);
            for (var i = 0; i < elements.length; i++) {
                bindEvents(elements[i]);
            }
            intentAsync();
        };
    init();
})();