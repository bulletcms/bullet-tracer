const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin('[name]style.css', {allChunks: true});

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index.js' ,
    dashboard: './dash.js'
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'Bullet'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.scss$/, loader: extractSass.extract(['css','sass']) }
    ]
  },
  resolve: {
    root: [
      path.resolve(__dirname, 'src')
    ],
    alias: {

    },
    extensions: ['', '.js']
  },
  plugins: [
    extractSass
  ]
};
