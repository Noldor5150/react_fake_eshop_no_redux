const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
  mode: 'development',
  devServer: {
    compress: true,
    port: 9001,
    publicPath: '/',
    historyApiFallback: true,
  },
});
