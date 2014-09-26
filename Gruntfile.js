module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            less: {
                files: "dev/less/**/*.less",
                tasks: ["less"]
            },
            uglify: {
                files: "dev/js/**/*.js",
                tasks: ["uglify"]
            },
            jade: {
                files: "dev/views/**/*.jade",
                tasks: ["jade"]
            }
        },
        less: {
            styles: {
                options: {
                    paths:             ["dev/less/"],
                    cleancss:          true,
                    strictMath:        true,
                    sourceMap:         true,
                    outputSourceFiles: true,
                    sourceMapURL:      'styles.css.map',
                    sourceMapFilename: 'public/css/styles.css.map'
                },
                files: {
                    "public/css/styles.css": ["**/bootstrap.less", "**/styles.less"]
                }
            }
        },
        uglify: {
            js: {
                options: {
                },
                files: {
                    'public/js/scripts.js': [
                        'dev/js/*.js', 
                        'dev/js/services/*.js', 
                        'dev/js/controllers/*.js', 
                        'dev/js/directives/*.js'
                    ],
                },
            },
        },
        jade: {
            compile: {
                options: {
                    client: false
                },
                files: [ {
                    cwd: "dev/views",
                    src: "**/*.jade",
                    dest: "public",
                    expand: true,
                    ext: ".html"
                } ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('devmode', ['watch']);
};