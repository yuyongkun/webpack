const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        index: './src/assets/js/index.js',
        about: './src/assets/js/about.js',
        buy: './src/assets/js/buy.js',
    },
    output: {
        filename: 'assets/js/[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'assets/img/[name].[hash:7].[ext]'
                    }
                }],

            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/font'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin("assets/css/[name].css"),
        new HtmlWebpackPlugin({
            title: '首页',
            filename: '/view/index.html',
            template: './src/view/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: '关于公司',
            filename: '/view/about.html',
            template: './src/view/about.html',
            chunks: ['about']
        }),
        new webpack.HotModuleReplacementPlugin() // 热加载
    ],
    // 使用webpack-dev-server，提高开发效率
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        host: 'localhost',
        port: 8080,
        inline: true,
        hot: true,
        //服务端压缩是否开启
        compress: true
    }
};