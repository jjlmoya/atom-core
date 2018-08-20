window['$zh'] = window.$zh || {};
window.$zh.tracking = (function () {
    var trackEvent = function (eventName, eventValue) {
        console.log(eventName + eventValue + '0');
    };

    return {
        trackEvent: trackEvent
    };
})();
