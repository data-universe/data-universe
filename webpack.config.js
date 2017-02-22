const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader',
      },
      {
        test: /FlyControls\.js$/,
        loader: path.resolve(__dirname, 'loaders/fly-controls-loader'),
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      three: path.resolve(__dirname, 'node_modules/three/src/'),
      three_examples: path.resolve(__dirname, 'node_modules/three/examples/js/'),
    },
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html',
  })],
};
