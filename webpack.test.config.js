const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin('style.css', {allChunks: false});

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: [ './index.js' ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'testdump'),
    filename: 'index.js',
    libraryTarget: 'var',
    library: 'Tracer'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
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
