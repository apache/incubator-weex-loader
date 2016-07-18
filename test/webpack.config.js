var path = require('path')

module.exports = {
  entry: {
    sourcemap: path.resolve(__dirname, 'expect/sourcemap.we?entry=true'),
    samename: path.resolve(__dirname, 'expect/samename.we?entry=true'),
    exports: path.resolve(__dirname, 'expect/exports.we?entry=true'),
    a: path.resolve(__dirname, 'a.js?entry=true'),
    b: path.resolve(__dirname, 'expect/b.we?entry=true'),
    z: path.resolve(__dirname, 'expect/z.we?entry=true')
  },
  output: {
    path: path.resolve(__dirname, 'actual'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.we(\?[^?]+)?$/,
        loaders: ['index.js']
      },
      {
        test: /\.js(\?[^?]+)?$/,
        exclude: [
          path.resolve(__dirname, 'lib')
        ],
        loaders: ['index.js?type=script', 'babel?presets[]=es2015']
      },
      {
        test: /\.css(\?[^?]+)?$/,
        loaders: ['index.js?type=style']
      },
      {
        test: /\.less(\?[^?]+)?$/,
        loaders: ['index.js?type=style', 'less']
      },
      {
        test: /\.tpl(\?[^?]+)?$/,
        loaders: ['index.js?type=tpl']
      }
    ]
  },
  resolveLoader: {
    modulesDirectories: ['./', './node_modules']
  }
}
