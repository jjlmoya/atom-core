window['$zh'] = window.$zh || {};
window.$zh.dom = (function () {
    var addListenerToElement = function (event, element, action) {
            element.addEventListener(event, function () {
                action(element.target);
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
        delegateBindEventToElement = function (locator, event, action) {
            delegateListenerToElement(event, locator, action);
        },
        getFirstElement = function (arrayOfElement, action) {
            if (arrayOfElement.length > 0) {
                action(arrayOfElement[0]);
            }
        };

    return {
        on: bindEventToElement,
        onSync: delegateBindEventToElement,
        applyFirst: getFirstElement
    };
})();
