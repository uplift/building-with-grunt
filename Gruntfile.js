module.exports = function( grunt ) {
    // Load Tasks
    require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

    grunt.initConfig({
        // Editable config for the tasks to use
        paths: {
            scripts     : 'scripts/**/*.js',
            docs        : 'build/docs',
            staging     : 'build/staging',
            distScript  : 'scripts/dist.js'
        },
        ignores: {
            staging: [
                'node_modules',
                'node_modules/**',
                'build',
                'build/**'
            ]
        },
        // jshint task
        jshint: {
            // Path to jshintrc file
            jshintrc: '.jshintrc',
            // Glob of where to find files to lint
            srclint: {
                src: [ '<%= paths.scripts %>' ]
            }
        },
        // docco task
        docco: {
            // document all the things
            all: {
                // Path to scripts to doc
                src: [ '<%= paths.scripts %>' ],
                options: {
                    output: '<%= paths.docs %>/'
                }
            }
        },
        // clean task
        clean: [ '<%= paths.docs %>/', '<%= paths.staging %>/' ],
        // copy task
        copy: {
            staging: {
                files: [
                    {
                        // files to copy across - in this case, all files
                        src       : [ './**' ],
                        // destination directory for copied files
                        dest      : '<%= paths.staging %>/',
                        // filter files that aren't needed to be copied
                        filter  : function( src ) {
                            return !grunt.file.isMatch( grunt.config( "ignores.staging" ), src );
                        }
                    }
                ]
            }
        },
        // concat task
        concat: {
            dist: {
                src: '<%= paths.staging %>/<%= paths.scripts %>',
                dest: '<%= paths.staging %>/<%= paths.distScript %>'
            }
        },
        // minify task
        uglify: {
            dist: {
                src: '<%= paths.staging %>/<%= paths.distScript %>',
                dest: '<%= paths.staging %>/<%= paths.distScript %>'
            }
        }
    });

    grunt.registerTask( 'default', [ 'jshint', 'clean', 'docco', 'copy:staging', 'concat', 'uglify' ] );
}
