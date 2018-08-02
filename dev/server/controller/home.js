module.exports = function (app, db) {
    app.get('/', function (req, res) {
        db.get().collection('quotes').find().toArray(function (err, result) {
            if (err) return console.log(err)
            res.render('home', {quotes: result})
        })
    });
};