module.exports = function (app) {
    var path = require("path"),
        express = require('express'),
        pathView = 'www/views/',
        exphbs = require('express-handlebars');

    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        extname: '.hbs',
        layoutsDir: pathView + 'layouts',
        partialsDir: pathView + 'partials',
        viewsDir: pathView,
        helpers: {
            equals: function (arg1, arg2, options) {
                return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
            },
            times: function (n, block) {
                var accum = '';
                for(var i = 0; i < n; ++i) {
                    block.data.index = i;
                    block.data.first = i === 0;
                    block.data.last = i === (n - 1);
                    accum += block.fn(this);
                }
                return accum;
            },
            setVar: function(varName, varValue, options) {
                options.data.root[varName] = varValue;
            },
            concat: function () {
                var result = "";
                for(var i in arguments) {
                    result += (typeof arguments[i] === "string" ? arguments[i] : "") + "";
                }
                return result;
            }
        }
    }));


    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '../views'));
    app.use(express.static(path.join(__dirname, '../public')));
};


