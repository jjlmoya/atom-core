module.exports = (app) => {
    require('./controller/landing.controller')(app);
    require('./controller/admin.controller')(app);
    require('./controller/navigation.controller')(app);
    require('./controller/watch.controller')(app);
    require('./controller/component.controller')(app);
    require('./controller/image.controller')(app);
}