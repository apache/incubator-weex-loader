import loaderUtils from 'loader-utils'
import blocker from 'weex-transformer/lib/blocker'
import templater from 'weex-templater'

import {
    FUNC_START_REG,
    FUNC_END_REG,
    stringifyFunction
} from './util'

function extrackBlock (source, type) {
  return new Promise((resolve, reject) => {
    blocker.format(source, (err, ret) => {
      if (err) {
        reject(err)
      } else {
        resolve(ret[type])
      }
    })
  })
}

function parseTemplate (source) {
  return new Promise((resolve, reject) => {
    templater.parse(source, (err, obj) => {
      if (err) {
        reject(err)
      } else {
        // parse json to string and treat function specially
        let target = JSON.stringify(obj.jsonTemplate, stringifyFunction, '  ')
        target = target.replace(FUNC_START_REG, '').replace(FUNC_END_REG, '')
        resolve(target)
      }
    })
  })
}

module.exports = function(source) {
    this.cacheable && this.cacheable()
    const callback = this.async()

    const params = {
        loaderQuery: loaderUtils.parseQuery(this.query),
        resourceQuery: loaderUtils.parseQuery(this.resourceQuery),
        resourcePath: this.resourcePath
    }

    extrackBlock(source, 'template')
        .then(template => {
            if (params.loaderQuery.extract) {
                return parseTemplate(template.content)
            } else if (params.loaderQuery.raw) {
                callback(null, template.content)
            }
        }).then(result => {
            result = `module.exports = ${result}\n`
            callback(null, result)
        }).catch(e => {
            callback(e, '')
        })
}