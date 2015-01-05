'use strict';

var webpack = require('webpack');
var _ = require('lodash');
var version = require('./package.json').version;

module.exports = function(profile) {
  var config = {
    context: __dirname,
    entry: {
      'frontend': './src/index.react.js'
    },
    output: {
      path: './dist',
      filename: '[name].js',
      chunkFilename: '[name].js',
      library: 'frontend__' + version,
      libraryTarget: 'umd'
    },

    debug: true,
    devtool: '#inline-source-map',

    stats: {
      colors: true,
      reasons: false
    },

    resolve: {
      modulesDirectories: ['.', 'node_modules'],
      extensions: ['', '.webpack.js', '.web.js', '.js']
    },

    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.AggressiveMergingPlugin()
    ],

    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'jsx-loader?harmony'
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.gif/,
        loader: 'urllimit=10000&minetype=image/gif'
      }, {
        test: /\.jpg/,
        loader: 'url?limit=10000&minetype=image/jpg'
      }, {
        test: /\.png/,
        loader: 'url?limit=10000&minetype=image/png'
      }, {
        test: /\.woff$/,
        loader: 'url?limit=10000&minetype=application/font-woff'
      }, {
        test: /\.ttf$/,
        loader: 'file'
      }, {
        test: /\.eot$/,
        loader: 'file'
      }, {
        test: /\.svg$/,
        loader: 'file'
      }]
    }
  };

  if (profile === 'dev') {

    config.entry = _.mapValues(config.entry, function(it) {
      return [
        'webpack-dev-server/client?http://localhost:6001'
      ].concat(it);
    });

    config.module.loaders = _.map(config.module.loaders, function(it) {
      if (it.devLoader) {
        it = _.clone(it);
        it.loader = it.devLoader;
      }
      return it;
    });
    // es6-loader seems to break webpack-dev-server due to some strict mode violations
    config.module.loaders = _.reject(config.module.loaders, function(value) {
      return (value.loader === 'es6-loader');
    });

  }
  if (profile === 'min') {
    config.output = {
      path: './dist',
      filename: '[name].min.js',
      chunkFilename: '[name].min.js',
      library: 'churro__' + version,
      libraryTarget: 'umd'
    };
    config.devtool = 'source-map';
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  return config;
};
