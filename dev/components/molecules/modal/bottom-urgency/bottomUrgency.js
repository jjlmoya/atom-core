(function () {
    var locators = {
            container: 'ml-bottom-urgency',
            close: 'ml-bottom-urgency-close',
            event: 'modalUrgency'
        },

        addListeners = function () {
            var elements = document.getElementsByClassName(locators.close);
            for (var i = 0; i < elements.length; i++) {
                bindCloseEvent(elements[i]);
            }

        },
        toggleContainer = function (open) {
            var container = document.getElementsByClassName(locators.container);
            for (var i = 0; i < container.length; i++) {
                var element = container[i];
                if (open) {
                    element.classList.add('is-active');
                } else {
                    element.classList.remove('is-active');
                }
            }
        },
        bindCloseEvent = function (element) {
            element.addEventListener('click', function () {
                if ($zh && $zh.tracking) {
                    $zh.tracking.trackEvent('Close', 'click', locators.event);
                }
                toggleContainer();
            });
        },
        init = function () {
            addListeners();
            setTimeout(function () {
                toggleContainer(true);
            }, 3000);
        };
    document.addEventListener('components::' + locators.event, function (e) {
        init();
    });
    init();
})();