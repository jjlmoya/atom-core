module.exports = function (app, db) {
    app.post('/product', function (req, res) {
        db.get().collection('quotes').save(req.body, function (err, result) {
            if (err) {
                return console.log(err);
            }
            res.redirect('/modal')
        });
    });
};