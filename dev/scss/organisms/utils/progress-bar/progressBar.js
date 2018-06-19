(function () {
    var locators = {
            progressBar: 'og-progress-bar',
            progressLabel: 'og-progress-bar-label',
            event: 'progress-bar'
        },
        setProgress = function (percent) {
            var label = document.getElementsByClassName(locators.progressLabel),
                progress = document.querySelectorAll('.' + locators.progressBar + ' .progress');
            if (label) {
                label.innerText = percent;
            }
            if (progress.length > 0) {
                progress[0].style.width = percent + "%";
            }
        },
        getPercent = function () {
            var h = document.documentElement,
                b = document.body,
                st = 'scrollTop',
                sh = 'scrollHeight';
            return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
        },
        addListeners = function () {
            document.addEventListener('scroll', function () {
                setProgress(getPercent());
            });
        },
        init = function () {
            document.addEventListener('components::' + locators.event, function () {
                addListeners();
                setProgress(0);
            });
        };
    init();

})();

