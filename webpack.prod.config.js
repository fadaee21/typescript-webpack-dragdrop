const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: "./src/app.ts",
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "production",

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg|svg|jpeg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                type: "asset/inline"
            },
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node-modules/
            }
        ],
    },
    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/style.[contenthash].css",
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html",
            publicPath: "./dist/"
        }),
        new ESLintPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
};