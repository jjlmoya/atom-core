(function () {
    var locators = {
            parent: '.og-nav-tabs-fusion',
            element: '.tabs',
            activeClass: 'is-active'
        },
        addActionToTabs = function (label) {
            label.addEventListener('click', onClick, false);
        },
        removeSiblingStatus = function (parent) {
            var childrens = parent.children;
            for (var i = 0; i < childrens.length; i++) {
                childrens[i].classList.remove(locators.activeClass);
            }
        },
        triggerEvent = function (element) {
            var page = element.getAttribute('data-page'),
                event = new CustomEvent('menu::switchPage', {detail: {page: page}});  // (*)
            if (page) {
                document.dispatchEvent(event);
            }

        },
        onClick = function (event) {
            var element = event.target;
            if (!element.classList.contains('tabs')) {
                element = element.parentNode;
            }
            if (!element.classList.contains(locators.activeClass)) {
                removeSiblingStatus(element.parentNode);
                element.classList.add(locators.activeClass);
                triggerEvent(element);
            }

        },
        init = function () {
            var labels = document.querySelectorAll(locators.parent + ' ' + locators.element);
            for (var i = 0; i < labels.length; i++) {
                addActionToTabs(labels[i])
            }
        };
    document.addEventListener("components::menu-fusion", function () {
        init();
    });
})();