var path = require('path')
var cssnext = require('postcss-cssnext')

var entry = {}
var start = 'a'
var end = 'o'
var count = end.charCodeAt(0) - start.charCodeAt(0)

new Array(count + 1).fill(0)
  .forEach((n, i) => {
    var name = String.fromCharCode(i + start.charCodeAt(0))
    entry[name] = path.resolve(__dirname, 'spec', name + '.we?entry')
  })

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
    lang: {
      cssnext: ['postcss'],
      jade: ['jade-html'],
      coffee: ['coffee']
    }
  }
}
