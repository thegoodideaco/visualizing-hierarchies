
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true,

  css: {
    sourceMap: true
  },
  filenameHashing:     false,
  productionSourceMap: false,
  runtimeCompiler:     true,

  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    config.plugins.push(
      new CopyWebpackPlugin([{
        from:   resolve('datasets'),
        ignore: ['.*'],
        to:     'datasets'
      }])
    )
  }
}
