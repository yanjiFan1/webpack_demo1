const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HappyPack = require('happypack')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const { srcPath, distPath } = require('./path')

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        // filename: 'bundle.[contenthash:8].js', //打包代码时， 加上hash戳,
        filename: '[name].[contenthash:8].js', // name即多入口时 entry的key
        path: distPath,
        // publicPath: 'http://cdn.abc.com' // 修改所有静态文件url的前缀（如cdn域名），这里暂时用不到
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // 把对.js文件的处理交给id为bable的HappyPack实例
                use: ['happypack/loader?id=babel'],
                include: srcPath,
                // exclude: /node/modules/
            },
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]', // 使用图片的名字，并使用图片的后缀

                        // 小于 5kb的图片用base64格式产出
                        // 否则，依然延用file-loader的形式产出url格式
                        limit: 5 * 1024,

                        // 打包到img目录下
                        outputPath: '/img1/',

                        // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            },
            {
                test: /\.css$/,
                // loader的执行顺序是：从后往前
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                // 增加‘less-loader' 
                use: [
                    MiniCssExtractPlugin.loader,  // 这里不再有style-loader
                    'css-loader', 
                    'less-loader',
                    'postcss-loader'
                ]
            }
        ],

        // 对完整的 react.min.js文件就没有才一个模块化
        // 忽略 react.min.js文件的递归解析处理
        noParse: [/react\.min\.js$/],
    },
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空output.path 文件夹
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        }),

        // 抽离css文件
        new MiniCssExtractPlugin({
            filename: 'css/main.[contenthash:8].css'
        }),

        // 忽略 moment下的/locate目录
        // new webpack.IgnorePlugin(/\.\/locale/, /moment/),

        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),

        // happyPack 开启多进程打包--- 性能优化可用----没有出现性能问题可先不用
        new HappyPack({
            // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
            id: 'babel',
            // 如何处理.js文件， 用法和Loader配置中一样
            loaders: ['babel-loader?cacheDirectory']
        }),

        // 使用ParallelUglifyPlugin并行压缩输出的JS代码 --- 性能优化可用----没有出现性能问题可先不用
        // new ParallelUglifyPlugin({
        //     // 传递给 UglifyJS的参数
        //     // 还是使用Uglify压缩，只不过帮助开启了多进程
        //     uglifyJS: {
        //         output: {
        //             beautify: false, // 最紧凑的输出
        //             comments: false, // 删除所有的注释
        //         },
        //         compress: {
        //             // 删除所有的`console` 语句，可以兼容ie浏览器
        //             drop_console: true,
        //             // 内嵌定义了但是只用到一次的变量
        //             collapse_vars: true,
        //             // 提取出出现多次但是没有定义成变量去引用的静态值
        //             reduce_vars: true,
        //         }
        //     }
        // })
    ],

    optimization: {
        // 压缩 css
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],

        // 分割代码
        splitChunks: {
            chunks: 'all',
            /*
                initial 入口chunk， 对于异步导入的文件不处理
                async异步chunk， 只对异步导入的文件处理
                all 全部chunk
            */ 
            
            cacheGroups: {
                // 第三方模块
                vendor: {
                    name: 'vendor', // chunk名称
                    priority: 1, // 权限更高，优先抽离， 重要!!!
                    test: /node_modules/,
                    minSize: 20000, // 大小限制
                    minChunks: 1 // 最少复用过几次
                },

                // 公共的模块
                common: {
                    name: 'common', // chunk名称
                    priority: 0, // 权限更高，优先抽离， 重要!!!
                    minSize: 0, // 大小限制
                    minChunks: 2 // 最少复用过几次
                }
            }
        }
    }
})