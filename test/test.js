var fs = require('fs');
var path =require('path');

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var webpack = require('webpack')
var SourceMapConsumer = require('source-map').SourceMapConsumer

require('./lib/jsfm');
var createInstance = global.createInstance;
var getRoot = global.getRoot;

describe('loader', () => {

  before(function() {
    global.callNative = sinon.spy();
  });

  after(function() {
    global.callNative = undefined;
  });

  it('simple case', function() {
    var name = 'a.js';

    var actualCodePath = path.resolve(__dirname, 'actual', name);
    var actualCodeContent = fs.readFileSync(actualCodePath, { encoding: 'utf8' });

    var expectCodePath = path.resolve(__dirname, 'expect', name);
    var expectCodeContent = fs.readFileSync(expectCodePath, { encoding: 'utf8' });


    var actualResult = createInstance('actual/' + name, actualCodeContent);
    var actualJson = getRoot('actual/' + name);

    var expectResult = createInstance('expect/' + name, expectCodeContent);
    var expectJson = getRoot('expect/' + name);

    expect(actualJson).eql(expectJson);
  });

  it('element tag, 3rd-party js, implicit component', function() {
    var name = 'b.js';

    var actualCodePath = path.resolve(__dirname, 'actual', name);
    var actualCodeContent = fs.readFileSync(actualCodePath, { encoding: 'utf8' });

    var expectCodePath = path.resolve(__dirname, 'expect', name);
    var expectCodeContent = fs.readFileSync(expectCodePath, { encoding: 'utf8' });


    var actualResult = createInstance('actual/' + name, actualCodeContent);
    var actualJson = getRoot('actual/' + name);

    var expectResult = createInstance('expect/' + name, expectCodeContent);
    var expectJson = getRoot('expect/' + name);

    expect(actualJson).eql(expectJson);
  });

  it('with config & data case', function() {
    var name = 'z.js';

    var actualCodePath = path.resolve(__dirname, 'actual', name);
    var actualCodeContent = fs.readFileSync(actualCodePath, { encoding: 'utf8' });

    var expectCodePath = path.resolve(__dirname, 'expect', name);
    var expectCodeContent = fs.readFileSync(expectCodePath, { encoding: 'utf8' });


    var actualResult = createInstance('actual/' + name, actualCodeContent);
    var actualJson = getRoot('actual/' + name);

    var expectResult = createInstance('expect/' + name, expectCodeContent);
    var expectJson = getRoot('expect/' + name);

    expect(actualJson).eql(expectJson);
  });

  it('support source map', function() {
    var name = 'sourcemap'

    var mapPath = path.resolve(__dirname, 'actual', name + '.js.map');
    var map = fs.readFileSync(mapPath, { encoding: 'utf8' });
    var smc = new SourceMapConsumer(JSON.parse(map))

    var oriPath = path.resolve(__dirname, 'expect', name + '.we');
    var ori = fs.readFileSync(oriPath, { encoding: 'utf8' });

    var genPath = path.resolve(__dirname, 'actual', name + '.js');
    var gen = fs.readFileSync(genPath, { encoding: 'utf8' });

    function matchPos(code, regexp) {
      var line, col
      code.split(/\r?\n/g).some(function (l, i) {
        if (regexp.test(l)) {
          line = i + 1
          col = l.length
          return true
        }
      })
      return { line: line, col: col }
    }

    function checkPos(regexp) {
      var genPos = matchPos(gen, regexp)
      var oriPos = matchPos(ori, regexp)

      var pos = smc.originalPositionFor({
        line: genPos.line,
        column: genPos.col
      })

      expect(pos.source.indexOf('sourcemap.we') > -1)
      expect(pos.line).to.equal(oriPos.line)
    }

    checkPos(/console\.log\(1\)/)
    checkPos(/console\.log\(2\)/)
    checkPos(/console\.log\(4\)/)
    checkPos(/console\.log\(5\)/)
    checkPos(/console\.log\(6\)/)
    checkPos(/console\.log\(7\)/)
    checkPos(/console\.log\(8\)/)
    checkPos(/console\.log\(9\)/)
    checkPos(/console\.log\(0\)/)
  })
})
