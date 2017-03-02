var path = require('path')
var cssnext = require('postcss-cssnext')

var entry = {}
var name = 'original'
entry[name] = path.resolve(__dirname, 'original', name + '.we?entry')

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'actual'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.we(\?[^?]+)?$/,
        loaders: [path.resolve(__dirname, '..', 'index.js')]
      },
      {
        test: /\.js/,
        loaders: ['babel?presets[]=es2015']
      }
    ]
  },
  devtool: 'inline-source-map',
  resolveLoader: {
    modulesDirectories: ['./node_modules']
  },
  postcss: function() {
    return [cssnext({
      browsers: ['last 1 version']
    })]
  },
  weex: {
    keepOriginal: true,
    lang: {
      cssnext: ['postcss'],
      jade: ['jade-html'],
      coffee: ['coffee']
    }
  }
}
