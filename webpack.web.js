const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'src') + '/js/index.js',
    devtool: 'source-map',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'docs/assets/js'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                })
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./src')
        ],
        extensions: ['.json', '.js', '.sass']
    },
    plugins: [
        new ExtractTextPlugin('../css/docs.css')
    ]
};

