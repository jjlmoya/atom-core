var path = require('path');
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "/atom-script/apps.js"),
    output: {
        path: __dirname + '/www/public/js/',
        filename: "components.min.js",
    },
};
