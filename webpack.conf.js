let ExtractTextPlugin = require('extract-text-webpack-plugin');

let extractLESS = new ExtractTextPlugin('stylesheets/[name].css');


module.exports = {
  context: __dirname,
  // devtool: "source-map",
  entry: "./App/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module:{
   loaders: [
    {
      test : /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader'],
    },
    {
      test: /\.less$/,
      loader: extractLESS.extract(['css', 'less']),
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }
   ]
 },
  plugins: [
    extractLESS
  ]
}
