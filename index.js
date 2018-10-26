const { minify } = require('html-minifier')
const minimatch = require('minimatch')

const defaultOptions = {
  enable: true,
  slient: false,
  exclude: []
}

// More features can be found on the page below.
// @see https://www.npmjs.com/package/html-minifier
const minifyOptions = {
  removeComments: true,
  removeCommentsFromCDATA: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  collapseWhitespace: true,
  collapseInlineTagWhitespace: true,
  collapseBooleanAttributes: true,
  conservativeCollapse: true,
  sortAttributes: true,
  ignoreCustomComments: [/^\.s*more/]
}

const optimize = (str, data) => {
  const options = Object.assign(
    defaultOptions,
    minifyOptions,
    hexo.config.html_minifier_plus
  )

  // Return if disabled. (include falsy)
  if (!options.enable) return

  const path = data.path
  let exclude = options.exclude
  exclude = (exclude && !Array.isArray(exclude)) ? [exclude] : exclude
  exclude.map(val => {
    const isMatched = minimatch(path, val, { matchBase: true })

    if (isMatched)
      return str
  })

  const Console = hexo.log || console
  let result = str

  try {
    result = minify(str, options)

    const compressedPercent = str.length === 0 ? 0 : ((str.length - result.length) / str.length * 100).toFixed(2)
    Console[options.slient ? 'debug' : 'info'](`Optimized: ${ path } [${ compressedPercent }% saved]`)
  } catch(err) {
    throw err
  }

  return result
}

hexo.extend.filter.register('after_render:html', optimize)
