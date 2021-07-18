工具：

1. webpack 
打包工具


2. webpack-merge
合并两个webpack js文件

3. webpack-cli 使用webpack必须安装webpack-cli

4. webpack-dev-server 启动本地服务器必须安装此依赖


plugin

1. html-webpack-plugin
html的解析plugin

2. clean-webpack-plugin
清空output.path文件夹

3. mini-css-extract-plugin
抽离css文件

4. terser-webpack-plugin 
压缩css文件

5. optimize-css-assets-webpack-plugin
压缩css文件


### loader

#### url-loader与file-loader的主要区别：url-loader会通过配置规则将一定范围大小的图片打包成base64的字符串，放到dist.js文件里，而不是单独生成一个图片文件。而file-loader在打包时一定会生成单独的图片文件。




hash

filename: "[contentBase:8]"


####devServer#

###hot属性：
模块热替换(HMR - hot module replacement)功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

保留在完全重新加载页面期间丢失的应用程序状态。
只更新变更内容，以节省宝贵的开发时间。
在源代码中 CSS/JS 产生修改时，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式。


性能优化 


1. IgnorePlugin 忽略文件
2. 


功能
1. 自动刷新
watch: true, // 开启监听，默认为false
// 注意 开启监听之后，webpack-dev-server 会自动开启刷新浏览器

2. 热更新
