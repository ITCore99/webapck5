// import _ from 'lodash'
// import $ from 'jquery';
import './index.css'; 
import './layout.css'
const mmz = require('./images/1.jpeg')
const mmz2 = require('./asset/resource/1.jpeg')
const title = require('../doc/test.txt')
console.log('hello world')
console.log(title)
const image = new Image()
const image2 = new Image()
image.src = mmz
image2.src = mmz2;
document.body.appendChild(image)
document.body.appendChild(image2)
const sum = (a, b) => a + b
console.log('sum=>', sum(1, 2));
// function readonly(target, key, descriptor) {
//   descriptor.writable = false
// }
// class Person {
//   @readonly PI = 3.24
// }
// const p = new Person()
// console.log('p =>', p)
let promise = new Promise(() => {})
console.log('promise=>', promise)
// eslint-disable-next-line
// console.log(_.join(['a', 'b', 'c'], '_'))
// console.log('我是全局jquery index.js',$)
console.log('process.env.NODE_ENV)==>', process.env.NODE_ENV)
// eslint-disable-next-line
console.log('DEVELOPMENT==>', typeof DEVELOPMENT)
// eslint-disable-next-line
console.log('DEVELOPMENT==>',  EXPRESS)
console.log(eval('1+3'))
import('./utils/index.js')
  .then(res => {
    console.log('utils 文件import加载', res)
  })
