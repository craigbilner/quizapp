const path = require('path');

module.exports = {
  entry: './src/tests.js',
  output: {
    path: './src',
    filename: 'tests.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|.src\/server/,
        loader: 'babel-loader',
        query: {
          stage: 0
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

