import { SourceMapGenerator } from 'source-map'

export class ScriptMap {
  constructor (filename, content) {
    this.filename = filename
    this.content = content
    const generator = new SourceMapGenerator()
    generator.setSourceContent(filename, content)
    this.generator = generator
    this.history = []
    this.elements = {}
    this.enabled = false
  }

  enable () {
    this.enabled = true
  }

  start () {
    if (!this.enabled) { return }
    this.current = { elements: [], scripts: [] }
  }

  end () {
    if (!this.enabled) { return }
    const current = this.current
    this.current = {}

    // re-order the elements and scripts into history
    const length = current.elements.length
    if (length > 0) {
      const children = this.history.splice(-length, length)
      current.children = children
    }

    current.elements.concat(current.scripts).forEach(item => {
      current.name = item.name
      delete item.name
    })

    current.elements.forEach((info, index) => {
      current.children[index].length = info.length
      current.children[index].line = info.line
    })

    delete current.elements
    this.history.push(current)
  }

  addElement (name, index, line, length) {
    if (!this.enabled) { return }
    this.current.elements.push({ name, index, line, length })
  }

  addScript (name, info, externalOffset) {
    if (!this.enabled) { return }
    this.current.scripts.push({ name, info, externalOffset })
  }

  setElementPosition (name, line, column) {
    if (!this.enabled) { return }
    this.elements[name] = { line, column }
  }

  parse (target, startLine) {
    if (!this.enabled) { return }
    target = target || this.history[0]
    if (!target) { return }
    startLine = startLine || 0

    const { name, line, scripts, children } = target
    const elInfo = this.elements[name] || {};

    (scripts || []).forEach(script => {
      const { info, externalOffset } = script
      const { original, generated } = info
      const scriptLength = info.length
      this.add(
        original.line + (elInfo.line || 1) - 1,
        scriptLength,
        generated.line + startLine + (line || 1) - 1 + externalOffset
      )
    });

    (children || []).forEach(child => {
      this.parse(child, startLine + (line || 1) - 1)
    })

    this.json = true
  }

  add (originalLine, length, generatedLine) {
    if (!this.enabled) { return }
    const option = {
      source: this.filename,
      original: { line: originalLine, column: 1 },
      generated: { line: generatedLine, column: 1 }
    }
    for (let i = 0; i < length; i++) {
      option.original.line = originalLine + i
      option.generated.line = generatedLine + i
      this.generator.addMapping(option)
    }
  }

  toJSON () {
    return this.json ? this.generator.toJSON() : null
  }
}
