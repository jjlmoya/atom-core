(function () {
    "use strict";
    var locators = {
            button: 'og-like-menu-button',
            menu: 'og-like-menu',
            close: 'og-like-menu-element-close',
            nav: 'header-menu',
            event: 'likeMenu'
        },
        renderLiTag = function (data) {
            return '<li>' + renderWrapper(data) + renderClose(data) + '</li>';
        },
        renderWrapper = function (data) {
            return '<a class="og-like-menu-content-link" href="' + data.url + '">' + renderImage(data) + renderContent(data) + '</a>';
        },
        renderImage = function (data) {
            return '<div class="og-like-menu-element-image" style="background-image:url(' + data.image + ')"></div>';
        },
        renderContent = function (data) {
            return '<div class="og-like-menu-element-content">' + data.title + '</div>';
        },
        renderClose = function (data) {
            return '<div class="og-like-menu-element-close u-touch"  data-id="' + data.id + '">X</div>';
        },
        settings = {
            localStorageKey: 'og-like-menu'
        },
        toggleMenu = function () {
            var menu = document.getElementsByClassName(locators.menu);
            console.log(menu);
            if (menu.length > 0) {
                menu[0].classList.toggle('is-active');
            }
        },
        saveData = function (data) {
            var dataToAdd = loadData();
            dataToAdd.push(data)
            localStorage.setItem(settings.localStorageKey, JSON.stringify(dataToAdd));
        },
        loadData = function () {
            var old = localStorage.getItem(settings.localStorageKey) || '[]'
            return JSON.parse(old);
        },

        getTitle = function () {
            var header = document.getElementsByTagName('h1') || document.getElementsByTagName('h2');
            if (header.length > 0) {
                return header[0].innerText;
            }
        },
        getDataFromPost = function () {
            /*
            {
               id: '',
               image: '',
               title: '',
               url: ''
             */
            /**TODO: REDEFINE FOR EACH PROJECT **/
            return {
                id: '',
                image: '',
                title: getTitle(),
                link: window.location.href

            }

        },
        addButtonListener = function () {
            var elements = document.getElementsByClassName(locators.button);
            if (elements.length > 0) {
                elements[0].addEventListener('click', function () {
                    console.log('cliki');
                    toggleMenu()
                });
            }
        },
        deleteFavById = function (id) {
            var storedData = loadData();
            for (var i = 0; i < storedData.length; i++) {
                if (storedData[i].id === id) {
                    storedData.splice(i, 1);
                }
            }
            saveData(storedData);
            renderLocalStorage();

        },
        addDeleteListener = function () {
            var closeButtons = document.getElementsByClassName(locators.close);
            for (var i = 0; i < closeButtons.length; i++) {
                closeButtons[i].addEventListener('click', function (e) {
                    deleteFavById(e.target.dataset.id)
                });
            }
        },
        renderLocalStorage = function () {
            var elements = loadData(),
                menu = document.getElementsByClassName(locators.menu);
            if (menu.length > 0) {
                for (var i = 0; i < elements.length; i++) {
                    menu[0].innerHTML += renderLiTag(elements[i]);
                }
            }
        },
        appendButtonToMenu = function () {
            var headerMenu = document.getElementsByClassName(locators.nav),
                button = document.getElementsByClassName(locators.button);
            if (headerMenu.length > 0 && button.length > 0) {
                headerMenu[0].appendChild(button[0])
            }

        },
        init = function () {
            renderLocalStorage();
            addDeleteListener();
            addButtonListener();
            //appendButtonToMenu();
        };
    document.addEventListener('components::' + locators.event, function () {
        init();
    });
    init();
})();