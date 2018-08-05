module.exports = (app) => {
    require('./controller/home')(app);
    require('./controller/modal')(app);
    require('./controller/admin')(app);


    require('./controller/product')(app);
    require('./controller/navigation')(app);
};