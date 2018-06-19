//var Converter = require('../utils/converter');
var Render = require('../Render');
var ServicesPost = require('../services/post');
module.exports = (function () {
    var selectors = {
            target: 'item_navigation_container',
            action: 'item_navigation_option'
        },
        model = {
            event: 'components::item-navigation',
            template: 'components/blocks/ink'
        },

        convertData = function (element, onSuccess) {
            var id = element.getAttribute('data-id');
            return ServicesPost.getPostById(id, onSuccess);
        },
        removeActiveElements = function () {
            var activeElements = document.querySelector('.' + selectors.action + '.is-active');
            if (activeElements) {
                activeElements.classList.remove('is-active');
            }

        },
        initActiveElements = function () {
            var elements = document.querySelectorAll('.' + selectors.action);
            if (elements) {
                elements[0].classList.add('is-active');
            }
        },
        addListeners = function () {
            var element = document.getElementsByClassName(selectors.action)[0].parentNode;
            element.addEventListener('click', function (e) {
                if (e.target.classList.contains(selectors.action)) {
                    removeActiveElements();
                    e.target.classList.add('is-active');
                    convertData(e.target, function (data) {
                        buildElement(data);
                    });
                }
            });
        },
        buildElement = function (posts) {
            var target = document.getElementsByClassName(selectors.target);
            Render.renderTemplateInElement(model.template, target[0].parentNode, {Posts: [posts]});
        },
        init = function () {
            document.addEventListener(model.event, function () {
                addListeners();
                initActiveElements();
            });
        };
    return {
        init: init
    };
})();