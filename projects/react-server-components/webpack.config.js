import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReacServerWebpackPlugin from "react-server-dom-webpack/plugin";
import React from "react";

const mode = process.env.NODE_ENV || "development";
const developmentMode = mode === "development";

export default {
  mode,
  entry: "./src/Client.jsx",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      publicPath: "/assets/",
      template: "./index.html",
    }),
    new ReactServerWebpackPlugin({ isServer: false }),
  ],
  output: {
    chunkFilename: developmentMode
      ? "[id].chunk.js"
      : "[id].[contenthash].chunk.js",
    path: path.resolve(import.meta.dirname, "dist"),
    filename: "[name].js",
  },
  optimization: {
    runtimeChunk: "single",
  },
};
