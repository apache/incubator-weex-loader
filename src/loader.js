import loaderUtils from 'loader-utils'
import path from 'path'
import parse5 from 'parse5'
import md5 from 'md5'

import {
    getNameByPath
} from './util'

const loaderPath = __dirname

function getRequire(loaderContext, loader, filepath) {
    return 'require(' +
                loaderUtils.stringifyRequest(
                    loaderContext,
                    `!!${loader}!${filepath}`
                ) +
           ')\n'
}

function getAttribute (node, name) {
  if (node.attrs) {
    var i = node.attrs.length
    var attr
    while (i--) {
      attr = node.attrs[i]
      if (attr.name === name) {
        return attr.value
      }
    }
  }
}

function parse(source) {

  const fragment = parse5.parseFragment(source, {
    locationInfo: true
  })

  const output = {
    template: [],
    style: [],
    script: []
  }

  fragment.childNodes.forEach(node => {
    const type = node.tagName

    if (!output[type]) {
        return
    }

    const lang = getAttribute(node, 'lang')
    const src = getAttribute(node, 'src')

    output[type].push({
        lang,
        src
    })
  })

  return output
}

module.exports = function(source) {
    this.cacheable && this.cacheable()

    const defaultLoaders = {
        main: path.resolve(loaderPath, 'loader.js'),
        template: path.resolve(loaderPath, 'html-loader.js?extract'),
        style: path.resolve(loaderPath, 'style-loader.js?extract'),
        script: path.resolve(loaderPath, 'script-loader.js?extract')
    }
    const options = this.options.weex || {}
    const loaders = Object.assign({}, defaultLoaders, options.loaders || {})
    const loaderQuery = loaderUtils.parseQuery(this.query)
    const resourceQuery = loaderUtils.parseQuery(this.resourceQuery)
    const resourcePath = this.resourcePath
    const isEntry = resourceQuery.entry
    const name =  isEntry ? md5(resourcePath) :
                    resourceQuery.name || getNameByPath(resourcePath)

    let output = '';

    const parts = parse(source)

    if (parts.template.length) {
        const template = parts.template[0]
        output += 'var __weex_template__ = ' + getRequire(this, loaders['template'], resourcePath)
    }

    if (parts.style.length) {
        const style = parts.style[0]
        output += 'var __weex_style__ = ' + getRequire(this, loaders['style'], resourcePath)
    }

    if (parts.script.length) {
        const script = parts.script[0]
        output += 'var __weex_script__ = ' + getRequire(this, loaders['script'], resourcePath)
    }



    output += `
__weex_define__('@weex-component/${name}', [], function(__weex_require__, __weex_exports__, __weex_module__) {
    __weex_module__.exports = Object.assign({}, __weex_script__, {
        template: __weex_template__,
        style: __weex_style__
    })
})\n
`
    if (isEntry) {
        output += `
__weex_bootstrap__('@weex-component/${name}')\n
`
    }

    return output;

}