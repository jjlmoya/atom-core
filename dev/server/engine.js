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
            }
        }
    }));


    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '../views'));
    app.use(express.static(path.join(__dirname, '../public')));
};


