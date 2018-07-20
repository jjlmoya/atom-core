var Handlebars = require('handlebars'),
    $ = require('jquery'),
    i18n = require('./i18n'),
    _ = require('lodash'),
    genericModel = {
        socialMedia: [
            {
                name: 'twitter',
                isEnabled: false
            }, {
                name: 'facebook',
                isEnabled: true
            }, {
                name: 'instagram',
                isEnabled: true
            }, {
                name: 'pinterest',
                isEnabled: true
            }, {
                name: 'google',
                isEnabled: true
            }],
        NavPages: [
            {
                page: 'home',
                display: 'Inicio'
            }, {
                page: 'settings',
                display: 'Configuración'
            }, {
                page: 'modal',
                display: 'Modal'
            }],
        mockArray: [0, 1, 2, 3, 4, 5, 6]
    };
module.exports = {
    model: {
        path: '/',
        assets: 'assets/'
    },
    locators: {
        templates: '._template'
    },
    onCompleteRender: function (component, $e, model) {
        if (component) {
            var event = new Event('components::' + component);  // (*)
            document.dispatchEvent(event);
            console.log('components::' + component);
        }
        if ($e.find(this.locators.templates).length > 0) {
            this.renderTemplatesByElement($e, model);
        }
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
            $targetDiv.html(template(_.merge(withData, genericModel))).removeClass('_template');
            i18n.replaceElemetKeys($targetDiv);
            if (callback) {
                callback($targetDiv, withData);
            }
        });
    },
    renderTemplatesByElement: function ($element, model) {
        var that = this;
        $.each($element.find(this.locators.templates), function () {
            var $e = $(this);
            that.renderHandlebarsTemplate($(this).data('template'), $(this), model, function (e, model) {
                that.onCompleteRender($e.data('component'), e, model);
            });
        });
    },
    renderElement: function ($element, model) {
        var instance = this;
        this.renderHandlebarsTemplate($element.data('template'), $element, model, function ($newElement) {
            instance.renderTemplatesByElement($newElement, model);
        });
    },
    renderTemplateInElement: function (template, target, model, callback) {
        var that = this,
            $target = $(target);
        this.renderHandlebarsTemplate(template, $target, model, function () {
            that.onCompleteRender($target.data('component'), $target, model);
        });
    }
};