var webpack = require('webpack');
var chalk = require('chalk');
var webpackConfig = require('./webpack.weex.prod.conf');

webpack(webpackConfig,function (err, stats) {
    if (err) {
        throw err
    }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: weex bundle.js \n'
    ))
});
