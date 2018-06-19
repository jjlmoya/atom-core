var $ = $ || require('jquery'),
    _ = _ || require('lodash'),
    Entry = Entry || require('../model/Entry');
module.exports = {
    getMockPost: function () {
        return new Entry().withTitle('Rosa')
            .withImage('http://loremflickr.com/101/105')
            .withDescription('La Rosa es la delicada flor, esa reina del jardín y también una guerrera llena de espinas, si quieres darle a tu jardín un toque elegante y señorial no puede faltar en tu hogar.')
            .withEntries([{
                question: 'Qué es la Rosa',
                answer: 'La <strong>Rosa</strong> es la delicada flor, esa reina del jardín y también una guerrera llena de espinas, si quieres darle a tu jardín un toque elegante y señorial no puede faltar en tu hogar.'
            }, {
                question: 'Cómo cultivar Rosa',
                answer: 'A <a href="">pesar de ser una</a> de las más populares empezar un jardín puede ser un poco desalentador para la gente que empieza. Pero no tienen que estresarte porque si sigues los cuidados apropiados puedes convertirte en todo un jardinero/a experto/a.'
            }])
            .withId(0);
    }
};