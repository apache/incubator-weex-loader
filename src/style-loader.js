import loaderUtils from 'loader-utils'
import blocker from 'weex-transformer/lib/blocker'
import styler from 'weex-styler'

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

function parseStyle(source) {
  return new Promise((resolve, reject) => {
    styler.parse(source, (err, obj) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.stringify(obj.jsonStyle, null, 2))
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

    extrackBlock(source, 'styles')
        .then(styles => {
            if (params.loaderQuery.extract) {
                return parseStyle(styles[0].content)
            } else if (params.loaderQuery.raw) {
                callback(null, styles[0].content)
            }
        }).then(result => {
            result = `module.exports = ${result}\n`
            callback(null, result)
        }).catch(e => {
            callback(e, '')
        })
}