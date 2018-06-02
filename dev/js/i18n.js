var $ = $ || require('jquery');
module.exports = {
    cms: {},
    getKeyValue: function (key) {
        var splittedKey = key.split('.');
        return this.cms[splittedKey[0]][splittedKey[1]];
    },

    getCMS: function () {
        var that = this;
        var lang = 'es_ES';
        $.ajax('./translations/' + lang + '.json')
            .done(function (data) {
                that.cms = data;
                that.replaceKeys();
            }).fail(function (data) {
            console.log('cms download failed');
        });
    },
    replaceKeys: function () {
        $('[data-key]').each($.proxy(function (e) {
            $(e.currentTarget).html(this.getKeyValue($(e.currentTarget).data('key')));
        }), this);
    },
    replaceElemetKeys: function ($element) {
        var instance = this;
        $element.find('[data-key]').each(function () {
            $(this).html(instance.getKeyValue($(this).data('key')));
        });
    }
};