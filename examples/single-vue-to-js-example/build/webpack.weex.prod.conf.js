var webpack = require('webpack');
var baseWebpackConfig = require('../webpack.config.js');
var  merge = require('webpack-merge');

var webacpkConfig = require('../config');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(webacpkConfig.weexBuild.env.NODE_ENV)
}
var env = process.env.NODE_ENV;

if (env === 'production'){
  baseWebpackConfig.output.filename = '[name].js';
}

module.exports = merge(baseWebpackConfig,{
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin({
     raw: true ,
     banner: '// { "framework": "Vue" }\n'
    })
  ]
});
