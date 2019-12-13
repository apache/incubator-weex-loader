var webpack = require('webpack');
var path = require('path');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var config = {

  entry: {
      'e2e-landing': './App.vue?entry=true'
  },
  output: {
    path: path.resolve(__dirname, './')
  },
  module: {
    rules: [
      {
        test: /\.vue(\?[^?]+)?$/,
        loaders: ['weex-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;
