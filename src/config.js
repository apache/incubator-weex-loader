import pkg from '../package.json'
export const transformerVersion = pkg.dependencies['weex-transformer'].match(/\d+(?:\.\d+){0,2}/)[0]
export const logLevel = false
