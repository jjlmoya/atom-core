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
        viewsDir: pathView
    }));

    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '../views'));
    app.use(express.static(path.join(__dirname, '../public')));
};


