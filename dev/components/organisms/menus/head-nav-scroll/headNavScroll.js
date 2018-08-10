(function () {
    "use strict";
    var locators = {
            container: 'og-head-nav',
            elements: 'og-head-nav-element',
            event: 'head-nav-scroll'
        },

        stringToSlug = function (str) {
            str = str.replace(/^\s+|\s+$/g, ''); // trim
            str = str.toLowerCase();
            // remove accents, swap ñ for n, etc
            var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
            var to = "aaaaeeeeiiiioooouuuunc------";
            for (var i = 0, l = from.length; i < l; i++) {
                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }
            str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-') // collapse whitespace and replace by -
                .replace(/-+/g, '-'); // collapse dashes
            return str;
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
            var nodeTarget = e ? e.settings : 'h2',
                elements = getElements(nodeTarget),
                target = document.getElementsByClassName(locators.container)[0];
            for (var i = 0; i < elements.length; i++) {
                var text = elements[i].innerText,
                    id = stringToSlug(text);
                elements[i].id = id;
                if (text && target) {
                    target.appendChild(renderElement(text, id));
                }
            }
            addMarginToBody();
        };
    document.addEventListener('components::' + locators.event, function (e) {
        init(e);
    });
    init();
})();