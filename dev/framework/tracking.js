window['$zh'] = window.$zh || {};
window.$zh.tracking = (function () {
    var model = {
        acc: 0,
        scroll: {
            scroll25: false,
            scroll50: false,
            scroll75: false

        }
    };
    var trackEvent = function (eventLabel, eventAction, eventCategory, eventValue) {
            if (window.location.href.indexOf('http://localhost') > -1) {
                console.log('Analytics -> %o', {
                    eventLabel: eventLabel,
                    eventAction: eventAction,
                    eventCategory: eventCategory,
                    eventValue: eventValue
                });
            }
            if (window.ga) {
                ga('send', {
                    hitType: 'event',
                    eventCategory: eventCategory,
                    eventAction: eventAction,
                    eventLabel: eventLabel,
                    eventValue: eventValue
                });
            }
            if (window.gtag) {
                gtag('event', eventAction, {
                    'event_category': eventCategory,
                    'event_label': eventLabel,
                    'event_value': eventValue
                });
            }
        },
        timeEvent = function () {
            model.acc += 30;
            trackEvent(window.location.href, 'reading', 'Session Time', model.acc);
        },
        scrollDepthEvent = function (percent) {
            if (!model.scroll['scroll' + percent]) {
                trackEvent(window.location.href, 'scrolled ' + percent, 'Scroll', percent);
                model.scroll['scroll' + percent] = true;
            }

        },
        getScrollPercent = function () {
            var h = document.documentElement,
                b = document.body,
                st = 'scrollTop',
                sh = 'scrollHeight';
            return Math.round((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100);
        },
        scrollDepthEventListener = function () {
            document.addEventListener('scroll', function () {
                var percent = getScrollPercent();
                if (percent % 25 === 0 && percent !== 0) {
                    scrollDepthEvent(percent);
                }
            })
        },
        basicEvents = function () {
            setTimeout(timeEvent, 30000);
            scrollDepthEventListener();
        };
    basicEvents();
    return {
        trackEvent: trackEvent
    };
})();
