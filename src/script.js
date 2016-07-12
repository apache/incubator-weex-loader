import {
  parseScript
} from './parser'

module.exports = function (source) {
  this.cacheable && this.cacheable()

  const callback = this.async()

  parseScript(source)
    .then(({
      parsed
    }) => {
      let requireList = parsed.match(/require\([^()]+?\)/g)

      if (requireList && requireList.length > 0) {
        requireList = requireList.filter(str => {
          if (str.indexOf('@weex-module') > 0) {
            parsed = parsed.replace(str, str.replace('require', '__weex_require__'))
            return true
          }
          return false
        }).join('\n')
      }

      const result = `module.exports = function(module, exports, __weex_require__){${parsed}}`
      callback(null, result)
    }).catch(e => {
      callback(e, '')
    })
}
