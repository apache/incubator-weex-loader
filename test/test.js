'use strict';

const fs = require('fs');
const path =require('path');

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);


function getActualString(name) {
  const filepath = path.resolve(__dirname, 'actual', `${name}.js`);
  const result = fs.readFileSync(filepath, 'utf-8');
  return result.toString();
} 

function getExpectJSON(name) {
  const filepath = path.resolve(__dirname, 'expect', `${name}.js`);
  const result = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(result.toString());
}

function stringifyActual(json) {
  return JSON.stringify(json, function(key, value) {
    if (typeof value === 'function') {
      value = value.toString();
    }
    return value;
  }, '  ');
}

describe('build', () => {
  let __weex_define__;
  let __weex_bootstrap__;
  let components;
  let requireStub;
  let bootstrapStub;

  function expectActual(name) {
    const actualStr = getActualString(name);
    const fn = new Function('__weex_define__', '__weex_bootstrap__', actualStr);
    fn(__weex_define__, __weex_bootstrap__);

    // const filepath = path.resolve(__dirname, 'expect', `${name}.js`);
    // fs.writeFileSync(filepath, stringifyActual(components), 'utf-8');

    const expectJSON = getExpectJSON(name);
    expect(JSON.parse(stringifyActual(components))).eql(expectJSON);
    expect(components).to.include.keys(__weex_bootstrap__.firstCall.args[0]);
  }

  beforeEach(() => {
    components = {};
    requireStub = sinon.stub();
    bootstrapStub = sinon.stub();

    __weex_define__ = function(componentName, deps, factory) {
      var __weex_require__ = requireStub;
      var __weex_exports__ = {};
      var __weex_module__ = {exports : __weex_exports__}

      factory(__weex_require__, __weex_exports__, __weex_module__)
      components[componentName] = __weex_module__.exports
    }

    __weex_bootstrap__ = bootstrapStub;

  });

  it('single template', () => {
    expectActual('a');
  });

  it('template with style', () => {
    expectActual('b');
  });

  it('template with style and script', () => {
    expectActual('c');
  });

  it('template with single inline element', () => {
    expectActual('d');
  });

  it('template with multiple inline elements', () => {
    expectActual('e');
  });

  it('parted files specifed in src', () => {
    expectActual('f');
  });

  it('component by requiring src and specifing alias', () => {
    expectActual('g');
    expect(requireStub.callCount).eql(0);
  });

  it('component under same folder', () => {
    expectActual('h');
  });

  it('template with config and data', () => {
    expectActual('i');
    expect(bootstrapStub.firstCall.args[1]).is.not.undefined;
    expect(bootstrapStub.firstCall.args[2]).is.not.undefined;
  });

  it('template and use weex module', () => {
    expectActual('j');
    expect(requireStub.callCount).eql(1);
    expect(requireStub.firstCall.args).eql(['@weex-module/modal']);
  });

  it('template by using custom language', () => {
    expectActual('k');
    expect(requireStub.callCount).eql(1);
    expect(requireStub.firstCall.args).eql(['@weex-module/modal']);
  });

  it('template and require commonjs module', () => {
    expectActual('l');
    expect(requireStub.callCount).eql(1);
    expect(requireStub.firstCall.args).eql(['@weex-module/modal']);
  });

  it('template and use weex module in commonjs module', () => {
    expectActual('m');
    expect(requireStub.callCount).eql(1);
    expect(requireStub.firstCall.args).eql(['@weex-module/modal']);
  });
})
