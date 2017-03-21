var path         = require('path');
var webpack      = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var PKG_VERSION = require('./package.json').version;

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      config: path.join(__dirname, 'src', 'config', 'production')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.coffee$/,
        loader: "coffee-loader",
        include: [
          path.join(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules')
        ],
        loader: 'style-loader!css-loader?-autoprefixer!postcss-loader'
      },
      {
        test: /\.json$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules')
        ],
        loader: 'json'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules')
        ],
        loader: 'file',
        query: {
          name: '[name].[hash:8].[ext]'
        }
      }
    ]
  },
  postcss: function (webpack) {
    return [ autoprefixer ];
  }
};
