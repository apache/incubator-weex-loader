import {
  logWarn
} from './util'

import {
  parseTemplate
} from './parser'

module.exports = function (source) {
  this.cacheable && this.cacheable()

  const callback = this.async()

  parseTemplate(source)
    .then(({ parsed, log }) => {
      if (log && log.length) {
        logWarn(this, log)
      }
      callback(null, parsed)
    }).catch(e => {
      callback(e, '')
    })
}
