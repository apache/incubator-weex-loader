import loaderUtils from 'loader-utils'
import path from 'path'
import fs from 'fs'
import md5 from 'md5'

import * as config from './config'
import * as legacy from './legacy'

import {
  parseFragment
} from './parser'
import {
  getNameByPath,
  getRequireString,
  stringifyLoaders
} from './util'

const loaderPath = __dirname
const defaultLoaders = {
  none: '',
  main: path.resolve(loaderPath, 'loader.js'),
  extract: path.resolve(loaderPath, 'extract.js'),
  template: path.resolve(loaderPath, 'template.js'),
  style: path.resolve(loaderPath, 'style.js'),
  script: path.resolve(loaderPath, 'script.js'),
  json: path.resolve(loaderPath, 'json.js'),
  babel: 'babel-loader'
}

function getLoaderString (type, config) {
  config = config || {}
  let customLoader
  let loaders

  if (config.lang && config.customLang[config.lang]) {
    customLoader = config.customLang[config.lang]
  }

  if (type === 'main') {
    loaders = [{
      name: defaultLoaders.main
    }]
    return stringifyLoaders(loaders)
  }

  if (type === 'element') {
    loaders = [{
      name: defaultLoaders.main,
      query: {
        element: config.source ? undefined : true
      }
    }]
    if (!config.source) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          index: config.name,
          type: 'elements'
        }
      })
    }
    return stringifyLoaders(loaders)
  }

  if (type === 'template') {
    loaders = [{
      name: defaultLoaders.json
    }, {
      name: defaultLoaders.template
    }]
    if (customLoader) {
      loaders = loaders.concat(customLoader)
    }
    if (!config.source) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          type: 'template'
        }
      })
    }
    if (config.element) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          index: config.elementName,
          type: 'elements'
        }
      })
    }
    return stringifyLoaders(loaders)
  }

  if (type === 'style') {
    loaders = [{
      name: defaultLoaders.json
    }, {
      name: defaultLoaders.style
    }]
    if (customLoader) {
      loaders = loaders.concat(customLoader)
    }
    if (!config.source) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          index: 0,
          type: 'styles'
        }
      })
    }
    if (config.element) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          index: config.elementName,
          type: 'elements'
        }
      })
    }
    return stringifyLoaders(loaders)
  }

  if (type === 'script') {
    loaders = [{
      name: defaultLoaders.script
    }]
    if (customLoader) {
      loaders = loaders.concat(customLoader)
    }
    else {
      loaders.push({
        name: defaultLoaders.babel,
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime'],
          comments: 'false'
        }
      })
    }
    if (!config.source) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          index: 0,
          type: 'scripts'
        }
      })
    }
    if (config.element) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          index: config.elementName,
          type: 'elements'
        }
      })
    }
    return stringifyLoaders(loaders)
  }

  if (type === 'config') {
    loaders = [{
      name: defaultLoaders.json
    }]
    if (!config.source) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          type: 'config'
        }
      })
    }
    return stringifyLoaders(loaders)
  }

  if (type === 'data') {
    loaders = [{
      name: defaultLoaders.json
    }]
    if (!config.source) {
      loaders.push({
        name: defaultLoaders.extract,
        query: {
          type: 'data'
        }
      })
    }
    return stringifyLoaders(loaders)
  }
}

