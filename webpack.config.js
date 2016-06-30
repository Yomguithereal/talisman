var webpack = require('webpack'),
    path = require('path');

module.exports = {
  entry: {
    'metrics': './_js/metrics.js',
    'phonetics': './_js/phonetics.js',
    'phonetics-french': './_js/phonetics-french.js',
    'phonetics-german': './_js/phonetics-german.js',
    'stemmers': './_js/stemmers.js',
    'stemmers-french': './_js/stemmers-french.js',
    'stemmers-german': './_js/stemmers-german.js',
    'stemmers-latin': './_js/stemmers-latin.js',
    'tokenizers-sentences': './_js/tokenizers-sentences.js',
    'tokenizers-words': './_js/tokenizers-words.js'
  },
  output: {
    path: path.join(__dirname, 'assets', 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendors'}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel'
      }
    ]
  }
};
