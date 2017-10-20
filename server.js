// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
// const config = require('./webpack.config');

// new WebpackDevServer(webpack(config), {
//     publicPath: config.output.publicPath,
//     watchOptions: {
//       aggregateTimeout: 300,
//       poll: 1000,
//       ignored: /node_modules/
//     }
//   })
//   .listen(3000, '0.0.0.0', function (err, result) {
//     if (err) {
//       console.log(err);
//     }

//     console.log('Running at http://0.0.0.0:3000');
//   });

const express = require('express');

const app = express();

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Listening on port 3000');
});