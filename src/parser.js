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
  parseElementNameByPath,
  stringifyFunction,
  appendToWarn
} from './util'

export function parseWeex (loader, params, source, map, deps, elementName) {
  return new Promise(
    // separate source into <element>s, <template>, <style>s and <script>s
    separateBlocks(source, deps || []))
    // pre-parse non-javascript parts
    .then(preParseBlocks(loader, params, map))
    // join blocks together and parse as javascript finally
    .then(parseBlocks(loader, params, map, elementName))
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

function preParseBlocks (loader, params, map) {
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
        // record original positions of each <element>
        map.setElementPosition(el.name, el.line, el.column)
        elPromises.push(parseWeex(loader, params, el.content, map, deps, el.name))
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

function parseBlocks (loader, params, map, elementName) {
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

    const mapOffset = { basic: 0, subs: [] }

    if (scripts) {
      // record original and generated position of each <script>
      // the generated content is begin with empty string
      // so later the template, styles and elements will be appended/prepended
      // and mapOffset.basic will record lines of prepended *required* content
      content += scripts.reduce((prev, next, i) => {
        // length of previous content
        const line = prev.split(/\r?\n/g).length + 1
        const column = 1
        const oriLine = next.line
        const oriColumn = next.column
        mapOffset.subs.push({
          original: { line: oriLine, column: oriColumn },
          generated: { line, column },
          // length of next content
          length: next.content.split(/\r?\n/g).length
        })
        return prev + '\n;' + next.content
      }, '')
    }

    let requireContent = ''
    if (deps.length) {
      const entryElementName = parseElementNameByPath(params.resourcePath)
      requireContent += deps.filter(dep => {
        if (parseElementNameByPath(dep) === entryElementName) {
          console.warn(`[Warn]: "${dep}" cannot include <${entryElementName}> itself.`)
          return false
        }
        return true
      }).map(dep =>
        depHasRequired(content, dep) ? 'require("' + dep + '");' : ''
      ).join('\n')
      if (requireContent) {
        // length of implicitly requires
        mapOffset.basic = requireContent.split(/\r?\n/g).length
        content = requireContent + '\n' + content
      }
    }

    if (template) {
      // append template content, not impact sourcemap
      content += '\n;module.exports.template = module.exports.template || {}' +
        '\n;Object.assign(module.exports.template, ' + template + ')'
    }

    if (style) {
      // append style content, not impact sourcemap
      content += '\n;module.exports.style = module.exports.style || {}' +
        '\n;Object.assign(module.exports.style, ' + style + ')'
    }

    // prepare entry config
    if (configResult) {
      config = new Function('return ' + configResult.content.replace(/\n/g, ''))()
    }
    config.transformerVersion = transformerVersion
    config = JSON.stringify(config, null, 2)

    // prepare entry data
    if (dataResult) {
      data = new Function('return ' + dataResult.content.replace(/\n/g, ''))()
      data = JSON.stringify(data, null, 2)
    }

    return parseScript(loader, params, content, { config, data, elementName, elements, map, mapOffset })
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
  const { config, data, elementName, elements, map, mapOffset } = env

  // the entry component has a special resource query and not a sub element tag
  const isEntry = params.resourceQuery.entry === true && !elementName

  // resolve component name
  const name = isEntry
    ? md5(source)
    : (elementName || params.resourceQuery.name || getNameByPath(params.resourcePath))

  // join with elements deps
  // 2 more lines between each element and the end
  map && map.start()
  const prefix = (elements || []).reduce((prev, next, index) => {
    const prevLength = prev.split(/\r?\n/g).length
    const nextLength = next.split(/\r?\n/g).length
    // record generated positions of each <element>
    map && map.addElement(name, index, prevLength, nextLength)
    return prev + next + ';\n\n'
  }, '')

  // fix data option from an object to a function
  let target = scripter.fix(source)

  // wrap with __weex_define__(name, [], (r, e, m) {...})
  // 1 more line at start, 1 more line at end
  target = target
      .replace(MODULE_EXPORTS_REG, '__weex_module__.exports')
      .replace(REQUIRE_REG, '__weex_require__($1$2$1)')
  target = ';__weex_define__("@weex-component/' + name + '", [], ' +
      'function(__weex_require__, exports, __weex_module__)' +
      '{\n' + target + '\n})'

  // record mapOffset into sourcemap
  if (mapOffset) {
    // length of generated prefix (elements) and basic (implicitly requires)
    const preLines = prefix.split(/\r?\n/g).length + mapOffset.basic
    mapOffset.subs.forEach(info => {
      map.addScript(elementName || name, info, preLines)
    })
  }
  map && map.end()

  // append __weex_bootstrap__ for entry component
  // not impact sourcemap
  if (isEntry) {
    target += '\n;__weex_bootstrap__("@weex-component/' + name + '", ' +
        String(config) + ',' +
        String(data) + ')'
  }

  return Promise.resolve(prefix + target)
}
