var path = require('path')

module.exports = {
  entry: {
    a: path.resolve(__dirname, 'spec', 'a.we') + '?entry'
  },
  output: {
    path: path.resolve(__dirname, 'actual'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.we(\?[^?]+)?$/,
        loaders: ['lib/loader.js']
      }
    ]
  },
  resolveLoader: {
    modulesDirectories: ['./', './node_modules']
  },
  weex: {
    loaders: {
      es6: ['babel'],
      cssnext: ['postcss-cssnext'],
      jade: ['jade']
    }
  }
}
