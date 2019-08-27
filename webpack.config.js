var path = require('path');
module.exports = {
    mode: 'development',
    entry:
        {
            components: path.join(__dirname, "/atom-script/apps.js"),
            custom: path.join(__dirname, "/atom-script/custom.js")
        },
    output: {
        path: __dirname + '/www/public/js/',
        filename: "[name].min.js",
    },
};
