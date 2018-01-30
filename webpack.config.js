const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
      'app.umd.min': './src/index.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'App',
      umdNamedDefine: true
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
        include: /\.min\.js$/,
      })
    ],
    module: {
      loaders: [{
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        query: {
          declaration: false,
        }
      }]
    }
  }
