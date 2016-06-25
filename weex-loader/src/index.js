import loaderUtils from 'loader-utils'

import {
  parseScript,
  parseStyle,
  parseTemplate,
  parseWeexFile
} from './parser'
import * as config from './config'
import * as legacy from './legacy'

function partedLoader (type, loader, params, source) {
  let promise
  switch (type) {
    case 'js':
    case 'script':
      const transformerVersion = config.transformerVersion
      promise = parseScript(loader, params, source,
        { config: JSON.stringify({ transformerVersion }) })
      break
    case 'css':
    case 'style':
      promise = parseStyle(loader, params, source)
      break
    case 'html':
    case 'tpl':
    case 'template':
      promise = parseTemplate(loader, params, source)
      break
    case 'we':
    default:
      promise = parseWeexFile(loader, params, source)
      break
  }
  return promise
}

function loader (source) {
  this.cacheable && this.cacheable()

  const callback = this.async()
  const params = {
    loaderQuery: loaderUtils.parseQuery(this.query),
    resourceQuery: loaderUtils.parseQuery(this.resourceQuery),
    resourcePath: this.resourcePath
  }
  const type = params.loaderQuery.type || 'we'
  const promise = partedLoader(type, this, params, source)

  promise.then(result => {
    if (type === 'style' || type === 'css' ||
      type === 'html' || type === 'tpl' || type === 'template') {
      result = 'module.exports=' + result
    }
    callback(null, result)
  }).catch(err => {
    this.emitError(err.toString())
    callback(err.toString(), '')
  })
}

loader.setLogLevel = level => {
  config.logLevel = level
}

for (const key in legacy) {
  loader[key] = legacy[key]
}

module.exports = loader
