var $ = $ || require('jquery');
module.exports = (function () {
    "use strict";
    var locators = {
            classToFilter: '.character_count'
        },
        getCharactersByFullElement = function (element) {
            return $(element).text().replace(/\s\s+/g, ' ').trim().length;
        },
        getCharactersByElement = function (element, filter) {
            return getCharactersByFullElement($(element.find(filter ? filter : locators.classToFilter)));
        };
    return {
        getCharactersByFullElement: getCharactersByFullElement,
        getCharactersByElement: getCharactersByElement,
        getCharactersByElementWithFilter: getCharactersByElement
    };
});