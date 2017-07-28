import path from 'path'
import loaderUtils from 'loader-utils'
import hash from 'hash-sum'
import {
  SourceMapGenerator,
  SourceMapConsumer
} from 'source-map'

import * as config from './config'

export function getNameByPath (resourcePath) {
  return path.basename(resourcePath).replace(/\..*$/, '')
}

export function getFileNameWithHash (resourcePath, content) {
  const filename = path.relative('.', resourcePath)
  const cacheKey = hash(filename + content)
  return `./${filename}?${cacheKey}`
}

export function getFilenameByPath (filepath) {
  return path.relative('.', filepath)
}

export const FUNC_START = '#####FUN_S#####'
export const FUNC_START_REG = new RegExp('["\']' + FUNC_START, 'g')
export const FUNC_END = '#####FUN_E#####'
export const FUNC_END_REG = new RegExp(FUNC_END + '["\']', 'g')

export function stringifyFunction (key, value) {
  if (typeof value === 'function') {
    return FUNC_START + value.toString() + FUNC_END
  }
  return value
}

export function logWarn (loader, logs) {
  if (config.logLevel && logs && logs.length) {
    logs.forEach(log => {
      loader.emitWarning(log.reason + '\t@' + log.line + ':' + log.column)
    })
  }
}

export function getRequireString (loaderContext, loader, filepath) {
  return 'require(' +
                loaderUtils.stringifyRequest(
                  loaderContext,
                  loader ?
                    `!!${loader}!${filepath}` :
                    `${filepath}`
                ) +
           ')\n'
}

export function stringifyLoaders (loaders) {
  return loaders.map(loader => {
    if (typeof loader === 'string') {
      return loader
    }
    else {
      const name = loader.name
      const query = []
      if (loader.query) {
        for (const k in loader.query) {
          const v = loader.query[k]
          if (v != null) {
            if (v === true) {
              query.push(k)
            }
            else {
              if (v instanceof Array) {
                query.push(`${k}[]=${v.join(',')}`)
              }
              query.push(`${k}=${v}`)
            }
          }
        }
      }
      return `${name}${query.length ? ('?' + query.join('&')) : ''}`
    }
  }).join('!')
}

export function generateMap (loader, source, iterator) {
  const filePath = loader.resourcePath

  const fileNameWithHash = getFileNameWithHash(filePath)
  const sourceRoot = path.resolve('.')

  const map = new SourceMapGenerator({
    sourceRoot,
    skipValidation: true
  })
  map.setSourceContent(fileNameWithHash, source)

  for (const { original, generated } of iterator) {
    map.addMapping({
      source: fileNameWithHash,
      original,
      generated
    })
  }

  return map
}

export function consumeMap (loader, target, map) {
  const smc = new SourceMapConsumer(map)
  let source
  const original = []
  const generated = []
  const mapping = {}

  splitSourceLine(target)
    .forEach((input, line) => {
      const column = 0
      line = line + 1

      const pos = smc.originalPositionFor({
        line,
        column
      })

      if (pos.source) {
        source = pos.source
        original.push({
          line: pos.line,
          column: pos.column
        })
        generated.push({
          line,
          column
        })
        mapping[`line-${line}-column-${column}`] = {
          line: pos.line,
          column: pos.column
        }
      }
    })

  return {
    source,
    original,
    generated,
    mapping,
    sourcesContent: smc.sourcesContent
  }
}

const LINE_REG = /\r?\n/g
export function splitSourceLine (source) {
  return source.split(LINE_REG)
}

export function printSourceWithLine (source) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  source = splitSourceLine(source)
    .map((input, line) => {
      console.log(line + 1 + ':', input)
    })
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
}
