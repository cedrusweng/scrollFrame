module.exports = function( grunt ) {
	"use strict";

	grunt.initConfig({
		less:{
			'css/a.css': 'less/*.less'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
};
