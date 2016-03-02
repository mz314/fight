module.exports = function (grunt) {
    require('jit-grunt')(grunt);
    grunt.initConfig({
        less: {
            development: {
                files: {
                    "css/compiled/style.css": "less/*.less",
                    
                }
            }
        }
    });
};