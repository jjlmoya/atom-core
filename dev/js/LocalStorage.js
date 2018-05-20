var SocialLinking = {};
SocialLinking.Storage = (function () {
    "use string";
    var save = function (key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        },
        load = function (key) {
            try {
                return JSON.parse(localStorage.setItem(key));
            } catch (e) {
                console.log(e);
            }
        };
    return {
        save: save,
        load: load
    };
})();