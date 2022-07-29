/* eslint-disable */

const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const webpackPlugins = [
  new Dotenv({
    path: './.env', // Path to .env file (this is the default)
    systemvars: true,
  }),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public/index.html'),
    filename: 'index.html',
  }),
  // new CopyPlugin( {
  //   patterns: [
  //     { from: './src/assets/images/favicon.ico', to: '' },
  //     { from: './src/manifest.json', to: '' },
  //     { from: './src/assets/images/logo192.png', to: '' },
  //     { from: './src/assets/images/logo512.png', to: '' },
  //   ],
  // } ),
];

// if ('production' === process.env.NODE_ENV) {
//   webpackPlugins.push(
//     new InjectManifest({
//       swSrc: './src/serviceWorker.js',
//       swDest: 'service-worker.js',
//       maximumFileSizeToCacheInBytes: 7000000,
//     })
//   );
// }

module.exports = {
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, './src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.(|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
      {
        test: /\.(csv|doc)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'documents',
          name: '[path][name].[contenthash].[ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.scss'],
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
    ],
    // alias: {
    //   'src': path.resolve(__dirname, 'src'),
    //   'app': path.resolve(__dirname, 'src/app'),
    //   'assets': path.resolve(__dirname, 'assets'),
    //   'forms': path.resolve(__dirname, 'src/forms'),
    //   'hooks': path.resolve(__dirname, 'src/hooks'),
    //   'utils': path.resolve(__dirname, 'src/utils'),
    //   'pages': path.resolve(__dirname, 'src/pages'),
    //   'components': path.resolve(__dirname, 'src/components'),
    //   'routes': path.resolve(__dirname, 'src/app/routes'),
    // },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js',
    publicPath: '/',
  },
  plugins: webpackPlugins,

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    // contentBase: path.resolve(__dirname, './dist/'),
    // publicPath: '/',
    // watchContentBase: true,
    // writeToDisk: true,
    historyApiFallback: true,
  },
};
