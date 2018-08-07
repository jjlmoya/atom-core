module.exports = function (grunt) {
    var basePath = 'dev/',
        scssPath = basePath + 'components/index.scss',
        jsComponents = "dev/components/**/*.js",
        tasks = ['jshint', 'clean', 'copy', 'sass', 'uglify'];
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
                files: {'www/public/css/index.css': scssPath}            // Dictionary of files// 'destination': 'source'

            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    'www/public/js/components.min.js': jsComponents
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: false, src: 'dev/apps.js', dest: 'www/apps.js', filter: 'isFile'},
                    {expand: true, dest: 'www', cwd: 'dev', src: 'public/**'},
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


    grunt.registerTask('default', tasks);
    grunt.registerTask('auto', ['watch']);

};