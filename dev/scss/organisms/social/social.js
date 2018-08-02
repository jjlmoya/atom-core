/**
 Twitter Cards and OG Must Be Implemented
 <meta name="twitter:card" content="summary" />
 <meta name="twitter:site" content="jjlmoya.es" />
 <meta name="twitter:creator" content="@jjlmoya" />
 <meta property="og:url" content="http://jjlmoya.es/social/" />
 <meta property="og:title" content="A Twitter for jjlmoya" />
 <meta property="og:description" content="Description" />
 <meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />
 */

(function () {
    var locators = {
            social: {
                init: 'social_share_trigger',
                data: {
                    name: 'social',
                    via: 'via',
                    text: 'share-text',
                    url: 'share-link',
                    hashtags: 'hashtags'
                }
            },
            event: 'social'
        },
        social = {
            mappers: {
                twitter: function (data) {
                    return {
                        url: data.link,
                        text: data.text,
                        hashtags: data.hashtags,
                        via: data.via
                    };
                },
                facebook: function (data) {
                    return {
                        u: data.link,
                        quote: data.text,
                        hashtags: data.hashtags
                    };
                },
                linkedin: function (data) {
                    return {
                        url: data.link,
                        mini: true,
                        title: data.title,
                        summary: data.text,
                        source: data.link
                    }
                },
                whatsapp: function (data) {
                    return {
                        text: data.link
                    }
                },
                google: function (data) {
                    return {
                        text: data.text,
                        url: data.link
                    }
                }
            },
            action: {
                twitter: function (data) {
                    redirectToSocialMedia('https://twitter.com/share?', data);
                },

                facebook: function (data) {
                    redirectToSocialMedia('https://www.facebook.com/sharer/sharer.php?', data);
                },

                linkedin: function (data) {
                    redirectToSocialMedia('https://www.linkedin.com/shareArticle?', data);
                },

                whatsapp: function (data) {
                    redirectToSocialMedia('whatsapp://send?', data);
                },

                google: function (data) {
                    redirectToSocialMedia('https://plus.google.com/share?', data);
                }
            }
        },
        listeners = {
            social: function () {
                document.addEventListener('click', function (event) {
                    if (event.target.classList.contains(locators.social.init)) {
                        var element = event.target,
                            network = getData(element, locators.social.data.name),
                            params = getParamsByNetwork(getFilledElement(element), network);
                        if (social.action[network]) {
                            social.action[network](params);
                        }
                    }
                });
            }
        },
        getData = function (element, dataKey) {
            return element.getAttribute('data-' + dataKey);
        },
        getFilledElement = function (element) {
            var socialTarget = getData(element, 'social-target'),
                targetById = document.getElementById(socialTarget),
                target = targetById ? targetById : document.getElementsByClassName(socialTarget)[0];
            return target ? target : element;
        },
        redirectToSocialMedia = function (baseUrl, data) {
            window.open(baseUrl + paramsToArray(data).join('&'));
        },
        getParamsByNetwork = function (element, network) {
            var socialMap = locators.social.data,
                settings = ({
                    network: network,
                    text: getData(element, socialMap.text),
                    link: getData(element, socialMap.url) || window.location.href,
                    hashtags: getData(element, socialMap.hashtags),
                    via: getData(element, socialMap.via)
                });
            return social.mappers[network](settings);
        },
        paramsToArray = function (data) {
            var params = [];
            for (var value in data) {
                if (data && data[value]) {
                    params.push(value + '=' + encodeURIComponent(data[value]));
                }
            }
            return params;
        },
        init = function () {
            listeners.social();
        };
    document.addEventListener('components::' + locators.event, function () {
        init();
    });
    init();
})();