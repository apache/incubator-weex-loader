import {
  logWarn
} from './util'

import {
  parseStyle
} from './parser'

module.exports = function (source) {
  this.cacheable && this.cacheable()

  const callback = this.async()

  parseStyle(source)
    .then(({ parsed, log }) => {
      if (log && log.length) {
        logWarn(this, log)
      }
      return `module.exports = ${parsed}\n`
    }).then(result => {
      callback(null, result)
    }).catch(e => {
      callback(e, '')
    })
}
