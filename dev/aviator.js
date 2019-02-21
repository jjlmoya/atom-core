if (!MouseEvent) {
    var MouseEvent = function (eventType, params) {
        params = params || {bubbles: false, cancelable: false};
        var mouseEvent = document.createEvent('MouseEvent');
        mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, window, 0, params.screenX || 0, params.screenY || 0, params.clientX || 0, params.clientY || 0, false, false, false, false, 0, null);
        return mouseEvent;
    };

    MouseEvent.prototype = Event.prototype;
    window.MouseEvent = MouseEvent;
}

(function () {
    var locators = {
            input: 'ya-site-form__input-text',
            submit: '.ya-site-form__submit'
        },
        model = {
            text: 'Найти',
            mobileText: '<svg focusable="false" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
            '<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>' +
            '</svg>',
            try: 0
        },

        extendedClick = function (elem) {
            // Create our event (with options)
            var evt = new MouseEvent('click', {
                bubbles: true,
                view: window
            });
            var cancel = !elem.dispatchEvent(evt);
        },
        isMobile = function () {
            return document.documentElement.clientWidth < 758;
        },
        createChild = function () {
            var newChild = document.createElement('div');
            newChild.innerHTML = isMobile() ? model.mobileText : model.text;
            newChild.className = 'ya-site-form__done';
            document.getElementsByClassName('ya-site-form__search-input-layout-r')[0].appendChild(newChild);
        },
        removeQuotes = function (value) {
            return value.replace(/['"]+/g, '');
        },
        bindEvents = function () {
            document.getElementsByClassName('ya-site-form__done')[0].addEventListener('click', function () {
                var input = document.getElementsByClassName(locators.input)[0];
                input.value = '"' + removeQuotes(input.value) + '"';
                extendedClick(document.querySelector(locators.submit));
            })
        },
        hideOldSearchButton = function () {
            document.getElementsByClassName('ya-site-form__submit')[0].classList.add('u-display--none');
        },
        tryInit = function () {
            setTimeout(function () {
                if (document.getElementsByClassName('ya-site-form_inited_yes').length > 0 || model.try > 10) {
                    init();
                } else {
                    tryInit();
                    model.try++;
                }
            }, 500)
        },
        init = function () {

            if (document.getElementsByClassName('ya-site-form__submit').length > 0) {
                createChild();
                bindEvents();
                hideOldSearchButton();
            }
        };
    tryInit();
})();

(function () {
    var model = {try: 0};
    var emoji = '&#128269';

    var html = "<div class=\"og_search__mobile_trigger\">" + emoji + "</div><div style=\"display:none\" class=\"ya-site-form ya-site-form_inited_no\" onclick=\"return {'action':'http://www.aviatortime.ru/search.htm','arrow':false,'bg':'#99ccff','fontsize':12,'fg':'#000000','language':'ru','logo':'rb','publicname':'поиск по aviatortime.ru','suggest':true,'target':'_self','tld':'ru','type':2,'usebigdictionary':true,'searchid':2262960,'input_fg':'#000000','input_bg':'#ffffff','input_fontStyle':'normal','input_fontWeight':'normal','input_placeholder':'поиск по сайту','input_placeholderColor':'#000000','input_borderColor':'#7f9db9'}\"><form action=\"http://www.aviatortime.ru/search.htm\" method=\"get\" target=\"_self\"><input type=\"hidden\" name=\"searchid\" value=\"2262960\"/><input type=\"hidden\" name=\"l10n\" value=\"ru\"/><input type=\"hidden\" name=\"reqenc\" value=\"\"/><input type=\"search\" name=\"text\" value=\"\"/><input type=\"submit\" value=\"Найти\"/></form></div>";

    var style = "<style type=\"text/css\">.ya-page_js_yes .ya-site-form_inited_no { display: none; } .og_search__mobile_trigger{    display: flex;padding: 8px 20px;border-radius: 5px;line-height: 26px;background: red;align-self: center;}</style>";

    var script = "<script type=\"text/javascript\">(function(w,d,c){var s=d.createElement('script'),h=d.getElementsByTagName('script')[0],e=d.documentElement;if((' '+e.className+' ').indexOf(' ya-page_js_yes ')===-1){e.className+=' ya-page_js_yes';}s.type='text/javascript';s.async=true;s.charset='utf-8';s.src=(d.location.protocol==='https:'?'https:':'http:')+'//site.yandex.net/v2.0/js/all.js';h.parentNode.insertBefore(s,h);(w[c]||(w[c]=[])).push(function(){Ya.Site.Form.init()})})(window,document,'yandex_site_callbacks');</script>";


    var bindButton = function () {
        var trigger = document.getElementsByClassName('og_search__mobile_trigger');
        if (trigger.length > 0) {
            trigger[0].addEventListener('click', function () {
                window.location.href = "http://www.aviatortime.ru/search.htm";
            });
        }
    };
    var init = function () {
        if (document.getElementsByClassName('menu_outer').length > 0 && window.location.href.indexOf('search.htm') === -1) {
            var searcherChild = document.createElement('div');
            searcherChild.innerHTML = html + style + script;
            searcherChild.style = "max-width: 30%; display:inline-block;";
            document.getElementById('mobile_menu').style = "width:70%;display:inline-block;";
            var menu = document.getElementsByClassName('menu_outer')[0];
            menu.appendChild(searcherChild);
            menu.style = "text-align: center;";
            bindButton();
        }
    };
    var tryInit = function () {
        setTimeout(function () {
            if (document.getElementsByClassName('menu_outer').length > 0 || model.try > 10) {
                init();
            } else {
                tryInit();
                model.try++;
            }
        }, 500)
    };
    tryInit();
})();