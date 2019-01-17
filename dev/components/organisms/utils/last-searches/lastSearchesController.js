window.LastSearches = window.LastSearches || {};
window.LastSearches.name = "Últimas Búsquedas";
window.LastSearches.dateDestinationPrefix = "Salida el ";
window.LastSearches.searchDatePrefix = "Consultado: ";
window.LastSearches.viewButton = "Ver ";
var commons = commons || {};
commons.LastSeaches = (function () {
    var settings = {
            prefix: {
                //PRODUCTION
                /*
                organism: 'pg-o',
                molecules: 'pg-m'
                */
                //DEVELOPMENT
                organism: 'og',
                molecules: 'ml'
            }
        },
        locators = {
            component: '.' + settings.prefix.organism + '-last-searches',
            remove: '.' + settings.prefix.molecules + '-pill__close',
            entry: '.' + settings.prefix.molecules + '-pill',
            searchers: [
                '#caribbean-search',
                '#TOURS-searcher'
            ],
            headerTool: '.m-header-alt__tool',
            headerContainer: 'm-header-alt__last-searches',
            removeHead: '.c-icon-trash',
            headSearchOffer: '.js_last_search'
        },
        service,
        model = {
            component: 'LastSearches'
        },
        headerTemplate = {
            searchEntry: function (date, name, link, image, timestamp) {
                return '' +
                    '<article class="m-offer-brief m-offer-brief--is-removable js_last_search" data-link="' + link + '">' +
                    '     <div class="m-offer-brief__content-wrap">' +
                    '         <h3 class="m-offer-brief__title c-heading c-heading--type-4 ">' + name + '</h3>' +
                    '         <span class="m-offer-brief__dates">' + date + '</span>' +
                    '         <span class="m-offer-brief__consulted">' +
                    '             <i class="m-offer-brief__consulted-icon c-icon c-icon--small c-icon--secondary c-icon-clock"></i>' + timestamp +
                    '         </span>' +
                    '     </div>' +
                    '     <div class="m-offer-brief__actions-wrap">' +
                    '         <a href="' + link + '" class="m-offer-brief__btn c-btn c-btn--tertiary c-btn--has-radius c-btn--uppercase c-btn--full">' +
                    window.LastSearches.viewButton +
                    '         </a>' +
                    '         <a href="#" class="m-offer-brief__delete c-icon c-icon--medium c-icon--secondary c-icon-trash"></a>' +
                    '     </div>' +
                    '</article>';
            },
            heading: function (componentName) {
                return '' +
                    '<div class="m-header-alt__tool-item ' + locators.headerContainer + '">' +
                    '   <div class="m-header-alt__tool-text">' +
                    '       <i class="m-header-alt__tool-icon m-header__tool-icon--absolute c-icon-clock c-icon--medium"></i>' +
                    '       <a class="m-header-alt__tool-span">' + componentName + '</a>' +
                    '   </div>' +
                    '   <div class="uip-popover uip-popover_bottom-position" style="top: 40px; left: -114px; display: none;">' +
                    '       <div class="uip-popover__arrow uip-popover__arrow--bottom" style="left: 167px;"></div>' +
                    '       <div class="uip-popover__inner">';
            },
            closing: function () {
                return '' +
                    '        </div>' +
                    '    </div>' +
                    '</div>';
            }
        },
        searchTemplate = {
            searchEntry: function (date, name, link) {
                //language=html
                return '' +
                    '<li class="' + settings.prefix.molecules + '-pill" data-link="' + link + '">' +
                    '    <div class="' + settings.prefix.molecules + '-pill__wrapper">' +
                    '        <span class="' + settings.prefix.molecules + '-pill__date">' + date + '</span>' +
                    '        <span class="' + settings.prefix.molecules + '-pill__title">' + name + '</span>' +
                    '    </div>' +
                    '    <div class="' + settings.prefix.molecules + '-pill__close">' +
                    '        <span class="c-icon c-icon--normal c-icon-close-rounded"></span>' +
                    '    </div>' +
                    '</li>';
            },
            heading: function (componentName) {
                return '' +
                    '<div class="' + settings.prefix.organism + '-last-searches u-mt-10">' +
                    '    <div class="' + settings.prefix.organism + '-last-searches__title pg-a-typo-azha pg-a-color-white u-mb-5">' + componentName + ':</div>' +
                    '    <ul class="' + settings.prefix.organism + '-last-searches__list flex flex-wrap u-p-0 u-m-0">';
            },
            closing: function () {
                return '</ul>' +
                    '</div>';
            }
        },
        getLinkByElement = function ($element) {
            return $element.data('link');
        },
        bindRemove = function () {
            $(locators.component + ' ' + locators.remove).on('click', function () {
                service.remove(getLinkByElement($(this).closest(locators.entry)));
            });
            $(locators.removeHead).on('click', function () {
                service.remove(getLinkByElement($(locators.headSearchOffer)));
            });
        },
        isDeleteButtonClicked = function (clicked) {
            return $(clicked).closest(locators.remove).length > 0;
        },
        bindLink = function () {
            $(locators.component + ' ' + locators.entry).on('click', function (e) {
                if (isDeleteButtonClicked(e.target)) {
                    return;
                }
                window.location.href = getLinkByElement($(this));
            });
        },
        bindEvents = function () {
            bindRemove();
            bindLink();
        },
        beautifyDate = function (date, prefix) {
            var formattedDate = new Date(date),
                month = formattedDate.getMonth() + 1,
                day = formattedDate.getDay();
            return prefix + (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month;
        },
        renderSearch = function (search, template) {
            var destinationPrefix = window.LastSearches.dateDestinationPrefix + ' ' || '',
                searchDatePrefix = window.LastSearches.searchDatePrefix;
            return template.searchEntry(beautifyDate(search.date, destinationPrefix),
                search.destination,
                search.url,
                search.image,
                beautifyDate(search.timestamp, searchDatePrefix));
        },
        lastToolElement = function () {
            return $(_.last($(locators.headerTool)));
        },
        renderLastSearches = function (lastSearches) {
            var sortedSearches = lastSearches,
                searcherHTML,
                headerHTML;
            searcherHTML = renderLastSearchByType(sortedSearches, searchTemplate);
            headerHTML = renderLastSearchByType(sortedSearches, headerTemplate);
            _.forEach(locators.searchers, function (searcher) {
                $(searcher).append(searcherHTML);
            });
            lastToolElement().prepend(headerHTML);
            bindEvents();
        },
        renderLastSearchByType = function (searches, template) {
            var html = template.heading(window.LastSearches.name);
            _.forEach(searches, function (search) {
                html += renderSearch(search, template);
            });
            html += template.closing();
            return html;
        },
        removeLastSearches = function () {
            $(locators.component).remove();
            $('.' + locators.headerContainer).remove();
        },
        init = function () {
            service = service || commons.Service.LastSearch;
            var lastSearches = service.purge();
            removeLastSearches();
            if (lastSearches && lastSearches.length > 0) {
                renderLastSearches(lastSearches);
            }
        };
    document.addEventListener(model.component + '::init', function () {
        init();
    });
    $(function () {
        init();
    });
})();
