var timer = require('grunt-timer');

module.exports = function(grunt) {
  timer.init(grunt);

  // Load (dev dependency) modules from package.json that match 'grunt-*'
  require('matchdep').filterDev('grunt-*').filter(function(module) { return module != 'grunt-cli'; }).forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks("gruntify-eslint");

  grunt.registerTask('lint-check', ['jshint', 'regex-check']);

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

    jshint: {
      options: {
        browser: true,
        node: true,
        esnext: true,
        curly: true,
        indent: 2,
        unused: true
      },
      all: {
        src: ['./**/*.js', '!Gruntfile.js', '!./node_modules/**', '!./dist/**']
      }
    },

    'regex-check': {
      'should use propTypes when using props': {
        src: ['./src/**/*.react.js'],
        options: {
          pattern: /createClass(?![\s\S]*propTypes)[\s\S]*this\.props\.(?!children)/
        }
      },
      'should use className attribute instead of class': {
        src: ['./src/**/*.react.js'],
        options: {
          pattern: /<[\w\d]*\b[^>]*class\s*=[^>]*>/m
        }
      },
      'should use an object for the style attribute not a string': {
        src: ['./src/**/*.react.js'],
        options: {
          pattern: /<[\w\d]*\b[^>]*style\s*=\s*['"][^>]*>/mi
        }
      },
      'should use an object or a string for attribute values but not both': {
        src: ['./src/**/*.react.js'],
        options: {
          pattern: /<[\w\d]*\b[^>]*=\s*['"][^'">]*{[^>'"]*}[^'">]*['"][^>]*>/mi
        }
      }
    },

    webpack: {
      frontend: require("./webpack.config.js")("dev")
    }
  });
};
