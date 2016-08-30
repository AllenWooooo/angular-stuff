import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import minimist from 'minimist';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

const dependencies = Object.keys(JSON.parse(fs.readFileSync('package.json')).dependencies);
const MODE = minimist(process.argv.slice(2)).MODE;
let app = path.join(__dirname + '/src');
let config = {
  context: app,
  entry: {
    app: ['./app/app.js'],
    vendors: dependencies
  },
  output: {
    path: path.resolve(__dirname, './static/assets'),
    filename: 'app.js'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /(node_modules|libs)/,
      loader: 'eslint'
    }],
    loaders: [{
      test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
      loader: 'file?name=fonts/[name].[ext]'
    }, {
      test: /\.(png|jpg|gif)$/i,
      loader: 'file?name=images/[name].[ext]'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'ng-annotate!babel'
    }, {
      test: /\.less$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss!less', {
        publicPath: '../'
      })
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'raw'
    }]
  },
  postcss() {
    return [autoprefixer];
  },
  resolve: {
    root: app,
    extensions: ['', '.js', '.jsx', '.json']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin('style/app.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(MODE)
      }
    })
  ]
}

if (MODE === 'production') {
  let plugins = [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin()
  ];

  config.plugins.push(...plugins);
} else {
  config.devtool = 'eval';
  config.entry.app.unshift('webpack/hot/only-dev-server');
}

export default config;
