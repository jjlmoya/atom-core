var SocialLinking = SocialLinking || {};
SocialLinking.i18n = (function () {
    var cms = {};
    var getKeyValue = function (key) {
        var splittedKey = key.split('.');
        return cms[splittedKey[0]][splittedKey[1]];
    };

    var getCMS = function () {
            var lang = 'es_ES';
            $.ajax('./translations/' + lang + '.json')
                .done(function (data) {
                    cms = data;
                    replaceKeys();
                }).fail(function (data) {
                console.log('cms download failed');
            });
        },
        replaceKeys = function () {
            $('[data-key]').each(function () {
                $(this).html(getKeyValue($(this).data('key')));
            });
        },
        replaceElemetKeys = function ($element) {
            $element.find('[data-key]').each(function () {
                $(this).html(getKeyValue($(this).data('key')));
            });
        };
    getCMS();

    return {
        translate: replaceElemetKeys
    };

})();