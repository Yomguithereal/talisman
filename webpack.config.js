var webpack = require('webpack'),
    path = require('path');

module.exports = {
  entry: {
    metrics: './_js/metrics.js',
    phonetics: './_js/phonetics.js'
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
