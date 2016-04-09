var webpack = require('webpack'),
    path = require('path');

module.exports = {
  entry: {
    'latin-stemmers': './_js/latin-stemmers.js',
    metrics: './_js/metrics.js',
    phonetics: './_js/phonetics.js',
    'sentences-tokenizers': './_js/sentences-tokenizers.js',
    stemmers: './_js/stemmers.js',
    'words-tokenizers': './_js/words-tokenizers.js'
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
