var commons = commons || {};
commons.Service = commons.Service || {};
commons.Service.LastSearch = (function () {
    var model = {
            component: 'LastSearches',
            localStorageKey: 'lastSearches2',
        },
        purges = [
            {
                order: 0,
                removeDupedEntry: function (lastSearches) {
                    return _.uniqWith(lastSearches, function (searchA, searchB) {
                        return searchA.url === searchB.url;
                    });
                },
                run: function (lastSearches) {
                    return _.reverse(this.removeDupedEntry(_.reverse(lastSearches)));
                }
            },
            {
                order: 1,
                settings: {
                    MARGIN_DAYS: 2
                },
                removeExpiredSearches: function (lastSearches, days) {
                    var daysToMs = function (days) {
                            return days * 24 * 60 * 60 * 1000;
                        },
                        now = new Date();
                    return _.remove(lastSearches, function (search) {
                        var flightTime = new Date(search.date).getTime();
                        return flightTime > (now.getTime() + daysToMs(days));
                    });
                },
                run: function (lastSearches) {
                    return this.removeExpiredSearches(lastSearches, this.settings.MARGIN_DAYS);
                }
            },
            {
                order: 2,
                settings: {
                    MAX_ENTRIES: 3
                },
                sortByAge: function (lastSearches) {
                    return lastSearches.sort(function compare(a, b) {
                        var dateA = new Date(a.timestamp);
                        var dateB = new Date(b.timestamp);
                        return dateB - dateA;
                    });
                },
                removeOldestSearch: function (lastSearches) {
                    var sortSearches = this.sortByAge(lastSearches);
                    removeEntry(sortSearches.pop().url);
                    return lastSearches;
                },
                isFull: function (lastSearches) {
                    return lastSearches.length > this.settings.MAX_ENTRIES;
                },
                run: function (lastSearches) {
                    return this.isFull(lastSearches) ?
                        this.removeOldestSearch(lastSearches) : lastSearches;
                }
            }
        ],
        setLastSearchsToLocalStorage = function (lastSearches) {
            localStorage.setItem(model.localStorageKey, JSON.stringify(lastSearches));
        },
        saveLastSearch = function (lastSearch) {
            var lastSearches = loadLastSearches();
            lastSearches.push(lastSearch);
            lastSearches = purgeLastSearches(lastSearches);
            setLastSearchsToLocalStorage(lastSearches);
        },
        getPurgesSorted = function () {
            return _.sortBy(purges, function (purge) {
                return purge.order;
            });
        },
        purgeLastSearches = function (ExpandedLastSearches) {
            var lastSearches = ExpandedLastSearches || loadLastSearches();
            if (lastSearches && lastSearches.length > 0) {
                _.forEach(getPurgesSorted(), function (purge) {
                    lastSearches = purge.run(lastSearches);
                });
            }
            return lastSearches;
        },
        removeEntry = function (uniqueLink) {
            var lastSearches = loadLastSearches(),
                newLastSearches = _.filter(lastSearches, function (search) {
                    return search.url !== uniqueLink;
                });
            setLastSearchsToLocalStorage(newLastSearches);
            refresh();
        },
        loadLastSearches = function () {
            try {
                var parse = JSON.parse(localStorage.getItem(model.localStorageKey));
                return parse || [];
            } catch (e) {
                return [];
            }
        },
        refresh = function () {
            var event = new Event(model.component + '::init');
            document.dispatchEvent(event);
        };
    return {
        save: saveLastSearch,
        init: refresh,
        remove: removeEntry,
        load: loadLastSearches,
        purge: purgeLastSearches
    };
})();