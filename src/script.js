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
          if (str.indexOf('@weex-module') < 0) {
            parsed = parsed.replace(str, '')
            return true
          }
          return false
        }).join('\n')
      }

      const result = `
${requireList || ''}
module.exports = function(require, exports, module){
${parsed}
}
`
      callback(null, result)
    }).catch(e => {
      callback(e, '')
    })
}
