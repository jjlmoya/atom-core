const Config = require('./server/config');
const port = Config.server().port;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./server/db');


app.use(bodyParser.urlencoded({extended: true}));


db.connect(Config.db().protocol + Config.db().url, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        app.listen(port, function () {
            console.log('Example app listening on port ' + port);
        });
    }
});

require('./server/engine')(app);
require('./server/router')(app);

