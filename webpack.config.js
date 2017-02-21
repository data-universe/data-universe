const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'assets',
  },
  module: {
    loaders: [
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      three: path.resolve(__dirname, 'node_modules/three/src/'),
    },
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html',
  })],
};
