(function () {
    "use strict";
    var locators = {
            container: 'ml-float-menu',
            button: 'ml-float-menu-button',
            list: 'ml-float-menu ul',
            event: 'floatMenu'
        },
        sendTracking = function (settings) {
            if (ga) {
                ga('send', 'event', settings);
            }
        },
        analytics = {
            button: function () {
                sendTracking({
                    eventCategory: 'Menu Float Button',
                    eventAction: 'click',
                    eventLabel: 'button'
                })
            },
            element: function (element) {
                sendTracking({eventCategory: 'Menu Float Button', eventAction: 'click', eventLabel: element.href});
            }
        },
        icons = {
            shop: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">' +
            '<defs><style>.a{fill:#6b70de;}.b{fill:#ffc82c;}.c{fill:#f2bb20;}.d{fill:#d38e1d;}.e{fill:#ffe62c;}.f,.g{fill:none;stroke-linecap:round;stroke-miterlimit:10;}.f{stroke:#d6a723;stroke-width:1.58578px;}.g{stroke:#f2572f;stroke-width:1.5px;}</style></defs>' +
            '<title/>' +
            '<path class="a" d="M60,30A29.98881,29.98881,0,0,1,8.92,51.33,29.96091,29.96091,0,0,1,8,9.62,28.62035,28.62035,0,0,1,12,6,30,30,0,0,1,48,6a28.62035,28.62035,0,0,1,4,3.62A29.8357,29.8357,0,0,1,60,30Z"/>' +
            '<path class="b" d="M57,21,51.08,51.33a29.9616,29.9616,0,0,1-42.16,0L3,21l5-4.44V6H52V16.56Z"/><rect class="c" height="15" width="44" x="8" y="6"/><polygon class="d" points="8 6 8 20 12 13 8 6"/><polygon class="d" points="52 6 52 20 48 13 52 6"/><polygon class="e" points="12 13 12 21 3 21 12 13"/><polygon class="e" points="48 13 48 21 57 21 48 13"/><circle cx="14" cy="29" r="2"/><circle cx="47" cy="29" r="2"/>' +
            '<path class="f" d="M47,31v1.1178C47,41.99387,39.83656,50,31,50H30c-8.83655,0-16-8.00613-16-17.8822V31"/>' +
            '<path class="g" d="M47,28.99987V30A16,16,0,0,1,31,46H30A16,16,0,0,1,14,30V28.99987"/>' +
            '</svg>',
            bars: '<svg id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">' +
            '<style type="text/css">.st0{fill:#FFFFFF;}</style>' +
            '<circle cx="64" cy="64" r="64"/><g>' +
            '<path class="st0" d="M103,29H53c-0.6,0-1,0.4-1,1v12c0,0.6,0.4,1,1,1h50c0.6,0,1-0.4,1-1V30C104,29.4,103.6,29,103,29z"/>' +
            '<path class="st0" d="M103,57H53c-0.6,0-1,0.4-1,1v12c0,0.6,0.4,1,1,1h50c0.6,0,1-0.4,1-1V58C104,57.4,103.6,57,103,57z"/>' +
            '<path class="st0" d="M103,85H53c-0.6,0-1,0.4-1,1v12c0,0.6,0.4,1,1,1h50c0.6,0,1-0.4,1-1V86C104,85.4,103.6,85,103,85z"/>' +
            '<path class="st0" d="M37,29H25c-0.6,0-1,0.4-1,1v12c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V30C38,29.4,37.6,29,37,29z"/>' +
            '<path class="st0" d="M37,57H25c-0.6,0-1,0.4-1,1v12c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V58C38,57.4,37.6,57,37,57z"/>' +
            '<path class="st0" d="M37,85H25c-0.6,0-1,0.4-1,1v12c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V86C38,85.4,37.6,85,37,85z"/></g>' +
            '</svg>'
        },
        getMenu = function (menuList) {
            var oReq = new XMLHttpRequest();
            oReq.onload = function (data) {
                console.log(data);
            };
            oReq.open('GET', './data/menu' + menuList, true);
            oReq.send();

        },
        clearListeners = function (oldElement) {
            var newElement = oldElement.cloneNode(true);
            oldElement.parentNode.replaceChild(newElement, oldElement);
            return newElement;
        },
        addButtonListener = function (button, container) {
            clearListeners(button).addEventListener('click', function () {
                document.body.classList.remove('overflow-blocked');
                toggleViewMenu(container);
            })
        },
        toggleViewMenu = function (menu) {
            menu.classList.toggle('is-active');
            if (menu.classList.contains('is-active')) {
                document.body.classList.add('overflow-blocked');
            }
        },

        getIcon = function (container) {
            return icons[container.dataset.icon]
        },
        notEmpty = function (container) {
            return container.querySelectorAll('li').length > 0;
        },
        addElementListener = function (list) {
            list.addEventListener('click', function (e) {
                if (e.tagName === 'a') {
                    analytics.element(e);
                }
            });
        },
        addListListener = function () {
            var elements = document.querySelectorAll(locators.list);
            for (var i = 0; i < elements.length; i++) {
                addElementListener(elements[i]);
            }
        },
        createButton = function () {
            var container = document.getElementsByClassName(locators.container);
            if (container.length > 0) {
                var newElement = document.createElement('div');
                newElement.classList.add(locators.button);
                for (var i = 0; i < container.length; i++) {
                    if (notEmpty(container[i])) {
                        container[i].classList.add(locators.container + '-' + i);
                        container[i].appendChild(newElement);
                        var button = container[i].querySelector('.' + locators.button);
                        button.style.right = 40 * i + "px";
                        button.innerHTML = getIcon(container[i]);
                        addButtonListener(button, container[i], locators.container + '-' + i);
                    }
                }
            }
        },
        init = function () {
           createButton();
            addListListener();
        };
    document.addEventListener("components::" + locators.event, function (e) {
        init();
    });
    init();
})
();