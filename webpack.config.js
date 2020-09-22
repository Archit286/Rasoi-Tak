var path = require("path");
var webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyPlugin = require("copy-webpack-plugin");
var LoadablePlugin = require("@loadable/webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var clientConfig = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/build"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
        resolve: {
          extensions: [".js", ".jsx"],
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|JPG)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["url-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true",
    }),
    new HtmlWebpackPlugin({
      template: "./src/template/index.html",
      filename: "public/index.html",
      scriptLoading: "defer",
      favicon: "./src/template/favicon.ico",
    }),
    new CopyPlugin({
      patterns: [
        "src/template/logo192.png",
        "src/template/logo512.png",
        "src/template/robots.txt",
        "src/template/manifest.json",
      ],
    }),
    new MiniCssExtractPlugin(),
    new LoadablePlugin(),
  ],
};

var serverConfig = {
  entry: "./server/index.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "server.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
        resolve: {
          extensions: [".js", ".jsx"],
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|JPG)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["url-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true",
    }),
    new MiniCssExtractPlugin(),
    new LoadablePlugin(),
  ],
};

module.exports = [clientConfig, serverConfig];
