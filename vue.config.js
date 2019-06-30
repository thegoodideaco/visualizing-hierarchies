const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 * @typedef { import("webpack-chain") } ChainWebpack
 */


/**
 * @type { Options }
 */
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

  /**
   * @type {ChainWebpack}
   */
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
  },

  parallel: 16
}
