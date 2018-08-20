const multer = require('multer');
const path = require('path');
const UPLOAD_PATH = path.resolve(__dirname, '/public/uploads')
const upload = multer({
    dest: UPLOAD_PATH,
    limits: {fileSize: 1000000, files: 5}
});
const ImageService = require('../services/image.services');
const Config = require('../config');
const Parent = Config.router().admin;

module.exports = function (app) {

    app.post(Parent.path + '/' + Parent.image.path + '/create', upload.array('image', 5), (req, res) => {
        ImageService.create(req, function () {
            res.render(ImagePage.view);
        });
    });
};