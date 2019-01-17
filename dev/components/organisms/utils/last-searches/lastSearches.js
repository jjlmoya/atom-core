var commons = commons || {};
commons.Model = commons.Model || {};
commons.Model.LastSearch = function () {
    var destination,
        date,
        url,
        image;
    function isValidDate(checkDate) {
        return checkDate && (checkDate instanceof Date) && !isNaN(checkDate.getTime());
    }
    return {
        withDestination: function (newDestination) {
            destination = newDestination;
            return this;
        },
        withDate: function (newDate) {
            date = newDate;
            return this;
        },
        withUrl: function (newUrl) {
            url = newUrl;
            return this;
        },
        withImage: function (newImage) {
            image = newImage;
            return this;
        },
        build: function () {
            try {
                if (destination &&
                    isValidDate(date) &&
                    url) {
                    return {
                        destination: destination,
                        date: date,
                        url: url,
                        timestamp: new Date(),
                        image: image
                    };
                } else {
                    throw "LastSearch Exception";
                }
            } catch (e) {
                console.error(e + ': Malformed Object');
            }
        }
    };
};