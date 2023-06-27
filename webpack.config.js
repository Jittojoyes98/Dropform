const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  return {
    output: {
      path: path.join(__dirname, "/dist"), // the bundle output path
      filename: "bundle.js", // the name of the bundle
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html", // to import index.html file inside index.js
      }),
      new Dotenv({
        path: `${env.development ? "./.env" : "./.env"}`, // change based on production and development
      }),
    ],
    devServer: {
      port: 3030, // you can change the port
      historyApiFallback: true,
      // contentBase: './',
      hot: true,
    },
    target: "web",
    resolve: {
      extensions: [
        ".js",
        ".jsx",
        ".png",
        ".wasm",
        ".tar",
        ".data",
        ".svg",
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".json",
      ],
      alias: {
        "@": path.resolve(__dirname, "src/"),
        //   '@ee': path.resolve(__dirname, 'ee/'),
        "@assets": path.resolve(__dirname, "assets/"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // .js and .jsx files
          exclude: /node_modules/, // excluding the node_modules folder
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(sa|sc|c)ss$/, // styles files
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
          loader: "url-loader",
          options: { limit: false },
        },
      ],
    },
  };
};
