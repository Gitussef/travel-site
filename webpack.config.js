const { truncate } = require("lodash");
const path = require("path");

module.exports = {
  entry: "./app/assets/scripts/App.js",
  mode: "development",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app"),
  },
  devServer: {
    before: function (app, server) {
      server._watch("./app/**/*.html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
};
