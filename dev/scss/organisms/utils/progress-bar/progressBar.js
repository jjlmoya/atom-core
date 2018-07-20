(function () {
    var locators = {
            progressBar: 'og-progress-bar',
            event: 'progress-bar'
        },
        setProgress = function (percent) {
            var progress = document.querySelectorAll('.' + locators.progressBar + ' .progress');
            if (progress.length > 0) {
                progress[0].style.width = percent + "%";
            }
        },
        getCurrentPercent = function (element) {
            var h = document.documentElement,
                b = element,
                st = 'scrollTop',
                sh = 'scrollHeight';
            return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
        },

        getPercent = function (element) {
            return (element.getBoundingClientRect().top / document.documentElement.scrollHeight) * 100;
        },
        addListeners = function () {
            document.addEventListener('scroll', function () {
                setProgress(getCurrentPercent(document.body));
            });
            var progress = document.getElementsByClassName(locators.progressBar);
            if (progress.length > 0) {
                progress[0].addEventListener('click', function (e) {
                    var doc = document.documentElement;
                    window.scroll(0, (doc.scrollHeight - doc.clientHeight) * (e.screenX / window.innerWidth));
                })
            }
        },
        renderElement = function (width) {
            var elements = document.getElementsByClassName(locators.progressBar);
            for (var i = 0; i < elements.length; i++) {
                elements[i].innerHTML += '<div class="point" style="left:' + width + '%">⬇</div>';
            }
        },
        drawElements = function (tag) {
            var elements = document.querySelectorAll(tag);
            for (var i = 0; i < elements.length; i++) {
                renderElement(getPercent(elements[i]));
            }
        },
        init = function () {
            document.addEventListener('components::' + locators.event, function () {
                addListeners();
                setProgress(0);
                drawElements('h2')
            });
        };
    init();

})();