function loader (source) {
  this.cacheable && this.cacheable()

  const options = this.options.weex || {}
  const customLang = options.lang || {}

  const loaderQuery = loaderUtils.parseQuery(this.query)
  const resourceQuery = loaderUtils.parseQuery(this.resourceQuery)
  const resourcePath = this.resourcePath
  const isElement = loaderQuery.element
  const isEntry = resourceQuery.entry
  const filename = path.relative('.', resourcePath)
  const name = isEntry ? md5(filename) :
                          (resourceQuery.name ||
                            getNameByPath(resourcePath))

  let output = ''

  const frag = parseFragment(source)

  const elementNames = []
  if (frag.element.length) {
    for (let i = 0; i < frag.element.length; i++) {
      const element = frag.element[i]
      if (!element.name) {
        this.emitError('Element block need a name attribute')
        return ''
      }
      elementNames.push(element.name)

      let src = resourcePath
      if (element.src) {
        src = element.src
      }

      output += getRequireString(
                  this,
                  getLoaderString('element', {
                    customLang,
                    name: element.name,
                    source: element.src
                  }),
                  `${src}?name=${element.name}`
                )
    }
  }

  if (frag.deps.length) {
    for (const dep of frag.deps) {
      const filepath = path.resolve(path.dirname(resourcePath), `${dep}.we`)
      if (elementNames.indexOf(dep) < 0
            && fs.existsSync(filepath)) {
        output += getRequireString(
                    this,
                    getLoaderString('none'),
                    `./${dep}.we`
                  )
      }
    }
  }

  if (!frag.template.length) {
    this.emitError('Template block is required')
    return ''
  }
  else {
    const template = frag.template[0]
    let src = resourcePath
    if (template.src) {
      src = template.src
    }
    output += 'var __weex_template__ = ' +
                getRequireString(
                  this,
                  getLoaderString('template', {
                    customLang,
                    lang: template.lang,
                    element: isElement,
                    elementName: isElement ? name : undefined,
                    source: template.src
                  }),
                  src
                )
  }

  if (frag.style.length) {
    const style = frag.style[0]
    let src = resourcePath
    if (style.src) {
      src = style.src
    }
    output += 'var __weex_style__ = ' +
                getRequireString(
                  this,
                  getLoaderString('style', {
                    customLang,
                    lang: style.lang,
                    element: isElement,
                    elementName: isElement ? name : undefined,
                    source: style.src
                  }),
                  src
                )
  }

  if (frag.script.length) {
    const script = frag.script[0]
    let src = resourcePath
    if (script.src) {
      src = script.src
    }
    output += 'var __weex_script__ = ' +
                getRequireString(
                  this,
                  getLoaderString('script', {
                    customLang,
                    lang: script.lang,
                    element: isElement,
                    elementName: isElement ? name : undefined,
                    source: script.src
                  }),
                  src
                )
  }

  if (isEntry && frag.data.length) {
    const data = frag.data[0]
    let src = resourcePath
    if (data.src) {
      src = data.src
    }
    output += 'var __weex_data__ = ' +
                getRequireString(
                  this,
                  getLoaderString('data', {
                    source: data.src
                  }),
                  src
                )
  }

  if (isEntry && frag.config.length) {
    const config = frag.config[0]
    let src = resourcePath
    if (config.src) {
      src = config.src
    }
    output += 'var __weex_config__ = ' +
                getRequireString(
                  this,
                  getLoaderString('config', {
                    source: config.src
                  }),
                  src
                )
  }

  output += `
__weex_define__('@weex-component/${name}', [], function(__weex_require__, __weex_exports__, __weex_module__) {
` + (
  frag.script.length > 0 ? `
    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
    if (__weex_exports__.__esModule && __weex_exports__.default) {
      __weex_module__.exports = __weex_exports__.default
    }
` : ''
) +
`
    __weex_module__.exports.template = __weex_template__
` + (
  frag.style.length > 0 ? `
    __weex_module__.exports.style = __weex_style__
` : ''
) + `
})
`
  if (isEntry) {
    output += `
__weex_bootstrap__('@weex-component/${name}'`
  + (frag.config.length > 0 ? `,__weex_config__` : ',undefined')
  + (frag.data.length > 0 ? `,__weex_data__` : ',undefined')
+ `)`
  }

  return output
}

loader.setLogLevel = level => {
  config.logLevel = level
}

for (const key in legacy) {
  loader[key] = legacy[key]
}

module.exports = loader
