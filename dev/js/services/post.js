var $ = $ || require('jquery'),
    _ = _ || require('lodash');
module.exports = {
    url: './data/posts.json',
    type: 'GET',
    timeout: 5 * 1000,
    getPosts: function () {
        return $.ajax({
            type: this.type,
            timeout: this.timeout,
            url: this.url
        });
    },
    getPostById: function (id, onSuccess) {
        this.getPosts().always(function (data) {
            var firstMatch = _.first(_.filter(data, function (d) {
                return d.id == id;
            }));
            onSuccess(firstMatch);
        });
    }
};