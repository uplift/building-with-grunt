module.exports = function( grunt ) {
    // Load Tasks
    require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

    grunt.initConfig({
        // jshint task
        jshint: {
            // Path to jshintrc file
            jshintrc: '.jshintrc',
            // Glob of where to find files to lint
            srclint: {
                src: [ 'scripts/**/*.js' ]
            }
        },
        // docco task
        docco: {
            // document all the things
            all: {
                // Path to scripts to doc
                src: [ 'scripts/**/*.js' ],
                options: {
                    output: 'build/docs/'
                }
            }
        },
        // clean task
        clean: [ 'build/docs', 'build/staging/' ],
        // copy task
        copy: {
            staging: {
                files: [
                    {
                        // files to copy across - in this case, all files
                        src       : [ './**' ],
                        // destination directory for copied files
                        dest      : 'build/staging/',
                        // filter files that aren't needed to be copied
                        filter  : function( src ) {
                            return !grunt.file.isMatch(
                                [
                                    'node_modules',
                                    'node_modules/**',
                                    'build',
                                    'build/**'
                                ],
                                src
                            );
                        }
                    }
                ]
            }
        }
    });

    grunt.registerTask( 'default', [ 'jshint', 'clean', 'docco', 'copy:staging' ] );
}
