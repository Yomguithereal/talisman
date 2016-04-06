var path = require('path');

module.exports = {
  entry: {
    phonetics: './_js/phonetics'
  },
  output: {
    path: path.join(__dirname, 'assets', 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel'
      }
    ]
  }
};
