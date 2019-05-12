/* eslint-env node */
const { join } = require('path')
/* eslint-disable node/no-unpublished-require */
require('dotenv').config()
const { DefinePlugin, NamedModulesPlugin } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/* eslint-enable */

const { env } = process

const DEVELOPMENT = env.NODE_ENV === 'development'
const PRODUCTION = env.NODE_ENV === 'production'

const devServerPort = env.PORT || 4000

const SRC = join(__dirname, 'src')
const DIST = join(__dirname, 'dist')
const STATIC = join(__dirname, 'public')

const WEBPACK_CONFIG = {
  context: SRC,
  entry: {
    bundle: './index.js'
  },
  output: {
    path: DIST,
    filename: '[name].[hash].js',
    chunkFilename: 'chunk.[id].js',
    publicPath: '/'
  },

  devServer: {
    port: devServerPort,
    host: '0.0.0.0',
    historyApiFallback: true,
    contentBase: DIST,
    proxy: {
      '/api': 'http://localhost:4001/',
      '/graphql': 'http://localhost:4001/'
    }
  },

  devtool: PRODUCTION === true ? false : 'source-map',

  stats: DEVELOPMENT ? 'minimal' : 'normal',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: DEVELOPMENT
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /.*\.(ttf|woff2?)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CopyWebpackPlugin([{ from: join(__dirname, 'public') }], {
      ignore: ['index.html']
    }),
    new HtmlWebpackPlugin({
      template: join(STATIC, 'index.html'),
      filename: join(DIST, 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: DEVELOPMENT ? '[name].css' : '[name].[hash].css',
      chunkFilename: DEVELOPMENT ? '[id].css' : '[id].[hash].css'
    })
  ]
}

if (DEVELOPMENT) {
  WEBPACK_CONFIG.plugins.push(new NamedModulesPlugin())
}

if (PRODUCTION) {
  WEBPACK_CONFIG.plugins.push(new CleanWebpackPlugin())
}

module.exports = WEBPACK_CONFIG
