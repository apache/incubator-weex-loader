var path = require('path')
var cssnext = require('postcss-cssnext')

var entry = {}
var start = 'a'
var end = 'l'
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
  postcss: function() {
    return [cssnext({
      browsers: ['last 1 version']
    })]
  },
  weex: {
    lang: {
      cssnext: ['postcss'],
      jade: ['jade-html']
    }
  }
}
