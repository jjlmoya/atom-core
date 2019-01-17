(function () {
    var isMobile = function () {
            return document.documentElement.clientWidth < 758;
        },
        init = function () {
            var arrows = document.getElementsByClassName('ml-nav-arrow');
            var sliderSize = document.querySelectorAll('.buttonWrapper a').length;
            var maxSize = isMobile() ? 3 : 5;
            if (arrows.length > 0) {
                var modifier = sliderSize > maxSize ? 'table-cell' : 'none';
                for (var i = 0; i < arrows.length; i++) {
                    arrows[i].style.display = modifier;
                }
            }
        };
    init();
})();