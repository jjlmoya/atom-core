(function () {
    var locators = {
            a: 'a'
        },
        addTracking = function () {
            $zh.dom.on('.' + locators.a, 'click', function (e) {
                $zh.tracking.trackEvent(e.innerText, 'click', 'link');
            });
        },
        init = function () {
            addTracking();
        };
    init();
})();