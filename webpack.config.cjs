const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const devMode =
  process.argv[process.argv.indexOf("--mode") + 1] !== "production";

const plugins = devMode
  ? [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        linkType: "text/css",
      }),
    ]
  : [];


/** @type {import("webpack").Configuration} */
module.exports = {
  entry: "./src/index.ts",
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[local]--[hash:base64:5]",
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    compress: true,
    port: 9000,
    historyApiFallback: true,

  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
    new CopyPlugin({
      patterns: ["icon.svg"],
    }),
  ],
  stats: {
    children: true,
  },
};
