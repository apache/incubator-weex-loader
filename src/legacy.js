export function useScripter () {
  warn('useScripter()')
}
export function useStyler () {
  warn('useStyler()')
}
export function useTemplater () {
  warn('useTemplater()')
}

function warn (method) {
  console.warn(`\u001b[1;32m[Warn]\u001b[0m: method ${method} in weex-loader is no more necessary`)
}
