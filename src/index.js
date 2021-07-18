// 引入css
import './style/style1.css'
import './style/style2.css'

// const print = (info) => {
//     console.log(info)
// }

// print('hello webpack 5')

// import { sum } from './math'
// const sumRes = sum(10, 20)
// console.log('sumRes', sumRes) 

// import _ from 'lodash'
// console.log(_.each)

// console.log("window", ENV)

// // 引入图片
// function insertImgElem(imgFile) {
//     const img = new Image()
//     img.src = imgFile
//     document.body.appendChild(img)
// }

// import imgFile1 from './img/1.png'
// insertImgElem(imgFile1)

// import imgFile2 from './img/2.jpeg'
// insertImgElem(imgFile2)


// setTimeout(() => {

//     // 异步加载 同vue react
//     // 
//     import('./da.js').then(res => {
//         console.log(res.default.message) // 注意这里的default
//     })
// }, 1500)


import moment from 'moment'
import 'moment/locale/zh-cn' // 手动引入中文语言包
moment.locale('zh-cn') // 设置语言为中文
console.log('locale', moment().locale())
console.log('date', moment().format('ll'))


