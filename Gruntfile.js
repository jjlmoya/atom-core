module.exports = function (grunt) {
    var basePath = 'dev/',
        brand = grunt.option('brand') || 'index',
        jsComponents = "dev/components/**/*.js",
        jsUtils = "dev/framework/**/*.js",
        tasks = ['jshint', 'clean', 'copy', 'sass', 'uglify', 'cssmin'];
    var scssPath = brand ? basePath + 'components/' + brand + '.scss' : basePath + 'components/index.scss';
    console.log('path:' + scssPath);
    grunt.initConfig({
        jshint: {
            files: [jsComponents],
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
                files: {'www/public/css/index.css': scssPath}

            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    'www/public/js/components.min.js': jsComponents,
                    'www/public/js/framework.min.js': jsUtils
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'www/public/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'www/public/css',
                    ext: '.min.css'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: false, src: 'dev/apps.js', dest: 'www/apps.js', filter: 'isFile'},
                    {expand: true, dest: 'www', cwd: 'dev', src: 'public/*/**'},
                    {expand: true, dest: 'www', cwd: 'dev', src: 'server/**'},
                    {expand: true, dest: 'www', cwd: 'dev', src: 'views/**'},
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
        }
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    grunt.registerTask('default', tasks);
    grunt.registerTask('auto', ['watch']);

};