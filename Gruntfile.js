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
        }
    });

    grunt.registerTask( 'default', [ 'jshint' ] );
}
