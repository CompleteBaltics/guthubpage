const express = require('express');
const path = require('path');

const app = express();
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConf = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConf)));
}else{
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('server is up'));
