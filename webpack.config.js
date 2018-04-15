var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var config = {
  entry: ['babel-polyfill', 'whatwg-fetch', './src/index.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?/, 
        loader: "babel-loader", 
        query: {
          presets: ["react", "es2015", "stage-2"]
        },
        exclude: /node_modules/
      },
      { 
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },   
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
      new ExtractTextPlugin('bundle.css')
  ]
};
module.exports = config; 
