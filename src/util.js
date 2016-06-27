import fs from 'fs'
import path from 'path'

import * as config from './config'

export const MODULE_EXPORTS_REG = /module\.exports/g
export const REQUIRE_REG = /require\((["'])(@weex\-module\/[^\)\1]+)\1\)/g

export function getNameByPath (filepath) {
  return path.basename(filepath).replace(/\..*$/, '')
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
    return FUNC_START + value.toString() + '#####FUN_E#####'
  }
  return value
}

export function appendToWarn (loader, logs) {
  if (config.logLevel && logs && logs.length) {
    logs.forEach(log => {
      loader.emitWarning(log.reason + '\t@' + log.line + ':' + log.column)
    })
  }
}

export function checkFileExist (name, resourcePath) {
  const context = path.dirname(resourcePath)
  const filename = './' + name + '.we'
  const filepath = path.resolve(context, filename)
  return fs.existsSync(filepath) ? filename : null
}

export function depHasRequired (content, dep) {
  return !content.match(new RegExp('require\\(["\']./' + path.basename(dep) + '(.we)?["\']\\)', 'g'))
}
