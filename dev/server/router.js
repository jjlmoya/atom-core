module.exports = (app) => {
    require('./controller/home.controller')(app);
    require('./controller/modal.controller')(app);
    require('./controller/admin.controller')(app);


    require('./controller/navigation.controller')(app);
    require('./controller/watch.controller')(app);

};