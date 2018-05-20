var SocialLinking = SocialLinking || {};

function Post() {
    this.toString = function () {
        return this.model + " has done " + this.miles + " miles";
    };
    this.setAuthor = function (author) {
        this.author = author;
        return this;
    };
    this.setMessage = function (message) {
        this.message = message;
        return this;
    };
    this.setExtendedMessage = function (extendedMessage) {
        this.extendedMessage = extendedMessage;
        return this;
    };
    this.setHashtags = function (hashtags) {
        this.hashtags = hashtags;
        return this;
    };
    this.setLink = function (link) {
        this.link = link;
        return this;
    };
    this.setVia = function (via) {
        this.via = via;
        return this;
    };
    this.setPublishData = function (publishData) {
        this.publishData = publishData;
        return this;
    };
}