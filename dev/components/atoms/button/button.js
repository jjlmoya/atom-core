(function () {
    var locators = {
            button: 'button'
        },
        addTracking = function () {
            $zh.dom.on('.' + locators.button, 'click', function (e) {
                $zh.tracking.trackEvent(e.innerText, 'click', 'button');
            });
        },
        init = function () {
            addTracking();
        };
    init();
})();