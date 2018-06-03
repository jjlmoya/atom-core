var Handlebars = Handlebars || require('handlebars');
module.exports = (function () {
    "use strict";
    Handlebars.registerHelper('equals', function (a, b, opts) {
        console.log(a);
        console.log(b);
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    });
})();