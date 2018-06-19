(function () {
    "use strict";
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
        init = function (e) {
            var nodeTarget = e.settings ? e.settings : 'h2',
                elements = getElements(nodeTarget),
                target = document.getElementsByClassName(locators.container)[0];
            for (var i = 0; i < elements.length; i++) {
                var text = elements[i].innerText,
                    id = locators.elements + '-' +i;
                elements[i].id = id;
                if (text) {
                    target.appendChild(renderElement(text, id));
                }
            }
        };
    document.addEventListener('components::' + locators.event, function (e) {
        init(e);
    });
})();