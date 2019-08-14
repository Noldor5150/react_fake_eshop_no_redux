const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');

const cssLoaders = [MiniCssPlugin.loader, 'css-loader'];

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[hash].js',
  },
  mode: 'production',
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
  ],
  devServer: {
    compress: true,
    port: 9001,
    publicPath: '/',
    historyApiFallback: true,
  },
};
