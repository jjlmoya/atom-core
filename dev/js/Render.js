var SocialLinking = SocialLinking || {};
SocialLinking.Render = (function () {
    var model = {
            path: '/',
            assets: 'assets/'
        },
        locators = {
            templates: '._template'
        },
        getTemplateAjax = function (templateName, callback) {
            var source, template;
            $.ajax({
                url: model.path + 'templates/' + templateName + '.hbs',
                dataType: "html",
                success: function (data) {
                    source = data;
                    template = Handlebars.compile(source);
                    if (callback) callback(template);
                }
            });
        },
        renderHandlebarsTemplate = function (template, $targetDiv, withData, callback) {
            getTemplateAjax(template, function (template) {
                $targetDiv.html(template(withData)).removeClass('_template');
                console.log($targetDiv[0]);
                SocialLinking.i18n.translate($targetDiv);
                if (callback) {
                    callback($targetDiv, model);
                }
            });
        },
        renderTemplatesByElement= function ($element, model) {
            $.each($element.find(locators.templates), function () {
                renderHandlebarsTemplate($(this).data('template'), $(this), model, function () {});
            });
        },
        renderElement= function ($element, model) {
            renderHandlebarsTemplate($element.data('template'), $element, model, function ($newElement) {
                renderTemplatesByElement($newElement, model);
            });
        };
    $(document).ready(function () {
        renderTemplatesByElement($('body'));
    });
    return {
        renderTemplatesByElement: renderTemplatesByElement,
        renderElement: renderElement
    };
})();