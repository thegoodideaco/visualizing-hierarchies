const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {

  css: {
    sourceMap: true
  },
  filenameHashing:     false,
  productionSourceMap: false,
  runtimeCompiler:     true,

  configureWebpack: config => {
    /**
     * Copy datasets directory into build
     */
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from:   resolve('datasets'),
          ignore: ['.*'],
          to:     'datasets'
        }
      ])
    )
  },

  /** @param {import('webpack-chain')} config*/
  chainWebpack: config => {
    /**
     * Markdown File Configuration
     */
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}
