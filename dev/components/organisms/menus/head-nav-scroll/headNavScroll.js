(function () {
    "use strict";

    function renderMenu(elements, target) {
        for (var i = 0; i < elements.length; i++) {
            var text = elements[i].innerText,
                id = $zh.utils.stringToSlug(text);
            elements[i].id = id;
            if (text && target) {
                target.appendChild(renderElement(text, id));
            }
        }
    }

    var locators = {
            container: 'og-head-nav',
            elements: 'og-head-nav-element',
            event: 'head-nav-scroll'
        },
        renderElement = function (text, idTarget) {
            var a = document.createElement('a');
            a.innerText = text ? text : 'Ejemplo';
            a.href = '#' + idTarget;
            a.classList.add('text-button', locators.elements, 'l-oversized-element', 'a');
            return a;
        },
        getElements = function (tag) {
            return document.getElementsByTagName(tag);
        },
        addMarginToBody = function () {
            var body = document.getElementsByTagName('body')[0];
            body.classList.add('og-head-magin');
        },
        init = function (e) {
            var nodeTarget = e ? e.settings : 'h2';
            renderMenu(getElements(nodeTarget), document.getElementsByClassName(locators.container)[0]);
            addMarginToBody();
        };
    document.addEventListener('components::' + locators.event, function (e) {
        init(e);
    });
    init();
})();