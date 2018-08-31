window['$zh'] = window.$zh || {};
window.$zh.dom = (function () {
    var addListenerToElement = function (event, element, action) {
            element.addEventListener(event, function (e) {
                action(e.target, e);
            });
        },
        delegateListenerToElement = function (event, element, action) {
            document.addEventListener(event, element, function () {
                action(element.target);
            });
        },
        bindEventToElement = function (locator, event, action) {
            var elements = document.querySelectorAll(locator);
            if (elements.length > 0) {
                for (var i = 0; i < elements.length; i++) {
                    addListenerToElement(event, elements[i], action);
                }
            }
        },
        delegateBindEventToElement = function (element, event, action) {
            delegateListenerToElement(event, element, action);
        },
        getFirstElement = function (arrayOfElement, action) {
            if (arrayOfElement.length > 0) {
                action(arrayOfElement[0]);
            }
        },
        applyActionAllElements = function (elements, action) {
            for (var i = 0; i < elements.length; i++) {
                action(elements[i]);
            }
        };

    return {
        on: bindEventToElement,
        onSync: delegateBindEventToElement,
        applyFirst: getFirstElement,
        applyAll: applyActionAllElements
    };
})();
