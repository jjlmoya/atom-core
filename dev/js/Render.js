var Handlebars = require('handlebars'),
    $ = require('jquery'),
    i18n = require('./i18n');

module.exports = {
    model: {
        path: '/',
        assets: 'assets/'
    },
    locators: {
        templates: '._template'
    },
    onCompleteRender: function () {
        var event = new Event('components::refresh');  // (*)
        document.dispatchEvent(event);
    },
    getTemplateAjax: function (templateName, callback) {
        var source, template;
        $.ajax({
            url: this.model.path + 'templates/' + templateName + '.hbs',
            dataType: "html",
            success: function (data) {
                source = data;
                template = Handlebars.compile(source);
                if (callback) callback(template);
            }
        });
    },
    renderHandlebarsTemplate: function (template, $targetDiv, withData, callback) {
        this.getTemplateAjax(template, function (template) {
            $targetDiv.html(template(withData)).removeClass('_template');
            i18n.replaceElemetKeys($targetDiv);
            if (callback) {
                callback($targetDiv, this.model);
            }
        });
    },
    renderTemplatesByElement: function ($element, model) {
        var that = this;
        $.each($element.find(this.locators.templates), function () {
            that.renderHandlebarsTemplate($(this).data('template'), $(this), model, that.onCompleteRender);
        });
    },
    renderElement: function ($element, model) {
        var instance = this;
        this.renderHandlebarsTemplate($element.data('template'), $element, model, function ($newElement) {
            instance.renderTemplatesByElement($newElement, model);
        });
    }
};

