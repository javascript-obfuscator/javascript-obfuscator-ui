const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: 'source-map',
    entry: {
        'bundle': './App/index.js',
        'workers/obfuscation-worker': './App/workers/obfuscation-worker.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options : {
                            publicPath : __dirname + '/dist'
                        }
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.woff(2)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.(ttf|eot|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.md$/i,
                use: 'raw-loader'
            }
        ]
    },
    resolve: {
        alias: {
            process: "process/browser"
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: ['process']
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './templates/index.html',
            hash: true
        }),
        new MiniCssExtractPlugin()
    ]
};
