var _ = _ || require('lodash'),
   Post = _ || require('../model/Post');
module.exports = {
    convertData: function (object) {
       var post = new Post();
       post.set.content = object.content;
    }
};