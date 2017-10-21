const path = require('path');


module.exports = {
  entry: './src/index.js',
  // https://webpack.js.org/configuration/output/
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'source-map',
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    host: '0.0.0.0',
    port: 3000,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  },
  module: {
    rules: [
      // https://webpack.js.org/loaders/babel-loader/
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        }
      },
      // https://webpack.js.org/loaders/sass-loader/
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      }
    ]
  }
};
