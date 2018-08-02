module.exports = function (app) {
    app.get('/modal', function (req, res) {
        res.render('modal');
    });
};