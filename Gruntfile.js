module.exports = function(grunt) {

  // Load (dev dependency) modules from package.json that match 'grunt-*'
  require('matchdep').filterDev('grunt-*').filter(function(module) { return module != 'grunt-cli'; }).forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks("gruntify-eslint");

  return grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['./dist'],

    connect: {
      server: {
        options: {
          port: 7001
        }
      }
    },

    eslint: {
      src: ['./**/*.js', '!./Gruntfile.js', '!./node_modules/**', '!./dist/**']
    },

    'webpack-dev-server': {
      default_options: {
        port: 6001,
        contentBase: {
          target: 'http://localhost:7001'
        },
        debug: true,
        keepalive:true,
        hot:false,

        webpack: require("./webpack.config.js")("dev")
      }
    },

    webpack: {
      frontend: require("./webpack.config.js")("dev")
    }
  });
};
