import loaderUtils from 'loader-utils'

import {
  extractBlocks
} from './parser'

module.exports = function (source) {
  this.cacheable && this.cacheable()

  const callback = this.async()
  const loaderQuery = loaderUtils.parseQuery(this.query)
  const type = loaderQuery.type
  let index = loaderQuery.index

  if (index != null && index.match(/^\d+$/)) {
    index = parseInt(index)
  }

  extractBlocks(source, type)
    .then(result => {
      if (index != null) {
        result = result[index]
      }
      return result.content
    }).then(content => {
      callback(null, content)
    }).catch(e => {
      callback(e, '')
    })
}
