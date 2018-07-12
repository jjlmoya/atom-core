(function () {
    "use strict";
    var locators = {
            container: 'ml-float-menu',
            button: 'ml-float-menu-button',
            list: 'ml-float-menu ul',
            event: 'ml-float-menu menu'
        },
        addButtonListener = function (parentContainer) {
            var menu = parentContainer,
                button = parentContainer.querySelector('.ml-float-menu-button');
            button.addEventListener('click', function () {
                document.body.classList.remove('overflow-blocked');
                toggleViewMenu(menu);
            })
        },
        toggleViewMenu = function (menu) {
            menu.classList.toggle('is-active');
            if(menu.classList.contains('is-active')) {
                document.body.classList.add('overflow-blocked');
            }
        },
        addListeners = function () {
            var elements = document.getElementsByClassName(locators.container);
            for (var i = 0; i < elements.length; i++) {
                addButtonListener(elements[i]);
            }
        },
        init = function () {
            var container = document.getElementsByClassName(locators.container);
            console.log(container);
            if (container.length > 0) {
                var newElement = document.createElement('div');
                newElement.classList.add(locators.button);
                newElement.innerHTML="<span></span>";
                container[0].appendChild(newElement);
            }
            addListeners();
        };
    init();

})();