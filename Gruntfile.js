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
        // copy task
        copy: {
            staging: {
                files: [
                    {
                        src       : [ './**' ],
                        dest      : 'build/staging/',
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

    grunt.registerTask( 'default', [ 'jshint', 'docco', 'copy:staging' ] );
}
