const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { srcPath, distPath } = require('./path')

module.exports = {
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')

    },
    module: {
        rules: [
            // {
            //     test: '/\.js$/',
            //     use: ['babel-loader?cacheDirectory'], // 开启缓存
            //     include: srcPath, // 一般解析src下面的代码
            //     exclude: /node_modules/
            // },
            // {
            //     test: '/\.vue$/',
            //     use: ['vue-loader'],
            //     include: srcPath,
            //     exclude: /node_modules/
            // }
        ],

    },
    plugins: [

        // new HtmlWebpackPlugin({
        //     template: path.join(srcPath, 'index.html'),
        //     filename: 'index.html'
        // }),

        // 多入口-生成index.html

        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            chunks: ['index', 'vendor', 'common'] // chunks 表示该页面需要引入哪些chunk（即上面的index和other）
        }),

        // 多入口-生成other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'ohter.html',
            chunks: ['other', 'common'] // 只引入 other.js
        })
    ]
}