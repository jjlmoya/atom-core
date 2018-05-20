module.exports = function (grunt) {
    var basePath = 'dev/',
        distDir = 'www/',
        cssBuildPath = 'css/index.scss',
        jsPath = basePath + 'js/',
        thirdParty = sPath = basePath + 'thirdParty/*.js',
        scssPath = basePath + 'scss/index.scss',
        jsList = [
            jsPath + 'LocalStorage.js',
            jsPath + 'Router.js',
            jsPath + 'Render.js',
            jsPath + 'Post.js',
            jsPath + 'i18n.js',
            jsPath + 'index.js',
        ];
    grunt.initConfig({
        jshint: {
            files: [jsPath],
            options: {
                globals: {
                    jQuery: true,
                    handlebars: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'sass']
        },
        sass: {                              // Task
            dev: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {'www/css/index.css': scssPath}            // Dictionary of files// 'destination': 'source'

            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    'www/js/index.min.js': jsList,
                    'www/js/thirdparty.min.js': thirdParty,
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['dev/templates'], dest: 'www/templates'},
                    {expand: true, src: ['dev/*.html'], dest: 'www/.html'},
                ],
            },
        },
        clean: ['www', 'path/to/dir/two']
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');



    grunt.registerTask('default', ['jshint', 'clean', 'sass', 'uglify', 'copy']);

};