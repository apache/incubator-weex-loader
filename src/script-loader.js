import loaderUtils from 'loader-utils'
import blocker from 'weex-transformer/lib/blocker'
import scripter from 'weex-scripter'

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

function parseScript(source) {
  return new Promise((resolve, reject) => {
    resolve(scripter.fix(source))
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

    extrackBlock(source, 'scripts')
        .then(scripts => {
            if (params.loaderQuery.extract) {
                return parseScript(scripts[0].content)
            } else if (params.loaderQuery.raw) {
                callback(null, scripts[0].content)
            }
        }).then(result => {
            callback(null, result)
        }).catch(e => {
            callback(e, '')
        })
}