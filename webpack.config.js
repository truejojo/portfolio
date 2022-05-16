// https://www.ivarprudnikov.com/static-website-multiple-html-pages-using-webpack-plus-github-example/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    games: './src/pages/games.ts',
    initGames: './src/pages/games/initGames.ts',
  },

  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        // test: /\.js$/,
        // exclude: /node_modules/,
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     plugins: [require('babel-plugin-transform-object-rest-spread')],
        //   },
        // },

        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
        // use: {
        // loader: ['ts-loader'],
        // options: {
        //   plugins: [require('babel-plugin-transform-object-rest-spread')],
        // },
        // },
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(jpg|png|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              plugins: ['babel-plugin-transform-assets-import-to-string'],
              outputPath: 'img/',
              publicPath: 'img/',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    // extensions: ['.js'],
    extensions: ['.ts', '.js'],
  },

  devServer: {
    port: 8080,
  },

  mode: 'development',

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/games.html',
      inject: true,
      chunks: ['games'],
      filename: 'games.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/games/battle.html',
      inject: true,
      chunks: ['initGames'],
      filename: 'battle.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/games/memory.html',
      inject: true,
      chunks: ['initGames'],
      filename: 'memory.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/games/retentivity.html',
      inject: true,
      chunks: ['initGames'],
      filename: 'retentivity.html',
    }),
  ],

  experiments: {
    topLevelAwait: true,
  },
};
