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
        return result[index].content
      }
      else {
        return result.content
      }
    }).then(result => {
      callback(null, result)
    }).catch(e => {
      callback(e, '')
    })
}
