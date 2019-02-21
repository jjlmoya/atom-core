var path = require('path');
module.exports = {
    entry: path.join(__dirname, "entry"),
    output: {
        path: __dirname,
        filename: "<%= outputFileName %>",
    },
};
