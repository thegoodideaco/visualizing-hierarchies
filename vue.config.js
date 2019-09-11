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
  filenameHashing:     true,
  productionSourceMap: false,
  runtimeCompiler:     true,
  lintOnSave:          true,

  configureWebpack: config => {
    /**
     * * Copy datasets and static directory into build
     */
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from:   resolve('datasets'),
          ignore: ['.*'],
          to:     'datasets'
        },
        {
          from:   resolve('static'),
          ignore: ['.*'],
          to:     'static'
        }
      ])
    )

    /*
       ___              __         __  _             ____       __
      / _ \_______  ___/ /_ ______/ /_(_)__  ___    / __ \___  / /_ __
     / ___/ __/ _ \/ _  / // / __/ __/ / _ \/ _ \  / /_/ / _ \/ / // /
    /_/  /_/  \___/\_,_/\_,_/\__/\__/_/\___/_//_/  \____/_//_/_/\_, /
                                                               /___/
    */
    if (process.env.NODE_ENV === 'production') {
      const CompressionPlugin = require('compression-webpack-plugin')
      config.plugins.push(new CompressionPlugin({
        compressionOptions: {

        }
      }))

      const TerserPlugin = require('terser-webpack-plugin')
      config.optimization.minimizer.push(
        new TerserPlugin({
          parallel:      4,
          terserOptions: {
            compress: {
              drop_console:  true,
              dead_code:     true,
              drop_debugger: true,
              unused:        true,
              passes:        16
            },
            mangle:   true,
            safari10: true

          }
        })
      )

      const UnusedPlugin = require('unused-webpack-plugin')
      config.plugins.push(
        new UnusedPlugin({
          directories: [resolve('src')],
          exclude:     ['unused']
        })
      )

      // const PurgecssPlugin = require('purgecss-webpack-plugin')
      // config.plugins.push(
      //   new PurgecssPlugin({
      //     paths: [resolve('src')]
      //   })
      // )
    }
  },

  /**
   * @type {ChainWebpack}
   */
  chainWebpack: config => {
    /**
     * * Markdown File Configuration
     */
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}
