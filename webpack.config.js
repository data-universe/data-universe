const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  devServer: {
    // public: '192.168.1.107:8080',
  },
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
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /FlyControls\.js$/,
        loader: path.resolve(__dirname, 'loaders/fly-controls-loader'),
      },
      {
        test: /VREffect\.js$/,
        loader: path.resolve(__dirname, 'loaders/vr-effect-loader'),
      },
      {
        test: /VRControls\.js$/,
        loader: path.resolve(__dirname, 'loaders/vr-controls-loader'),
      },
      {
        test: /webvr-manager\.js$/,
        loader: path.resolve(__dirname, 'loaders/webvr-manager-loader'),
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      three: path.resolve(__dirname, 'node_modules/three/src/'),
      three_examples: path.resolve(__dirname, 'node_modules/three/examples/js/'),
      webvr_boilerplate: path.resolve(__dirname, 'node_modules/webvr-boilerplate/build/'),
      vendor: path.resolve(__dirname, 'vendor/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/list.html' },
    ]),
  ],
};
