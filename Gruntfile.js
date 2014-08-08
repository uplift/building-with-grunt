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
        }
    });

    grunt.registerTask( 'default', [ 'jshint', 'docco' ] );
}
