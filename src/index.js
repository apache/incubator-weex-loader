import loaderUtils from 'loader-utils'

import {
  parseScript,
  parseStyle,
  parseTemplate,
  parseWeex
} from './parser'
import { getFilenameByPath } from './util'
import * as config from './config'
import * as legacy from './legacy'
import { ScriptMap } from './map'

function partedLoader (type, loader, params, source, map) {
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
      map.enable()
      promise = parseWeex(loader, params, source, map)
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
  const { resourcePath } = params
  const filename = getFilenameByPath(resourcePath)
  const map = new ScriptMap(filename, source)

  const promise = partedLoader(type, this, params, source, map)

  promise.then(result => {
    if (map.enabled) {
      map.parse()
    }
    if (type === 'style' || type === 'css' ||
      type === 'html' || type === 'tpl' || type === 'template') {
      result = 'module.exports=' + result
    }
    callback(null, result, map.toJSON())
  }).catch(err => {
    // console.error(err.stack)
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
