(function () {
    var locators = {
            container: 'ml-cards-variety',
            arrow: 'ml-cards-variety-arrow',
            left: 'left',
            right: 'right',
            scrollable: 'ml-cards-variety-container'
        },

        sideScroll = function (element, direction, speed, distance, step) {
            var scrollAmount = 0;
            var slideTimer = setInterval(function () {
                if (!direction) {
                    element.scrollLeft -= step;
                } else {
                    element.scrollLeft += step;
                }
                scrollAmount += step;
                if (scrollAmount >= distance) {
                    window.clearInterval(slideTimer);
                }
                $zh.dom.applyFirst(document.querySelectorAll('.' + locators.arrow + '.' + locators.left), function (e) {
                    if (element.scrollLeft === 0) {
                        e.classList.add('is-disabled');
                    } else {
                        e.classList.remove('is-disabled');
                    }
                });
            }, speed);
        },
        init = function () {
            $zh.dom.on('.' + locators.arrow, 'click', function (el) {
                var advance = el.closest('.' + locators.arrow).classList.contains('right'),
                    scrollable = el
                        .closest('.' + locators.container)
                        .querySelector('.' + locators.scrollable);
                sideScroll(scrollable, advance, 10, scrollable.getBoundingClientRect().width, 10);

            });
        };

    init();
})();