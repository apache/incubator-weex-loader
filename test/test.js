const fs = require('fs');
const MemoryFS = require("memory-fs");
const path =require('path');

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');


describe('loader', () => {
  it('simple', (done) => {
    const config = Object.assign({}, webpackConfig, {
      entry: {
        a: path.resolve(__dirname, 'spec', 'a.we')
      }
    });

    const compiler = webpack(config);
    const mfs = new MemoryFS;
    // compiler.outputFileSystem = mfs;
    compiler.run((err, stats) => {
      if (err) {
        return done(err);
      }

      console.log(stats.toString({
        chunks: false,
        color: true
      }))
      // const result = fs.readFileSync(path.resolve(__dirname, 'actual', 'a.we'))
      // console.log(result)
      done()
    })
  });
})
