import blocker from 'weex-transformer/lib/blocker'
import templater from 'weex-templater'
import styler from 'weex-styler'
import scripter from 'weex-scripter'

import md5 from 'md5'

import { transformerVersion } from './config'
import {
  MODULE_EXPORTS_REG,
  REQUIRE_REG,
  FUNC_START_REG,
  FUNC_END_REG,
  getNameByPath,
  checkFileExist,
  depHasRequired,
  stringifyFunction,
  appendToWarn
} from './util'

export function parseWeexFile (loader, params, source, deps, elementName) {
  return new Promise(
    // separate source into <element>s, <template>, <style>s and <script>s
    separateBlocks(source, deps || []))
    // pre-parse non-javascript parts
    .then(preParseBlocks(loader, params, elementName))
    // join blocks together and parse as javascript finally
    .then(parseBlocks(loader, params, elementName))
}

function separateBlocks (source, deps) {
  return (resolve, reject) => {
    blocker.format(source, (err, ret) => {
      if (err) {
        reject(err)
      }
      else {
        ret.deps = deps
        resolve(ret)
      }
    })
  }
}

function preParseBlocks (loader, params) {
  return (blocks) => {
    const { deps, elements, template, styles, scripts, config, data } = blocks
    const promises = [
      Promise.resolve(),
      Promise.resolve(),
      Promise.resolve(),
      Promise.resolve(scripts),
      Promise.resolve(deps),
      Promise.resolve(config),
      Promise.resolve(data)
    ]
    let content
    // pre-parse sub elements
    if (elements) {
      const elPromises = []
      Object.keys(elements).forEach(key => {
        const el = elements[key]
        elPromises.push(parseWeexFile(loader, params, el.content, deps, el.name))
      })
      promises[0] = Promise.all(elPromises)
    }
    // pre-parse template
    if (template) {
      content = template.content
      promises[1] = parseTemplate(loader, params, content, deps)
    }
    // pre-parse styles
    if (styles) {
      content = styles.reduce((pre, cur) => {
        return pre + '\n' + cur.content
      }, '')
      promises[2] = parseStyle(loader, params, content)
    }
    return Promise.all(promises)
  }
}

function parseBlocks (loader, params, elementName) {
  return (results) => {
    const elements = results[0] || []
    const template = results[1]
    const style = results[2]
    const scripts = results[3]
    const deps = results[4] || []
    const configResult = results[5]
    const dataResult = results[6]

    let content = ''
    let config = {}
    let data

    if (scripts) {
      content += scripts.reduce((pre, cur) => {
        return pre + '\n;' + cur.content
      }, '')
    }

    let requireContent = ''
    if (deps.length) {
      requireContent += deps.map(dep =>
        depHasRequired(content, dep) ? 'require("' + dep + '");' : ''
      ).join('\n')
      content = requireContent + '\n' + content
    }

    if (template) {
      content += '\n;module.exports.template = module.exports.template || {}' +
        '\n;Object.assign(module.exports.template, ' + template + ')'
    }

    if (style) {
      content += '\n;module.exports.style = module.exports.style || {}' +
        '\n;Object.assign(module.exports.style, ' + style + ')'
    }

    if (configResult) {
      config = new Function('return ' + configResult.content.replace(/\n/g, ''))()
    }
    config.transformerVersion = transformerVersion
    config = JSON.stringify(config, null, 2)

    if (dataResult) {
      data = new Function('return ' + dataResult.content.replace(/\n/g, ''))()
      data = JSON.stringify(data, null, 2)
    }

    return parseScript(loader, params, content, { config, data, elementName, elements })
  }
}

export function parseTemplate (loader, params, source, deps) {
  return new Promise((resolve, reject) => {
    templater.parse(source, (err, obj) => {
      if (err) {
        reject(err)
      }
      else {
        appendToWarn(loader, obj.log)
        // push valid obj.deps to deps
        if (deps && obj.deps) {
          obj.deps.map(
            dep => checkFileExist(dep, params.resourcePath)
          ).forEach(dep => {
            if (dep) {
              deps.push(dep)
            }
          })
        }
        // parse json to string and treat function specially
        let target = JSON.stringify(obj.jsonTemplate, stringifyFunction, '  ')
        target = target.replace(FUNC_START_REG, '').replace(FUNC_END_REG, '')
        resolve(target)
      }
    })
  })
}

export function parseStyle (loader, params, source) {
  return new Promise((resolve, reject) => {
    styler.parse(source, (err, obj) => {
      if (err) {
        reject(err)
      }
      else {
        appendToWarn(loader, obj.log)
        resolve(JSON.stringify(obj.jsonStyle, null, 2))
      }
    })
  })
}

export function parseScript (loader, params, source, env) {
  const { config, data, elementName, elements } = env

  // the entry component has a special resource query and not a sub element tag
  const isEntry = params.resourceQuery.entry === true && !elementName

  // resolve component name
  const name = isEntry
    ? md5(source)
    : (elementName || params.resourceQuery.name || getNameByPath(params.resourcePath))

  // fix data option from an object to a function
  let target = scripter.fix(source)

  // wrap with __weex_define__(name, [], (r, e, m) {...})
  target = target
      .replace(MODULE_EXPORTS_REG, '__weex_module__.exports')
      .replace(REQUIRE_REG, '__weex_require__($1$2$1)')
  target = ';__weex_define__("@weex-component/' + name + '", [], ' +
      'function(__weex_require__, __weex_exports__, __weex_module__)' +
      '{\n' + target + '\n})'

  // append __weex_bootstrap__ for entry component
  if (isEntry) {
    target += '\n;__weex_bootstrap__("@weex-component/' + name + '", ' +
        String(config) + ',' +
        String(data) + ')'
  }

  // join with elements deps
  target = (elements || []).concat(target).join(';\n\n')

  return Promise.resolve(target)
}

