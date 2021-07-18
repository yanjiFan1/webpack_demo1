const path = require('path');
const webpack = require('webpack');
const webpackCommonConf = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const { srcPath, distPath } = require('./path')

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('development')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                use: ['file-loader'],
                // options: {
                //     name: '[name]_[hash].[ext]' // 使用图片的名字，并使用图片的后缀
                // }
            },
            {
                test: /\.css$/,
                // loader的执行顺序是：从后往前
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                // 增加‘less-loader' 
                use: ['style-loader', 'css-loader', 'less-loader','postcss-loader']
            }
        ]
    },
    devServer: {
        historyApiFallback: true, // 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容
        port: 8080,
        progress: true, // 显示打包的进度条
        contentBase: distPath, // 根目录
        open: true, // 自动打开浏览器
        compress: true, // 启动gzip压缩

        // 设置代理
        proxy: {
            // 将本地 /api/xxx 代理到localhost:3000/api/xxx
            '/api': 'http://localhost:3000',

            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            './api2': {
                traget: 'http://localhost:3000',
                pathRewrite: {
                    '/api2': ''
                }
            }
        }
    }
})