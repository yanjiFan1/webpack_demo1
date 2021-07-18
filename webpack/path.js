/**
 * @description 常用文件夹路径
 * @author 烟祭
 */

const path = require('path');

const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')

module.exports = {
    srcPath,
    distPath
}