/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import parse5 from 'parse5'
import blocker from 'weex-transformer/lib/blocker'
import templater from 'weex-templater'
import styler from 'weex-styler'
import scripter from 'weex-scripter'
import { checkTagName } from 'weex-templater/lib/validator'

import {
  FUNC_START_REG,
  FUNC_END_REG,
  stringifyFunction
} from './util'

function getAttribute (node, name) {
  if (node.attrs) {
    let i = node.attrs.length
    let attr
    while (i--) {
      attr = node.attrs[i]
      if (attr.name === name) {
        return attr.value
      }
    }
  }
}

function extractDependencies (node, deps) {
  if (node.childNodes) {
    node.childNodes.forEach(child => {
      checkTagName(child, {
        result: {},
        deps,
        log: []
      })
      extractDependencies(child, deps)
    })
  }
}

export function parseFragment (source) {
  const fragment = parse5.parseFragment(source, {
    locationInfo: true
  })

  const output = {
    deps: [],
    element: [],
    template: [],
    style: [],
    script: [],
    data: [],
    config: []
  }

  fragment.childNodes.forEach(node => {
    let type

    if (node.tagName === 'script') {
      type = getAttribute(node, 'type')
      if (type !== 'data' && type !== 'config') {
        type = 'script'
      }
    }
    else {
      type = node.tagName
    }
    if (type === 'we-element') {
      console.warn(`<we-element name="${getAttribute(node, 'name')}"> is deprecated, please use <element> instead.`)
      type = 'element'
    }

    if (!output[type]) {
      return
    }

    const name = getAttribute(node, 'name')
    const src = getAttribute(node, 'src')
    const lang = getAttribute(node, 'lang')

    output[type].push({
      name,
      src,
      lang,
      node
    })

    if (type === 'template') {
      const deps = []
      extractDependencies(node.content, deps)
      output.deps = deps
    }
  })

  return output
}

export function extractBlocks (source, type) {
  return new Promise((resolve, reject) => {
    blocker.format(source, (err, ret) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(ret[type])
      }
    })
  })
}

export function parseTemplate (source) {
  return new Promise((resolve, reject) => {
    templater.parse(source, (err, obj) => {
      if (err) {
        reject(err)
      }
      else {
        // parse json to string and treat function specially
        let parsed = JSON.stringify(obj.jsonTemplate, stringifyFunction, '  ')
        parsed = parsed.replace(FUNC_START_REG, '').replace(FUNC_END_REG, '')
        resolve({ parsed, log: obj.log })
      }
    })
  })
}

export function parseStyle (source) {
  return new Promise((resolve, reject) => {
    styler.parse(source, (err, obj) => {
      if (err) {
        reject(err)
      }
      else {
        const parsed = JSON.stringify(obj.jsonStyle, null, 2)
        resolve({ parsed, log: obj.log })
      }
    })
  })
}

export function parseScript (source) {
  return new Promise((resolve, reject) => {
    const parsed = scripter.fix(source)
    resolve({ parsed })
  })
}
