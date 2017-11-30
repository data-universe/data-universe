const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  devServer: {
    // public: '192.168.1.107:8080',
    disableHostCheck: true,
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
        test: /StereoEffect\.js$/,
        loader: path.resolve(__dirname, 'loaders/stereo-effect-loader'),
      },
      {
        test: /DeviceOrientationControls\.js$/,
        loader: path.resolve(__dirname, 'loaders/device-orientation-controls-loader'),
      },
      {
        test: /WebVR\.js$/,
        loader: path.resolve(__dirname, 'loaders/webvr-loader'),
      },
      {
        test: /VREffect\.js$/,
        loader: path.resolve(__dirname, 'loaders/vr-effect-loader'),
      },
      {
        test: /ViveController\.js$/,
        loader: path.resolve(__dirname, 'loaders/vive-controller-loader'),
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      three: path.resolve(__dirname, 'node_modules/three/src/'),
      three_examples: path.resolve(__dirname, 'node_modules/three/examples/js/'),
      tween: path.resolve(__dirname, 'node_modules/tween/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/list.html' },
      { from: 'src/jobtech.html' },
    ]),
  ],
};
