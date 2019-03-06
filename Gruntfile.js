module.exports = function (grunt) {
    var brand = grunt.option('brand') || 'index',
        jsComponents = "atom-script/**/*.js",
        tasks = ['jshint', 'clean', 'copy', 'sass', 'uglify', 'postcss', 'cssmin'],
        tasksWatch = ['jshint', 'clean', 'copy', 'sass', 'uglify', 'postcss', 'cssmin', 'watch'];
    var scssPath = 'atom-style/index.scss';
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
                    'www/public/js/components.min.js': jsComponents
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
                    {expand: true, dest: 'www', src: '/assets/*/**'},
                    {expand: true, dest: 'www', src: '/atom-html/**'},
                ],
            },
        },
        clean: ['www'],
        watch: {
            scripts: {
                files: ['atom-script/**/*',
                    'atom-html/**/*',
                    'atom-style/**/*'],
                tasks: tasks,
                options: {
                    spawn: false,
                },
            },
        },
        postcss: {
            options: {
                map: {
                    inline: false,
                    annotation: 'www/public/css/'
                },
                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                ]
            },
            dist: {
                src: 'www/public/css/*.css'
            },
        }
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-postcss');


    grunt.registerTask('default', tasks);
    grunt.registerTask('auto', tasksWatch);

};