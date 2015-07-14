module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist',
    filename: 'app.min.js'
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

