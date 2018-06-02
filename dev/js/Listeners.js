var $ = $ || require('jquery');
module.exports = {
    toggleValue: function ($checkbox) {
        var $label = $getLabelFromCheckBox($checkbox),
            enabled = $label.hasClass('is-active');
        $label.toggleClass('is-active', !enabled);
    },
    $getLabelFromCheckBox: function ($checkbox) {
        return $checkbox.closest('label');
    },
    addListeners: function () {
        $(document).on('templates::loaded', function (e) {
            console.log(e);
            $('input[type="checkbox"]').on('click', $.proxy(function (e) {
                this.toggleValue($(e.currentTarget));
            }), this);
            var event = new Event('components::refresh');  // (*)
            document.dispatchEvent(event);
            e.stopPropagation();
        });
    }
};