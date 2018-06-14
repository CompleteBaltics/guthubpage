var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'lodash',
  'faker',
  'react',
  'react-dom',
  'react-input-range',
  'react-router',
  'react-redux',
  'redux',
  'redux-form',
  'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // chunkhash will change the file name if it has change to reset the cache for files in the browser
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    // checks all created js files and find common modules, then add the modules just to the specified file group
    new webpack.optimize.CommonsChunkPlugin({
      //manifest is here to let webpack verify if vendor has changed or not so that the chunkhash will not get updated when the thing builds
      name: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      // generate new index.html with js already added
      template: path.join(__dirname, 'src/index.html')
    }),
    // define Window scope variable
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
