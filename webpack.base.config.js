const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');

const cssLoaders = [MiniCssPlugin.loader, 'css-loader'];

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: cssLoaders,
      },
      {
        test: /\.scss$/,
        loader: [...cssLoaders, 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.ProgressPlugin(),
    new CopyPlugin([
      {
        from: './public',
        ignore: ['index.html'],
      },
    ]),
  ],
};
