module.exports = function (grunt) {
    var basePath = 'dev/',
        distDir = 'www/',
        cssBuildPath = 'css/index.scss',
        jsPath = basePath + 'js/',
        componentsPath = jsPath +'components/',
        thirdParty = basePath + 'thirdParty/*.js',
        scssPath = basePath + 'scss/index.scss',
        jsComponents = "dev/scss/**/*.js",
        tasks = ['jshint', 'clean', 'copy', 'sass', 'browserify', 'uglify', 'htmlmin'],
        jsList = [
            jsPath + 'i18n.js',
            jsPath + 'Render.js',
            jsPath + 'Listeners.js',
            componentsPath + 'routerMenu.js',
            jsPath + 'LocalStorage.js',
            jsPath + 'Post.js',
            jsPath + 'Router.js',
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
        browserify: {
            dist: {
                files: {
                    'www/js/index.min.js': jsPath + 'index.js'
                },
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    'www/js/components.min.js': jsComponents,
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: false, src: 'dev/index.html', dest: 'www/index.html', filter: 'isFile'},
                    {expand: true, dest: 'www', cwd: 'dev', src: 'templates/**'},
                    {expand: true, dest: 'www', cwd: 'dev', src: 'translations/**'},
                    {expand: true, dest: 'www', cwd: 'dev', src: 'img/**'}

                ],
            },
        },
        clean: ['www'],
        watch: {
            scripts: {
                files: ['dev/**/*'],
                tasks: tasks,
                options: {
                    spawn: false,
                },
            },
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'www/index.html': 'www/index.html',     // 'destination': 'source'
                }
            },
        }
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-browserify');



    grunt.registerTask('default', tasks);
    grunt.registerTask('auto', ['watch']);

};