# Weex Loader

A webpack loader for Weex.

## Install

```
npm install weex-loader babel-loader babel-preset-es2015 babel-runtime babel-plugin-transform-runtime --save
```

## Feature

0. Can load `.we` file.
1. Can load parted files(`.js/.css/.html`) via a `src` attribute.
2. Can specify a custom language to chain any loader.
3. Can specify name when require `.we` file.
4. Can write es2015 in script.

## Usage

### How to load a `.we` file.

**make a webpack config**
```javascript
var path = require('path');
var webpack = require('webpack');
var loader = require('weex-loader');

module.exports = {
  entry: './test/main.we?entry=true',
  output: {
    path: './test/actual',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.we(\?[^?]+)?$/,
        loader: 'weex'
      }
    ]
  }
};
```

### How to write parted files

#### write .js/.css/.html anywhere

**main.js as script**
```javascript
module.exports = {
    data: function () {
      return {
        text: 'Hello World'
      }
    }
}
```

**main.css as style**
```css
.h1 {
    font-size: 60px;
    color: red;
}
```

**main.html as template**
```html
<div>
    <text class="h1">{{text}}</text>
</div>
```

**main.we**
```html
<template src="./main.html"></template>
<style src="./main.css"></style>
<script src="./main.js"></script>
```

#### add some custom language for loaders

**append a weex config in webpack config**
```javascript
  weex: {
    lang: {
      jade: ['jade-html'] // a jade langauge will chain "jade-html-loader"
    }
  }
```

**main.we**
```
<template lang="jade">
div
  text Hello Weex
</template>
```

### How to require `.we` file as component element

0. first, require a `path/to/component.we` in `script` like `require('./foo.we')` or write inline element like `<element name="foo" src="./foo.we"></element>`.
1. second, use it in `template` like `<foo></foo>`.

```
<element name="foo" src="./foo.we"></element>

<template>
  <div>
    <foo></foo>
    <bar></bar>
  </div>
</template>

<script>
  require('./bar.we')
</script>
```

### How to specify the name of a component

0. By default, the name is the basename without extname of component path.
1. Give a name query in require request, like `require('./foo.we?name="fooo"')`. Or specify a name attribute in element, like `<element name="fooo" src="./foo.we" ></element>`
2. use the name in `template` like `<fooo></fooo>`.

```
<element name="fooo" src="./foo.we"></element>

<template>
  <div>
    <fooo></fooo>
    <barr></barr>
  </div>
</template>

<script>
  require('./bar.we?name=barr')
</script>
```

## Test

```bash
npm run test
```
will run mocha testing.

And you can check the specs in `test/spec` folder.


