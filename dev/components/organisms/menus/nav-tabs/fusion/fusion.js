(function () {
    var locators = {
            parent: '.og-nav-tabs-fusion',
            element: '.tabs',
            activeClass: 'is-active'
        },
        settings = {
            events: 'menu-fusion'
        },
        addActionToTabs = function (label) {
            label.addEventListener('click', onClick, false);
        },
        onClick = function (event) {
            var element = event.target;
            $zh.tracking.trackEvent('tab:' + element.innerText.trim(), 'click', settings.events);
        },
        init = function () {
            var labels = document.querySelectorAll(locators.parent + ' ' + locators.element);
            for (var i = 0; i < labels.length; i++) {
                addActionToTabs(labels[i]);
            }
        };
    document.addEventListener("components::" + settings.events, function () {
        init();
    });
    init();
})();