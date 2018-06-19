module.exports = function Post() {
    var id,
        content,
        hashtags,
        characters,
        image,
        url,
        date;

    function getId() {
        return id;
    }

    function getContent() {
        return content;
    }

    function getHashtags() {
        return hashtags;
    }

    function getCharacters() {
        return characters;
    }

    function getImage() {
        return image;
    }

    function getUrl() {
        return url;
    }

    function getDate() {
        return date;
    }

    function setId(aId) {
        this.id = aId;
        return this;
    }

    function setContent(aContent) {
        this.content = aContent;
        return this;
    }

    function setHashtags(aHashtags) {
        this.hashtags = aHashtags;
        return this;
    }

    function setCharacters(aCharacters) {
        this.characters = aCharacters;
        return this;
    }

    function setImage(aImage) {
        this.image = aImage;
        return this;
    }

    function setUrl(aUrl) {
        this.url = aUrl;
        return this;
    }

    function setDate(aDate) {
        this.date = aDate;
        return this;
    }

    return {
        get: {
            id: getId,
            content: getContent,
            hashtags: getHashtags,
            characters: getCharacters,
            image: getImage,
            url: getUrl,
            date: getDate
        },
        withId: setId,
        withContent: setContent,
        withHashtags: setHashtags,
        withCharacters: setCharacters,
        withImage: setImage,
        withUrl: setUrl,
        withDate: setDate
    };
};