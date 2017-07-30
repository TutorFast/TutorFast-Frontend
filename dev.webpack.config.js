const path = require('path');
const webpack = require('webpack');
const cjson = require('cjson');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-bundle.js',
  },
  devServer: {
    contentBase: [
      path.join(__dirname, 'html'),
      path.join(__dirname, 'assets'),
    ],
    port: 9000,
    hot: true,
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      '~': path.resolve('./src'),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'node-static',
      filename: 'node-static.js',
      minChunks(module, count) {
        let context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: cjson.load('./.babelrc'),
      },
    ],
  },
};
