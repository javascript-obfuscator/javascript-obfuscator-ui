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
      loader: ['style-loader', 'less-loader'],
    }
   ]
 },
}
