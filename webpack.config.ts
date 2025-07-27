import path from 'path'
import {Configuration} from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
const webpackConfig: Configuration = {
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx'
    ]
  },
  module: {
    rules: [{
      test: /\.(js|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
      ]
    }]
  },
  entry: path.resolve(
    __dirname,
    'src/index.js'
  ),
  output: {
    path: path.resolve(
      __dirname,
      'nomad/static'
    ),
    filename: 'app.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false
          }
        }
      }),
      new CssMinimizerPlugin({
        test: /\.css$/,
        minimizerOptions: {
          preset: [
            'default', {
              discardComments: {
                removeAll: true
              }
            }
          ]
        }
      })
    ]
  }
}
export default webpackConfig