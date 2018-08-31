(function () {
    var locators = {
            parent: '.ml-imagebox',
            label: '.image-label',
            checkbox: '.checkbox',
            component: 'imagebox'
        },
        addLinkLabelToCheckbox = function (label) {
            label.addEventListener('change', onChange, false);
        },
        onChange = function (event) {
            var element = event.target.parentNode;
            $zh.tracking.trackEvent('changeStatus', 'click', locators.component);
            element.classList.toggle('is-active');
        },
        init = function () {
            var labels = document.querySelectorAll(locators.parent + ' ' + locators.label);
            for (var i = 0; i < labels.length; i++) {
                addLinkLabelToCheckbox(labels[i]);
            }
        };
    document.addEventListener("components::" + locators.component, function () {
        init();
    });
    init();
})();