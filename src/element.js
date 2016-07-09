import loaderUtils from 'loader-utils'

import {
  extractBlocks
} from './parser'

module.exports = function (source) {
  this.cacheable && this.cacheable()

  const callback = this.async()
  const loaderQuery = loaderUtils.parseQuery(this.query)
  const resourceQuery = loaderUtils.parseQuery(this.resourceQuery)
  const name = resourceQuery.name

  let contentPromise

  if (loaderQuery.extract) {
    contentPromise =
      extractBlocks(source, 'elements')
  }
  else {
    contentPromise = Promise.resolve({ content: source })
  }

  contentPromise.then(elements => {
    if (loaderQuery.raw) {
      return elements[name].content
    }
  }).then(result => {
    callback(null, result)
  }).catch(e => {
    callback(e, '')
  })
}
