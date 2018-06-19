module.exports = function Entry() {
    var id,
        title,
        description,
        entries,
        image,
        url,
        date;

    function getId() {
        return id;
    }

    function getTitle() {
        return title;
    }

    function getDescription() {
        return description;
    }

    function getEntries() {
        return entries;
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

    function setTitle(title) {
        this.title = title;
        return this;
    }

    function setDescription(description) {
        this.description = description;
        return this;
    }

    function setEntries(entries) {
        this.entries = entries;
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
            title: getTitle,
            description: getDescription,
            entries: getEntries,
            image: getImage,
            url: getUrl,
            date: getDate
        },
        withId: setId,
        withTitle: setTitle,
        withDescription: setDescription,
        withEntries: setEntries,
        withImage: setImage,
        withUrl: setUrl,
        withDate: setDate
    };
};